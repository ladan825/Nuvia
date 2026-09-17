import { useState, useEffect } from "react"; 
import { Link, useLocation } from "react-router-dom"; 
import { Search, ShoppingBag, Menu, X, User } from "lucide-react"; 
import { useCart } from "./context/CartContext"; 
 
function Navbar() { 
  const location = useLocation(); 
  const isHomePage = location.pathname === "/"; 
  const { setIsCartOpen, cartItems } = useCart(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false); 
 
  useEffect(() => { 
    const handleScroll = () => { 
      setIsScrolled(window.scrollY > 50); 
    }; 
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []); 
 
  const showTransparent = isHomePage && !isScrolled; 
 
  return ( 
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${ 
        showTransparent ? "bg-transparent" : "bg-white border-b border-gray-100" 
      }`} 
    > 
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"> 
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}> 
          {isMenuOpen ? ( 
            <X size={22} className={showTransparent ? "text-white" : "text-black"} /> 
          ) : ( 
            <Menu size={22} className={showTransparent ? "text-white" : "text-black"} /> 
          )} 
        </button> 
 
        <Link 
          to="/" 
          className={`font-brand text-xl tracking-widest uppercase ${ 
            showTransparent ? "text-white" : "text-black" 
          }`} 
        > 
          Fashion 
        </Link> 
 
        <div 
          className={`hidden md:flex gap-8 text-sm uppercase tracking-wide ${ 
            showTransparent ? "text-white" : "text-black" 
          }`} 
        > 
          <Link to="/women" className="font-heading">Women</Link> 
          <Link to="/men" className="font-heading">Men</Link> 
          <Link to="/collections" className="font-heading">Collections</Link> 
          <Link to="/about" className="font-heading">About</Link> 
        </div> 
 
        <div className={`flex items-center gap-5 ${showTransparent ? "text-white" : "text-black"}`}> 
          <button aria-label="Search"><Search size={20} /></button> 
          <button aria-label="Account"><User size={20} /></button> 
          <button aria-label="Cart" onClick={() => setIsCartOpen(true)} className="relative"> 
            <ShoppingBag size={20} /> 
            {cartItems.length > 0 && ( 
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"> 
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
              </span> 
            )} 
          </button> 
        </div> 
      </div> 

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="flex flex-col px-6 py-6 gap-6 text-sm uppercase tracking-wide text-black">
            <Link 
              to="/women" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading"
            >
              Women
            </Link>

            <Link 
              to="/men" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading"
            >
              Men
            </Link>

            <Link 
              to="/collections" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading"
            >
              Collections
            </Link>

            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading"
            >
              About
            </Link>
          </div>
        </div>
      )}
 
    </nav> 
  ); 
} 
 
export default Navbar;