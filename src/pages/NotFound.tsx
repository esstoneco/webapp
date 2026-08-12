import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">

      <h1 className="mb-4 text-8xl font-bold">
        404
      </h1>

      <p className="mb-8 text-xl text-gray-600">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="rounded-full bg-black px-8 py-4 text-white"
      >
        Return Home
      </Link>

    </section>
  );
}