"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Percent, Calendar, ArrowRight } from "lucide-react";

interface CalculatorProps {
  onOpenEnquiry: () => void;
}

export default function MortgageCalculator({ onOpenEnquiry }: CalculatorProps) {
  // Default values
  const [loanAmount, setLoanAmount] = useState(12500000); // 1.25 Cr
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  // Monthly EMI Calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatLakhCrore = (num: number) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(num / 100000).toFixed(2)} L`;
  };

  return (
    <section className="py-20 bg-[#0A0E15] relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <Calculator className="w-3.5 h-3.5" />
            Financial Planning
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white">
            Smart Home Loan &amp;{" "}
            <span className="text-gold-gradient italic">EMI Estimator</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light">
            Plan your investment in Acrux Aakaar with flexible bank financing up to 80% through major approved banking partners.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-[#121822] via-[#0E131C] to-[#0A0D14] border border-[#c5a059]/30 p-6 sm:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-7">
              {/* Loan Amount Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider font-semibold text-slate-300">
                    Estimated Loan Amount
                  </span>
                  <span className="text-lg font-bold text-gold-gradient font-serif">
                    {formatLakhCrore(loanAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={25000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹50 Lakhs</span>
                  <span>₹1.50 Cr</span>
                  <span>₹2.50 Cr</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider font-semibold text-slate-300">
                    Interest Rate (% p.a.)
                  </span>
                  <span className="text-lg font-bold text-[#f5e3b5] font-serif">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>7.5%</span>
                  <span>9.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider font-semibold text-slate-300">
                    Loan Tenure (Years)
                  </span>
                  <span className="text-lg font-bold text-[#f5e3b5] font-serif">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 p-7 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  Estimated Monthly Outflow
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient">
                  ₹{emi.toLocaleString("en-IN")}{" "}
                  <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Principal Amount:</span>
                  <span className="font-semibold text-white">{formatLakhCrore(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest Payable:</span>
                  <span className="font-semibold text-white">{formatLakhCrore(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Amount (P + I):</span>
                  <span className="font-semibold text-[#f5e3b5]">{formatLakhCrore(totalPayment)}</span>
                </div>
              </div>

              <button
                onClick={onOpenEnquiry}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88f32] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/10"
              >
                <span>Check Bank Approval &amp; Offers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-500 text-center font-light leading-snug">
                * Indicative calculation based on current home loan benchmark rates from leading nationalized &amp; private banks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
