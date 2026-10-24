import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "../lib/shop";

export default function Shop() {
  const { audience, category } = useParams();
  const { data: products = [], isLoading, isError } = useProducts({ audience, category });

  const tab = (active) =>
    `text-sm uppercase tracking-widest pb-1 border-b ${
      active ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
      <h1 className="font-heading text-4xl text-center capitalize">{audience}</h1>

      <div className="mt-8 flex justify-center gap-8">
        <Link to={`/shop/${audience}`} className={tab(!category)}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} to={`/shop/${audience}/${c.slug}`} className={tab(category === c.slug)}>
            {c.label}
          </Link>
        ))}
      </div>

      {isLoading && <p className="mt-16 text-center text-gray-500">Loading...</p>}
      {isError && <p className="mt-16 text-center text-gray-500">Something went wrong loading products.</p>}
      {!isLoading && !isError && products.length === 0 && (
        <p className="mt-16 text-center text-gray-500">Nothing here yet.</p>
      )}

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}