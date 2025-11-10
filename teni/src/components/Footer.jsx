import { Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-amber-100 py-12 px-6">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold tracking-wide">Premium Donkwa</h3>
          <p className="mt-3 text-sm leading-relaxed">
            Freshly made with love ❤️  
            The best Donkwa you’ll ever taste.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#order" className="hover:underline">Order</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Order Now</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={18} /> +234 805 642 3112
            </p>
            <p className="flex items-center gap-2">
              <Instagram size={18} /> @premiumdọnkwa
            </p>

            <a
              href="https://wa.me/2348056423112"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-500 text-amber-950 px-4 py-2 rounded-xl font-semibold inline-block transition"
            >
              WhatsApp Order
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-xs text-amber-400 mt-10">
        © {new Date().getFullYear()} Premium Donkwa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
