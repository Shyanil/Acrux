"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Baby, Dumbbell, Heart } from "lucide-react";

interface AmenityCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  items: {
    name: string; // strictly 2 words
    image: string;
    caption: string;
  }[];
}

const categories: AmenityCategory[] = [
  {
    id: "kids",
    name: "Kids Amenities",
    icon: Baby,
    tagline: "Inspiring safe, active, and joyful play environments",
    items: [
      {
        name: "Play Zone",
        image: "/assets/Project/Podium_Garden.webp",
        caption: "Adventure play spaces with safety flooring",
      },
      {
        name: "Toddler Sandpit",
        image: "/assets/Project/Central_Lawn.webp",
        caption: "Sensory outdoor discovery and sandbox",
      },
      {
        name: "Skating Rink",
        image: "/assets/Project/Plaza_Blocks_AB.webp",
        caption: "Smooth dedicated surface for young skaters",
      },
      {
        name: "Splash Fountain",
        image: "/assets/Project/Zen_Pond.webp",
        caption: "Interactive low-depth water splash arena",
      },
    ],
  },
  {
    id: "adults",
    name: "Adults Amenities",
    icon: Dumbbell,
    tagline: "Active fitness, relaxation, and bespoke entertainment",
    items: [
      {
        name: "Fitness Gym",
        image: "/assets/CLUB RENDERS/GYM.webp",
        caption: "State-of-the-art cardio and weight equipment",
      },
      {
        name: "Mini Theatre",
        image: "/assets/CLUB RENDERS/AV_ROOM.webp",
        caption: "Private 4K digital cinema screening room",
      },
      {
        name: "Sky Lounge",
        image: "/assets/Project/Rooftop_Sky_Lounge.webp",
        caption: "Rooftop panoramic sunset terrace",
      },
      {
        name: "Banquet Hall",
        image: "/assets/CLUB RENDERS/SOCIETY HALL.webp",
        caption: "Grand celebrations and community galas",
      },
    ],
  },
  {
    id: "elderly",
    name: "Elderly Amenities",
    icon: Heart,
    tagline: "Quiet nature, tranquil water, and serene relaxation",
    items: [
      {
        name: "Zen Pond",
        image: "/assets/Project/Zen_Pond.webp",
        caption: "Meditative cascading rock fountain",
      },
      {
        name: "Senior Pavilion",
        image: "/assets/Project/Rooftop_Pergola.webp",
        caption: "Shaded pergolas for morning conversation",
      },
      {
        name: "Reflexology Walk",
        image: "/assets/Project/Central_Lawn.webp",
        caption: "Textured acupressure pathway in greenery",
      },
      {
        name: "Lush Promenade",
        image: "/assets/Project/Entrance_Sunrise.webp",
        caption: "Tree-lined pedestrian-only walking track",
      },
    ],
  },
];

export default function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentCategory = categories[activeTab];

  return (
    <section id="amenities" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with exact requested heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-[#976932] text-xs uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#976932]" />
            <span>Lifestyle Perfection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light leading-tight">
            Amenities Chosen For Comfort,{" "}
            <span className="italic font-normal text-[#976932]">
              Perfected For A Complete Lifestyle
            </span>
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Every amenity has been intentionally curated to cater to every generation across your family.
          </p>

          {/* Category Tabs in White & Gold */}
          <div className="pt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-[#976932] text-white shadow-md shadow-[#976932]/25"
                      : "bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Large Visual Cards in Crisp White & Gold */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentCategory.items.map((item, idx) => (
              <div
                key={item.name}
                className="group relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badge: 2-Word Pill in White & Gold */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-bold shadow-md">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Content: Clean 2-Word Title and Short Micro-Line */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="text-xl font-serif font-normal text-white group-hover:text-[#976932] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-200 font-light mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
