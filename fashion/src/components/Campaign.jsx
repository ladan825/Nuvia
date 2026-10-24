import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Campaign() {
  const women = useProducts({ audience: "women", category: "native", limit: 2 });
  const men = useProducts({ audience: "men", category: "native", limit: 2 });
  const featured = [...(women.data ?? []), ...(men.data ?? [])];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl tracking-wide text-center text-gray-900">
          Fall/Winter 2026
        </h2>
        <p className="mt-4 text-sm tracking-wide text-gray-500 text-center sm:text-base">
          The season's latest arrivals.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        <p className="mt-16 max-w-2xl mx-auto text-center text-gray-600 leading-relaxed">
          This season draws on quiet luxury and considered tailoring — pieces
          built to move seamlessly from day to evening, made to be worn for
          years, not seasons.
        </p>
      </div>
    </section>
  );
}