"use client";

import * as React from "react";

type IntroState = {
  /** True once the preloader has finished (or was skipped). */
  introDone: boolean;
  finishIntro: () => void;
};

const IntroContext = React.createContext<IntroState>({ introDone: true, finishIntro: () => {} });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = React.useState(false);
  const finishIntro = React.useCallback(() => setIntroDone(true), []);
  const value = React.useMemo(() => ({ introDone, finishIntro }), [introDone, finishIntro]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return React.useContext(IntroContext);
}
