const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">

        <div className="flex flex-col gap-3">
          <h3 className="text-sm uppercase tracking-widest font-semibold">Shop</h3>
          <a href="/women" className="text-sm text-gray-600 hover:text-black transition">Women</a>
          <a href="/men" className="text-sm text-gray-600 hover:text-black transition">Men</a>
          <a href="/collections" className="text-sm text-gray-600 hover:text-black transition">Collections</a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm uppercase tracking-widest font-semibold">About</h3>
          <a href="/story" className="text-sm text-gray-600 hover:text-black transition">Our Story</a>
          <a href="/contact" className="text-sm text-gray-600 hover:text-black transition">Contact</a>
        </div>

        <div className="flex flex-col gap-3 max-w-xs">
          <h3 className="text-sm uppercase tracking-widest font-semibold">Newsletter</h3>
          <p className="text-sm text-gray-600">Sign up for early access to new collections.</p>
          <input
            type="email"
            placeholder="Your email"
            className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent"
          />
        </div>

      </div>

      <div className="w-full text-center">
        <h1 className="font-brand text-[12vw] md:text-[8vw] leading-none font-semibold tracking-tight uppercase letter-spacing-[0.10em]">
          Fashion
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between text-xs text-gray-500 mt-8">
        <span>© {new Date().getFullYear()} Fashion. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
};

export default Footer;