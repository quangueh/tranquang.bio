"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./content";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "vi" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  const toggle = () => setLang(lang === "vi" ? "en" : "vi");

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Pick a localized value: either a {vi,en} object or a plain string. */
export function t<T>(field: { vi: T; en: T } | T, lang: Lang): T {
  if (field && typeof field === "object" && "vi" in (field as object) && "en" in (field as object)) {
    return (field as { vi: T; en: T })[lang];
  }
  return field as T;
}
