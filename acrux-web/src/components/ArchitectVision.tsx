"use client";

import React from "react";
import Image from "next/image";
import { Quote, Compass, Sun, Wind, Eye, Award } from "lucide-react";

export default function ArchitectVision() {
  const designPrinciples = [
    {
      icon: Sun,
      title: "Solar Orientation",
      description: "Angles calculated to maximize ambient morning sunlight while shielding from intense midday thermal load.",
    },
    {
      icon: Wind,
      title: "Cross Wind Corridors",
      description: "Tower placement designed to harness the canal breeze and natural airflow across every residential floor.",
    },
    {
      icon: Eye,
      title: "Unbroken Horizons",
      description: "Carefully staggered towers ensure uninterrupted vistas of lush landscapes and urban skylines.",
    },
    {
      icon: Compass,
      title: "Vastu & Geometry",
      description: "Harmonious spatial planning adhering to time-honored architectural balance and ergonomic flow.",
    },
  ];

  return (
    <section id="architect" className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-[#b38b36]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with exact requested text */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f2e7] border border-[#b38b36]/30 text-[#b38b36] text-xs uppercase tracking-[0.25em] font-bold">
            Visionary Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight">
            A Living Masterpiece{" "}
            <span className="italic font-normal text-[#b38b36]">By A Master Architect</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
            Every tower, curve, and balcony at Acrux Aakaar has been crafted with deliberate purpose,
            embodying the synthesis of aesthetics, engineering, and human well-being.
          </p>
        </div>

        {/* Architect Feature Box in Crisp White */}
        <div className="rounded-3xl bg-white border border-[#b38b36]/25 overflow-hidden shadow-xl p-6 sm:p-10 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Architect Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 shadow-lg group bg-neutral-900">
                <Image
                  src="/assets/Project/Architect_Portrait.webp"
                  alt="Architect Ramesh Swain - Acrux Master Architect"
                  fill
                  className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs uppercase tracking-widest text-[#f5e3b5] font-bold">
                    Chief Architect & Visionary
                  </div>
                  <div className="text-xl font-serif font-medium mt-0.5">
                    Ar. Ramesh Swain
                  </div>
                  <div className="text-xs text-neutral-300">
                    Acrux Realcon Architectural Guild
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Narrative & Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-3 w-fit rounded-xl bg-[#f7f2e7] text-[#b38b36]">
                <Quote className="w-8 h-8" />
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-neutral-900 leading-relaxed font-light">
                &ldquo;True architecture is not about filling space with concrete; it is about choreographing light, wind, and emotions so that coming home feels like an embrace.&rdquo;
              </blockquote>

              <p className="text-neutral-600 text-sm leading-relaxed font-light">
                Acrux Aakaar was envisioned as a sanctuary in Patia where five towers converse
                with nature. Rather than building walls that isolate, the architecture integrates
                60% open greenery, wind corridors from the Daya Canal, and generous sunlit verandas
                that bring tranquility into daily living.
              </p>

              {/* Award / Credentials badge in White & Gold */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#f7f2e7] text-[#b38b36]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Master-Planned Perfection
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      B+S+21 Structural Excellence
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#f7f2e7] text-[#b38b36]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Biophilic Microclimate
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Canal Breeze & Green Canopy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Design Pillars in White & Gold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designPrinciples.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-[#b38b36] hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f7f2e7] flex items-center justify-center text-[#b38b36] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif font-medium text-neutral-900 mb-1.5">
                  {pillar.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
