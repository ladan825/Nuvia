import { Link } from 'react-router-dom'
import SigninLink from "./SigninLink"
import SignoutLink from "./SignoutLink"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

// ⭐️ Note: We are using a plain CSS approach here ⭐️
const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // ... (supabase setup remains the same)
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <nav className="bg-black w-full p-2  ">

      <div className='flex justify-between '>
        

        <div className='w-full flex items-center gap-6'>
            <Link to='/' className="text-6xl text-white">Snar</Link>
            <Link to="/dash" className='text-white text-4xl'>Dashboard</Link>
        </div>
        
        {/* 2. Auth Links - Far Right */}
        {user ? <SigninLink user={user} /> : <SignoutLink />}
      </div>
    </nav>
  )
}

export default Navbar