import {
  FaBuilding,
  FaHome,
  FaBath,
  FaUtensils,
  FaLayerGroup,
  FaHotel,
} from "react-icons/fa";

import FadeIn from "../common/FadeIn";

type Props = {
  applications: string[];
};

const icons = [
  <FaHotel />,
  <FaHome />,
  <FaUtensils />,
  <FaBath />,
  <FaLayerGroup />,
  <FaBuilding />,
];

export default function ProductApplications({
  applications,
}: Props) {
  return (
    <section className="bg-stone-100 py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <FadeIn>

          <div className="mb-16 text-center">

            <p className="mb-3 uppercase tracking-[6px] text-stone-500">
              Applications
            </p>

            <h2 className="text-5xl font-bold">
              Designed for Architecture
            </h2>

          </div>

        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {applications.map((application, index) => (

            <FadeIn key={application}>

              <div className="flex items-center gap-5 rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="text-3xl text-[#C8A97E]">
                  {icons[index % icons.length]}
                </div>

                <h3 className="text-xl font-semibold">
                  {application}
                </h3>

              </div>

            </FadeIn>

          ))}

        </div>

      </div>

    </section>
  );
}