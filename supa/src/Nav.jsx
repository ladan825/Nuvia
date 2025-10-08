import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { ShoppingBag, ShoppingCart, User } from "lucide-react"
import { motion } from "framer-motion"
import SpanyLogo from "./assets/Spany601.svg"
import { useState, useRef, useEffect } from "react"

const Nav = () => {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    await logout()
    navigate("/signin")
  }

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
      className="absolute top-0 left-0 w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-20"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {/* LEFT: Logo */}
      <Link to="/">
        <motion.img
          src={SpanyLogo}
          alt="Nuvia Logo"
          className="w-24 h-24 sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
      </Link>

      {/* CENTER: Brand Name */}
      <motion.h1
        className="text-4xl sm:text-6xl tracking-tight text-black select-none"
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <span className="font-[cursive] text-black">N</span>
        <span className="font-extrabold text-black">uvia</span>
      </motion.h1>

      {/* RIGHT: Cart + Account */}
      <div className="flex items-center gap-4 sm:gap-6 text-black">
        {/* Cart */}
        <div className="flex gap-3 sm:gap-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="cursor-pointer"
          >
            <Link to="/cart">
              <ShoppingCart size={24} className="text-black sm:size-[28px]" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="cursor-pointer"
          >
            <Link to="/shop">
              <ShoppingBag size={24} className="text-black sm:size-[28px]" />
            </Link>
          </motion.div>
        </div>

        {/* Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.div
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="cursor-pointer flex items-center gap-1"
          >
            <User size={22} className="sm:size-[26px]" />
            <span className="text-xs sm:text-sm">Account</span>
          </motion.div>

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
                  <p className="px-4 py-2 text-sm border-b border-black/10">
                    {profile?.display_name || user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-black/10 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 hover:bg-black/10 text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 hover:bg-black/10 text-sm"
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
