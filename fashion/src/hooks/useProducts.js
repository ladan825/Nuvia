import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useProducts({ audience, category, limit } = {}) {
  return useQuery({
    queryKey: ["products", audience, category, limit],
    queryFn: async () => {
      let q = supabase.from("products").select("*").eq("in_stock", true).order("id");
      if (audience) q = q.eq("audience", audience);
      if (category) q = q.eq("category", category);
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });
}