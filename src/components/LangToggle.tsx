"use client";
import { useLang } from "@/lib/LangContext";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 text-sm font-medium rounded-md px-2 py-1 hover:bg-gray-100 transition-colors"
      aria-label="Toggle language"
    >
      <span className={lang === "fr" ? "text-blue-700 font-bold" : "text-gray-400"}>FR</span>
      <span className="text-gray-300">|</span>
      <span className={lang === "en" ? "text-blue-700 font-bold" : "text-gray-400"}>EN</span>
    </button>
  );
}
