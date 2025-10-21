import React from 'react'
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
    <nav className="nav-wrapper">

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '90%', // Keep content slightly narrower than 100%
        margin: '0 auto', // Center the content horizontally
        padding: '10px 0' // Add vertical padding
      }}>
        
        {/* 1. Logo and Dashboard - Grouped on the Left (or just Logo on left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <Link to='/' className="logo">Snar</Link>
            <Link to="/dash" style={{ color: 'white', fontSize: '18px' }}>Dashboard</Link>
        </div>
        
        {/* 2. Auth Links - Far Right */}
        {user ? <SigninLink user={user} /> : <SignoutLink />}
      </div>
    </nav>
  )
}

export default Navbar