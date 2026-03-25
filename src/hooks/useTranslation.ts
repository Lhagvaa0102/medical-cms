import { useState, useCallback } from "react";
import {
  SupportedLanguage,
  TranslateResponse,
  TranslateError,
} from "@/types/translation";

interface UseTranslationReturn {
  translate: (
    text: string,
    targetLang?: SupportedLanguage,
  ) => Promise<string | null>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useTranslation(): UseTranslationReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const translate = useCallback(
    async (
      text: string,
      targetLang: SupportedLanguage = "mn",
    ): Promise<string | null> => {
      if (!text?.trim()) return "";

      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, targetLang }),
        });

        if (!res.ok) {
          const errData: TranslateError = await res.json();
          throw new Error(errData.error ?? "Орчуулга амжилтгүй боллоо");
        }

        const data: TranslateResponse = await res.json();
        return data.translated;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Алдаа гарлаа";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { translate, loading, error, reset };
}
