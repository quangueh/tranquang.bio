"use client";

import { useEffect, useRef } from "react";

/** Aurora gradient blobs + mouse-following spotlight + subtle grid. */
export function Aurora() {
  const spotlight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (spotlight.current) {
        spotlight.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--color-purple) 8%, transparent), transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* aurora blobs */}
      <div
        className="animate-aurora absolute -left-[10%] -top-[10%] h-[55vh] w-[55vh] rounded-full opacity-40 blur-[80px]"
        style={{ background: "radial-gradient(circle, var(--color-blue), transparent 70%)" }}
      />
      <div
        className="animate-aurora absolute right-[-5%] top-[10%] h-[50vh] w-[50vh] rounded-full opacity-40 blur-[90px]"
        style={{ background: "radial-gradient(circle, var(--color-purple), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute bottom-[-10%] left-[30%] h-[45vh] w-[45vh] rounded-full opacity-30 blur-[90px]"
        style={{ background: "radial-gradient(circle, var(--color-cyan), transparent 70%)", animationDelay: "-12s" }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 50%, transparent 100%)",
        }}
      />
      {/* spotlight */}
      <div ref={spotlight} className="absolute inset-0" />
      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
