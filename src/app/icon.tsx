import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { signatureShort } from "@/components/illustrations/signature-paths";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the first letter of the signature on a dark tile, with a brand dot. */
export default function Icon() {
  const [, , , h] = signatureShort.viewBox.split(" ").map(Number);
  const t = signatureShort.paths.slice(0, 2);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#171717",
        borderRadius: 14,
        position: "relative",
      }}
    >
      <svg width="46" height="46" viewBox={`0 0 ${h} ${h}`}>
        <g
          fill="none"
          stroke="#f5f5f5"
          strokeWidth={70}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${h * 0.02} 0)`}
        >
          {t.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          right: 9,
          bottom: 9,
          width: 11,
          height: 11,
          borderRadius: 999,
          background: brand.accent,
        }}
      />
    </div>,
    size,
  );
}
