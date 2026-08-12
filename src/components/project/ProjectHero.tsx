import { motion } from "framer-motion";

type Props = {
  title: string;
  category: string;
  location: string;
  image: string;
};

export default function ProjectHero({
  title,
  category,
  location,
  image,
}: Props) {
  return (
    <section className="relative min-h-[75vh] overflow-hidden">

      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-end px-6 pb-20 lg:px-10">

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
          className="max-w-5xl text-white"
        >

          <p className="mb-4 uppercase tracking-[6px] text-stone-300">
            {category}
          </p>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl lg:text-8xl">
            {title}
          </h1>

          <div className="flex items-center gap-3 text-lg text-stone-200">

            <span>📍</span>

            <span>{location}</span>

          </div>

        </motion.div>

      </div>

    </section>
  );
}