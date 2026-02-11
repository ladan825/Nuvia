import React, { useState } from "react";
import {
  FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaChevronLeft, FaChevronRight,
  FaShieldAlt, FaMapMarkerAlt, FaInfoCircle, FaLock, FaCheck,
  FaHome,
  FaWheelchair
} from "react-icons/fa";
import { MdVerified, MdOutlineKitchen, MdLocalLaundryService } from "react-icons/md";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const UnionClubApproved = () => {
  // Logic for your 26 images in /public/property/
  const imageCount = 5; 
  const images = Array.from({ length: imageCount }, (_, i) => `/Union/img${i + 1}.jpg`);

  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] pb-36">

      {/* 1. Header: Union Club Branding */}
      <div className="bg-[#143255] text-white px-6 py-5 flex justify-between items-center sticky top-0 z-50 border-b border-white/10 shadow-lg">
        <div className="relative w-32 h-full flex flex-center">
          <img 
              src="/unionlogo.png" 
              alt="Lauth Communities" 
              className="absolute h-32 w-auto  brightness-0 invert object-contain left-0 top-1/2 -translate-y-1/2" 
            />

        </div>
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-[11px] font-bold bg-white/5">
          AE
        </div>
      </div>

      {/* 2. Status Banner: Premium Craftsman Style */}
      <div className="bg-white border-b border-gray-200 p-6 flex items-center gap-4">
        <div className="bg-black p-2 rounded-full">
          <FaCheckCircle className="text-white text-xl" />
        </div>
        <div>
          <h2 className="font-black text-[17px] uppercase tracking-tight">Application Approved</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em] mt-0.5">Suburban Living Beyond Compare</p>
        </div>
      </div>

      {/* 3. High-End Image Showcase */}
      <div className="relative bg-black h-72 group">
              <img
                src={images[current]}
                alt="Union"
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

      {/* 4. The Property Details */}
      <div className="p-7 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-[28px] font-black leading-none tracking-tighter uppercase mb-2">Union Club</h3>
            <div className="flex items-center gap-2">
              <span className="bg-[#f0f0f0] text-black text-[9px] font-black px-2 py-1 uppercase tracking-tighter border border-gray-200">New Construction</span>
              <div className="flex items-center gap-1 text-black">
                 <MdVerified size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Luxe Certified</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-[14px] font-medium flex items-center gap-2 mb-8">
          <FaMapMarkerAlt className="text-black" /> 
          13101 Union Club Boulevard, Fort Wayne, IN 46845
        </p>

        {/* Interior Highlights: Specific to their website info */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded">
             <MdOutlineKitchen size={20} />
             <span className="text-[11px] font-bold uppercase">Granite Counters</span>
           </div>
           <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded">
             <MdLocalLaundryService size={20} />
             <span className="text-[11px] font-bold uppercase">In-Home Washer/Dryer</span>
           </div>
        </div>

        {/* Minimalist Specs */}
        <div className="flex justify-between border-y border-black py-8 mb-8">
          <div className="text-center">
             <FaBed size={18} className="text-[#030303]" />
            <p className="font-black text-xl">3 Beds</p>
          </div>
          <div className="h-10 w-[1px] bg-gray-200 self-center" />
          <div className="text-center">
            <FaBath size={18} className="text-[#000000]" />
            <p className="font-black text-xl">2 Bath</p>
          </div>
          <div className="h-10 w-[1px] bg-gray-200 self-center" />
          <div className="text-center">
        <FaRulerCombined size={18} className="text-[#000000]" />
            <p className="font-black text-xl">1,757 Sq.Ft.</p>
          </div>
        </div>

        {/* Rental Breakdown */}
        <div className="bg-white text-black p-6 shadow-xl">
           <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-black text-[10px] font-black uppercase tracking-[0.2em] mb-1">Monthly Rent</p>
                <p className="text-4xl font-black tracking-tighter">$2,075</p>
              </div>
              <div className="bg-green-50 text-[#2d5a27] text-[10px] font-bold px-2 py-1 rounded">
            AVAILABLE NOW
          </div>
           </div>
           <div className="border-t border-white/10 pt-4 flex items-center gap-2">
                <FaCheck size={14} className="text-green-500" />
           </div>
        </div>
      </div>

      {/* 5. Applicant Summary Section */}
      <div className="px-7 py-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-black text-[13px] uppercase tracking-[0.15em] border-l-4 border-black pl-3">
            Resident Profile
          </h4>
          <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">IDENTITY VERIFIED</span>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[12px] font-bold uppercase tracking-tighter">Full Name</span>
            <span className="font-black text-[14px]">Anthony Easley</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[12px] font-bold uppercase tracking-tighter">Date of Birth</span>
            <span className="font-black text-[14px]">5-14-1988</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[12px] font-bold uppercase tracking-tighter">Email</span>
            <span className="font-black text-[14px] text-blue-600">Anteas51@gmail.com</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[12px] font-bold uppercase tracking-tighter">Phone</span>
            <div className="flex items-center gap-1">
              
              <span className="font-black text-[14px]">3163509643</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Mobile Optimized Call to Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50">
        <button className="w-full bg-black hover:bg-[#222] text-white font-black py-5 uppercase tracking-[0.25em] text-[13px] transition-all active:scale-[0.96] shadow-2xl flex items-center justify-center gap-3">
          waiting payment..
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-4 font-bold uppercase tracking-widest opacity-60">
          Official Lauth Communities™ Portal
        </p>
      </div>

      {/* Updated Location Section for Union Club */}
<div className="bg-white p-6 mt-3 border-y border-gray-200">
  <div className="flex justify-between items-center mb-4">
    <h4 className="font-bold text-[11px] text-gray-400 uppercase tracking-widest">
      Property Location
    </h4>

    {/* Real Google Maps Directions Link for Fort Wayne Address */}
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=13101+Union+Club+Blvd+Fort+Wayne+IN+46845"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[10px] font-bold text-blue-600 uppercase"
    >
      Get Directions
    </a>
  </div>

  <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
    <MapContainer
      center={[41.1969, -85.1274]} // Fort Wayne Coordinates
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[41.1969, -85.1274]}>
        <Popup>
          <span className="font-bold">Union Club Apartments</span> <br />
          13101 Union Club Blvd, Fort Wayne, IN 46845
        </Popup>
      </Marker>
    </MapContainer>
  </div>

  <div className="mt-4 flex gap-2 bg-gray-50 p-3 rounded border border-gray-100">
    <FaInfoCircle className="text-blue-500 mt-0.5" size={14} />
    <p className="text-[12px] text-gray-500 leading-relaxed">
      Located in Northwest Fort Wayne, providing easy access to I-69 and the Parkview Regional Medical Center area.
    </p>
  </div>
