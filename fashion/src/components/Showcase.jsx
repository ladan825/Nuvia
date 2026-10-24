import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const Showcase = () => {
  const { data: products = [] } = useProducts({ limit: 4 });

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="h-[400px] relative overflow-hidden group"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition duration-500"
          />
        </Link>
      ))}
    </div>
  );
};

export default Showcase;