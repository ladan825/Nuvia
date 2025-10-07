import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import DrinkCard from '../components/DrinkCard'; // We'll create this next

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
    <div className="container mx-auto p-8 mt-26">
      <h2 className="text-4xl font-bold mb-8 text-center">Our Drinks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {drinks.map(drink => (
          <DrinkCard key={drink.id} drink={drink} />
        ))}
      </div>
    </div>
  );
}