</div>

      {/* 7. Footer */}
      <footer className="bg-[#1a365d] text-white py-10 px-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Top Info Bar */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-medium mb-8 text-center">
          <span className="font-bold">Union Club Apartments</span>
          <span className="opacity-80">13101 Union Club Blvd Fort Wayne, IN 46845</span>
          <a href="mailto:info@unionclub.com" className="hover:underline">Email Us</a>
          <span className="flex items-center gap-1 text-yellow-400">
            ★★★★★ <span className="text-white opacity-80">(24 reviews)</span>
          </span>
        </div>

        <hr className="w-full border-white/10 mb-10" />

        {/* Center Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8 items-center text-center md:text-left">
          
          {/* Office Hours */}
          <div className="space-y-1">
            <h4 className="text-[13px] font-bold uppercase tracking-wider mb-2">Office Hours</h4>
            <p className="text-[12px] opacity-80">Monday - Friday: 9:00am - 5:30pm</p>
            <p className="text-[12px] opacity-80">Saturday: 10:00am - 3:00pm</p>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center">
            <img 
              src="/lauth.png" 
              alt="Lauth Communities" 
              className="h-16 w-auto mb-4 brightness-0 invert" 
            />
            <div className="bg-white px-2 py-1 rounded text-[8px] text-black font-bold uppercase">
              W3C WAI-AA WCAG 2.2
            </div>
          </div>

          {/* Legal and Icons */}
          <div className="flex flex-col md:items-end items-center gap-4">
            <div className="flex gap-4 text-[11px] font-medium">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:underline">Accessibility Statement</a>
            </div>
            
            <p className="text-[11px] opacity-60">
              Copyright © 2026 Union Club Apartments
            </p>

            <div className="flex gap-3 opacity-80">
              <FaHome size={18} title="Equal Housing Opportunity" />
              <FaWheelchair size={18} title="Handicap Accessible" />
            </div>
          </div>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default UnionClubApproved;