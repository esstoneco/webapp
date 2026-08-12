import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  name: string;
  category: string;
  image: string;
};

export default function ProductHero({
  name,
  category,
  image,
}: Props) {
  return (
    <section className="relative min-h-[75vh] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-end px-6 pb-20 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-white"
        >

          <p className="mb-4 uppercase tracking-[6px] text-stone-300">
            {category}
          </p>

          <h1 className="mb-8 text-6xl font-bold md:text-7xl lg:text-8xl">
            {name}
          </h1>

          <Link
            to="/contact"
            className="inline-block rounded-full bg-[#C8A97E] px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#b08f65]"
          >
            Request a Quote
          </Link>

        </motion.div>

      </div>
    </section>
  );
}