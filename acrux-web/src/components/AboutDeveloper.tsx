"use client";

import React from "react";
import { Building, Users, Clock, Award, CheckCircle2 } from "lucide-react";

export default function AboutDeveloper() {
  const developerStats = [
    {
      icon: Clock,
      number: "20+",
      label: "Years of Heritage",
      note: "Established in 2002 with relentless dedication",
    },
    {
      icon: Building,
      number: "40+",
      label: "Iconic Landmarks",
      note: "Defining Bhubaneswar's residential skyline",
    },
    {
      icon: Users,
      number: "1,000+",
      label: "Happy Families",
      note: "Earning a cherished place in Odiyas' hearts",
    },
    {
      icon: Award,
      number: "100%",
      label: "Quality & Trust",
      note: "Unwavering commitment to engineering rigor",
    },
  ];

  const deliveredProjects = [
    "Acrux Sankalp",
    "Acrux Residency",
    "Acrux Chitra",
    "Acrux Neon, Rudrapur",
    "Acrux Acropolis, Gothapatna",
    "Gymkhana Palm Heights, Shyampur",
    "Gymkhana Palm Residency",
    "Arcon Retreat",
    "Acrux Basudev",
  ];

  return (
    <section id="developer" className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-[#b38b36]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f2e7] border border-[#b38b36]/30 text-xs font-bold uppercase tracking-[0.25em] text-[#b38b36]">
              The Developer
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight">
              A Legacy of Trust,{" "}
              <span className="text-[#b38b36] italic font-normal">Crafted Over Two Decades</span>
            </h2>

            {/* Exactly requested developer text */}
            <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
              Incorporated in 2002, Acrux Realcon has grown into a renowned real estate name,
              delivering world-class residential and commercial projects across Odisha. Known for
              understanding client needs, innovative design, and unwavering quality, Acrux has built
              landmarks that now define Bhubaneswar&apos;s skyline, earning a special place in
              Odiyas&apos; hearts.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#b38b36] font-bold block">
                Portfolio of Renowned Odisha Landmarks
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {deliveredProjects.map((proj, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b38b36] shrink-0" />
                    <span className="truncate font-medium">{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Stat Cards in Crisp White */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {developerStats.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-2xl bg-white border border-neutral-200 hover:border-[#b38b36] transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#f7f2e7] text-[#b38b36] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 group-hover:text-[#b38b36] transition-colors">
                      {item.number}
                    </div>
                    <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider mt-1">
                      {item.label}
                    </div>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
