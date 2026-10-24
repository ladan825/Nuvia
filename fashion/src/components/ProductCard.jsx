import { Link } from "react-router-dom";
import { formatNaira } from "../lib/shop";

export default function ProductCard({ id, name, price_ngn, image_url }) {
  return (
    <Link to={`/product/${id}`} className="flex flex-col group">
      <div className="w-full h-96 overflow-hidden bg-gray-100">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{formatNaira(price_ngn)}</p>
    </Link>
  );
}