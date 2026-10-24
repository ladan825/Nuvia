import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PaystackPop from "@paystack/inline-js";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatNaira } from "../lib/shop";

const schema = z.object({
  fullName: z.string().min(2, "Required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(5, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
});

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link to="/" className="mt-4 inline-block text-sm uppercase tracking-widest border-b border-black pb-1">
          Continue shopping
        </Link>
      </div>
    );
  }

  const onInvalid = (errs) => {
    console.log("Form validation failed:", errs);
    setError("Please fill in all the delivery fields correctly.");
  };

  const pay = async (shipping) => {
    setError("");
    try {
      const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
      console.log("1. Paystack key loaded:", key ? key.slice(0, 8) + "..." : "MISSING");
      if (!key || !key.startsWith("pk_")) {
        return setError("Paystack public key is missing or wrong. Check VITE_PAYSTACK_PUBLIC_KEY in .env and restart the dev server.");
      }

      const { data: order, error: rpcError } = await supabase.rpc("create_order", {
        p_items: cartItems.map(({ id, size, quantity }) => ({ id, size, quantity })),
        p_shipping: shipping,
      });
      console.log("2. create_order result:", order, rpcError);
      if (rpcError) return setError("Order error: " + rpcError.message);

      const popup = new PaystackPop();
      console.log("3. Opening Paystack popup...");
      popup.newTransaction({
        key,
        email: user.email,
        amount: order.total_ngn * 100,
        currency: "NGN",
        reference: `VOG-${order.order_id}-${Date.now()}`,
        onSuccess: async (tx) => {
          console.log("4. Paystack success:", tx);
          const { data, error: fnError } = await supabase.functions.invoke("verify-payment", {
            body: { reference: tx.reference, order_id: order.order_id },
          });
          console.log("5. verify-payment result:", data, fnError);
          if (fnError || !data?.paid) {
            return setError(`Payment could not be verified. Reference: ${tx.reference}`);
          }
          clearCart();
          navigate(`/order-success/${order.order_id}`);
        },
        onCancel: () => setError("Payment cancelled. You can try again."),
        onError: (err) => {
          console.log("Paystack error:", err);
          setError("Paystack error: " + (err?.message || "could not open payment window"));
        },
      });
    } catch (e) {
      console.error("Checkout crashed:", e);
      setError("Something went wrong: " + e.message);
    }
  };

  const input = "w-full border-b border-gray-300 focus:border-black outline-none py-3 text-sm bg-transparent";
  const field = (name, placeholder) => (
    <div>
      <input {...register(name)} placeholder={placeholder} className={input} />
      {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 md:grid-cols-2 gap-16">
      <form onSubmit={handleSubmit(pay, onInvalid)} className="flex flex-col gap-6">
        <h1 className="font-heading text-3xl">Delivery Details</h1>
        {field("fullName", "Full name")}
        {field("phone", "Phone number")}
        {field("address", "Street address")}
        {field("city", "City")}
        {field("state", "State")}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white uppercase text-sm tracking-widest py-4 hover:opacity-80 transition disabled:opacity-50"
        >
          {isSubmitting ? "Please wait..." : `Pay ${formatNaira(total)}`}
        </button>
      </form>

      <div>
        <h2 className="font-heading text-2xl mb-6">Order Summary</h2>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.key} className="flex gap-4 text-sm">
              <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-gray-500">Size {item.size} · Qty {item.quantity}</p>
              </div>
              <p>{formatNaira(item.price_ngn * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200 text-sm">
          <span>Total</span>
          <span>{formatNaira(total)}</span>
        </div>
      </div>
    </div>
  );
}