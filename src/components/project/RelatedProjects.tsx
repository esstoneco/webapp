import { Link } from "react-router-dom";

import { projects } from "../../data/projects";

type Props = {
  currentProjectId: number;
};

export default function RelatedProjects({
  currentProjectId,
}: Props) {
  const related = projects
    .filter(
      (project) => project.id !== currentProjectId
    )
    .slice(0, 3);

  return (
    <section className="bg-stone-100 py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="mb-3 uppercase tracking-[6px] text-stone-500">
              Explore More
            </p>

            <h2 className="text-5xl font-bold">
              Related Projects
            </h2>

          </div>

          <Link
            to="/projects"
            className="font-semibold text-[#a27d4f] hover:underline"
          >
            View All Projects →
          </Link>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {related.map((project) => (

            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              <div className="p-7">

                <p className="mb-2 text-sm uppercase tracking-wider text-stone-500">
                  {project.category}
                </p>

                <h3 className="mb-3 text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="text-stone-500">
                  {project.location}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}