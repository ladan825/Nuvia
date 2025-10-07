// ✅ Install first if not done:
// npm install react-paystack

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paystackConfig = {
    reference: `NUIVA_${new Date().getTime()}`, // ✅ Unique
    email: formData.email,
    amount: total * 100, // ✅ Convert Naira to Kobo
    publicKey: "pk_test_ac53eace9d0ca99774c7f391e962fd5a28a751ce",
  };

  // ✅ Redirect to Success Page instead of saving to Supabase
  const handlePaystackSuccess = (reference) => {
    setIsProcessing(true);

    // ✅ Save order data temporarily
    const pendingOrder = {
      customer_name: formData.fullName,
      customer_email: formData.email,
      total_amount: total,
      items: cartItems,
    };

    localStorage.setItem("pendingOrderData", JSON.stringify(pendingOrder));

    // ✅ Redirect to success page with reference
    navigate(`/success?ref=${reference.reference}`);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen mt-30">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>₦{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4 font-bold text-xl">
            Total: ₦{total.toFixed(2)}
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Shipping Info</h2>
          <input
            className="w-full border p-3 rounded mb-4"
            name="fullName"
            placeholder="Full Name"
            onChange={handleInputChange}
            required
          />
          <input
            className="w-full border p-3 rounded mb-4"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            required
          />
          <input
            className="w-full border p-3 rounded mb-4"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
            required
          />
          <div className="flex gap-4">
            <input
              className="w-1/2 border p-3 rounded"
              name="city"
              placeholder="City"
              onChange={handleInputChange}
              required
            />
            <input
              className="w-1/2 border p-3 rounded"
              name="zip"
              placeholder="Zip Code"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* ✅ Paystack Button */}
          <PaystackButton
            {...paystackConfig}
            text={isProcessing ? "Processing..." : "Pay Now"}
            onSuccess={handlePaystackSuccess}
            className="w-full mt-6 px-6 py-4 bg-black text-white rounded-full font-bold"
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
