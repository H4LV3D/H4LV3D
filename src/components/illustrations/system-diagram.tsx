"use client";

import * as React from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import type { DiagramDef, DiagramEdge, DiagramNode } from "@/content/diagrams";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NODE_W = 184;
const NODE_H = 52;
const NODE_H_SUB = 66;

type Pt = { x: number; y: number };

/** Small deterministic PRNG so every render draws the same wobble. */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

const size = (n: DiagramNode) => ({ w: n.w ?? NODE_W, h: n.sub ? NODE_H_SUB : NODE_H });

/** Four slightly bowed strokes that overshoot the corners, like a pen box. */
function boxStrokes(n: DiagramNode) {
  const r = rng(n.id);
  const { w, h } = size(n);
  const x0 = n.x - w / 2;
  const y0 = n.y - h / 2;
  const x1 = x0 + w;
  const y1 = y0 + h;
  const j = () => (r() - 0.5) * 3;
  const o = 4;
  return [
    `M${x0 - o} ${y0 + j()} C ${x0 + w * 0.3} ${y0 + j()}, ${x0 + w * 0.7} ${y0 + j()}, ${x1 + o} ${y0 + j()}`,
    `M${x1 + j()} ${y0 - o} C ${x1 + j()} ${y0 + h * 0.3}, ${x1 + j()} ${y0 + h * 0.7}, ${x1 + j()} ${y1 + o}`,
    `M${x1 + o} ${y1 + j()} C ${x0 + w * 0.7} ${y1 + j()}, ${x0 + w * 0.3} ${y1 + j()}, ${x0 - o} ${y1 + j()}`,
    `M${x0 + j()} ${y1 + o} C ${x0 + j()} ${y0 + h * 0.7}, ${x0 + j()} ${y0 + h * 0.3}, ${x0 + j()} ${y0 - o}`,
  ];
}

/** A hand-drawn pill for people / outside actors. */
function pillStroke(n: DiagramNode) {
  const r = rng(n.id);
  const { w, h } = size(n);
  const rad = h / 2;
  const x0 = n.x - w / 2 + rad;
  const x1 = n.x + w / 2 - rad;
  const y0 = n.y - rad;
  const y1 = n.y + rad;
  const j = () => (r() - 0.5) * 2.5;
  return [
    `M${x0} ${y0 + j()} C ${x0 + (x1 - x0) * 0.4} ${y0 + j()}, ${x0 + (x1 - x0) * 0.6} ${y0 + j()}, ${x1} ${y0}` +
      ` A ${rad} ${rad} 0 0 1 ${x1} ${y1}` +
      ` C ${x0 + (x1 - x0) * 0.6} ${y1 + j()}, ${x0 + (x1 - x0) * 0.4} ${y1 + j()}, ${x0} ${y1}` +
      ` A ${rad} ${rad} 0 0 1 ${x0 + 2} ${y0 - 1.5}`,
  ];
}

/** Where the line from the node centre towards `dir` leaves the node (plus a gap). */
function exitPoint(n: DiagramNode, dir: Pt, gap: number): Pt {
  const { w, h } = size(n);
  const hw = w / 2 + gap;
  const hh = h / 2 + gap;
  const t = Math.min(dir.x === 0 ? Infinity : hw / Math.abs(dir.x), dir.y === 0 ? Infinity : hh / Math.abs(dir.y));
  return { x: n.x + dir.x * t, y: n.y + dir.y * t };
}

function arrowHead(tip: Pt, from: Pt) {
  const dx = tip.x - from.x;
  const dy = tip.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const a = 0.5;
  const s = 11;
  const p1 = {
    x: tip.x - s * (ux * Math.cos(a) - uy * Math.sin(a)),
    y: tip.y - s * (uy * Math.cos(a) + ux * Math.sin(a)),
  };
  const p2 = {
    x: tip.x - s * (ux * Math.cos(-a) - uy * Math.sin(-a)),
    y: tip.y - s * (uy * Math.cos(-a) + ux * Math.sin(-a)),
  };
  return `M${p1.x} ${p1.y} L${tip.x} ${tip.y} L${p2.x} ${p2.y}`;
}

function edgeGeometry(edge: DiagramEdge, a: DiagramNode, b: DiagramNode) {
  const dir = { x: b.x - a.x, y: b.y - a.y };
  const start = exitPoint(a, dir, 8);
  const end = exitPoint(b, { x: -dir.x, y: -dir.y }, 10);
  const len = Math.hypot(end.x - start.x, end.y - start.y);
  const r = rng(`${edge.from}>${edge.to}`);
  const bow = (r() - 0.5) * Math.min(0.14 * len, 22);
  const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  const nx = -(end.y - start.y) / (len || 1);
  const ny = (end.x - start.x) / (len || 1);
  const c = { x: mid.x + nx * bow, y: mid.y + ny * bow };
  const labelAt = { x: 0.25 * start.x + 0.5 * c.x + 0.25 * end.x, y: 0.25 * start.y + 0.5 * c.y + 0.25 * end.y };
  // Short horizontal arrows: put the label above the line instead of on it.
  if (Math.abs(end.y - start.y) < 12) labelAt.y -= 16;
  return {
    line: `M${start.x} ${start.y} Q ${c.x} ${c.y}, ${end.x} ${end.y}`,
    heads: [arrowHead(end, c), ...(edge.both ? [arrowHead(start, c)] : [])],
    labelAt,
  };
}

