import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { formatNaira } from "../lib/shop";

export default function Orders() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      <h1 className="font-heading text-4xl text-center">My Orders</h1>

      {isLoading && <p className="mt-12 text-center text-gray-500">Loading...</p>}
      {!isLoading && orders.length === 0 && <p className="mt-12 text-center text-gray-500">No orders yet.</p>}

      <div className="mt-12 flex flex-col gap-8">
        {orders.map((o) => (
          <div key={o.id} className="border border-gray-200 p-6">
            <div className="flex justify-between text-sm">
              <span>Order #{o.id} · {new Date(o.created_at).toLocaleDateString()}</span>
              <span className="uppercase tracking-widest text-xs">{o.status}</span>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
              {o.order_items.map((i) => (
                <p key={i.id}>{i.name} · Size {i.size} · Qty {i.quantity}</p>
              ))}
            </div>
            <p className="mt-4 text-sm">Total: {formatNaira(o.total_ngn)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}