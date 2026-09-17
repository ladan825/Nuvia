import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[100vh]">
      <img
        src="/women4k.jpeg"
        alt="New In Women"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
        <div
          style={{ transform: `translateY(${Math.min(scrollY * 0.5, 200)}px)` }}
          className="flex flex-col items-center transition-transform duration-100 ease-out"
        >
          <h1 className="font-heading text-white text-4xl md:text-6xl">
            New In: Women
          </h1>
          <Link
            to="/campaign?category=women"
            className="font-sans mt-6 uppercase text-sm tracking-widest text-white border-b border-white pb-1 hover:opacity-70 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;