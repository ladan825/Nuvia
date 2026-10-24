import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";

const Collections = () => {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="w-full py-20 px-4 flex flex-col items-center">
      <h1 className="font-heading text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
        Collections
      </h1>
      <p className="font-sans mt-4 text-lg text-gray-500 text-center">
        Explore our curated showcase of fashion items.
      </p>

      {isLoading && <p className="mt-16 text-gray-500">Loading...</p>}

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl w-full">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Collections;