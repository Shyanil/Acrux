"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, Download, Menu, X, Calendar } from "lucide-react";

interface NavbarProps {
  onOpenBrochure: () => void;
  onOpenEnquiry: () => void;
}

export default function Navbar({ onOpenBrochure, onOpenEnquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Residences", href: "#residences" },
    { name: "Clubhouse", href: "#clubhouse" },
    { name: "Amenities", href: "#amenities" },
    { name: "Architecture", href: "#architect" },
    { name: "Gallery", href: "#gallery" },
    { name: "Plans", href: "#master-plan" },
    { name: "Location", href: "#location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#976932]/25 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            : "bg-white/85 backdrop-blur-md border-b border-black/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-36 sm:w-44 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/Aakaar Logo.webp"
                  alt="Acrux Aakaar Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-neutral-800 hover:text-[#976932] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="tel:+919777543339"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-800 hover:text-[#976932] rounded-full border border-neutral-300 hover:border-[#976932] transition-all duration-200 bg-white shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#976932]" />
                <span className="font-mono text-[11px] font-semibold">+91 97775 43339</span>
              </a>

              <button
                onClick={onOpenBrochure}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wider uppercase text-neutral-800 bg-[#F7F5F0] hover:bg-[#efe6d3] border border-[#976932]/30 rounded-full transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5 text-[#976932]" />
                <span>Brochure</span>
              </button>

              <button
                onClick={onOpenEnquiry}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#976932] hover:bg-[#102038] rounded-full transition-all duration-200 shadow-md shadow-[#976932]/25"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Enquire</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onOpenEnquiry}
                className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#976932] text-white rounded-full"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-800 hover:text-[#976932] rounded-lg focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay in Crisp White */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 md:hidden shadow-2xl">
          <nav className="flex flex-col space-y-4 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif tracking-wider text-neutral-900 hover:text-[#976932] transition-colors py-2.5 border-b border-neutral-100"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="space-y-3 pt-6 border-t border-neutral-200">
            <a
              href="tel:+919777543339"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-neutral-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider bg-white"
            >
              <Phone className="w-4 h-4 text-[#976932]" />
              <span>Call +91 97775 43339</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-neutral-900 text-xs font-semibold uppercase tracking-wider"
            >
              <Download className="w-4 h-4 text-[#976932]" />
              <span>Download Brochure</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#976932] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#976932]/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule VIP Preview</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
