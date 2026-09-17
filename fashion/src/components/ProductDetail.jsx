import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm uppercase tracking-widest border-b border-black pb-1">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="w-full h-[100vh] bg-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover  object-position-center" />
      </div>

      <div className="flex flex-col">
        <h1 className="font-heading text-3xl">{product.name}</h1>
        <p className="mt-2 text-gray-500">{product.price}</p>
        <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="mt-10 uppercase text-sm tracking-widest bg-black text-white py-4 hover:opacity-80 transition"
        >
          {justAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;