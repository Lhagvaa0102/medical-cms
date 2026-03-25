"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { SupportedLanguage } from "@/types/translation";

interface LanguageContextType {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  translate: (text: string) => Promise<string>;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLanguage>("mn");
  const [loading, setLoading] = useState(false);

  const setLang = useCallback((newLang: SupportedLanguage) => {
    setLangState(newLang);
  }, []);

  const translate = useCallback(
    async (text: string): Promise<string> => {
      if (!text?.trim() || lang === "mn") return text;
      setLoading(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, targetLang: lang }),
        });
        const data = await res.json();
        return data.translated ?? text;
      } catch {
        return text;
      } finally {
        setLoading(false);
      }
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, translate, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
