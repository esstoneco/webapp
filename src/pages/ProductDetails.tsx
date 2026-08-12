import { Link, useParams } from "react-router-dom";

import { products } from "../data/products";

import ProductHero from "../components/product/ProductHero";
import ProductGallery from "../components/product/ProductGallery";
import ProductDescription from "../components/product/ProductDescription";
import ProductSpecs from "../components/product/ProductSpecs";
import ProductApplications from "../components/product/ProductApplications";
import RelatedProducts from "../components/product/RelatedProducts";
import QuoteCTA from "../components/product/QuoteCTA";

export default function ProductDetails() {
  const { slug } = useParams();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">

        <div className="text-center">

          <h1 className="mb-5 text-5xl font-bold">
            Product Not Found
          </h1>

          <p className="mb-8 text-gray-600">
            The marble product you're looking for doesn't exist.
          </p>

          <Link
            to="/products"
            className="rounded-full bg-black px-8 py-4 text-white"
          >
            Back to Products
          </Link>

        </div>

      </section>
    );
  }

  return (
    <>

      <ProductHero
        name={product.name}
        category={product.category}
        image={product.image}
      />

      <ProductGallery
        images={product.gallery}
        name={product.name}
      />

      <ProductDescription
        description={product.description}
      />

      <ProductSpecs
        specifications={product.specifications}
      />

      <ProductApplications
        applications={product.applications}
      />

      <RelatedProducts
        currentProductId={product.id}
      />

      <QuoteCTA
        productName={product.name}
      />

    </>
  );
}