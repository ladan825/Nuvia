import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const STORAGE_KEY = "vogmoda-cart";

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size) => {
    const key = `${product.id}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price_ngn: product.price_ngn,
          image_url: product.image_url,
          size,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const increaseQuantity = (key) =>
    setCartItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i)));

  const decreaseQuantity = (key) =>
    setCartItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0)
    );

  const removeFromCart = (key) => setCartItems((prev) => prev.filter((i) => i.key !== key));
  const clearCart = () => setCartItems([]);

  const count = cartItems.reduce((s, i) => s + i.quantity, 0);
  const total = cartItems.reduce((s, i) => s + i.price_ngn * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        isCartOpen, setIsCartOpen, cartItems, count, total,
        addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);