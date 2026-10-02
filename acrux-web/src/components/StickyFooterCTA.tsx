"use client";

import React from "react";
import { Phone, MessageCircle, Download, Calendar } from "lucide-react";

interface StickyFooterProps {
  onOpenBrochure: () => void;
  onOpenEnquiry: () => void;
}

export default function StickyFooterCTA({ onOpenBrochure, onOpenEnquiry }: StickyFooterProps) {
  return (
    <>
      {/* Floating Desktop Quick Connect Buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col space-y-3">
        {/* WhatsApp Float */}
        <a
          href="https://wa.me/919777543339?text=Hi,%20I%20am%20interested%20in%20Acrux%20Aakaar%20Patia.%20Please%20share%20details%20and%20pricing."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Direct Call Float in Rich Gold */}
        <a
          href="tel:+919777543339"
          className="w-12 h-12 rounded-full bg-[#976932] hover:bg-[#102038] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
          title="Call Sales Office"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Mobile Bottom Sticky Action Bar in Crisp White & Gold */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/98 backdrop-blur-xl border-t border-[#976932]/30 py-2.5 px-4 shadow-2xl">
        <div className="grid grid-cols-4 gap-2">
          <a
            href="tel:+919777543339"
            className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-[10px] font-bold text-neutral-800"
          >
            <Phone className="w-4 h-4 text-[#976932] mb-0.5" />
            <span>Call</span>
          </a>

          <a
            href="https://wa.me/919777543339?text=Hi,%20I%20am%20interested%20in%20Acrux%20Aakaar%20Patia."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBrochure}
            className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-[10px] font-bold text-neutral-800"
          >
            <Download className="w-4 h-4 text-[#976932] mb-0.5" />
            <span>Brochure</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-[#976932] text-white text-[10px] font-bold uppercase tracking-wider shadow-md"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </>
  );
}
