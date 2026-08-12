import { Link } from "react-router-dom";

type Props = {
  name: string;
  image: string;
  category: string;
  description: string;
  slug: string;
};

export default function MarbleCard({
  name,
  image,
  category,
  description,
  slug,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm transition duration-500 hover:-translate-y-3 hover:shadow-2xl">

      <div className="overflow-hidden">

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
        />

      </div>

      <div className="p-8">

        <span className="inline-block rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600">
          {category}
        </span>

        <h2 className="mt-5 text-4xl font-semibold">
          {name}
        </h2>

        <hr className="my-5 border-stone-200" />

        <p className="leading-7 text-gray-600">
          {description}
        </p>

        <Link
          to={`/products/${slug}`}
          className="mt-7 inline-block rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:bg-stone-800"
        >
          Explore Marble
        </Link>

      </div>

    </div>
  );
}