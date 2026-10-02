import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Personalised shadcn Button.
 * - default: neutral fill; on hover the brand colour wipes in from the left.
 * - outline: hairline border that becomes a hand-drawn sketch on hover.
 * - brand:   the one loud button per screen.
 * - sketch:  always-on hand-drawn border, for playful secondary actions.
 * - link:    text with a scribble underline drawn on hover.
 */
const buttonVariants = cva(
  "group/button relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md font-medium text-sm transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out-expo outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-500 before:ease-out-expo hover:text-brand-foreground hover:before:scale-x-100",
        brand:
          "bg-brand text-brand-foreground before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-500 before:ease-out-expo hover:text-primary-foreground hover:before:scale-x-100",
        outline: "sketch-border border border-border bg-transparent hover:border-transparent hover:text-foreground",
        sketch: "sketch-border sketch-border-on bg-transparent hover:text-brand",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "scribble-underline overflow-visible rounded-none px-0 text-foreground",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-5 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 px-7 text-base has-[>svg]:px-6",
        xl: "h-14 px-8 text-base has-[>svg]:px-7",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0 has-[>svg]:px-0" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
