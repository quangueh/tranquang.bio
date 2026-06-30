"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (ring.current) ring.current.classList.toggle("cursor-ring--active", !!interactive);
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full"
        style={{ background: "var(--color-cyan)", mixBlendMode: "difference" }}
      />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] -ml-4 -mt-4 h-8 w-8 rounded-full border transition-[width,height,margin,opacity] duration-200"
        style={{ borderColor: "var(--color-purple)" }}
      />
      <style jsx global>{`
        .cursor-ring--active {
          width: 56px;
          height: 56px;
          margin-left: -28px;
          margin-top: -28px;
          background: color-mix(in srgb, var(--color-purple) 12%, transparent);
        }
      `}</style>
    </>
  );
}
