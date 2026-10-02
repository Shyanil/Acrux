"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProjectIntro() {
  return (
    <section id="overview" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle Warm Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#F7F5F0] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Small Label in White & Gold */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-[#976932] text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#976932]" />
              <span>The Project Statement</span>
            </div>

            {/* Large Editorial Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-neutral-900 font-light leading-[1.12] tracking-tight">
              Designed for a life that feels{" "}
              <span className="italic font-normal text-[#976932]">
                transcendent.
              </span>
            </h2>

            {/* 2-4 Short Lines of Supporting Text */}
            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed">
              Acrux Aakaar rises as a beacon of rare architectural distinction in Patia, Bhubaneswar.
              A composition of five soaring 21-storey towers overlooking 60% open greens, crafted for
              those who demand space, pure sunlight, and enduring serenity.
            </p>

            {/* Key Editorial Facets */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
              <div className="space-y-1">
                <span className="text-3xl font-serif text-[#976932] font-normal">556</span>
                <p className="text-xs uppercase tracking-widest text-neutral-800 font-semibold">
                  Exclusive Residences
                </p>
                <p className="text-[12px] text-neutral-500">2.5 & 3 BHK formats</p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-serif text-[#976932] font-normal">60%</span>
                <p className="text-xs uppercase tracking-widest text-neutral-800 font-semibold">
                  Open Greens
                </p>
                <p className="text-[12px] text-neutral-500">Zen ponds & great lawn</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#architecture"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#976932] hover:text-[#7a5426] group font-semibold"
              >
                <span>Discover The Architectural Philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Large Project Image with Clean Architectural Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/assets/Project/Entrance_Dusk.webp"
                  alt="Acrux Aakaar Grand Gateway"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#976932] block font-bold">
                    The Grand Arrival Gate
                  </span>
                  <p className="text-sm font-light text-white mt-0.5">
                    12.19m Boulevard & Cascading Water Mirror
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-bold shadow-md">
                  B+S+21
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
