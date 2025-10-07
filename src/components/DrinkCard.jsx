import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function DrinkCard({ drink }) {
  const bgColor = drink.color_hex || '#e5e7eb'; // Default gray if color is not set

  return (
    <div 
      className="rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
      style={{ backgroundColor: bgColor }}
    >
      <Link to={`/drinks/${drink.id}`}>
        <img
          src={drink.image_url}
          alt={drink.title}
          className="w-48 h-64 object-contain mb-4"
        />
        <h3 className="text-xl font-bold mb-2 text-white">{drink.title}</h3>
      </Link>
      <p className="text-lg font-semibold mb-4 text-white">₦{drink.price}</p>
      
      {/* You can add a button to go to the detail page or add to cart directly */}
      <Link 
        to={`/product/${drink.id}`} 
        className="mt-auto px-6 py-2 bg-white text-black font-semibold rounded-full flex items-center gap-2 transition hover:bg-gray-200"
      >
        <ShoppingCart size={20} /> View Drink
      </Link>
    </div>
  );
}