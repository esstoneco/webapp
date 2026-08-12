import { Link } from "react-router-dom";

type Props = {
  title: string;
};

export default function ProjectCTA({
  title,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">

      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#C8A97E]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

        <p className="mb-4 uppercase tracking-[6px] text-stone-400">
          Start Your Project
        </p>

        <h2 className="mb-8 text-5xl font-bold md:text-6xl">
          Let's Create Something Timeless
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-stone-300">
          Inspired by the possibilities of natural stone?
          Contact our team to discuss your project.
        </p>

        <Link
          to="/contact"
          className="inline-block rounded-full bg-[#C8A97E] px-10 py-4 font-semibold transition hover:scale-105 hover:bg-[#b08f65]"
        >
          Discuss Your Project
        </Link>

      </div>

    </section>
  );
}