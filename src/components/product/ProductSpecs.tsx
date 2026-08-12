import {
  FaMapMarkerAlt,
  FaCube,
  FaTint,
  FaWeightHanging,
  FaHammer,
  FaLayerGroup,
} from "react-icons/fa";

import FadeIn from "../common/FadeIn";

type Props = {
  specifications: {
    origin: string;
    material: string;
    finish: string;
    density: string;
    waterAbsorption: string;
    compressiveStrength: string;
  };
};

export default function ProductSpecs({
  specifications,
}: Props) {
  const specs = [
    {
      icon: <FaMapMarkerAlt />,
      label: "Origin",
      value: specifications.origin,
    },
    {
      icon: <FaCube />,
      label: "Material",
      value: specifications.material,
    },
    {
      icon: <FaLayerGroup />,
      label: "Finish",
      value: specifications.finish,
    },
    {
      icon: <FaWeightHanging />,
      label: "Density",
      value: specifications.density,
    },
    {
      icon: <FaTint />,
      label: "Water Absorption",
      value: specifications.waterAbsorption,
    },
    {
      icon: <FaHammer />,
      label: "Compressive Strength",
      value: specifications.compressiveStrength,
    },
  ];

  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <FadeIn>

          <div className="mb-16 text-center">

            <p className="mb-3 uppercase tracking-[6px] text-stone-500">
              Technical Data
            </p>

            <h2 className="text-5xl font-bold">
              Specifications
            </h2>

          </div>

        </FadeIn>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">

          {specs.map((spec) => (

            <div
              key={spec.label}
              className="bg-white p-8 transition hover:bg-stone-50"
            >

              <div className="mb-5 text-2xl text-[#C8A97E]">
                {spec.icon}
              </div>

              <p className="mb-2 text-sm uppercase tracking-wider text-stone-500">
                {spec.label}
              </p>

              <p className="text-xl font-semibold">
                {spec.value}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}