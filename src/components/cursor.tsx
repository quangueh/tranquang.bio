"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let isLarge = false;
    let isImage = false;
    let isText = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;

      const target = e.target as HTMLElement;
      const interactive = !!target.closest("a, button, [data-cursor]");
      const image = !!target.closest("[data-cursor-image]");
      const text = !!target.closest("[data-cursor-text]");

      if (interactive !== isLarge || image !== isImage || text !== isText) {
        isLarge = interactive;
        isImage = image;
        isText = text;
        if (ring.current) {
          // Use transform scale instead of width/height/margin for GPU acceleration
          const scale = isImage ? 2.5 : isLarge ? 1.75 : isText ? 1.25 : 1;
          ring.current.style.transform = `translate(${rx}px, ${my}px) scale(${scale})`;
          ring.current.style.background = isImage
            ? "color-mix(in srgb, var(--color-cyan) 8%, transparent)"
            : isLarge
            ? "color-mix(in srgb, var(--color-blue) 10%, transparent)"
            : isText
            ? "color-mix(in srgb, var(--color-blue) 6%, transparent)"
            : "transparent";
          ring.current.style.borderColor = isLarge || isImage ? "var(--color-cyan)" : "var(--color-blue)";
          ring.current.style.borderWidth = isText ? "2px" : "1px";
        }
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) {
        const scale = isImage ? 2.5 : isLarge ? 1.75 : isText ? 1.25 : 1;
        ring.current.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

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
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-4 -mt-4 h-8 w-8 rounded-full border transition-[opacity,background,border-color,border-width] duration-200 ease-out"
        style={{ borderColor: "var(--color-blue)", willChange: "transform" }}
      />
    </>
  );
}
