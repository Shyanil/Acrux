"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, Bath, Maximize2, Compass, Download, Calendar } from "lucide-react";

interface ResidencesProps {
  onOpenBrochure: () => void;
  onOpenEnquiry: () => void;
}

const rooms = [
  {
    id: "living",
    title: "Living & Dining Lounge",
    caption: "Expansive open-plan living seamlessly merging with the grand sundeck balcony.",
    image: "/assets/Interiors/Living_Dining_Room.webp",
  },
  {
    id: "master",
    title: "Master Suite",
    caption: "A private retreat featuring floor-to-ceiling glass wardrobe and sunset views.",
    image: "/assets/Interiors/Master_Bedroom.webp",
  },
  {
    id: "bed2",
    title: "Skyline Balcony Bedroom",
    caption: "Bathed in natural morning sunlight with direct access to private outdoor vistas.",
    image: "/assets/Interiors/Bedroom_2.webp",
  },
  {
    id: "bed3",
    title: "Modern Study & Guest Suite",
    caption: "Designed with acoustic refinement for focused remote work or family retreat.",
    image: "/assets/Interiors/Bedroom_3.webp",
  },
];

const unitSpecs = [
  {
    type: "2.5 BHK",
    title: "2.5 BHK Luxury Residence",
    size: "1,790 Sq. Ft.",
    bedrooms: "2 Beds + 1 Multi-use Study",
    bathrooms: "2 Luxury Bathrooms",
    balconies: "2 Wide Sundecks",
    highlight: "Optimal layout with dedicated study/work nook and dual cross-breeze corridors.",
  },
  {
    type: "3 BHK",
    title: "3 BHK Grand Residence",
    size: "2,148 Sq. Ft.",
    bedrooms: "3 Grand Suites",
    bathrooms: "3 Designer Bathrooms",
    balconies: "2 Expansive Sundecks",
    highlight: "Lavish master bedroom with ensuite walk-in closet, grand foyer, and separate utility space.",
  },
];

export default function ResidencesShowcase({ onOpenBrochure, onOpenEnquiry }: ResidencesProps) {
  const [activeUnit, setActiveUnit] = useState(1); // Default to 3 BHK
  const [activeRoom, setActiveRoom] = useState(0);

  const selectedUnit = unitSpecs[activeUnit];
  const selectedRoom = rooms[activeRoom];

  return (
    <section id="residences" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f2e7] border border-[#b38b36]/30 text-[#b38b36] text-xs uppercase tracking-[0.25em] font-semibold">
              Curated Living Spaces
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light tracking-tight leading-tight">
              Sun-Kissed Homes,{" "}
              <span className="italic font-normal text-[#b38b36]">
                Perfected Living
              </span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light">
              Carefully planned layouts designed for privacy, cross-ventilation, and generous natural daylight.
            </p>
          </div>

          {/* Unit Toggle Tabs in White & Gold */}
          <div className="flex p-1.5 rounded-full bg-neutral-100 border border-neutral-200 shrink-0">
            {unitSpecs.map((unit, idx) => (
              <button
                key={unit.type}
                onClick={() => setActiveUnit(idx)}
                className={`px-5 sm:px-7 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  activeUnit === idx
                    ? "bg-[#b38b36] text-white shadow-md"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {unit.type}
              </button>
            ))}
          </div>
        </div>

        {/* Big Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Main Visual Carousel Display */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRoom.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#f5e3b5] font-bold">
                    Interior Perspective
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white">{selectedRoom.title}</h3>
                  <p className="text-xs text-neutral-200 font-light max-w-md">
                    {selectedRoom.caption}
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-bold shrink-0 shadow-md">
                  {activeRoom + 1} / {rooms.length}
                </div>
              </div>
            </div>

            {/* Room Selector Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {rooms.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(idx)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    activeRoom === idx
                      ? "border-[#b38b36] bg-[#f7f2e7] shadow-xs"
                      : "border-neutral-200 bg-white hover:border-neutral-300 text-neutral-600"
                  }`}
                >
                  <span className="text-[10px] text-[#b38b36] block font-mono font-bold">0{idx + 1}</span>
                  <p className={`text-xs font-medium truncate ${activeRoom === idx ? "text-neutral-900 font-semibold" : "text-neutral-700"}`}>
                    {room.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Unit Specs & Editorial Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-2xl bg-[#FBF9F5] border border-[#b38b36]/20 shadow-md space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#b38b36] font-bold block">
                  Configuration Details
                </span>
                <h3 className="text-2xl font-serif text-neutral-900 mt-1">
                  {selectedUnit.title}
                </h3>
                <div className="text-3xl font-serif text-[#b38b36] font-medium mt-2">
                  {selectedUnit.size}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {selectedUnit.highlight}
              </p>

              {/* Spec Pills */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs py-2 border-b border-neutral-200/60">
                  <span className="text-neutral-600 flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-[#b38b36]" /> Bedroom Layout
                  </span>
                  <span className="text-neutral-900 font-semibold">{selectedUnit.bedrooms}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-b border-neutral-200/60">
                  <span className="text-neutral-600 flex items-center gap-2">
                    <Bath className="w-4 h-4 text-[#b38b36]" /> Bathrooms
                  </span>
                  <span className="text-neutral-900 font-semibold">{selectedUnit.bathrooms}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-b border-neutral-200/60">
                  <span className="text-neutral-600 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[#b38b36]" /> Outdoor Living
                  </span>
                  <span className="text-neutral-900 font-semibold">{selectedUnit.balconies}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-neutral-600 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#b38b36]" /> Orientation
                  </span>
                  <span className="text-neutral-900 font-semibold">100% Vastu Compliant</span>
                </div>
              </div>

              {/* CTAs in White & Gold */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={onOpenEnquiry}
                  className="w-full py-3.5 rounded-full bg-[#b38b36] hover:bg-[#987532] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Detailed Floor Plan</span>
                </button>

                <button
                  onClick={onOpenBrochure}
                  className="w-full py-3 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#b38b36]" />
                  <span>Download Project Brochure</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
