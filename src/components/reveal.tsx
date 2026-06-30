"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its Reveal children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = variants;
