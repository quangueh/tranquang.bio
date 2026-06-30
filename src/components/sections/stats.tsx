"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-[var(--font-display)] text-4xl font-bold text-gradient sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { lang } = useLang();
  return (
    <section className="py-16">
      <div className="container-x">
        <div className="glass-strong grid grid-cols-2 gap-8 rounded-[32px] p-10 lg:grid-cols-4">
          {content.stats.map((s) => (
            <div key={s.suffix + s.value} className="text-center">
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{t(s.label, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
