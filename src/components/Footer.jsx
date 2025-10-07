import { ArrowUp, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SpanyLogo from "../assets/Spany601.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Logo bg-gradient-to-b from-orange-500 via-red-500 to-blue-600 */}
        <motion.img
          src={SpanyLogo}
          alt="Nuvia Logo"
          className="w-20 h-20 cursor-pointer"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* Navigation links */}
        <nav>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/news" className="hover:underline">News</Link></li>
            <li><Link to="/order" className="hover:underline">Order</Link></li>
            <li><Link to="/mission" className="hover:underline">Mission</Link></li>
          </ul>
        </nav>

        {/* Social media */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.2 }} href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram />
            </motion.a>
          </div>
        </div>

        {/* Signup CTA */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Stay Refreshed</h2>
          <p className="mb-4 text-sm">Sign up today to enjoy the world’s freshest sips and easy orders.</p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-white hover:text-black transition"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-white/20 flex justify-between items-center px-6 max-w-7xl mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Abbas.co. All rights reserved.</p>
        <Link to="/" className="hover:scale-110 transition">
          <ArrowUp />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
