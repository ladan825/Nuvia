import { ArrowUp, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SpanyLogo from "../assets/Spany601.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-4">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 items-start text-center sm:text-left">
        
        {/* Logo */}
        <motion.img
          src={SpanyLogo}
          alt="Spany Logo"
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0 cursor-pointer invert brightness-0"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* Navigation */}
        <nav>
          <h2 className="text-base sm:text-lg font-semibold mb-2">Explore</h2>
          <ul className="space-y-1 text-sm sm:text-base">
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/news" className="hover:underline">News</Link></li>
            <li><Link to="/order" className="hover:underline">Order</Link></li>
            <li><Link to="/mission" className="hover:underline">Mission</Link></li>
          </ul>
        </nav>

        {/* Social Media */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex justify-center sm:justify-start gap-4">
            <motion.a whileHover={{ scale: 1.2 }} href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook size={20} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={20} />
            </motion.a>
          </div>
        </div>

        {/* Sign Up CTA */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-2">Stay Refreshed</h2>
          <p className="mb-3 text-xs sm:text-sm leading-relaxed">
            Sign up today to enjoy the world’s freshest sips and easy orders.
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white text-black rounded-full hover:bg-black hover:text-white border border-white transition text-sm sm:text-base"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 max-w-7xl mx-auto text-xs sm:text-sm">
        <p>&copy; {new Date().getFullYear()} Abbas.co. All rights reserved.</p>
        <Link to="/" className="hover:scale-110 transition">
          <ArrowUp />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
