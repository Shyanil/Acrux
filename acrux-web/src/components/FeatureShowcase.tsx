"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeatureShowcase() {
  return (
    <section className="bg-white space-y-24 lg:space-y-32 overflow-hidden py-16">
      {/* Spread 1: The Master Elevation (Wide Cinema Spread on White) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#b38b36] font-bold block">
                01 / Architectural Majesty
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light leading-tight">
                Architecture in Grand{" "}
                <span className="italic font-normal text-[#b38b36]">Proportion</span>
              </h2>
            </div>
            <p className="text-neutral-600 text-sm max-w-md font-light leading-relaxed">
              Five iconic towers soaring 21 storeys, geometrically staggered to preserve uninterrupted horizon views and endless natural light.
            </p>
          </div>

          {/* Full-width Cinema Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-neutral-900 group"
          >
            <Image
              src="/assets/Project/Master_Elevation.webp"
              alt="Acrux Aakaar 5 Towers Elevation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            {/* Bottom floating details in White & Gold */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-bold shadow-md">
                  B+S+21 Floors
                </span>
                <span className="text-xs text-neutral-200 font-light">
                  5 High-Rise Residential Blocks
                </span>
              </div>
              <div className="text-xs text-neutral-300 font-mono tracking-widest uppercase">
                Daya West Canal Corridor • Patia
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spread 2: Sanctuary of Nature & Water (Asymmetric 2-Image Spread on Soft Cream) */}
      <div className="py-20 bg-[#FAF8F5] border-y border-[#b38b36]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Pair */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 shadow-md group bg-white">
                <Image
                  src="/assets/Project/Central_Lawn.webp"
                  alt="Central Lawn"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="text-[#f5e3b5] font-bold uppercase tracking-wider block text-[10px]">
                    Central Great Lawn
                  </span>
                  <p className="text-neutral-200 text-[11px] font-light mt-0.5">
                    Sunlit open amphitheatre & lush lawns
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 shadow-md group sm:translate-y-8 bg-white">
                <Image
                  src="/assets/Project/Zen_Pond.webp"
                  alt="Zen Pond & Waterfall"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="text-[#f5e3b5] font-bold uppercase tracking-wider block text-[10px]">
                    Cascading Zen Pond
                  </span>
                  <p className="text-neutral-200 text-[11px] font-light mt-0.5">
                    Tranquil koi lagoon & stone waterfall
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Editorial Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-6 lg:pl-6"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[#b38b36] font-bold block">
                02 / Landscape Sanctuary
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light leading-tight">
                60% Open Greens &{" "}
                <span className="italic font-normal text-[#b38b36]">
                  Serene Waters
                </span>
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
                Step away from the urban noise into a botanical sanctuary. Designed with expansive central lawns, cascading rock waterfalls, and fragrant tree-lined promenades where every breath feels pure.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-neutral-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b38b36]" />
                  <span>Central sunlit amphitheatre lawn</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b38b36]" />
                  <span>Tranquil koi pond with cascading stone fountain</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b38b36]" />
                  <span>Dedicated senior citizen reflexology paths</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spread 3: Rooftop Sky Living (Editorial Split on White) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6 order-2 lg:order-1"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#b38b36] font-bold block">
              03 / Rooftop Leisure
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light leading-tight">
              Where Evenings Touch{" "}
              <span className="italic font-normal text-[#b38b36]">The Sky</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
              Perched twenty-one storeys above the city, the exclusive rooftop sky lounge and stargazing pergola cabanas provide an elevated realm for private conversations, sunset contemplation, and twilight celebrations.
            </p>

            <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#b38b36]/25 space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#b38b36] font-bold">
                Skyline Elevation
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Panoramic 360° views across Patia, KIIT, and the lush green horizon of Bhubaneswar.
              </p>
            </div>
          </motion.div>

          {/* Visual Pair */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 shadow-md group bg-white">
              <Image
                src="/assets/Project/Rooftop_Sky_Lounge.webp"
                alt="Rooftop Sky Lounge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="text-[#f5e3b5] font-bold uppercase tracking-wider block text-[10px]">
                  Rooftop Sky Lounge
                </span>
                <p className="text-neutral-200 text-[11px] font-light mt-0.5">
                  Sunset cabanas & city horizon vistas
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 shadow-md group sm:translate-y-8 bg-white">
              <Image
                src="/assets/Project/Rooftop_Pergola.webp"
                alt="Rooftop Pergola"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="text-[#f5e3b5] font-bold uppercase tracking-wider block text-[10px]">
                  Stargazing Pergola
                </span>
                <p className="text-neutral-200 text-[11px] font-light mt-0.5">
                  Geometric timber trellis & evening breeze
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
