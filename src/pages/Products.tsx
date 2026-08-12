import { useMemo, useState } from "react";
import FadeIn from "../components/common/FadeIn";

import MarbleCard from "../components/common/MarbleCard";
import ProductFilter from "../components/products/ProductFilter";

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