"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
};

export function MagneticButton({ children, href, onClick, variant = "primary", className = "", strength = 0.4 }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const onRipple = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, key: Date.now() });
    onClick?.();
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold overflow-hidden transition-all duration-300";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_4px_24px_rgba(59,130,246,0.25)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.35)]"
      : "glass text-[var(--color-text)] hover:border-[var(--color-border-strong)]";

  const inner = (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 -z-10 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-cyan))" }}
        />
      )}
      {ripple && (
        <span
          key={ripple.key}
          className="pointer-events-none absolute -z-[5] h-0 w-0 rounded-full bg-white/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    className: `${base} ${styles} ${className}`,
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps} onClick={onRipple}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button onClick={onRipple} {...motionProps}>
      {inner}
    </motion.button>
  );
}
