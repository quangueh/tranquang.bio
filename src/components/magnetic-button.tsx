"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

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

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold overflow-hidden transition-colors";
  const styles =
    variant === "primary"
      ? "text-white"
      : "glass text-[var(--color-text)] hover:border-[var(--color-border-strong)]";

  const inner = (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(120deg, var(--color-blue), var(--color-purple), var(--color-cyan))" }}
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
      <motion.a href={href} {...motionProps}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button onClick={onClick} {...motionProps}>
      {inner}
    </motion.button>
  );
}
