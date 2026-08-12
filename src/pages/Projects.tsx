import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { projects } from "../data/projects";

const categories = [
  "All",
  "Residential",
  "Hospitality",
  "Commercial",
  "Architectural",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <main className="bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-stone-100 py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-4xl"
          >

            <p className="mb-5 uppercase tracking-[6px] text-stone-500">
              Our Portfolio
            </p>

            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-7xl">
              Projects
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              Discover selected projects where natural Greek
              marble becomes part of contemporary architecture,
              interiors and timeless spaces.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="mb-3 uppercase tracking-[6px] text-stone-500">
                Selected Work
              </p>

              <h2 className="text-4xl font-bold md:text-5xl">
                Our Projects
              </h2>

            </div>

            <p className="max-w-md text-stone-500 lg:text-right">
              Explore our work across residential,
              hospitality and commercial environments.
            </p>

          </div>


          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mb-14 flex flex-wrap gap-3">

            {categories.map((category) => {

              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "border border-stone-200 bg-white text-stone-600 hover:border-[#C8A97E] hover:text-black"
                  }`}
                >
                  {category}
                </button>
              );
            })}

          </div>


          {/* =================================================
              PROJECT COUNT
          ================================================= */}

          <div className="mb-8 flex items-center justify-between">

            <p className="text-sm text-stone-500">

              Showing{" "}

              <span className="font-semibold text-black">
                {filteredProjects.length}
              </span>

              {" "}

              {filteredProjects.length === 1
                ? "project"
                : "projects"}

            </p>

            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setActiveCategory("All")
                }
                className="text-sm font-semibold text-[#a27d4f] hover:underline"
              >
                Clear filter
              </button>
            )}

          </div>


          {/* =================================================
              PROJECT GRID
          ================================================= */}

          <AnimatePresence mode="popLayout">

            <motion.div
              layout
              className="grid gap-8 md:grid-cols-2"
            >

              {filteredProjects.map(
                (project, index) => (

                  <motion.div
                    key={project.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                  >

                    <Link
                      to={`/projects/${project.slug}`}
                      className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >

                      {/* IMAGE */}

                      <div className="relative overflow-hidden">

                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

                        <div className="absolute inset-0 flex items-center justify-center">

                          <span className="translate-y-4 rounded-full bg-white px-7 py-3 text-sm font-semibold opacity-0 shadow-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            View Project
                          </span>

                        </div>

                      </div>


                      {/* CONTENT */}

                      <div className="p-7">

                        <div className="mb-3 flex items-center justify-between gap-4">

                          <p className="text-sm uppercase tracking-[3px] text-stone-500">
                            {project.category}
                          </p>

                          <p className="text-sm text-stone-400">
                            {project.year}
                          </p>

                        </div>

                        <h3 className="mb-3 text-2xl font-bold transition duration-300 group-hover:text-[#a27d4f]">
                          {project.title}
                        </h3>

                        <p className="mb-5 text-stone-500">
                          {project.location}
                        </p>

                        <div className="flex items-center justify-between border-t border-stone-200 pt-5">

                          <div>

                            <p className="mb-1 text-xs uppercase tracking-wider text-stone-400">
                              Marble
                            </p>

                            <p className="font-medium">
                              {project.marble}
                            </p>

                          </div>

                          <span className="text-xl text-[#a27d4f] transition-transform duration-300 group-hover:translate-x-2">
                            →
                          </span>

                        </div>

                      </div>

                    </Link>

                  </motion.div>

                )
              )}

            </motion.div>

          </AnimatePresence>


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredProjects.length === 0 && (

            <div className="rounded-3xl border border-dashed border-stone-300 py-24 text-center">

              <h3 className="mb-3 text-2xl font-bold">
                No projects found
              </h3>

              <p className="mb-6 text-stone-500">
                There are currently no projects in this category.
              </p>

              <button
                type="button"
                onClick={() =>
                  setActiveCategory("All")
                }
                className="rounded-full bg-black px-7 py-3 font-semibold text-white"
              >
                View All Projects
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-black py-28 text-white">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#C8A97E]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

          <p className="mb-4 uppercase tracking-[6px] text-stone-400">
            Your Project
          </p>

          <h2 className="mb-8 text-5xl font-bold md:text-6xl">
            Let's Create Something Timeless
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-stone-300">
            Looking for natural marble for your next project?
            Our team can help you find the right stone for
            your architectural vision.
          </p>

          <Link
            to="/contact"
            className="inline-block rounded-full bg-[#C8A97E] px-10 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#b08f65]"
          >
            Discuss Your Project
          </Link>

        </div>

      </section>

    </main>
  );
}