import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

const Land = () => {
  const { data: drinks, isLoading, error } = useQuery({
    queryKey: ["landDrinks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Drinks")
        .select("*")
        .limit(4);

      if (error) throw new Error(error.message);
      return data;
    },
  });

  const drinkContent = isLoading ? (
    <p className="text-white text-lg mt-10">Loading drinks...</p>
  ) : (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-16 z-10 px-4">
      {drinks?.map((drink, index) => (
        <motion.img
          key={drink.id}
          src={drink.image_url}
          alt={drink.title}
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        />
      ))}
    </div>
  );

  return (
    <div className="landing relative w-full min-h-[90vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden px-2 sm:px-4">
      {/* Animated heading */}
      <motion.h1
        className="text-4xl sm:text-6xl md:text-8xl font-bold text-center absolute z-0 text-white"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: -120, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
      >
        Drink Differently
      </motion.h1>

      {/* Drink Images or Loading */}
      {drinkContent}

      {/* Wave background */}
      <svg
        className="wave absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,128C672,160,768,224,864,224C960,224,1056,160,1152,122.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Land;
