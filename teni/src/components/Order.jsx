import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Order() {
  const [fullName, setFullName] = useState('');
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
    if (!fullName || !phone) {
      alert('Please enter your name and phone number');
      return;
    }

    const { error } = await supabase
      .from('Donkwa orders')
      .insert([
        {
          full_name: fullName,
          phone,
          packs,
          delivery_location: deliveryLocation,
          delivery_fee: deliveryFee,
          total_price: totalPrice,
        },
      ]);

    if (error) {
      console.error(error);
      alert('Error placing order: ' + error.message);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);

    setFullName('');
    setPhone('');
    setPacks(1);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 bg-yellow-100">

      {/* LEFT: Product Image */}
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img
          src="/donkwaa.png"
          alt="Donkwa Pack"
          className="w-full max-w-md object-contain rounded-lg"
        />
      </div>

      {/* RIGHT: Order Form */}
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
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-3 border rounded-md"
        />

        <label className="block mb-2 font-semibold">Number of Packs</label>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setPacks(p => Math.max(1, p - 1))}
            className="px-4 py-2 border rounded-full"
          >
            -
          </button>
          <span className="text-xl font-bold">{packs}</span>
          <button
            onClick={() => setPacks(p => p + 1)}
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
          <option>Within Abuja</option>
          <option>InterState</option>
        </select>

        <p className="text-lg font-semibold mb-4">
          Delivery Fee: ₦{deliveryFee}
        </p>
        <p className="text-xl font-bold mb-6">
          Total: ₦{totalPrice}
        </p>

        <button
          onClick={handleOrderSubmit}
          className={`w-full py-4 rounded-full text-lg font-bold transition-colors ${
            isSuccess ? 'bg-green-500' : 'bg-black text-white'
          }`}
        >
          {isSuccess ? 'Order Placed ✅' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
