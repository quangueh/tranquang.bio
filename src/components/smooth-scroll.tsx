"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    function frame(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
