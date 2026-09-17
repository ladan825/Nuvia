import { Link } from "react-router-dom";

function NewInMen() {
  return (
    <div className="relative  aspect-[16/9]  bg-white mt-10">
      <img
        src="newmen.jpeg"
        alt="New In Men"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center">
        <h1 className="font-heading text-white text-4xl md:text-6xl">
          New In: Men
        </h1>
        <Link
          to="/campaign?category=men"
          className="mt-6 uppercase text-sm tracking-widest text-white border-b border-white pb-1 hover:opacity-70 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default NewInMen;