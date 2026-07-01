"use client";

import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14 max-w-2xl">
      <Reveal>
        <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.15em] text-[var(--color-cyan)]">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 font-[var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </Reveal>
    </div>
  );
}
