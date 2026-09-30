"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF8F5] text-neutral-600 text-xs border-t border-[#b38b36]/30 pb-24 sm:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Project Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative w-44 h-11">
              <Image
                src="/assets/Aakaar Logo.webp"
                alt="Acrux Aakaar Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-neutral-600 text-xs font-light leading-relaxed">
              Acrux Aakaar is an ultra-luxury residential masterwork by Acrux Realcon Pvt. Ltd.
              featuring 556 sun-kissed residences across 5 towering edifices in Patia, Bhubaneswar.
            </p>
            <div className="text-[12px] text-[#b38b36] font-serif font-semibold">
              An Architectural Creation by Ar. Ramesh Swain
            </div>
          </div>

          {/* Col 2: Project Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-bold">
              The Residences
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-[#b38b36] transition-colors">
                  Overview &amp; Statement
                </a>
              </li>
              <li>
                <a href="#architect" className="hover:text-[#b38b36] transition-colors">
                  Master Architect
                </a>
              </li>
              <li>
                <a href="#residences" className="hover:text-[#b38b36] transition-colors">
                  2.5 &amp; 3 BHK Suites
                </a>
              </li>
              <li>
                <a href="#clubhouse" className="hover:text-[#b38b36] transition-colors">
                  G+3 Clubhouse
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-[#b38b36] transition-colors">
                  Curated Amenities
                </a>
              </li>
              <li>
                <a href="#master-plan" className="hover:text-[#b38b36] transition-colors">
                  Site Master Plan
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#b38b36] transition-colors">
                  Patia Proximity
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Addresses */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-bold">
              Address &amp; Site
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#b38b36] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-neutral-900">Site:</strong> Plot No. 15W, Chandrasekharpur, Patia, Bhubaneswar, Odisha 751 021
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#b38b36] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-neutral-900">Corporate:</strong> F33/F34 Chandaka Industrial Area Infocity, Bhubaneswar, Odisha 751024
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Direct Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-bold">
              Sales Advisory
            </h4>
            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b38b36] shrink-0" />
                <a href="tel:+919777543339" className="hover:text-[#b38b36] font-bold text-neutral-900">
                  +91 97775 43339
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#b38b36] shrink-0" />
                <a href="mailto:sales@acruxrealcon.in" className="hover:text-[#b38b36] font-medium text-neutral-800">
                  sales@acruxrealcon.in
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 text-xs text-[#b38b36] hover:text-[#8c6b25] font-semibold uppercase tracking-wider"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & RERA */}
        <div className="pt-8 border-t border-neutral-200 space-y-3 text-[11px] text-neutral-500 leading-relaxed font-light">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#b38b36]" />
            <span>RERA Compliance &amp; Legal Transparency</span>
          </div>
          <p>
            Project RERA Registration: <strong>PR/GJ/BHU/2026/AAKAAR</strong> (In Process &amp; Applied).
            The imagery, elevations, floor plans, and amenities illustrated on this website are conceptual and indicative of the luxury design intent of Acrux Aakaar. Final specifications are governed exclusively by the registered agreement for sale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200 text-neutral-500 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Acrux Realcon Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-neutral-900">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-900">Terms of Use</a>
              <a href="#" className="hover:text-neutral-900">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
