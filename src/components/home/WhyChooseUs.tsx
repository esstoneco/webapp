import {
  FaGem,
  FaGlobeEurope,
  FaAward,
  FaLeaf,
} from "react-icons/fa";

import FeatureCard from "../common/FeatureCard";

const features = [
  {
    icon: <FaGem />,
    title: "Premium Quality",
    description:
      "Carefully selected Nestos marble with exceptional quality and consistency.",
  },
  {
    icon: <FaAward />,
    title: "Experience",
    description:
      "More than two decades of expertise in natural stone production.",
  },
  {
    icon: <FaGlobeEurope />,
    title: "Worldwide Export",
    description:
      "Trusted by architects and contractors across Europe and beyond.",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainability",
    description:
      "Responsible quarrying with respect for the environment.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-stone-100 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="mb-3 uppercase tracking-[6px] text-stone-500">
            Excellence
          </p>

          <h2 className="text-5xl font-bold">
            Why Choose ES STONE IKE
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}