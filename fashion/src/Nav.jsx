import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

const links = [
  { to: "/shop/men", label: "Men" },
  { to: "/shop/women", label: "Women" },
  { to: "/shop/kids", label: "Kids" },
  { to: "/about", label: "About" },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const { setIsCartOpen, count } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const solid = pathname !== "/" || isScrolled || isMenuOpen;
  const tone = solid ? "text-black" : "text-white";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        solid ? "bg-white border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between px-6">
        <button className={`md:hidden ${tone}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" aria-label="VOGMODA home" className="h-full flex items-center">
          <img
            src="/logo.png"
            alt="VOGMODA"
            className={`h-full w-auto object-contain scale-125 transition ${
              solid ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        <div className={`hidden md:flex gap-8 text-sm uppercase tracking-wide ${tone}`}>
          {links.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </div>

        <div className={`flex items-center gap-5 ${tone}`}>
          <button aria-label="Search"><Search size={20} /></button>
          <Link to={user ? "/orders" : "/login"} aria-label="Account"><User size={20} /></Link>
          {user && (
            <button onClick={signOut} aria-label="Log out"><LogOut size={20} /></button>
          )}
          <button aria-label="Cart" onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-wide text-black">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}