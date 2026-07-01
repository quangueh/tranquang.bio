"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "../brand-icons";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

export function Footer() {
  const { lang } = useLang();
  const f = content.footer;
  const socials = [
    { icon: GithubIcon, href: content.socials.github, label: "GitHub" },
    { icon: LinkedinIcon, href: content.socials.linkedin, label: "LinkedIn" },
    { icon: FacebookIcon, href: content.socials.facebook, label: "Facebook" },
    { icon: Mail, href: content.socials.email, label: "Email" },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-[var(--font-display)] font-semibold tracking-tight">Quang Tran</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            &copy; 2026 · {t(f.made, lang)}. {t(f.rights, lang)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass grid h-11 w-11 place-items-center rounded-full text-[var(--color-text-muted)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--color-cyan)] active:scale-90"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <a
          href="#home"
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] active:scale-95"
        >
          <ArrowUp size={15} /> {t(f.top, lang)}
        </a>
      </div>
    </footer>
  );
}
