import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from '../lib/supabaseClient';

const Land = () => {
    const { data: drinks, isLoading, error } = useQuery({
        queryKey: ['landDrinks'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('Drinks')
                .select('*')
                .limit(4);

            if (error) throw new Error(error.message);
            return data;
        },
    });

    // We'll show a loading message if the drinks are being fetched
    const drinkContent = (isLoading) ? (
        <p className="text-white text-lg">Loading drinks...</p>
    ) : (
        <div className="flex flex-row -space-x-79 justify-center items-center mt-20 z-10">
    {drinks?.map((drink, index) => (
        <motion.img 
            key={drink.id}
            src={drink.image_url}
            alt={drink.title}
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-[32rem] md:h-[32rem] object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        />
    ))}
</div>
    );

    return ( 
        <div className="landing relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pb-30">
            
            {/* The animated text that is always present */}
            <motion.h1 
                className="text-6xl md:text-8xl font-bold absolute z-0 text-white"
                initial={{ y: 150, opacity: 0 }}
                animate={{ y: -220, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }} 
            >
                Drink Differently
            </motion.h1>
            
            {/* The dynamically fetched drinks or the loading state */}
            {drinkContent}

            {/* The static wave background */}
            <svg className="wave absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fff" fillOpacity="1" 
                    d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,128C672,160,768,224,864,224C960,224,1056,160,1152,122.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L0,320Z">
                </path>
            </svg>
        </div>
    );
}
 
export default Land;