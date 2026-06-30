"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduce ? 0 : 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] grid place-items-center bg-[var(--color-bg)]"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <motion.path
                d="M20 60 V20 H40 a18 18 0 0 1 0 36 H28 l16 16"
                stroke="url(#g)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="80" y2="80">
                  <stop stopColor="#3b82f6" />
                  <stop offset="0.5" stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </motion.svg>
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-[var(--color-border-strong)]">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, var(--color-blue), var(--color-purple), var(--color-cyan))" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
