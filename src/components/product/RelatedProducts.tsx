import { Link } from "react-router-dom";

import { products } from "../../data/products";

import MarbleCard from "../common/MarbleCard";

type Props = {
  currentProductId: number;
};

export default function RelatedProducts({
  currentProductId,
}: Props) {
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3);

  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="mb-3 uppercase tracking-[6px] text-stone-500">
              Explore More
            </p>

            <h2 className="text-5xl font-bold">
              Related Marble
            </h2>

          </div>

          <Link
            to="/products"
            className="font-semibold text-[#a27d4f] hover:underline"
          >
            View All Products →
          </Link>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {relatedProducts.map((product) => (

            <MarbleCard
              key={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              description={product.description}
              slug={product.slug}
            />

          ))}

        </div>

      </div>

    </section>
  );
}