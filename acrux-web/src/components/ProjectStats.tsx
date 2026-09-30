"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProjectStats() {
  const stats = [
    {
      number: "556",
      label: "Apartments",
      detail: "Ultra-luxury high-rise residences",
    },
    {
      number: "5",
      label: "Towers",
      detail: "Iconic B+S+21 floor elevations",
    },
    {
      number: "60%",
      label: "Open Greens",
      detail: "Manicured lawns & zen water bodies",
    },
    {
      number: "2.5 & 3",
      label: "BHK Configurations",
      detail: "1,790 – 2,148 Sq. Ft. super built-up",
    },
  ];

  return (
    <section className="py-20 bg-[#FBF9F5] border-y border-[#b38b36]/25 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`text-center space-y-2.5 ${idx !== 0 ? "sm:pl-8 pt-6 sm:pt-0" : ""}`}
            >
              {/* Visually Dominant Number in Rich Gold */}
              <div className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-[#b38b36] tracking-tight">
                {stat.number}
              </div>

              {/* Minimal Uppercase Label in Dark Charcoal */}
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-900 font-bold">
                {stat.label}
              </h3>

              {/* One line micro-detail */}
              <p className="text-[11px] sm:text-xs text-neutral-500 font-normal">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
