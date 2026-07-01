"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { Lang } from "./content";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextType | null>(null);

function useLangSnapshot(): Lang {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      return () => window.removeEventListener("storage", cb);
    },
    () => {
      const saved = localStorage.getItem("lang");
      return saved === "vi" || saved === "en" ? saved : "vi";
    },
    () => "vi"
  );
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useLangSnapshot();

  const setLang = (l: Lang) => {
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
