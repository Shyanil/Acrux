"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Film, Users, Sparkles, Building } from "lucide-react";

const clubSpaces = [
  {
    id: "facade",
    title: "The G+3 Clubhouse Pavilion",
    subtitle: "A contemporary architectural landmark with perforated acoustic facade and multi-tier recreation.",
    badge: "Landmark Facade",
    icon: Building,
    image: "/assets/Project/Clubhouse_Exterior.webp",
    detail: "Housing three levels of exclusive fitness, social, and indoor wellness facilities.",
  },
  {
    id: "gym",
    title: "High-Tech Fitness Centre",
    subtitle: "Fitted with state-of-the-art cardiovascular, resistance, and strength training equipment.",
    badge: "Health & Fitness",
    icon: Dumbbell,
    image: "/assets/CLUB RENDERS/GYM.webp",
    detail: "Floor-to-ceiling glass wall looking out over manicured garden boulevards.",
  },
  {
    id: "theatre",
    title: "Private Screening AV Theatre",
    subtitle: "Acoustically engineered mini-theatre with plush leather recliners and 4K digital projection.",
    badge: "Entertainment",
    icon: Film,
    image: "/assets/CLUB RENDERS/AV_ROOM.webp",
    detail: "Host private cinema screenings, sports matches, and family film nights in quiet privacy.",
  },
  {
    id: "hall",
    title: "Society Banquet & Grand Hall",
    subtitle: "A double-height ballroom designed for community festivities, milestones, and banquet dinners.",
    badge: "Community Galas",
    icon: Users,
    image: "/assets/CLUB RENDERS/SOCIETY HALL.webp",
    detail: "Complete with staging area, designer crystal lighting, and pantry support.",
  },
  {
    id: "reception",
    title: "Concierge & Arrival Lounge",
    subtitle: "Air-conditioned grand welcoming foyer with 24/7 building management and guest lounge.",
    badge: "Hospitality",
    icon: Sparkles,
    image: "/assets/CLUB RENDERS/Reception.webp",
    detail: "Imported marble finishes, custom wood fluting, and discrete concierge services.",
  },
];

export default function ClubhouseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = clubSpaces[activeTab];

  return (
    <section id="clubhouse" className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-[#b38b36]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f2e7] border border-[#b38b36]/30 text-[#b38b36] text-xs uppercase tracking-[0.25em] font-bold">
              Private Members&apos; Realm
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light tracking-tight leading-tight">
              The G+3 Clubhouse —{" "}
              <span className="italic font-normal text-[#b38b36]">
                A World Within
              </span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light">
              An architectural jewel dedicated to wellness, recreation, and sophisticated entertainment for Acrux Aakaar residents.
            </p>
          </div>

          <span className="text-xs uppercase tracking-widest text-[#b38b36] font-mono font-bold hidden md:block">
            G+3 Dedicated Levels
          </span>
        </div>

        {/* Big Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
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
                    {current.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white">{current.title}</h3>
                  <p className="text-xs text-neutral-200 font-light max-w-lg">
                    {current.subtitle}
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-bold shrink-0 shadow-md">
                  {activeTab + 1} / {clubSpaces.length}
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Space Selector List in Crisp White & Gold */}
          <div className="lg:col-span-4 space-y-3">
            {clubSpaces.map((space, idx) => {
              const Icon = space.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={space.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                    isActive
                      ? "border-[#b38b36] bg-white shadow-md ring-1 ring-[#b38b36]/20"
                      : "border-neutral-200/80 bg-white/70 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg shrink-0 ${
                      isActive ? "bg-[#b38b36] text-white shadow-sm" : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#b38b36] font-bold">
                        {space.badge}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono font-bold">0{idx + 1}</span>
                    </div>
                    <h4
                      className={`text-sm font-semibold truncate mt-0.5 ${
                        isActive ? "text-neutral-900" : "text-neutral-700"
                      }`}
                    >
                      {space.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-normal line-clamp-1 mt-0.5">
                      {space.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
