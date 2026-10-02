"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

/* The plus icon is hand-drawn and rotates into a × when open. */
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/acc flex flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-2xl transition-colors outline-none hover:text-brand disabled:pointer-events-none disabled:opacity-50 md:text-3xl",
          className,
        )}
        {...props}
      >
        {children}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-6 shrink-0 text-muted-foreground transition-transform duration-500 ease-out-expo group-hover/acc:text-brand group-data-[state=open]/acc:rotate-[135deg]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12.3 3.5c-.4 5.6-.2 11.3.1 17" />
          <path d="M3.6 12.2c5.5-.5 11.2-.3 16.9.2" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("max-w-2xl pb-6 text-base leading-relaxed md:text-lg", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
