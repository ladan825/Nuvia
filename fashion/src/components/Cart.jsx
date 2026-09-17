import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, increaseQuantity, decreaseQuantity, total } = useCart();

  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed z-[60] top-0 right-0 h-full w-full max-w-sm bg-white transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-heading text-xl">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-black"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-black"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="self-start text-gray-400 hover:text-black">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between mb-4 text-sm">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white uppercase text-sm tracking-widest py-4 hover:opacity-80 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;