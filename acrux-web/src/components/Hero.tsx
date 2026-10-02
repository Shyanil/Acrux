"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Download,
  Calendar,
  ArrowDown,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  onOpenBrochure: () => void;
  onOpenEnquiry: () => void;
}

const slides = [
  {
    title: "A Living Masterpiece Awaits",
    subtitle: "556 Ultra-Luxury Residences Across 5 Towers in Patia, Bhubaneswar",
    image: "/assets/Project/Master_Elevation.webp",
    badge: "Architectural Landmark",
    highlight: "5 Towers • B+S+21 Floors • 60% Open Greens",
  },
  {
    title: "Imagined By A Dreamer",
    subtitle: "Conceived by Acrux Realcon & Master Architects with Timeless Precision",
    image: "/assets/Project/Entrance_Dusk.webp",
    badge: "Exclusive G+3 Clubhouse & Grand Gateway",
    highlight: "Private Screening Theatre • High-Tech Gym • Society Hall",
  },
  {
    title: "Sun-Kissed Homes, Perfected Living",
    subtitle: "B+S+21 Storey Residences Overlooking 60% Open Greenery & Daya Canal",
    image: "/assets/Project/Entrance_Sunrise.webp",
    badge: "2.5 & 3 BHK | 1,790 – 2,148 Sq. Ft.",
    highlight: "Panoramic Sundecks • Vastu Compliant • Lush Canopy",
  },
];

export default function Hero({ onOpenBrochure, onOpenEnquiry }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const current = slides[currentSlide];

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-white"
    >
      {/* Background Slideshow with Slow Cinematic Ken Burns */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              className="object-cover object-center filter brightness-[0.82] contrast-[1.05]"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Luxury Multi-stop Gradient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Hero Main Content (80% Visual, 20% Text, NO FORM!) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 sm:pt-40 lg:pt-44 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow Location Pill in White & Gold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#976932]/40 text-neutral-900 text-xs font-semibold tracking-[0.25em] uppercase shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#976932] animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-[#976932]" />
            <span>Chandrasekharpur, Patia, Bhubaneswar</span>
          </motion.div>

          {/* Grand Project Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white tracking-tight leading-[1.08] drop-shadow-md">
              ACRUX <span className="font-normal text-[#976932]">AAKAAR</span>
            </h1>
          </motion.div>

          {/* Animated Slider Copy */}
          <div className="h-16 sm:h-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-1.5"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide drop-shadow-sm">
                  &ldquo;{current.title}&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-neutral-200 font-light tracking-wider max-w-2xl">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal Elegant White & Gold CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <a
              href="#residences"
              className="px-7 py-3.5 rounded-full bg-[#976932] hover:bg-[#102038] text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_0_25px_rgba(151,105,50,0.4)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 group"
            >
              <span>Explore Residences</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenEnquiry}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 border border-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center gap-2 hover:border-[#976932]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#976932]" />
              <span>Enquire Now</span>
            </button>

            <button
              onClick={onOpenBrochure}
              className="px-5 py-3.5 text-xs text-white hover:text-[#976932] tracking-widest uppercase transition-colors flex items-center gap-2 underline underline-offset-8 decoration-white/60 hover:decoration-[#976932] font-medium"
            >
              <Download className="w-3.5 h-3.5 text-[#976932]" />
              <span>Download Brochure</span>
            </button>
          </motion.div>
        </div>

        {/* Slide Controls & Carousel Toggles */}
        <div className="py-6 flex items-center justify-between border-b border-white/20 mt-8">
          {/* Slide Indicator Dots & Numbers */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#976932] tracking-widest font-bold">
              0{currentSlide + 1}
            </span>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentSlide
                      ? "w-8 bg-[#976932]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-neutral-300 tracking-widest">
              0{slides.length}
            </span>
          </div>

          {/* Left / Right Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-neutral-900 border border-white/30 transition-all backdrop-blur-xs"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-neutral-900 border border-white/30 transition-all backdrop-blur-xs"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Project Information Strip in Pure Architectural White */}
      <div className="relative z-10 w-full bg-white/98 backdrop-blur-xl border-t border-[#976932]/30 py-5 sm:py-6 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            {/* Info 1 */}
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.25em] text-[#976932] uppercase font-bold block">
                Prime Location
              </span>
              <p className="text-sm font-semibold text-neutral-900">
                Chandrasekharpur, Patia
              </p>
              <p className="text-[11px] text-neutral-500">Adjacent Daya West Canal</p>
            </div>

            {/* Info 2 */}
            <div className="space-y-1 sm:pl-8 pt-4 sm:pt-0">
              <span className="text-[10px] tracking-[0.25em] text-[#976932] uppercase font-bold block">
                Configurations
              </span>
              <p className="text-sm font-semibold text-neutral-900">
                2.5 BHK & 3 BHK Suites
              </p>
              <p className="text-[11px] text-neutral-500">1,790 – 2,148 Sq. Ft.</p>
            </div>

            {/* Info 3 */}
            <div className="space-y-1 sm:pl-8 pt-4 sm:pt-0">
              <span className="text-[10px] tracking-[0.25em] text-[#976932] uppercase font-bold block">
                Project Scale
              </span>
              <p className="text-sm font-semibold text-neutral-900">
                5 Towers • 556 Residences
              </p>
              <p className="text-[11px] text-neutral-500">B+S+21 Storey Horizons</p>
            </div>

            {/* Info 4 */}
            <div className="space-y-1 sm:pl-8 pt-4 sm:pt-0">
              <span className="text-[10px] tracking-[0.25em] text-[#976932] uppercase font-bold block">
                Expanse & Nature
              </span>
              <p className="text-sm font-semibold text-neutral-900">
                60% Open Greens
              </p>
              <p className="text-[11px] text-neutral-500">Zen Ponds & Sky Pergolas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
