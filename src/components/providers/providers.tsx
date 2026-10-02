"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig, domMax } from "motion/react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { IntroProvider } from "./intro-provider";
import { SmoothScroll } from "./smooth-scroll";
import { TransitionProvider } from "@/components/motion/page-transition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <IntroProvider>
              <SmoothScroll>
                <TransitionProvider>{children}</TransitionProvider>
              </SmoothScroll>
            </IntroProvider>
          </TooltipProvider>
          <Toaster />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
