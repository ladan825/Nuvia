import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PaystackButton } from 'react-paystack';

export default function Order() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [packs, setPacks] = useState(1);
  const [deliveryLocation, setDeliveryLocation] = useState('Inside Abuja');
  const [isSuccess, setIsSuccess] = useState(false);

  const PRICE_PER_PACK = 1000;
  const DELIVERY_FEE_INSIDE = 1000;
  const DELIVERY_FEE_OUTSIDE = 2000;

  const deliveryFee =
    deliveryLocation === 'Inside Abuja'
      ? DELIVERY_FEE_INSIDE
      : DELIVERY_FEE_OUTSIDE;

  const totalPrice = packs * PRICE_PER_PACK + deliveryFee;

  const handleOrderSubmit = async () => {
    const { error } = await supabase
      .from('donkwa_orders')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          packs,
          delivery_location: deliveryLocation,
          delivery_fee: deliveryFee,
          total_price: totalPrice,
        },
      ]);

    if (error) {
      console.error(error);
      alert('Error saving order: ' + error.message);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);

    setFullName('');
    setEmail('');
    setPhone('');
    setPacks(1);
    setDeliveryLocation('Inside Abuja');
  };

  const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: totalPrice * 100, // Paystack uses kobo
    publicKey: PUBLIC_KEY,
    metadata: {
      fullName,
      email,
      phone,
      packs,
      deliveryLocation,
    },
  };

  const handlePaymentInitiation = () => {
    if (!fullName || !phone || !email) {
      alert('Please fill in Full Name, Email & Phone Number');
      return false;
    }
    return true;
  };

  const onSuccess = () => {
    handleOrderSubmit();
    alert('Payment successful! ✅ Order has been placed.');
  };

  const onClose = () => {
    alert('Payment was closed ❌ Order not completed.');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 bg-yellow-100">
      {/* LEFT - Product Image */}
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img
          src="/donkwaa.png"
          alt="Donkwa Pack"
          className="w-full max-w-md object-contain rounded-lg"
        />
      </div>

      {/* RIGHT - Order Form */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Order Donkwa</h2>
        <p className="text-xl mb-2 font-semibold">₦1,000 / Pack (10 pieces)</p>
        <p className="text-gray-600 mb-6">
          Soft, sweet, and crunchy Nigerian Donkwa – delivered fresh!
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-3 p-3 border rounded-md"
        />

        <input
          type="email"
          placeholder="Email Address (For Receipt)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 border rounded-md"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-3 border rounded-md"
        />

        <label className="block mb-2 font-semibold">Number of Packs</label>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setPacks((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border rounded-full"
          >
            -
          </button>
          <span className="text-xl font-bold">{packs}</span>
          <button
            onClick={() => setPacks((p) => p + 1)}
            className="px-4 py-2 border rounded-full"
          >
            +
          </button>
        </div>

        <label className="block mb-2 font-semibold">Delivery</label>
        <select
          className="w-full p-3 mb-4 border rounded-md"
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
        >
          <option>Inside Abuja</option>
          <option>InterState</option>
        </select>

        <p className="text-lg font-semibold mb-2">
          Delivery Fee: ₦{deliveryFee.toLocaleString()}
        </p>
        <p className="text-xl font-bold mb-6">
          Total: ₦{totalPrice.toLocaleString()}
        </p>

        <PaystackButton
          className={`w-full py-4 rounded-full text-lg font-bold transition-colors ${
            isSuccess ? 'bg-green-500' : 'bg-black text-white'
          }`}
          text={`Pay Now ₦${totalPrice.toLocaleString()}`}
          {...config}
          onSuccess={onSuccess}
          onClose={onClose}
          onClick={handlePaymentInitiation}
        />
      </div>
    </div>
  );
}
