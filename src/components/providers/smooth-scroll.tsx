"use client";

import * as React from "react";
import Lenis from "lenis";

const LenisContext = React.createContext<Lenis | null>(null);

/** Lenis smooth scrolling — skipped entirely for reduced-motion users. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true });
    // Lenis is an external system that only exists on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);
    return () => instance.destroy();
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return React.useContext(LenisContext);
}
