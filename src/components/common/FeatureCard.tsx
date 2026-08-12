import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="mb-6 text-5xl text-stone-700">
        {icon}
      </div>

      <h3 className="mb-4 text-3xl font-semibold">
        {title}
      </h3>

      <p className="leading-8 text-gray-600">
        {description}
      </p>

    </div>
  );
}