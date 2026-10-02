"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  category: "all" | "architecture" | "clubhouse" | "interiors" | "landscape";
  aspect: string;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/assets/Project/Master_Elevation.webp",
    title: "5 Towers Night Elevation",
    category: "architecture",
    aspect: "col-span-1 md:col-span-2 row-span-2 aspect-[16/10]",
    caption: "Iconic B+S+21 storey towers illuminated against the Bhubaneswar evening sky.",
  },
  {
    src: "/assets/CLUB RENDERS/GYM.webp",
    title: "High-Tech Fitness Centre",
    category: "clubhouse",
    aspect: "col-span-1 aspect-square",
    caption: "Cardiovascular and strength equipment overlooking garden promenades.",
  },
  {
    src: "/assets/Interiors/Living_Dining_Room.webp",
    title: "Grand Living & Sundeck",
    category: "interiors",
    aspect: "col-span-1 aspect-square",
    caption: "Open-concept luxury living lounge with panoramic sliding glass panels.",
  },
  {
    src: "/assets/Project/Clubhouse_Exterior.webp",
    title: "G+3 Clubhouse Architecture",
    category: "clubhouse",
    aspect: "col-span-1 aspect-square",
    caption: "Striking perforated modern facade housing multi-level recreation.",
  },
  {
    src: "/assets/Project/Zen_Pond.webp",
    title: "Cascading Zen Pond",
    category: "landscape",
    aspect: "col-span-1 aspect-square",
    caption: "Tranquil koi lagoon with natural stone waterfall and wooden deck.",
  },
  {
    src: "/assets/Interiors/Master_Bedroom.webp",
    title: "Master Suite & Glass Wardrobe",
    category: "interiors",
    aspect: "col-span-1 md:col-span-2 aspect-[16/9]",
    caption: "Designer suite featuring floor-to-ceiling illuminated glass walk-in closets.",
  },
  {
    src: "/assets/Project/Rooftop_Sky_Lounge.webp",
    title: "Rooftop Sky Cabanas",
    category: "architecture",
    aspect: "col-span-1 aspect-square",
    caption: "Perched 21 storeys high with open-air sunset seating.",
  },
  {
    src: "/assets/CLUB RENDERS/AV_ROOM.webp",
    title: "Private Screening Mini Theatre",
    category: "clubhouse",
    aspect: "col-span-1 aspect-square",
    caption: "Acoustically treated private cinema with plush leather recliners.",
  },
  {
    src: "/assets/Project/Central_Lawn.webp",
    title: "Central Great Lawn",
    category: "landscape",
    aspect: "col-span-1 md:col-span-2 aspect-[16/9]",
    caption: "Over 60% open greens designed as a peaceful community amphitheatre.",
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-[#976932] text-xs uppercase tracking-[0.25em] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#976932]" />
              <span>Visual Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 font-light tracking-tight leading-tight">
              A Glimpse Into{" "}
              <span className="italic font-normal text-[#976932]">
                Grandeur
              </span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light">
              Explore the architectural finesse, serene landscapes, and lavish interior spaces of Acrux Aakaar.
            </p>
          </div>

          {/* Filter Tabs in White & Gold */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All" },
              { id: "architecture", label: "Architecture" },
              { id: "clubhouse", label: "Clubhouse" },
              { id: "interiors", label: "Interiors" },
              { id: "landscape", label: "Landscape" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#976932] text-white shadow-md shadow-[#976932]/25"
                    : "bg-neutral-100 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 border border-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((image, idx) => (
            <motion.div
              key={image.src + idx}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 cursor-pointer aspect-square shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#976932] block font-bold">
                    {image.category}
                  </span>
                  <h4 className="text-sm font-serif font-medium">{image.title}</h4>
                </div>
                <div className="p-2 rounded-full bg-white/95 text-neutral-900 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-[#976932]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left / Right Nav Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image Frame */}
            <div
              className="relative max-w-5xl w-full max-h-[80vh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-serif">
                    {filteredImages[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-1">
                    {filteredImages[lightboxIndex].caption}
                  </p>
                </div>
                <div className="text-xs font-mono text-[#976932] font-bold">
                  {lightboxIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
