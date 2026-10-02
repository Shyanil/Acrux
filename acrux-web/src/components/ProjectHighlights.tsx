"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Trees,
  Maximize2,
  Compass,
  ShieldCheck,
  Zap,
  Sparkles,
  Droplets,
  ArrowUpRight,
} from "lucide-react";

export default function ProjectHighlights() {
  const highlights = [
    {
      icon: Building2,
      number: "556",
      label: "Exclusive Apartments",
      desc: "5 majestic high-rise towers engineered for supreme privacy, ventilation, and prestige.",
    },
    {
      icon: Maximize2,
      number: "B + S + 21",
      label: "Architectural Elevation",
      desc: "Iconic towers soaring into Bhubaneswar's skyline with sweeping panoramic views.",
    },
    {
      icon: Trees,
      number: "60%",
      label: "Open Landscaped Greenery",
      desc: "Unspoiled green zones, manicured gardens, water bodies, and pristine fresh air corridors.",
    },
    {
      icon: Compass,
      number: "1790 - 2148",
      label: "Sq. Ft. Living Area",
      desc: "Opulent 2.5 BHK & 3 BHK formats with double-balconies and grand living foyers.",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Daya West Canal Frontage",
      desc: "Scenic water-facing orientation offering serene ambient breezes and unobstructed natural horizons.",
    },
    {
      icon: ShieldCheck,
      title: "Multi-Tiered Smart Security",
      desc: "24/7 CCTV surveillance, RFID boom barriers, digital visitor management, and biometric access control.",
    },
    {
      icon: Zap,
      title: "Sustainable & EV Ready",
      desc: "Dedicated EV charging bays, 100% DG backup for essential services, and solar-assisted pathway lighting.",
    },
    {
      icon: Droplets,
      title: "Eco-Conscious Infrastructure",
      desc: "Advanced rainwater harvesting systems, in-house sewage treatment plant, and energy-efficient building envelope.",
    },
  ];

  return (
    <section id="overview" className="py-24 bg-[#0B0F16] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#976932]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#976932]/10 border border-[#976932]/30 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            Project Overview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
            Where Modern Luxury Meets{" "}
            <span className="text-gold-gradient italic">Timeless Harmony</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Conceived as Bhubaneswar’s most prestigious residential address, Acrux Aakaar unites
            architectural mastery with lush natural environs in the prime enclave of Patia.
          </p>
        </motion.div>

        {/* 4 Stat Cards with Stagger Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group p-7 rounded-2xl bg-gradient-to-b from-[#131924] to-[#0d121b] border border-slate-800/80 hover:border-[#976932]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#976932]/10 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#976932]/10 border border-[#976932]/20 flex items-center justify-center text-[#d4af37] mb-5 group-hover:scale-110 group-hover:bg-[#976932]/20 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-serif font-bold text-white mb-1 group-hover:text-gold-gradient transition-colors">
                  {item.number}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#976932] mb-2">
                  {item.label}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Showcase Feature Split Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl bg-gradient-to-r from-[#111722] via-[#0E131C] to-[#111722] border border-slate-800 p-6 sm:p-10 shadow-2xl"
        >
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Prime Patia Location
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white leading-snug">
                Engineered for Discerning Homeowners Seeking the Extraordinary
              </h3>
            </div>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Every detail at Acrux Aakaar reflects uncompromising standards. From the moment you
              enter through the grand archway along the 12.19-meter wide boulevard, you transition
              into a private sanctuary sheltered from urban commotion yet minutes from IT hubs and
              reputed schools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, i) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#976932]/10 text-[#d4af37] shrink-0 mt-0.5">
                      <FeatIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white tracking-wide">
                        {feat.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#976932]/30 shadow-2xl group">
            <Image
              src="/assets/Project/Plaza_Blocks_AB.webp"
              alt="Acrux Aakaar Block Plaza"
              fill
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-bold">
                Grand Arrival Plaza
              </span>
              <p className="text-sm font-serif font-light text-slate-200 mt-1">
                Lush stepped greens, drop-off pavilions, and ambient architectural lighting
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
