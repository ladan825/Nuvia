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

  const nextSlide = () => setIndex((prev) => (prev + 1) % drinks.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + drinks.length) % drinks.length);

  if (drinks.length === 0) return <p>No drinks yet...</p>;

  const drink = drinks[index];
  const currentBgColor = drink.color_hex;

  const variants = {
    enter: { x: "100%" },
    center: { x: 0 },
    exit: { x: "-100%" },
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
          {/* ✅ Responsive layout without changing design */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-center text-white max-w-5xl w-full px-4">
            <img
              src={drink.image_url}
              alt={drink.title}
              className="w-64 sm:w-80 md:w-[28rem] h-auto object-cover"
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left pb-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">{drink.title}</h2>
              <p className="mb-6 max-w-md text-sm sm:text-base">{drink.method}</p>
              <Link
                to={`/product/${drink.id}`}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold rounded-full flex items-center gap-2 transition hover:bg-white hover:text-black hover:scale-105"
              >
                <ShoppingCart size={22} /> Buy Now
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows – same design but mobile-safe */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 text-3xl z-20 text-white hover:scale-110 transition"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 text-3xl z-20 text-white hover:scale-110 transition"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
