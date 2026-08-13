import { Link, useParams } from "react-router-dom";

import ProjectCTA from "../components/project/ProjectCTA";
import ProjectDescription from "../components/project/ProjectDescription";
import ProjectGallery from "../components/project/ProjectGallery";
import ProjectHero from "../components/project/ProjectHero";
import ProjectInfo from "../components/project/ProjectInfo";
import ProjectScope from "../components/project/ProjectScope";
import RelatedProjects from "../components/project/RelatedProjects";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-5 text-5xl font-bold">Project Not Found</h1>
          <p className="mb-8 text-gray-600">
            The project you are looking for does not exist.
          </p>
          <Link
            to="/projects"
            className="rounded-full bg-black px-8 py-4 text-white"
          >
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <ProjectHero
        title={project.title}
        category={project.category}
        location={project.location}
        image={project.image}
      />
      <ProjectInfo
        location={project.location}
        year={project.year}
        category={project.category}
        marble={project.marble}
        client={project.client}
      />
      <ProjectGallery images={project.gallery} title={project.title} />
      <ProjectDescription description={project.description} />
      <ProjectScope scope={project.scope} />
      <RelatedProjects currentProjectId={project.id} />
      <ProjectCTA title="Let's Create Something Timeless" />
    </>
  );
}