/**
 * Line-drawn architecture diagram that sketches itself in when scrolled into
 * view: boxes first, then the arrows between them.
 */
export function SystemDiagram({
  diagram,
  title,
  className,
}: {
  diagram: DiagramDef;
  title: string;
  className?: string;
}) {
  const t = useTranslations("Diagram");
  const ref = React.useRef<SVGSVGElement>(null);
  const id = React.useId();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const shown = reduce || inView;
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));
  const nodeLabel = (n: DiagramNode) => t(`nodes.${n.label}`);

  const draw = (delay: number, duration = 0.7) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: shown ? { pathLength: 1, opacity: 1 } : undefined,
          transition: {
            pathLength: { delay, duration, ease: ease.out },
            opacity: { delay, duration: 0.01 },
          },
        };
  const fade = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0 },
          animate: shown ? { opacity: 1 } : undefined,
          transition: { delay, duration: 0.5 },
        };

  const edgeStart = 0.25 + diagram.nodes.length * 0.08;

  return (
    <div className={cn("-mx-4 overflow-x-auto px-4 pb-2 md:mx-auto md:w-full md:max-w-4xl md:px-0", className)}>
      <svg
        ref={ref}
        role="img"
        aria-labelledby={`${id}-t ${id}-d`}
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        className="boil h-auto w-full min-w-[640px] overflow-visible select-none"
      >
        <title id={`${id}-t`}>{title}</title>
        <desc id={`${id}-d`}>
          {diagram.edges
            .map((e) => `${nodeLabel(byId.get(e.from)!)} ${e.both ? "↔" : "→"} ${nodeLabel(byId.get(e.to)!)}`)
            .join("; ")}
        </desc>

        {/* Nodes */}
        {diagram.nodes.map((n, i) => {
          const { w, h } = size(n);
          const accent = n.kind === "accent";
          const strokes = n.kind === "actor" ? pillStroke(n) : boxStrokes(n);
          return (
            <g key={n.id}>
              <m.rect
                x={n.x - w / 2}
                y={n.y - h / 2}
                width={w}
                height={h}
                rx={n.kind === "actor" ? h / 2 : 3}
                className={accent ? "fill-brand-soft" : "fill-background"}
                {...fade(0.15 + i * 0.08)}
              />
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth={accent ? 2.4 : 1.8}
                strokeLinecap="round"
                className={accent ? "text-brand" : "text-foreground"}
              >
                {strokes.map((d, k) => (
                  <m.path key={k} d={d} {...draw(0.1 + i * 0.08 + k * 0.05, 0.5)} />
                ))}
              </g>
              <m.g {...fade(0.35 + i * 0.08)}>
                <text
                  x={n.x}
                  y={n.sub ? n.y - 4 : n.y + 5}
                  textAnchor="middle"
                  className="fill-foreground font-sans text-[15px] font-medium"
                >
                  {nodeLabel(n)}
                </text>
                {n.sub && (
                  <text
                    x={n.x}
                    y={n.y + 17}
                    textAnchor="middle"
                    className="fill-muted-foreground font-mono text-[10.5px] tracking-[0.08em] uppercase"
                  >
                    {n.sub}
                  </text>
                )}
              </m.g>
            </g>
          );
        })}

        {/* Edges */}
        {diagram.edges.map((e, i) => {
          const a = byId.get(e.from);
          const b = byId.get(e.to);
          if (!a || !b) return null;
          const g = edgeGeometry(e, a, b);
          const delay = edgeStart + i * 0.12;
          return (
            <g key={`${e.from}-${e.to}`} className="text-muted-foreground">
              <m.path
                d={g.line}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeDasharray={e.dashed ? "5 6" : undefined}
                {...draw(delay, 0.6)}
              />
              {g.heads.map((d, k) => (
                <m.path
                  key={k}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  {...draw(delay + 0.5, 0.2)}
                />
              ))}
              {e.label && (
                <m.text
                  x={g.labelAt.x}
                  y={g.labelAt.y + 5}
                  textAnchor="middle"
                  paintOrder="stroke"
                  stroke="var(--background)"
                  strokeWidth={7}
                  strokeLinejoin="round"
                  className="fill-foreground font-hand text-[19px]"
                  {...fade(delay + 0.45)}
                >
                  {t(`edges.${e.label}`)}
                </m.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
