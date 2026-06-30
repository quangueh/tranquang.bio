"use client";

import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

export function About() {
  const { lang } = useLang();
  const a = content.about;

  return (
    <section id="about" className="py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t(a.eyebrow, lang)} title={t(a.title, lang)} />

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          {/* text */}
          <div className="space-y-5">
            {a.paragraphs[lang].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* timeline */}
          <div className="relative">
            <div
              className="absolute bottom-2 left-[7px] top-2 w-px"
              style={{ background: "linear-gradient(var(--color-blue), var(--color-purple), transparent)" }}
            />
            <div className="space-y-8">
              {a.timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className="relative pl-8">
                    <span
                      className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[var(--color-bg)]"
                      style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-purple))", boxShadow: "0 0 12px var(--color-purple)" }}
                    />
                    <span className="font-[var(--font-mono)] text-sm text-[var(--color-cyan)]">{item.year}</span>
                    <h3 className="mt-1 font-[var(--font-display)] text-lg font-semibold">{t(item.title, lang)}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t(item.desc, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
