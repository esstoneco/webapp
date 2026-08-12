import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import ProjectCard from "../projects/ProjectCard";

export default function ProjectsPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">Recent Projects</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="rounded-full bg-black px-8 py-4 text-white transition hover:bg-stone-800"
          >
            View All Projects
          </Link>
        </div>

      </div>
    </section>
  );
}