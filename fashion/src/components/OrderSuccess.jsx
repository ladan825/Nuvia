import { Link, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div className="max-w-xl mx-auto px-6 pt-36 pb-20 text-center">
      <h1 className="font-heading text-4xl">Thank you</h1>
      <p className="mt-4 text-gray-600">Your payment was successful. Order #{id} is confirmed.</p>
      <Link to="/orders" className="mt-8 inline-block text-sm uppercase tracking-widest border-b border-black pb-1">
        View my orders
      </Link>
    </div>
  );
}