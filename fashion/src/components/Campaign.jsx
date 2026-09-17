import ProductCard from "./ProductCard";
import products from "../data/products";

const Campaign = () => {
  const womenPicks = products.filter((p) => p.category === "women").slice(0, 2);
  const menPicks = products.filter((p) => p.category === "men").slice(0, 2);
  const featured = [...womenPicks, ...menPicks];

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
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>

        <p className="font-sans mt-16 max-w-2xl mx-auto text-center text-gray-600 leading-relaxed">
          This season draws on quiet luxury and considered tailoring — pieces
          built to move seamlessly from day to evening, made to be worn for
          years, not seasons.
        </p>
      </div>
    </section>
  );
};

export default Campaign;