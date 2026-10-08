import { useText } from "../../i18n/useText";
import { motion } from "framer-motion";
import hero from "../../assets/images/hero.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  const tr = useText();

  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}

      <img
        src={hero}
        alt={tr("Marble")}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="text-center text-white">

          <motion.h1
            initial={{ opacity:0,y:60 }}
            animate={{ opacity:1,y:0 }}
            transition={{ duration:1 }}
            className="mb-6 text-6xl font-bold lg:text-8xl"
          >
            {tr("ES STONE IKE")}</motion.h1>

          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:.4 }}
            className="mb-10 text-2xl"
          >
            <div className="max-w-4xl text-center">

<p className="mb-6 tracking-[8px] uppercase text-stone-300">

{tr("Premium Greek Marble")}</p>

<h1 className="mb-8 text-6xl font-bold lg:text-8xl">

{tr("Natural Beauty")}<span className="block text-stone-300">

{tr("Timeless Elegance")}</span>

</h1>

<p className="mx-auto mb-12 max-w-2xl text-xl leading-9 text-gray-200">

{tr("From the Nestos quarry to prestigious architectural projects around the world.")}</p>

</div>
          </motion.p>

          <motion.a
            href="/products"
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.95 }}
            className="rounded-full bg-white px-8 py-4 font-semibold text-black"
          >
           <Link to="/products"> {tr("Explore Collection")}</Link>
          </motion.a>

        </div>

      </div>

    </section>
  );
}