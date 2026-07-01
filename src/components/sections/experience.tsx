"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

export function Experience() {
  const { lang } = useLang();
  const e = content.experience;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t(e.eyebrow, lang)} title={t(e.title, lang)} />

        <div ref={ref} className="relative ml-2 max-w-3xl">
          {/* Track */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-[var(--color-border-strong)]" />
          {/* Animated fill - uses scaleY for GPU acceleration */}
          <motion.div
            style={{ scaleY, transformOrigin: "top", willChange: "transform" }}
            className="absolute left-0 top-0 h-full w-px"
          >
            <div
              className="h-full w-px"
              style={{ background: "linear-gradient(180deg, var(--color-blue), var(--color-cyan))" }}
            />
          </motion.div>

          <div className="space-y-12">
            {e.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative pl-10">
                  <span
                    className="absolute left-[-5px] top-1.5 h-3 w-3 rounded-full ring-4 ring-[var(--color-bg)]"
                    style={{ background: "var(--color-cyan)", boxShadow: "0 0 12px var(--color-cyan)" }}
                  />
                  <span className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)]">{item.period}</span>
                  <h3 className="mt-1 font-[var(--font-display)] text-xl font-semibold tracking-tight">{t(item.role, lang)}</h3>
                  <p className="text-sm font-medium text-[var(--color-blue)]">{item.company}</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">{t(item.desc, lang)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
