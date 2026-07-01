"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { LangProvider } from "@/lib/i18n";

type Theme = "dark" | "light";
type ThemeContextType = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeContextType | null>(null);

function useThemeSnapshot(): Theme {
  return useSyncExternalStore(
    (cb) => {
      const observer = new MutationObserver(cb);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.classList.contains("light") ? "light" : "dark"),
    () => "dark"
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeSnapshot();

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <LangProvider>{children}</LangProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
