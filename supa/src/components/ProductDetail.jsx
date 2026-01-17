// src/components/ProductDetail.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

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
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === drink.id);

    if (existingItemIndex > -1) {
      // If it exists, just update the quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If new, add it to the list
      const newCartItem = {
        id: drink.id,
        title: drink.title,
        image_url: drink.image_url,
        price: drink.price,
        quantity: quantity,
      };
      cartItems.push(newCartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    // ✅ TRIGGER NAV UPDATE
    window.dispatchEvent(new Event('cartUpdated'));

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error.message}</p>;

  return (
    <div 
      className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 transition-colors duration-500"
      style={{ backgroundColor: drink?.color_hex || '#f3f4f6' }}
    >
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img src={drink.image_url} alt={drink.title} className="w-full max-w-lg object-contain pt-5" />
      </div>

      <div className="w-full md:w-1/2 p-4 text-white">
        <h2 className="text-4xl font-extrabold mb-2">{drink.title}</h2>
        <p className="text-2xl font-semibold mb-4">
          ₦{drink.price ? drink.price.toLocaleString() : 'Price unavailable'}
        </p>
        <p className="mb-6 max-w-md opacity-90">{drink.method}</p>

        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))} 
            className="w-10 h-10 flex items-center justify-center border-2 rounded-full text-xl hover:bg-white hover:text-black transition"
          >-</button>
          <span className="text-2xl font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)} 
            className="w-10 h-10 flex items-center justify-center border-2 rounded-full text-xl hover:bg-white hover:text-black transition"
          >+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full md:w-auto px-12 py-4 rounded-full text-lg font-bold shadow-lg transform active:scale-95 transition-all ${
            isAddedToCart ? 'bg-green-500' : 'bg-black hover:bg-gray-900'
          }`}
        >
          {isAddedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}