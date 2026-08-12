import { motion } from "framer-motion";

type Props = {
  description: string;
};

export default function ProjectDescription({
  description,
}: Props) {
  return (
    <section className="bg-stone-100 py-28">

      <div className="mx-auto max-w-4xl px-6 text-center">

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
            duration: 0.7,
          }}
        >

          <p className="mb-4 uppercase tracking-[6px] text-stone-500">
            The Project
          </p>

          <h2 className="mb-8 text-5xl font-bold">
            Architecture & Marble
          </h2>

          <p className="text-lg leading-9 text-gray-600">
            {description}
          </p>

        </motion.div>

      </div>

    </section>
  );
}