"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-8", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex w-fit items-center gap-6 border-b border-border", className)}
      {...props}
    />
  );
}

/* Tab triggers draw a hand-drawn underline in the brand colour when active. */
function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group/tab relative -mb-px inline-flex cursor-pointer items-center gap-2 pb-3 font-display text-2xl whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground md:text-3xl",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-1 h-3 w-full text-brand"
      >
        <path
          d="M2 8 C 40 3, 90 3, 130 6 S 185 10, 198 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          className="transition-[stroke-dashoffset] duration-700 ease-out-expo [stroke-dasharray:1] [stroke-dashoffset:1] group-data-[state=active]/tab:[stroke-dashoffset:0]"
        />
      </svg>
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none data-[state=active]:animate-in data-[state=active]:duration-500 data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
