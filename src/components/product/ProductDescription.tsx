import { useText } from "../../i18n/useText";
import FadeIn from "../common/FadeIn";

type Props = {
  description: string;
};

export default function ProductDescription({
  description,
}: Props) {
  const tr = useText();

  return (
    <section className="bg-stone-100 py-24">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <FadeIn>

          <p className="mb-4 uppercase tracking-[6px] text-stone-500">
            {tr("The Material")}</p>

          <h2 className="mb-8 text-5xl font-bold">
            {tr("Natural Beauty")}</h2>

          <p className="text-lg leading-9 text-gray-600">
            {tr(description)}
          </p>

        </FadeIn>

      </div>

    </section>
  );
}