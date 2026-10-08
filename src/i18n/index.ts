import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import el from "./locales/el.json";
import de from "./locales/de.json";

export const languages = ["en", "el", "de"] as const;
export type Language = typeof languages[number];
const storageKey = "esstone-language";
function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem(storageKey);
    if (languages.includes(saved as Language)) return saved as Language;
  } catch { /* Storage may be disabled; the selector still works. */ }
  return "en";
}
function syncLanguage(language: string) {
  document.documentElement.lang = language;
  try { localStorage.setItem(storageKey, language); } catch { /* Optional persistence. */ }
}
i18n.on("languageChanged", syncLanguage);
void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, el: { translation: el }, de: { translation: de } },
  lng: initialLanguage(),
  fallbackLng: "en",
  supportedLngs: [...languages],
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});
syncLanguage(i18n.resolvedLanguage ?? "en");
export default i18n;
