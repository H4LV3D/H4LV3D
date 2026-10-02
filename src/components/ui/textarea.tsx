import * as React from "react";

import { cn } from "@/lib/utils";
import { fieldBase } from "./input";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "field-sizing-content min-h-32 resize-none", className)}
      {...props}
    />
  );
}

export { Textarea };
