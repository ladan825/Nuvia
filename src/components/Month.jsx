import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Month() {
  const { data: featuredDrink, isLoading, error } = useQuery({
    queryKey: ["featuredDrink"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Drinks")
        .select("*")
        .eq("is_featured", true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }
      return data;
    },
  });

  if (isLoading) return <p>Loading drink of the month...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!featuredDrink) return <p>No featured drink available.</p>;

  const colorHex = featuredDrink.color_hex;

  return (
    <section
      className="py-20 px-6 text-white flex flex-col md:flex-row items-center justify-center gap-10 height-60vh"
      style={{ backgroundColor: colorHex }}
    >
      {/* Image */}
      <motion.img
        src={featuredDrink.image_url}
        alt={featuredDrink.title}
        className="w-64 h-80 object-cover"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Text Content */}
      <div className="max-w-lg text-center md:text-left">
        <h2 className="text-4xl font-bold mb-4">{featuredDrink.title}</h2>
        <p className="mb-6">{featuredDrink.description}</p>
        <Link 
          to={`/product/${featuredDrink.id}`} 
          className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2 mx-auto md:mx-0 hover:bg-white hover:text-black transition"
        >
          <ShoppingCart size={20} /> Order Now
        </Link>
      </div>
    </section>
  );
}