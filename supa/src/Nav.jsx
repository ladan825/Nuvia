// src/components/Nav.jsx
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext" // Adjusted path based on your folder structure
import { ShoppingBag, ShoppingCart, User } from "lucide-react"
import { motion } from "framer-motion"
import SpanyLogo from "./assets/Spany601.svg"
import { useState, useRef, useEffect } from "react"

const Nav = () => {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0) // State for the badge number
  const dropdownRef = useRef(null)

  // Function to calculate total items in cart
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
    setCartCount(total)
  }

  const handleLogout = async () => {
    await logout()
    navigate("/signin")
  }

  useEffect(() => {
    // Initial count
    updateCartCount()

    // Listen for updates from other components
    window.addEventListener('cartUpdated', updateCartCount)
    // Listen for updates from other tabs
    window.addEventListener('storage', updateCartCount)

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount)
      window.removeEventListener('storage', updateCartCount)
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
        style={{ fontFamily: "'Poppins', sans-serif" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <span className="font-[cursive] text-black">N</span>
        <span className="font-extrabold text-black">uvia</span>
      </motion.h1>

      {/* RIGHT: Cart + Account */}
      <div className="flex items-center gap-4 sm:gap-6 text-black">
        {user && user.email === 'abbasladan825@gmail.com' && (
          <Link
            to="/create"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            + Create
          </Link>
        )}

        <div className="flex gap-3 sm:gap-4">
          {/* Cart Icon with Badge */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="cursor-pointer relative"
          >
            <Link to="/cart">
              <ShoppingCart size={24} className="text-black sm:size-[28px]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
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
                  <Link to="/signin" className="block px-4 py-2 hover:bg-black/10 text-sm">Sign In</Link>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-black/10 text-sm">Sign Up</Link>
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