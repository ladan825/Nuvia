import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

// This is now a ProductDetail page
export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { data: drink, isLoading, error } = useQuery({
    queryKey: ['drink', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Drinks')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const newCartItem = {
      id: drink.id,
      title: drink.title,
      image_url: drink.image_url,
      price: drink.price,
      quantity: quantity,
    };
    cartItems.push(newCartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8"
      // ✅ This is the correct way to get the background color from the database
      style={{ backgroundColor: drink?.color_hex || 'transparent' }}>
      
      {/* LEFT: Drink Image */}
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img src={drink.image_url} alt={drink.title} className="w-full max-w-lg object-contain" />
      </div>

      {/* RIGHT: Product Details and Buying Options */}
      <div className="w-full md:w-1/2 p-4 text-white">
        <h2 className="text-4xl font-extrabold mb-2">{drink.title}</h2>
        <p className="text-2xl font-semibold mb-4">
    ${drink.price ? drink.price.toFixed(2) : 'Price unavailable'}</p>
        <p className="mb-6 max-w-md">{drink.method}</p>

        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 border rounded-full text-lg">-</button>
          <span className="text-2xl font-bold">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 border rounded-full text-lg">+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full md:w-auto px-8 py-4 rounded-full text-lg font-bold transition-colors ${
            isAddedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}