import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Slider() {
  const { data: drinks = [] } = useQuery({
    queryKey: ["Drinks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Drinks").select("*");
      if (error) throw error;
      return data;
    },
  });

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % drinks.length);
  };
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + drinks.length) % drinks.length);
  };

  if (drinks.length === 0) return <p>No drinks yet...</p>;

  const drink = drinks[index];

  // Now you get the color directly from your Supabase data
  const currentBgColor = drink.color_hex;

  const variants = {
    enter: {
      x: "100%",
    },
    center: {
      x: 0,
    },
    exit: {
      x: "-100%",
    },
  };

  return (
    <div className="h-[80vh] flex items-center justify-center relative overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={drink.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{ backgroundColor: currentBgColor }}
        >
          {/* Main content container with Flexbox for layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 text-center text-white max-w-4xl mx-auto">
            <img
              src={drink.image_url}
              alt={drink.title}
              className="w-100 h-130 object-cover"
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-6xl font-extrabold mb-4">{drink.title}</h2>
              <p className="mb-6 max-w-md">{drink.method}</p>
              <Link to={`/product/${drink.id}`} className="px-8 py-4 bg-black text-white font-semibold rounded-full flex items-center gap-2 transition hover:bg-white hover:text-black hover:scale-105">
                <ShoppingCart size={24} /> Buy Now
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-5 text-3xl z-20 text-white hover:scale-110 transition"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 text-3xl z-20 text-white hover:scale-110 transition"
      >
        <ArrowRight />
      </button>
    </div>
  );
}