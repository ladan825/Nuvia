import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import DrinkCard from '../components/DrinkCard';

export default function Shop() {
  const { data: drinks = [], isLoading, error } = useQuery({
    queryKey: ['drinks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Drinks').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-20">Loading drinks...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">Error: {error.message}</p>;
  }

  if (drinks.length === 0) {
    return <p className="text-center mt-20">No drinks found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 mt-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Our Drinks</h2>
      
      {/* ✅ Responsive grid that scales perfectly on all devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {drinks.map((drink) => (
          <DrinkCard key={drink.id} drink={drink} />
        ))}
      </div>
    </div>
  );
}
