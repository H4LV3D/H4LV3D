"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme ?? "system") as ToasterProps["theme"]}
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "!rounded-md !border-border !bg-primary !text-primary-foreground !font-sans !shadow-xl",
          description: "!text-primary-foreground/70",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
