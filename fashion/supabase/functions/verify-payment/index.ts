import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { reference, order_id } = await req.json();
    const url = Deno.env.get("SUPABASE_URL")!;

    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return reply({ error: "Unauthorized" }, 401);

    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: order } = await admin
      .from("orders").select("*").eq("id", order_id).eq("user_id", user.id).single();
    if (!order) return reply({ error: "Order not found" }, 404);
    if (order.status === "paid") return reply({ paid: true });
    if (!String(reference).startsWith(`VOG-${order_id}-`)) return reply({ paid: false }, 400);

    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${Deno.env.get("PAYSTACK_SECRET_KEY")}` } }
    );
    const result = await res.json();
    const tx = result.data;
    const paid =
      result.status === true &&
      tx?.status === "success" &&
      tx.currency === "NGN" &&
      tx.amount === order.total_ngn * 100;

    if (paid) {
      await admin.from("orders")
        .update({ status: "paid", paystack_reference: reference }).eq("id", order_id);
    }
    return reply({ paid });
  } catch (e) {
    return reply({ error: String(e) }, 500);
  }
});