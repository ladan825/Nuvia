import React from 'react'
import { Link,  useNavigate } from "react-router-dom"
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
    <ul className=" text-white">
      <li><Link to='/create' className='text-white'>New Project</Link></li>
      <li>
        <button onClick={handleLogout} className="btn pink lighten-1 z-depth-0">
          Log out
        </button>
      </li>
      <li>
        <Link to='/' className='btn btn-floating lighten-1'>
          {initials}
        </Link>
      </li>
    </ul>
  )
}

export default SigninLink
