import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

const SigninLink = ({ user }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  // Generate initials like before
  const initials = user?.email ? user.email.charAt(0).toUpperCase() : "U"

  return (
    <ul className="right">
      <li><NavLink to='/create'>New Project</NavLink></li>
      <li>
        <button onClick={handleLogout} className="btn pink lighten-1 z-depth-0">
          Log out
        </button>
      </li>
      <li>
        <NavLink to='/' className='btn btn-floating lighten-1'>
          {initials}
        </NavLink>
      </li>
    </ul>
  )
}

export default SigninLink
