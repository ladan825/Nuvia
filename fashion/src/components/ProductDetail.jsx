import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { formatNaira } from "../lib/shop";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [needSize, setNeedSize] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (isLoading) return <p className="pt-32 text-center text-gray-500">Loading...</p>;

  if (isError || !product) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm uppercase tracking-widest border-b border-black pb-1">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!size) return setNeedSize(true);
    addToCart(product, size);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="w-full h-[80vh] bg-gray-100">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover object-top" />
      </div>

      <div className="flex flex-col">
        <h1 className="font-heading text-3xl">{product.name}</h1>
        <p className="mt-2 text-gray-500">{formatNaira(product.price_ngn)}</p>
        <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

        <p className="mt-8 mb-3 text-sm uppercase tracking-widest">Size</p>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setNeedSize(false); }}
              className={`min-w-12 h-12 px-3 border text-sm transition ${
                size === s ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {needSize && <p className="mt-2 text-sm text-red-600">Please select a size.</p>}

        <button
          onClick={handleAdd}
          className="mt-10 uppercase text-sm tracking-widest bg-black text-white py-4 hover:opacity-80 transition"
        >
          {justAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}