"use client";

import React, { useState } from "react";
import {
  MapPin,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Train,
  ShoppingBag,
  ExternalLink,
  Navigation,
} from "lucide-react";

const proximityCategories = [
  {
    id: "connectivity",
    name: "Connectivity & Transit",
    icon: Train,
    items: [
      { name: "Patia P.H. Railway Station", distance: "500 m", time: "2 mins" },
      { name: "Nandankanan Road Expressway", distance: "1.2 km", time: "3 mins" },
      { name: "Bhubaneswar Railway Junction (BBS)", distance: "11.6 km", time: "25 mins" },
      { name: "Biju Patnaik International Airport (BBI)", distance: "16.5 km", time: "30 mins" },
    ],
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    items: [
      { name: "KIIT University / KIIT International School", distance: "3.5 km", time: "8 mins" },
      { name: "NIFT Bhubaneswar", distance: "4.1 km", time: "10 mins" },
      { name: "SAI International School", distance: "5.5 km", time: "12 mins" },
      { name: "Venkateswar English Medium School", distance: "5.8 km", time: "14 mins" },
      { name: "DAV Public School, Chandrasekharpur", distance: "6.4 km", time: "15 mins" },
    ],
  },
  {
    id: "corporate",
    name: "IT & Corporate Hubs",
    icon: Briefcase,
    items: [
      { name: "Infocity / TCS / Infosys / Wipro Campuses", distance: "4.5–6.5 km", time: "10 mins" },
      { name: "DLF Cyber City", distance: "5.5 km", time: "12 mins" },
      { name: "O-Hub (State Startup Incubator)", distance: "7.5 km", time: "15 mins" },
      { name: "Fortune Tower Commercial Hub", distance: "8.0 km", time: "18 mins" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    items: [
      { name: "KIIMS Hospital & Medical College", distance: "4.6 km", time: "10 mins" },
      { name: "Care Hospitals, Chandrasekharpur", distance: "7.9 km", time: "16 mins" },
      { name: "UTKAL Hospital", distance: "8.5 km", time: "18 mins" },
      { name: "Apollo Hospitals, Bhubaneswar", distance: "10.0 km", time: "20 mins" },
    ],
  },
  {
    id: "shopping",
    name: "Retail & Entertainment",
    icon: ShoppingBag,
    items: [
      { name: "Esplanade One Mall (Rasulgarh Square)", distance: "7.2 km", time: "15 mins" },
      { name: "The Pal Heights Mall (Jaydev Vihar)", distance: "9.0 km", time: "18 mins" },
      { name: "BMC Bhawani Mall (Saheed Nagar)", distance: "8.5 km", time: "18 mins" },
      { name: "Indradhanu Mall (IRC Village / Nayapalli)", distance: "11.0 km", time: "22 mins" },
    ],
  },
];

export default function LocationProximity() {
  const [activeCategory, setActiveCategory] = useState("connectivity");

  const currentCategoryData =
    proximityCategories.find((c) => c.id === activeCategory) || proximityCategories[0];

  return (
    <section id="location" className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f2e7] border border-[#b38b36]/30 text-[#b38b36] text-xs uppercase tracking-[0.25em] font-bold">
            Prime Location & Connectivity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight">
            At the Epicenter of{" "}
            <span className="italic font-normal text-[#b38b36]">Patia, Bhubaneswar</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
            Nestled in Bhubaneswar’s most vibrant growth corridor, surrounded by leading IT campuses,
            healthcare centers, and premier academic institutions.
          </p>
        </div>

        {/* Address Banner in Warm Champagne & Gold */}
        <div className="rounded-2xl bg-[#FAF8F5] border border-[#b38b36]/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f7f2e7] border border-[#b38b36]/30 flex items-center justify-center text-[#b38b36] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#b38b36] font-bold">
                Official Site Address
              </span>
              <h3 className="text-lg sm:text-xl font-serif text-neutral-900 font-semibold">
                Plot No. 15W, Chandrasekharpur, Patia, Bhubaneswar, Odisha 751 021
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Fronting Daya West Canal with a dedicated 12.19-meter approach boulevard
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Plot+No.+15W,+Chandrasekharpur,+Patia,+Bhubaneswar,+Odisha+751021"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-[#b38b36] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 shadow-2xs"
          >
            <Navigation className="w-4 h-4 text-[#b38b36]" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {proximityCategories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? "bg-[#b38b36] text-white shadow-md shadow-[#b38b36]/25 scale-105"
                    : "bg-neutral-100 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 border border-neutral-200"
                }`}
              >
                <CatIcon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Proximity Grid + Interactive Map Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Proximity List in Crisp White */}
          <div className="lg:col-span-6 space-y-3">
            {currentCategoryData.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-[#b38b36] shadow-2xs hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b38b36] group-hover:scale-150 transition-transform" />
                  <span className="text-sm font-semibold text-neutral-800 group-hover:text-neutral-900 transition-colors">
                    {item.name}
                  </span>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-sm font-bold text-[#b38b36] font-serif block">
                    {item.distance}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-md h-[360px] relative">
            <iframe
              title="Acrux Aakaar Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14965.340058988585!2d85.8080277!3d20.3582498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190915f0284711%3A0xb695eef9115f5cbb!2sPatia%2C%20Bhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#b38b36]/30 text-neutral-900 text-xs max-w-xs shadow-lg">
              <div className="font-serif font-bold text-[#b38b36]">Acrux Aakaar Site</div>
              <div className="text-[11px] text-neutral-600 mt-0.5">
                Plot No. 15W, Chandrasekharpur, Patia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
