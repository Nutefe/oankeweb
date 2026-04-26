"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

export type Lang = "fr" | "en";

export type Translations = typeof fr;

const translations: Record<Lang, Translations> = { fr, en };

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  toggleLang: () => {},
  t: translations.fr,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("oanke_lang") as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLang(stored);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      localStorage.setItem("oanke_lang", next);
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

export { LangContext };
