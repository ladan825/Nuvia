import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
         <span className="flex font-playfair text-glow text-xl font-bold">
            Abbas
          </span></Link> 
         
        
          
        
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          <li><Link to="/" className="hover:text-xl">Home</Link></li>
          <li><Link to="/about" className="hover:text-xl">About</Link></li>
          <li><Link to="/skills" className="hover:text-xl">Skills</Link></li>
          <li><Link to="/projects" className="hover:text-xl">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-xl">Contact</Link></li>
        </ul>

        {/* Hamburger button on small screens */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden z-50"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-background flex flex-col items-center gap-4 py-4 md:hidden">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/skills" onClick={() => setMenuOpen(false)}>Skills</Link></li>
            <li><Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
