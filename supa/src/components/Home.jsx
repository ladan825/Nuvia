import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import Card from './Card'
import Land from './Land'
import Footer from './Footer'
import Slider from './Slider'
import Hero from './Hero'
import Month from './Month'
import Marquee from './Marquee'
import About from './About'
import Dashboard from './Dashboard'

export default function Home() {
  const [orderBy, setOrderBy] = useState({ column: 'created_at', ascending: false })
    const [cart, setCart] = useState([])

  // 2️⃣ Function to add drinks to cart
  const addToCart = (drink) => {
    setCart(prev => [...prev, drink])
    console.log('Cart now:', cart)
  }


  const { data: drinks, isLoading, error } = useQuery({
    queryKey: ['Drinks', orderBy],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Drinks')
        .select('*')
        .order(orderBy.column, { ascending: orderBy.ascending })
      if (error) throw new Error(error.message)
      return data
    },
  })

  return (
<div className='overflow-x-hidden'>
  <Land/>
  <Hero />
  <Marquee />
  <Slider />
    <About />
    <Month />
    <div className="p-6">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl text-black font-bold mt-10 flex justify-center">COLOURFULL FLAVOURS</h2>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setOrderBy({ column: 'created_at', ascending: false })}
          className="px-4 py-2 border rounded"
        >
          Order by Time (Newest)
        </button>

        <button
          onClick={() => setOrderBy({ column: 'rating', ascending: false })}
          className="px-4 py-2 border rounded"
        >
          Order by Rating
        </button>

        <button
          onClick={() => setOrderBy({ column: 'title', ascending: true })}
          className="px-4 py-2 border rounded"
        >
          Order by Title (A-Z)
        </button>
      </div>

      {isLoading && <p>Loading drinks...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {drinks?.map(drink => (
          <Card key={drink.id} drink={drink} addToCart={addToCart}/>
        ))}
      </div>
    </div>


    <Footer />
</div>
  
  )
}
