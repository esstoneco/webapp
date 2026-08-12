import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGem,
  FaMountain,
  FaGlobeEurope,
  FaHandshake,
} from "react-icons/fa";

export default function History() {
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
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-4xl"
          >

            <p className="mb-5 uppercase tracking-[6px] text-stone-500">
              Our Story
            </p>

            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-7xl">
              A Heritage Built
              <br />
              in Stone
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              Discover the story behind our passion for natural Greek
              marble and our commitment to bringing exceptional stone
              to architectural projects around the world.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="py-28">

        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">

          {/* Text */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <p className="mb-4 uppercase tracking-[5px] text-stone-500">
              ES STONE IKE
            </p>

            <h2 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
              From the heart of Greece
              <br />
              to the world.
            </h2>

            <div className="space-y-6 text-lg leading-8 text-stone-600">

              <p>
                Natural stone is more than a material. It is a connection
                between nature, architecture and time.
              </p>

              <p>
                Our work is focused on the selection, processing and
                supply of high-quality Greek marble for projects that
                demand both exceptional aesthetics and lasting
                performance.
              </p>

              <p>
                From residential interiors to large architectural
                developments, we work closely with architects,
                designers, contractors and private clients to bring
                the natural character of Greek marble into their
                projects.
              </p>

            </div>

          </motion.div>


          {/* Visual */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative min-h-[500px] overflow-hidden rounded-3xl bg-stone-200"
          >

            {/* Temporary visual */}

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">

              <div className="text-center">

                <FaMountain className="mx-auto mb-6 text-7xl text-stone-400" />

                <p className="text-sm uppercase tracking-[5px] text-stone-500">
                  Greek Natural Stone
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="bg-stone-100 py-28">

        <div className="mx-auto max-w-5xl px-6">

          <div className="mb-16 text-center">

            <p className="mb-4 uppercase tracking-[6px] text-stone-500">
              Our Journey
            </p>

            <h2 className="text-5xl font-bold">
              A Story in Stone
            </h2>

          </div>


          <div className="relative">

            {/* Vertical line */}

            <div className="absolute left-4 top-0 h-full w-px bg-stone-300 md:left-1/2 md:-translate-x-1/2" />


            {/* Timeline item */}

            <TimelineItem
              year="01"
              title="Our Beginning"
              text="Our journey began with a deep connection to the natural stone industry and the unique marble resources of Northern Greece."
              side="left"
            />

            <TimelineItem
              year="02"
              title="Growing Our Expertise"
              text="Over time, our experience expanded across the selection, processing and supply of marble for demanding architectural applications."
              side="right"
            />

            <TimelineItem
              year="03"
              title="Greek Marble Worldwide"
              text="Our focus grew beyond individual projects as we developed relationships with professionals and clients seeking authentic Greek marble."
              side="left"
            />

            <TimelineItem
              year="04"
              title="Looking Forward"
              text="Today, we continue combining traditional knowledge with modern technology, quality control and contemporary architectural requirements."
              side="right"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mb-16 max-w-3xl">

            <p className="mb-4 uppercase tracking-[6px] text-stone-500">
              What Drives Us
            </p>

            <h2 className="text-5xl font-bold">
              Our Values
            </h2>

          </div>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <ValueCard
              icon={<FaGem />}
              title="Quality"
              text="We carefully select natural stone with a focus on quality, consistency and character."
            />

            <ValueCard
              icon={<FaMountain />}
              title="Authenticity"
              text="We believe Greek marble should retain the natural character that makes every stone unique."
            />

            <ValueCard
              icon={<FaHandshake />}
              title="Partnership"
              text="We work closely with architects, designers, contractors and clients throughout each project."
            />

            <ValueCard
              icon={<FaGlobeEurope />}
              title="Global Vision"
              text="Our goal is to introduce the beauty and potential of Greek marble to projects around the world."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-black py-28 text-white">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#C8A97E]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

          <p className="mb-4 uppercase tracking-[6px] text-stone-400">
            Our Next Chapter
          </p>

          <h2 className="mb-8 text-5xl font-bold md:text-6xl">
            Let's Build Something Timeless
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-stone-300">
            Whether you are developing a private residence,
            hospitality project or architectural space, our team
            is ready to help you discover the right marble.
          </p>

          <Link
            to="/contact"
            className="inline-block rounded-full bg-[#C8A97E] px-10 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#b08f65]"
          >
            Contact Us
          </Link>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   TIMELINE COMPONENT
========================================================= */

type TimelineItemProps = {
  year: string;
  title: string;
  text: string;
  side: "left" | "right";
};

function TimelineItem({
  year,
  title,
  text,
  side,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="relative mb-16 grid grid-cols-[40px_1fr] gap-6 md:grid-cols-2 md:gap-16"
    >

      <div
        className={`hidden md:block ${
          side === "left"
            ? "text-right"
            : "order-2"
        }`}
      >

        <span className="text-6xl font-bold text-stone-200">
          {year}
        </span>

      </div>


      <div
        className={`relative pl-0 md:pl-0 ${
          side === "left"
            ? "md:text-right"
            : "md:order-1"
        }`}
      >

        <div className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-stone-100 bg-[#C8A97E] md:left-auto md:right-[-57px]">

        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#a27d4f]">
          {year}
        </p>

        <h3 className="mb-4 text-2xl font-bold">
          {title}
        </h3>

        <p className="leading-7 text-stone-600">
          {text}
        </p>

      </div>

    </motion.div>
  );
}


/* =========================================================
   VALUE CARD
========================================================= */

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function ValueCard({
  icon,
  title,
  text,
}: ValueCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="rounded-3xl border border-stone-200 p-8"
    >

      <div className="mb-6 text-3xl text-[#C8A97E]">
        {icon}
      </div>

      <h3 className="mb-4 text-2xl font-bold">
        {title}
      </h3>

      <p className="leading-7 text-stone-600">
        {text}
      </p>

    </motion.div>
  );
}