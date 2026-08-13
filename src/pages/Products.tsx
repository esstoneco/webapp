import { useMemo, useState } from "react";
import FadeIn from "../components/common/FadeIn";

import MarbleCard from "../components/common/MarbleCard";
import ProductFilter from "../components/products/ProductFilter";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const categories = [
  "All",
  "Nestos Extra White",
  "Nestos White",
  "White With Veins",
  "Pink Veins",
  "Other",
];
export default function Products() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((product) => product.category === active);

  const featuredProduct =
  products.find(
    (product) => product.featured
  );    

  
      const [activeCategory, setActiveCategory] =
  useState("All");

const [searchTerm, setSearchTerm] =
  useState("");

const [sortBy, setSortBy] =
  useState("name");

  const filteredProducts = useMemo(() => {
  let results = [...products];

  if (activeCategory !== "All") {
    results = results.filter(
      (product) =>
        product.category === activeCategory
    );
  }

  if (searchTerm) {
    results = results.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "name") {
    results.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return results;
}, [
  activeCategory,
  searchTerm,
  sortBy,
]);
  return (
   
    <section className="mx-auto max-w-7xl px-8 py-32">

 <div className="mb-8">

  <input
    type="text"
    placeholder="Search marble..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full rounded-xl border border-stone-200 px-5 py-4 outline-none focus:border-[#C8A97E]"
  />

</div>
      {featuredProduct && (
  <section className="mb-20">
    <div className="overflow-hidden rounded-3xl bg-stone-100">
      <div className="grid lg:grid-cols-2">

        {/* IMAGE */}

        <div className="relative min-h-[400px] overflow-hidden">
          <img
            src={featuredProduct.image}
            alt={featuredProduct.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>


        {/* CONTENT */}

        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">

          <p className="mb-4 uppercase tracking-[5px] text-stone-500">
            Featured Marble
          </p>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            {featuredProduct.name}
          </h2>

          <p className="mb-8 max-w-xl text-lg leading-8 text-stone-600">
            {featuredProduct.shortDescription}
          </p>

          <div>
            <Link
              to={`/products/${featuredProduct.slug}`}
              className="inline-flex items-center rounded-full bg-black px-8 py-4 font-semibold text-white transition duration-300 hover:bg-[#C8A97E] hover:text-black"
            >
              Explore Marble
              <span className="ml-3">
                →
              </span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  </section>
)}
<div className="mb-10 flex flex-wrap gap-3">

  {categories.map((category) => (

    <button
      key={category}
      onClick={() =>
        setActiveCategory(category)
      }
      className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
        activeCategory === category
          ? "bg-black text-white"
          : "border border-stone-200 bg-white"
      }`}
    >
      {category}
    </button>

  ))}

</div>
<div className="mb-10 flex justify-end">

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className="rounded-xl border border-stone-200 px-4 py-3"
  >

    <option value="name">
      Name
    </option>

  </select>

</div>
      <h1 className="mb-10 text-center text-6xl font-bold">
        Marble Collection
      </h1>

      <ProductFilter
        active={active}
        setActive={setActive}
      />
<FadeIn>
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

        {filteredProducts.map((product) => (
          <MarbleCard
            key={product.id}
            name={product.name}
            image={product.image}
            category={product.category}
            description={product.description} slug={""}          />
        ))}

      </div>
</FadeIn>
{filteredProducts.length === 0 && (

  <div className="py-20 text-center">

    <h3 className="mb-3 text-2xl font-bold">
      No Products Found
    </h3>

    <p className="text-stone-500">
      Try a different search term.
    </p>

  </div>

)}
    </section>
  );
}
