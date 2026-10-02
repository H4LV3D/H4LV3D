import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Underline-only input. Focus draws a brand underline across from the left
 * (via the background-size trick, so it needs no wrapper element).
 */
const fieldBase =
  "w-full min-w-0 border-0 border-b border-input bg-transparent bg-[linear-gradient(var(--brand),var(--brand))] bg-no-repeat bg-[length:0%_2px] bg-[position:0_100%] px-0 py-3 text-base text-foreground outline-none transition-[background-size,border-color] duration-500 ease-out-expo placeholder:text-muted-foreground/60 focus-visible:bg-[length:100%_2px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-lg";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />;
}

export { Input, fieldBase };
