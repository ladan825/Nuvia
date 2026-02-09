import React, { useState } from "react";
import {
  FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaChevronLeft, FaChevronRight,
  FaSwimmingPool, FaBasketballBall, FaShieldAlt,
  FaInfoCircle
} from "react-icons/fa";
import { MdOutlineSportsTennis, MdOutlineBalcony, MdVerified } from "react-icons/md";
import { GiClothesline, GiFamilyHouse } from "react-icons/gi";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet marker icons not showing
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Approved = () => {
  const imageCount = 25;
  const images = Array.from(
    { length: imageCount },
    (_, i) => `/property/img${i + 1}.jpg`
  );

  const [current, setCurrent] = useState(0);

  const nextImage = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const position = [33.6445, -84.4550];

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#333]">

      {/* HEADER */}
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <img src="/logoapart.png" alt="Logo" className="h-7 w-auto" />
          <span className="text-[20px] font-bold tracking-tight text-[#2d5a27]">
            Apartments.com
          </span>
        </div>
        <div className="w-8 h-8 bg-[#0078d4] rounded-full flex items-center justify-center text-[10px] font-bold text-white">
          TD
        </div>
      </div>

      {/* APPROVAL BANNER */}
      <div className="bg-[#1e3a34] text-white p-5 flex items-center gap-3">
        <FaCheckCircle className="text-[#4caf50] text-2xl flex-shrink-0" />
        <div>
          <h2 className="font-bold text-lg leading-tight">
            Application Approved
          </h2>
          <p className="text-xs text-gray-300">
            Identity & Credit Verified
          </p>
        </div>
      </div>

      {/* IMAGE CAROUSEL */}
      <div className="relative bg-black h-72 group">
        <img
          src={images[current]}
          alt="property"
          className="w-full h-full object-cover object-center transition-opacity duration-500"
        />

        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <FaChevronLeft size={16} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <FaChevronRight size={16} />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-[11px] font-bold">
          {current + 1} / {images.length} Photos
        </div>
      </div>

      {/* PROPERTY INFO */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black text-gray-900">
              Elite at City View
            </h3>
            <p className="text-gray-500 text-sm">
              4001 Lakemont Dr, College Park, GA 30337
            </p>
          </div>

          <div className="flex items-center gap-1 bg-green-50 text-[#2d5a27] px-2 py-1 rounded border">
            <MdVerified size={14} />
            <span className="text-[11px] font-bold">Verified Listing</span>
          </div>
        </div>

        <div className="flex justify-between mt-6 py-5 border-y">
          <div className="flex flex-col items-center">
            <FaBed size={18} className="text-[#2d5a27]" />
            <span className="text-[13px] font-bold">2 Beds</span>
          </div>

          <div className="flex flex-col items-center">
            <FaBath size={18} className="text-[#2d5a27]" />
            <span className="text-[13px] font-bold">2.5 Baths</span>
          </div>

          <div className="flex flex-col items-center">
            <FaRulerCombined size={18} className="text-[#2d5a27]" />
            <span className="text-[13px] font-bold">1,156 sqft</span>
          </div>
        </div>

        <div className="mt-5 flex justify-between items-end">
          <div>
            <p className="text-gray-400 text-[10px] uppercase">
              Monthly Rent
            </p>
            <p className="text-3xl font-black">$1,249</p>
          </div>

          <div className="bg-green-50 text-[#2d5a27] text-[10px] font-bold px-2 py-1 rounded">
            AVAILABLE NOW
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div className="bg-white p-6 mt-3 border-y">
        <h3 className="text-lg font-bold mb-5">
          Property Highlights
        </h3>

        <div className="grid grid-cols-2 gap-y-5">
          <div className="flex items-center gap-3">
            <FaBasketballBall className="text-orange-400" /> Basketball Court
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineSportsTennis className="text-green-500" /> Tennis Court
          </div>

          <div className="flex items-center gap-3">
            <GiFamilyHouse className="text-blue-400" /> Private Porch
          </div>

          <div className="flex items-center gap-3">
            <FaSwimmingPool className="text-cyan-500" /> Resort Pool
          </div>

          <div className="flex items-center gap-3">
            <GiClothesline className="text-purple-400" /> Walk-In Closets
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineBalcony className="text-gray-400" /> Private Balcony
          </div>
        </div>
      </div>

      {/* APPLICANT INFO */}
      <div className="bg-white p-6 mt-3 border-y">
        <div className="flex justify-between mb-5">
          <h4 className="font-bold text-[11px] text-gray-400">
            Applicant Profile
          </h4>

          <div className="flex items-center gap-1 text-[#2d5a27] text-[10px]">
            <FaShieldAlt size={10} /> VERIFIED BY COSTAR
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Full Name</span>
            <span className="font-bold">Tamiria Dixon</span>
          </div>

          <div className="flex justify-between">
            <span>Email</span>
            <span className="font-bold text-blue-600">
              Tammyd496@gmail.com
            </span>
          </div>

          <div className="flex justify-between">
            <span>Phone</span>
            <span className="font-bold">586-4055-299</span>
          </div>
        </div>
      </div>

      {/* LOCATION SECTION - REACT LEAFLET MAP */}
      <div className="bg-white p-6 mt-3 border-y">
        <div className="flex justify-between mb-4">
          <h4 className="font-bold text-[11px] text-gray-400">
            Property Location
          </h4>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Elite+at+City+View+4001+Lakemont+Dr+College+Park+GA+30337"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-blue-600"
          >
            Get Directions
          </a>
        </div>

        <div className="w-full h-48 rounded-lg overflow-hidden border">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                Elite at City View <br />
                4001 Lakemont Dr, College Park, GA
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-4 flex gap-2 bg-gray-50 p-3 rounded">
          <FaInfoCircle className="text-blue-500" />
          <p className="text-[12px] text-gray-500">
            Located in the heart of College Park, near Hartsfield-Jackson Airport.
          </p>
        </div>
      </div>

      {/* BOTTOM BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button className="w-full bg-[#477341] text-white font-bold py-4 rounded-md">
          waiting payment ....
        </button>
      </div>

      <div className="p-12 mb-24 text-center text-gray-400 text-[10px]">
        © 2026 Apartments.com
      </div>
    </div>
  );
};

export default Approved;
