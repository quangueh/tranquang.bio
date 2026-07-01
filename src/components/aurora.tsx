"use client";

import { useEffect, useRef } from "react";

export function Aurora() {
  const spotlight = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const s = smooth.current;
      const m = mouse.current;
      s.x += (m.x - s.x) * 0.06;
      s.y += (m.y - s.y) * 0.06;

      if (spotlight.current) {
        spotlight.current.style.background = `radial-gradient(700px circle at ${s.x}px ${s.y}px, color-mix(in srgb, var(--color-blue) 6%, transparent), transparent 70%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Mesh gradient layer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, color-mix(in srgb, var(--color-blue) 12%, transparent), transparent),
            radial-gradient(ellipse 60% 40% at 80% 30%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent),
            radial-gradient(ellipse 50% 50% at 50% 80%, color-mix(in srgb, var(--color-blue) 6%, transparent), transparent)
          `,
        }}
      />

      {/* Aurora blobs */}
      <div
        className="animate-aurora absolute -left-[8%] -top-[8%] h-[50vh] w-[50vh] rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--color-blue), transparent 70%)" }}
      />
      <div
        className="animate-aurora absolute right-[-5%] top-[15%] h-[45vh] w-[45vh] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--color-cyan), transparent 70%)", animationDelay: "-7s" }}
      />
      <div
        className="animate-aurora absolute bottom-[-8%] left-[35%] h-[40vh] w-[40vh] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--color-blue), transparent 70%)", animationDelay: "-13s" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      {/* Spotlight - follows cursor */}
      <div ref={spotlight} className="absolute inset-0" />

      {/* Floating particles */}
      <Particles />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/** CSS-animated floating particles for depth. */
function Particles() {
  const dots = [
    { x: "15%", y: "20%", size: 3, delay: 0, dur: 7 },
    { x: "75%", y: "15%", size: 2, delay: 1.5, dur: 9 },
    { x: "45%", y: "60%", size: 2, delay: 3, dur: 8 },
    { x: "85%", y: "45%", size: 3, delay: 0.5, dur: 6 },
    { x: "25%", y: "75%", size: 2, delay: 2, dur: 10 },
    { x: "60%", y: "30%", size: 2, delay: 4, dur: 7.5 },
    { x: "10%", y: "50%", size: 3, delay: 1, dur: 8.5 },
    { x: "90%", y: "70%", size: 2, delay: 2.5, dur: 6.5 },
  ];

  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            background: "var(--color-cyan)",
            opacity: 0.25,
            animation: `float ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}
