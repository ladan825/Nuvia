import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone, FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa6";

const linkClass = "text-sm text-gray-600 hover:text-black transition";
const rowClass = "flex items-start gap-3 text-sm text-gray-600 hover:text-black transition";
const socialClass =
  "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition duration-300";
const headingClass = "text-sm uppercase tracking-widest font-semibold mb-1";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-8 px-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        <div className="flex flex-col gap-3">
          <h3 className={headingClass}>Shop</h3>
          <Link to="/shop/men" className={linkClass}>Men</Link>
          <Link to="/shop/women" className={linkClass}>Women</Link>
          <Link to="/shop/kids" className={linkClass}>Kids</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className={headingClass}>About</h3>
          <Link to="/about" className={linkClass}>Our Story</Link>
          <Link to="/orders" className={linkClass}>My Orders</Link>
        </div>

        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          <h3 className={headingClass}>Contact</h3>

          <a
            href="https://www.google.com/maps/search/?api=1&query=33+Kinshasa+Street+Wuse+Zone+6+Abuja"
            target="_blank"
            rel="noreferrer"
            className={rowClass}
          >
            <FaLocationDot size={16} className="mt-0.5 flex-shrink-0" />
            <span>No. 33 Kinshasa Street, Wuse Zone 6</span>
          </a>

          <a href="tel:+2348138480567" className={rowClass}>
            <FaPhone size={15} className="mt-0.5 flex-shrink-0" />
            <span>+234 813 848 0567</span>
          </a>

          <a
            href="https://wa.me/2348138480567"
            target="_blank"
            rel="noreferrer"
            className={rowClass}
          >
            <FaWhatsapp size={17} className="mt-0.5 flex-shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="flex gap-3 mt-2">
            <a
              href="https://www.tiktok.com/@vogmoda_"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className={socialClass}
            >
              <FaTiktok size={16} />
            </a>
            <a
              href="https://www.instagram.com/vogmoda_"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <FaInstagram size={17} />
            </a>
            <a
              href="https://wa.me/2348138480567"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className={socialClass}
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
          <h3 className={headingClass}>Newsletter</h3>
          <p className="text-sm text-gray-600">Sign up for early access to new collections.</p>
          <div className="flex items-center border-b border-gray-300 focus-within:border-black transition">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 outline-none py-2 text-sm bg-transparent"
            />
            <button className="text-xs uppercase tracking-widest py-2 pl-3 hover:opacity-60 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      <h1 className="font-brand text-[14vw] md:text-[10vw] leading-none tracking-tight uppercase text-center">
        VOGMODA
      </h1>
      <h2 className="font-brand  text-center text-l text-black mt-2">Crafted with care, worn with Confidence</h2>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-500 mt-8 pt-6 border-t border-gray-100">
        <span>© {new Date().getFullYear()} VOGMODA. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}