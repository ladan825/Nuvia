import ProductCard from "./ProductCard";
import products from "../data/products";

const Women = () => {

  const womenProducts = products.filter((p) => p.category === "women");
    return ( 
         <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl tracking-wide text-center text-gray-900">
        Women Collection
        </h2>
        <p className="mt-4 text-sm tracking-wide text-gray-500 text-center sm:text-base">
          Statement for Women wears
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
  {womenProducts.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
    />
  ))}
</div>

      </div>
    </section>
     );
}
 
export default Women;