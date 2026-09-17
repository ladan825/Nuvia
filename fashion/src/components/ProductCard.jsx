import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="flex flex-col group">
      <div className="w-full h-80 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{price}</p>
    </Link>
  );
};

export default ProductCard;