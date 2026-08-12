import {
  FaCheck,
} from "react-icons/fa";

type Props = {
  scope: string[];
};

export default function ProjectScope({
  scope,
}: Props) {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-12 text-center">

          <p className="mb-3 uppercase tracking-[6px] text-stone-500">
            Our Work
          </p>

          <h2 className="text-5xl font-bold">
            Project Scope
          </h2>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {scope.map((item) => (

            <div
              key={item}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 p-6 transition hover:border-[#C8A97E] hover:shadow-lg"
            >

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C8A97E]/10 text-[#C8A97E]">

                <FaCheck />

              </div>

              <span className="font-semibold">
                {item}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}