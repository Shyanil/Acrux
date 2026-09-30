"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  Layers,
  Trees,
  CheckCircle,
  Download,
  Calendar,
  Sparkles,
} from "lucide-react";

interface HeroSliderProps {
  onOpenBrochure: () => void;
  onOpenEnquiry: () => void;
}

const slides = [
  {
    title: "A Living Masterpiece Awaits",
    subtitle: "556 Ultra-Luxury Residences Across 5 Towers in Patia, Bhubaneswar",
    image: "/assets/Project/Master_Elevation.webp",
    badge: "Upcoming Architectural Landmark",
    highlight: "5 Towers • B+S+21 Floors • 60% Open Space",
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
    badge: "2.5 & 3 BHK | 1790 – 2148 Sq. Ft.",
    highlight: "Panoramic Sundecks • Vastu Compliant • Lush Canopy",
  },
];

export default function HeroSlider({ onOpenBrochure, onOpenEnquiry }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    unitType: "3 BHK (2148 Sq. Ft.)",
  });

  // Slide timer & progress animation
  useEffect(() => {
    setProgress(0);
    const intervalTime = 6000;
    const stepTime = 50;
    const increment = (stepTime / intervalTime) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(progressTimer);
  }, [currentSlide]);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#080B10]">
      {/* Background Slides with AnimatePresence */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover object-center filter brightness-90 animate-kenburns"
              priority
            />
            {/* Multi-layered cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080B10]/95 via-[#080B10]/75 to-[#080B10]/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-[#080B10]/70" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Brand & Headlines */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Project Pill Badge with Gold Glow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 backdrop-blur-md shadow-lg shadow-[#c5a059]/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin-slow" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#f5e3b5]">
                {current.badge}
              </span>
            </motion.div>

            {/* Main Animated Headlines */}
            <div className="space-y-3 min-h-[140px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.7 }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white leading-[1.1]">
                    <span className="block text-gold-gradient font-medium italic">
                      &ldquo;{current.title}&rdquo;
                    </span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-brand font-light tracking-wide text-slate-200 mt-2">
                      At Acrux Aakaar, Patia
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-light leading-relaxed mt-3">
                    {current.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4 Quick Stat Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1"
            >
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md hover:border-[#c5a059]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#d4af37] mb-1">
                  <Building className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Units
                  </span>
                </div>
                <div className="text-base font-bold text-white">556 Homes</div>
                <div className="text-[10px] text-slate-400">5 High-Rise Towers</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md hover:border-[#c5a059]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#d4af37] mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Structure
                  </span>
                </div>
                <div className="text-base font-bold text-white">B + S + 21</div>
                <div className="text-[10px] text-slate-400">Iconic Elevation</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md hover:border-[#c5a059]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#d4af37] mb-1">
                  <Trees className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Greenery
                  </span>
                </div>
                <div className="text-base font-bold text-white">60% Open</div>
                <div className="text-[10px] text-slate-400">Canal Frontage</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md hover:border-[#c5a059]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#d4af37] mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Sizes
                  </span>
                </div>
                <div className="text-base font-bold text-white">2.5 &amp; 3 BHK</div>
                <div className="text-[10px] text-slate-400">1790–2148 Sq. Ft.</div>
              </div>
            </motion.div>

            {/* CTAs & Address line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenEnquiry}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b88f32] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 hover:shadow-xl hover:shadow-[#d4af37]/25 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Book VIP Site Visit</span>
              </button>

              <button
                onClick={onOpenBrochure}
                className="px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-[#c5a059]/40 text-slate-200 hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer hover:border-[#d4af37]"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
                <span>Download Brochure (PDF)</span>
              </button>
            </motion.div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Plot No. 15W, Chandrasekharpur, Patia, Bhubaneswar, Odisha 751 021</span>
            </div>
          </div>

          {/* Right Column: Quick Lead Capture Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-gradient-to-b from-[#131924]/95 via-[#0E131C]/95 to-[#090C12]/95 border border-[#c5a059]/35 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88f32] text-black text-[10px] font-bold uppercase tracking-wider shadow-md">
                VIP Priority Access
              </div>

              <div className="space-y-1.5 mb-5">
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  Register For Launch Privileges
                </h3>
                <p className="text-xs text-slate-300 font-light">
                  Receive instant pricing, floor plans, and priority allocation on WhatsApp.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#d4af37] mx-auto animate-bounce" />
                  <h4 className="text-lg font-serif text-white">Thank You for Connecting!</h4>
                  <p className="text-xs text-slate-300">
                    Our Senior Acrux Relationship Manager will reach out within 15 minutes with
                    exclusive project insights.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Mohanty"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-700/80 bg-slate-900 text-slate-300 text-xs font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-r-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Apartment Configuration
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["2.5 BHK (1790 Sq. Ft.)", "3 BHK (2148 Sq. Ft.)"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, unitType: type })}
                          className={`py-2 px-2 text-[11px] rounded-lg font-medium border text-center transition-all cursor-pointer ${
                            formData.unitType === type
                              ? "bg-[#c5a059]/25 border-[#d4af37] text-[#f5e3b5] font-semibold"
                              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88f32] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#d4af37]/20 mt-2 cursor-pointer"
                  >
                    Request Callback &amp; Pricing
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                    <span>🔒 100% Privacy Guaranteed</span>
                    <span>Zero Brokerage</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Slide Progress Bar & Navigation Controls */}
        <div className="mt-10 pt-6 border-t border-white/10 space-y-3">
          {/* Animated Progress Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5e3b5]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`text-xs uppercase tracking-wider transition-all duration-300 ${
                    idx === currentSlide
                      ? "text-[#d4af37] font-semibold"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
                }
                className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
