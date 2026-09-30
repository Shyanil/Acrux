"use client";

import React, { useState } from "react";
import { X, Download, FileText, CheckCircle } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    // Programmatically trigger download of the brochure
    const link = document.createElement("a");
    link.href = "/brochure.pdf";
    link.download = "ACRUX_AAKAAR_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#b38b36]/30 shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#f7f2e7] border border-[#b38b36]/30 text-[#b38b36] flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-serif text-neutral-900 font-semibold">
            Download Official Project Brochure
          </h3>
          <p className="text-xs text-neutral-600 font-light max-w-sm mx-auto">
            Get high-resolution floor plans, unit dimensions, project master layout, and clubhouse
            amenities catalog in one document.
          </p>
        </div>

        {downloaded ? (
          <div className="p-6 rounded-2xl bg-[#f7f2e7] border border-[#b38b36]/30 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-[#b38b36] mx-auto animate-bounce" />
            <h4 className="text-xl font-serif text-neutral-900 font-semibold">Download Started!</h4>
            <p className="text-xs text-neutral-700">
              The official Acrux Aakaar brochure PDF is downloading to your device.
            </p>
            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2.5 px-6 rounded-full bg-[#b38b36] hover:bg-[#987532] text-xs font-bold text-white uppercase tracking-wider transition-all shadow-md"
            >
              Click Here to View Online
            </a>
          </div>
        ) : (
          <form onSubmit={handleDownload} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Mohanty"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-[#b38b36] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1">
                WhatsApp / Phone Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-700 text-xs font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-r-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-[#b38b36] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#b38b36] hover:bg-[#987532] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#b38b36]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure PDF</span>
            </button>

            <p className="text-[10px] text-neutral-400 text-center font-light">
              By downloading, you agree to receive project updates from Acrux Realcon.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
