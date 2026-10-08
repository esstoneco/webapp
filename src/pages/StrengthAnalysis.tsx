import { useText } from "../i18n/useText";
export default function StrengthAnalysis() {
  const tr = useText();

  return (
    <div className="p-20 text-center text-5xl">
      {tr("StrengthAnalysis")}</div>
  );
}