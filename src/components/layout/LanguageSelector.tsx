import { useTranslation } from "react-i18next";
import { languages } from "../../i18n";
const labels = { en: "English", el: "Ελληνικά", de: "Deutsch" };
export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  return (
    <select
      aria-label={t("Language")}
      value={i18n.resolvedLanguage ?? "en"}
      onChange={(event) => { void i18n.changeLanguage(event.target.value); }}
      className="max-w-[112px] rounded-full border border-white/40 bg-black/60 px-2 py-2 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#C8A97E] sm:px-3"
    >
      {languages.map((code) => <option key={code} value={code} lang={code}>{labels[code]}</option>)}
    </select>
  );
}
