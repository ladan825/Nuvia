import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { ShoppingBag, ShoppingCart, User } from "lucide-react"
import { motion } from "framer-motion"
import SpanyLogo from "./assets/Spany601.svg"
import { useState, useRef, useEffect } from "react"   // ✅ NEW for dropdown toggle

const Nav = () => {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()

  // ✅ State to track if dropdown is open
  const [open, setOpen] = useState(false)

  // ✅ Ref to detect clicks outside dropdown
  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    await logout()
    navigate("/signin")
  }

  // ✅ Close dropdown if click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.nav
      className="absolute top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-20 mb-10"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* LEFT: Logo */}
      <Link to="/">
      <motion.img
        src={SpanyLogo}
        alt="Nuvia Logo"
        className="w-30 h-30 cursor-pointer"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      </Link>
      

      {/* CENTER: Nuvia brand */}
      <motion.h1
        className="text-6xl tracking-tight text-black select-none"
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <span className="font-[cursive] text-black" >N</span>
        <span className="font-extrabold text-black">uvia</span>
      </motion.h1>

      {/* RIGHT: Cart + Account */}
      <div className="flex items-center gap-6 text-black">
        {/* Cart */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cursor-pointer"
        >
         <Link to="cart"> <ShoppingCart size={28} className="text-black"/> </Link> 
         <Link to="/shop"> <ShoppingBag size={28} className="text-black"/> </Link>
        </motion.div>

        {/* Account dropdown (click-based) */}
        <div className="relative" ref={dropdownRef}>
          {/* Button that toggles dropdown */}
          <motion.div
            onClick={() => setOpen(!open)} // ✅ toggle open/close
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="cursor-pointer flex items-center gap-1"
          >
            <User size={26} />
            <span className="text-sm">Account</span>
          </motion.div>

          {/* Dropdown menu (only shows if open=true) */}
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-orange-400 text-black rounded-lg shadow-lg w-32 py-2"
            >
              {user ? (
                <>
                  <p className="px-4 py-2 text-sm">
                    {profile?.display_name || user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 hover:bg-black/20 text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 hover:bg-black/20 text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

export default Nav
