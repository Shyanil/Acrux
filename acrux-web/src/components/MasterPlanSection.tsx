"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Download, X, Layers, Compass } from "lucide-react";

interface MasterPlanProps {
  onOpenBrochure: () => void;
  onOpenEnquiry: () => void;
}

const legends = [
  { id: "1", title: "Grand Entry / Exit Boulevard", note: "12.19m (40'0\") Wide Approach Road" },
  { id: "2", title: "Daya West Canal Frontage", note: "Scenic Waterfront Boulevard & Green Promenade" },
  { id: "3", title: "Block A1 & A2", note: "B + S + P + 17 Storeys (Luxury Suites)" },
  { id: "4", title: "Block B1 & B2", note: "B + S + 21 Storeys (High-Rise Horizons)" },
  { id: "5", title: "Block C", note: "B + S + 21 Storeys (Central Greens Facing)" },
  { id: "6", title: "Block D", note: "B + S + 21 Storeys (Park & Club View)" },
  { id: "7", title: "Block E", note: "B + S + 21 Storeys (East Wing Residences)" },
  { id: "8", title: "G+3 Exclusive Clubhouse", note: "Gym, Mini Theatre, Reception & Banquet" },
  { id: "9", title: "Central Sunlit Great Lawn", note: "Lush Amphitheatre & Event Greens" },
  { id: "10", title: "Podium Garden & Pavilions", note: "Stepped Plazas & Circular Pergolas" },
  { id: "11", title: "Children's Adventure Play Zone", note: "Climbing Wall, Sandpit & Skating Rink" },
  { id: "12", title: "Internal Circulation Boulevard", note: "7.5m Wide Peripheral Driveways with Zero Pedestrian Interference" },
];

export default function MasterPlanSection({ onOpenBrochure, onOpenEnquiry }: MasterPlanProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="master-plan" className="py-24 lg:py-32 bg-[#F7F5F0] relative overflow-hidden border-t border-[#976932]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-[#976932] text-xs uppercase tracking-[0.25em] font-bold">
            Layout & Master Plan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight">
            An Intelligently Master-Planned{" "}
            <span className="italic font-normal text-[#976932]">Sanctuary</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
            Sprawling across a prime land parcel along the Daya West Canal with a dedicated
            12.19m wide entry avenue, 5 iconic towers, and 60% open landscape expanse.
          </p>
        </div>

        {/* Master Plan Visual Card in Crisp White */}
        <div className="rounded-3xl bg-white border border-neutral-200 p-4 sm:p-6 shadow-xl mb-12">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#F7F5F0] text-[#976932]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Acrux Aakaar Site Master Layout</h3>
                <span className="text-[11px] text-neutral-500 font-medium">Patia, Bhubaneswar • 5 Towers • 556 Units</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxOpen(true)}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-all border border-neutral-200"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#976932]" />
                <span>Zoom Fullscreen</span>
              </button>
              <button
                onClick={onOpenBrochure}
                className="px-4 py-2 rounded-xl bg-[#976932] hover:bg-[#102038] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Master Plan</span>
              </button>
            </div>
          </div>

          {/* Master Plan Image Frame */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-pointer group bg-neutral-50 border border-neutral-200"
          >
            <Image
              src="/assets/Project/Master_Plan.webp"
              alt="Acrux Aakaar Master Plan Layout"
              fill
              className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-white text-neutral-900 text-xs font-bold border border-[#976932]/40 backdrop-blur-md flex items-center gap-2 shadow-xl">
                <Maximize2 className="w-4 h-4 text-[#976932]" />
                Click to Expand Master Plan
              </span>
            </div>
          </div>
        </div>

        {/* Master Plan Legends Grid in Crisp White & Gold */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <h3 className="text-lg font-serif font-semibold text-neutral-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#976932]" />
              <span>Master Plan Key Legends & Zoning Index</span>
            </h3>
            <span className="text-xs text-neutral-500 font-medium">12 Primary Architectural Landmarks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {legends.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#976932] transition-all shadow-2xs hover:shadow-md flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-[#976932] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {item.id}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{item.title}</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h4 className="text-lg font-serif text-white">Acrux Aakaar — High-Resolution Master Plan</h4>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative flex-1 w-full mt-4">
            <Image
              src="/assets/Project/Master_Plan.webp"
              alt="Acrux Aakaar Master Plan Fullscreen"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
