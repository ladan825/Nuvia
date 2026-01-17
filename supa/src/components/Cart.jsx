// src/components/CartPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react'; // Added Trash2 for a better look

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage on component load
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  // Helper function to update storage and notify the Navbar
  const syncCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // ✅ This triggers the badge update in Nav.jsx
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    syncCart(updatedCart);
  };
  
  // Function to update the quantity of an item
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevents quantity from going below 1

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    syncCart(updatedCart);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-100 mt-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Your Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
            <Link to="/shop" className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                {/* Item Image */}
                <img src={item.image_url} alt={item.title} className="w-24 h-24 object-contain" />
                
                {/* Item Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500">₦{item.price?.toLocaleString()}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full border">
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                    className="p-1 hover:bg-gray-200 rounded-full transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                    className="p-1 hover:bg-gray-200 rounded-full transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[100px]">
                  <p className="font-bold text-lg text-gray-900">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => handleRemoveItem(item.id)} 
                  className="text-red-400 hover:text-red-600 p-2 transition"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {/* Total Section */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md gap-4">
              <div>
                <p className="text-gray-500 text-sm">Grand Total</p>
                <h3 className="text-3xl font-bold text-gray-900">₦{totalPrice.toLocaleString()}</h3>
              </div>
              <Link 
                to="/checkout" 
                className="w-full sm:w-auto px-10 py-4 bg-green-600 text-white rounded-full font-bold text-center transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}