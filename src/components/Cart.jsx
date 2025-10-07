// src/components/CartPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage on component load
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Function to update the quantity of an item
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevents quantity from going below 1

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8 min-h-screen bg-gray-100 mt-30">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-1">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-4">
              <img src={item.image_url} alt={item.title} className="w-20 h-20 object-contain" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">₦{item.price}</p>
              </div>
              
              {/* ✅ Quantity Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                  className="px-3 py-1 border rounded-full text-lg"><Minus size={16} /></button>
                <span className="text-xl font-bold">{item.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                  className="px-3 py-1 border rounded-full text-lg"><Plus size={16} /></button>
              </div>

              {/* ✅ Subtotal for each item */}
              <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>

              <button 
                onClick={() => handleRemoveItem(item.id)} 
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold">Total: ₦{totalPrice.toFixed(2)}</h3>
        <Link to="/checkout" className="px-8 py-4 bg-green-600 text-white rounded-full font-bold transition-colors hover:bg-green-700">
          Checkout
        </Link>
      </div>
    </div>
  );
}