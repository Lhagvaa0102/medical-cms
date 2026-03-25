export type SupportedLanguage = "mn" | "en";

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  mn: "Монгол",
  en: "Англи",
};

export interface TranslateRequest {
  text: string;
  targetLang?: SupportedLanguage;
}

export interface TranslateResponse {
  translated: string;
}

export interface TranslateError {
  error: string;
}
