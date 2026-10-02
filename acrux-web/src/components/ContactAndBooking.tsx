"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  ShieldCheck,
  Send,
  MessageCircle,
} from "lucide-react";

export default function ContactAndBooking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    unit: "3 BHK (2148 Sq. Ft.)",
    date: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="enquire" className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#976932]/30 text-xs font-bold uppercase tracking-[0.25em] text-[#976932]">
                Connect With Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 leading-tight">
                Schedule Your Private{" "}
                <span className="text-[#976932] italic font-normal">VIP Preview</span>
              </h2>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Connect directly with our senior development advisory team for exclusive pre-launch
                privileges, customized payment schedules, and priority apartment allocation.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              {/* Site Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F5F0] border border-neutral-200/80 shadow-2xs">
                <div className="p-2.5 rounded-lg bg-[#F7F5F0] text-[#976932] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900">
                    Project Site Address
                  </h4>
                  <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                    Plot No. 15W, Chandrasekharpur, Patia, Bhubaneswar, Odisha 751 021
                  </p>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">
                    (Adjacent to Daya West Canal Promenade)
                  </span>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F5F0] border border-neutral-200/80 shadow-2xs">
                <div className="p-2.5 rounded-lg bg-[#F7F5F0] text-[#976932] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900">
                    Corporate Office
                  </h4>
                  <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                    Acrux Realcon Pvt. Ltd, F33/F34 Chandaka Industrial Area Infocity, Bhubaneswar,
                    Odisha 751024
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+919777543339"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-neutral-200 hover:border-[#976932] shadow-2xs hover:shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-[#976932]" />
                  <div>
                    <div className="text-[11px] text-neutral-500 font-medium">Direct Sales Line</div>
                    <div className="text-xs font-bold text-neutral-900">+91 97775 43339</div>
                  </div>
                </a>

                <a
                  href="mailto:sales@acruxrealcon.in"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-neutral-200 hover:border-[#976932] shadow-2xs hover:shadow-md transition-all"
                >
                  <Mail className="w-4 h-4 text-[#976932]" />
                  <div>
                    <div className="text-[11px] text-neutral-500 font-medium">Official Email</div>
                    <div className="text-xs font-bold text-neutral-900">sales@acruxrealcon.in</div>
                  </div>
                </a>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/919777543339?text=Hi,%20I%20am%20interested%20in%20Acrux%20Aakaar%20Patia.%20Please%20share%20details%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500 text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900">Instant WhatsApp Concierge</div>
                    <div className="text-[11px] text-emerald-700">Chat directly with property executive</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </a>

              {/* RERA Notice Box in Soft Gold */}
              <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#976932]/30 flex items-start gap-3 text-xs text-neutral-700">
                <ShieldCheck className="w-5 h-5 text-[#976932] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">RERA Statutory Compliance</span>
                  RERA Reg. No: PR/GJ/BHU/2026/AAKAAR (Applied &amp; In Process). All project deliverables adhere to state regulatory guidelines.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Schedule & Enquiry Form in Crisp White & Gold */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#976932]/30 shadow-2xl">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-serif text-neutral-900 font-medium">
                  Request Detailed Pricing &amp; Site Visit
                </h3>
                <p className="text-xs text-neutral-600 font-light">
                  Please fill in your details below. Our project specialist will arrange your personalized site tour.
                </p>
              </div>

              {submitted ? (
                <div className="p-10 rounded-2xl bg-[#F7F5F0] border border-[#976932]/30 text-center space-y-4">
                  <CheckCircle className="w-14 h-14 text-[#976932] mx-auto animate-bounce" />
                  <h4 className="text-2xl font-serif text-neutral-900 font-semibold">Preview Request Confirmed!</h4>
                  <p className="text-sm text-neutral-700 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="text-neutral-900">{form.name}</strong>. Your inquiry for{" "}
                    <strong className="text-[#976932]">{form.unit}</strong> has been logged. Our
                    relationship manager will contact you at{" "}
                    <strong className="text-neutral-900">+91 {form.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-neutral-900 text-xs text-white hover:bg-neutral-800 uppercase font-semibold transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyabrata Pattnaik"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-[#976932] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1.5">
                        Phone Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-700 text-xs font-semibold">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="10-digit mobile"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-r-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-[#976932] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-[#976932] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1.5">
                        Interested Unit Configuration
                      </label>
                      <select
                        value={form.unit}
                        onChange={(e) => setForm({ ...form, unit: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:border-[#976932] transition-colors"
                      >
                        <option value="2.5 BHK (1790 Sq. Ft.)">2.5 BHK (1,790 Sq. Ft.)</option>
                        <option value="3 BHK (2148 Sq. Ft.)">3 BHK (2,148 Sq. Ft.)</option>
                        <option value="Both / Yet to Decide">Both / Yet to Decide</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1.5">
                      Preferred Site Visit Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:border-[#976932] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-1.5">
                      Any Specific Inquiries or Preferences
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Looking for high floor unit with Daya canal view, payment schedule..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-[#976932] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#976932] hover:bg-[#102038] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#976932]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Schedule VIP Site Preview</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center font-light">
                    🔒 Your privacy is fully respected. Your details are solely used for Acrux Aakaar advisory.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
