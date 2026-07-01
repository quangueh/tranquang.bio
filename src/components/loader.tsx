"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export function Loader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce) return;

    const start = performance.now();
    const duration = 1200;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] grid place-items-center bg-[var(--color-bg)]"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-4xl font-bold tracking-tight"
            >
              <span className="text-gradient">QT</span>
            </motion.div>

            <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-[var(--color-border)]">
              <div
                className="absolute inset-y-0 left-0 origin-left"
                style={{
                  width: "100%",
                  transform: `scaleX(${progress / 100})`,
                  background: "linear-gradient(90deg, var(--color-blue), var(--color-cyan))",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
