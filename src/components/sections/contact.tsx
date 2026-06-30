"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

type Status = "idle" | "sending" | "success";

export function Contact() {
  const { lang } = useLang();
  const c = content.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const errors = {
    name: !form.name.trim(),
    email: !emailValid,
    message: form.message.trim().length < 10,
  };
  const valid = !errors.name && !errors.email && !errors.message;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!valid || status !== "idle") return;
    setStatus("sending");
    // Demo: thay bằng EmailJS/Resend/API thật ở đây.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setForm({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setStatus("idle"), 3500);
  };

  const fieldClass = (err: boolean, key: string) =>
    `glass w-full rounded-2xl px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-purple)] ${
      touched[key] && err ? "border-red-400/60" : ""
    }`;

  return (
    <section id="contact" className="py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t(c.eyebrow, lang)} title={t(c.title, lang)} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="max-w-md text-lg text-[var(--color-text-muted)]">{t(c.subtitle, lang)}</p>
            <a
              href={`mailto:${c.email}`}
              className="mt-6 inline-block border-b-2 border-transparent font-[var(--font-display)] text-2xl font-bold transition-colors hover:border-[var(--color-purple)] hover:text-[var(--color-purple)] sm:text-3xl"
            >
              {c.email}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass-strong space-y-4 rounded-3xl p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    placeholder={t(c.form.name, lang)}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onBlur={() => setTouched({ ...touched, name: true })}
                    className={fieldClass(errors.name, "name")}
                  />
                </div>
                <div>
                  <input
                    placeholder={t(c.form.email, lang)}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className={fieldClass(errors.email, "email")}
                  />
                </div>
              </div>
              <input
                placeholder={t(c.form.company, lang)}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={fieldClass(false, "company")}
              />
              <textarea
                placeholder={t(c.form.message, lang)}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onBlur={() => setTouched({ ...touched, message: true })}
                className={`${fieldClass(errors.message, "message")} resize-none`}
              />

              <button
                type="submit"
                disabled={status !== "idle"}
                data-cursor
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-90"
                style={{ background: "linear-gradient(120deg, var(--color-blue), var(--color-purple), var(--color-cyan))" }}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Send size={16} /> {t(c.form.send, lang)}
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> {t(c.form.sending, lang)}
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check size={18} /> {t(c.form.success, lang)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
