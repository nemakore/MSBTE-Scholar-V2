'use client';

import React from 'react';
import { Logo } from '@/components/brand/Logo';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const MobileSplashScreen: React.FC = () => {
  const { setMobileScreen } = useApp();

  return (
    <div className="min-h-full flex-1 flex flex-col justify-between items-center bg-[#062D24] text-[#FAF6EE] p-8 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#0B3B2E] blur-3xl pointer-events-none opacity-60" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

      {/* Top Tag */}
      <div className="pt-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
        <span className="text-xs uppercase tracking-widest text-[#F1DFA4] font-semibold">
          K-Scheme Edition • 2026
        </span>
      </div>

      {/* Center Brand Hero */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        {/* Emblem Large */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0B3B2E] to-[#041D17] border-3 border-[#D4AF37] shadow-gold flex items-center justify-center relative group">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-[#D4AF37]"
          >
            <path
              d="M24 10L39 18L24 26L9 18L24 10Z"
              fill="#D4AF37"
              stroke="#F1DFA4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M15 21.5V29C15 32.5 24 35 24 35C24 35 33 32.5 33 29V21.5"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M35 20V30L33 32" stroke="#F1DFA4" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="33" cy="32.5" r="1.5" fill="#D4AF37" />
            <path
              d="M12 37C18 34.5 24 36 24 36C24 36 30 34.5 36 37V39C30 36.5 24 38 24 38C24 38 18 36.5 12 39V37Z"
              fill="#FAF6EE"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
            MSBTE Scholar <span className="text-[#D4AF37]">2.0</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#F1DFA4] max-w-xs leading-relaxed">
            Everything a Diploma Student Needs — Notes, Question Papers, Jobs & Projects
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="w-full space-y-3 pb-4">
        <button
          onClick={() => setMobileScreen('onboarding')}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#D4AF37] hover:bg-[#c29e2e] text-[#062D24] font-extrabold text-sm flex items-center justify-center gap-2 shadow-gold transition-all active:scale-98"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setMobileScreen('home')}
          className="w-full py-2.5 text-xs text-[#FAF6EE]/70 hover:text-[#FAF6EE] font-medium"
        >
          Skip directly to Dashboard →
        </button>
      </div>
    </div>
  );
};
