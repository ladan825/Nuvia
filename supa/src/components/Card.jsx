import { Link } from 'react-router-dom'
import { Trash2, Edit, ShoppingCart } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function Card({ drink }) {
  const queryClient = useQueryClient()

  const { mutate: deleteDrink, isPending } = useMutation({
    mutationFn: async () => {
      console.log('Trying to delete ID:', drink.id)

      const { data, error } = await supabase
        .from('Drinks')
        .delete()
        .eq('id', drink.id)
        .select('*')

      if (error) throw new Error(error.message)
      console.log('Deleted:', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Drinks'])
    },
  })

  return (
    <div className="drink-card p-4 mb-4 flex flex-col gap-2 bg-white rounded-lg shadow-sm">
      
      {/* ✅ Clean full image display */}
      <div className="w-full aspect-[4/5] rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
        {drink.image_url ? (
          <img
            src={drink.image_url}
            alt={drink.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>

      {/* Drink Info */}
      <h3 className="text-xl font-bold mt-2">{drink.title}</h3>
      <div className="rating font-semibold">{drink.rating}</div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-2">
        
      {/*   
      <Link
          to={`/${drink.id}`}
          className="inline-flex items-center gap-1 text-blue-500 hover:underline"
        >
          <Edit className="w-4 h-4" />
        </Link>
      <button
          onClick={() => deleteDrink()}
          disabled={isPending}
          className="inline-flex items-center gap-1 text-red-500 hover:underline"
        >
          <Trash2 className="w-4 h-4" />
          {isPending && 'Deleting...'}
        </button> */}
      

        <Link
          to={`/product/${drink.id}`}
          className="inline-flex items-center gap-1 text-blue-500 hover:underline"
        >
          
          <ShoppingCart className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
