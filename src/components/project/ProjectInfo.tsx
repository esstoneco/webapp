import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGem,
  FaBuilding,
} from "react-icons/fa";

type Props = {
  location: string;
  year: string;
  category: string;
  marble: string;
  client?: string;
};

export default function ProjectInfo({
  location,
  year,
  category,
  marble,
  client,
}: Props) {
  const information = [
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: location,
    },
    {
      icon: <FaCalendarAlt />,
      label: "Year",
      value: year,
    },
    {
      icon: <FaBuilding />,
      label: "Category",
      value: category,
    },
    {
      icon: <FaGem />,
      label: "Marble",
      value: marble,
    },
  ];

  if (client) {
    information.push({
      icon: <FaBuilding />,
      label: "Client",
      value: client,
    });
  }

  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 md:grid-cols-2 lg:grid-cols-4">

          {information.map((item) => (

            <div
              key={item.label}
              className="bg-white p-8"
            >

              <div className="mb-5 text-2xl text-[#C8A97E]">
                {item.icon}
              </div>

              <p className="mb-2 text-sm uppercase tracking-wider text-stone-500">
                {item.label}
              </p>

              <p className="text-lg font-semibold">
                {item.value}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}