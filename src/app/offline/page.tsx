'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RotateCcw, BookOpen, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#0C0C0C] text-[#141414] dark:text-[#F5F5F5] flex flex-col items-center justify-between p-6 select-none">
      {/* Top Header */}
      <div className="w-full max-w-md flex items-center justify-between pt-4">
        <Logo size="sm" showTagline={false} />
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#B3202F]/10 text-[#B3202F] border border-[#B3202F]/30 flex items-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5" /> Offline Mode
        </span>
      </div>

      {/* Center Card */}
      <div className="my-auto w-full max-w-sm bg-white dark:bg-[#161616] p-8 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-card text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#FDECEE] text-[#B3202F] flex items-center justify-center mx-auto border border-[#B3202F]/20">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
            No Internet Connection
          </h2>
          <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F] leading-relaxed">
            You are currently offline. MSBTE Scholar PWA caches your recently viewed handwritten notes, question papers, and study materials locally on your device.
          </p>
        </div>

        <div className="p-3 bg-[#FAF6EE] dark:bg-[#1F1F1F] rounded-2xl border border-[#E6DCC6]/60 text-xs text-[#0B3B2E] dark:text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Cached study notes remain accessible</span>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="w-full py-2.5 rounded-xl border border-[#E6DCC6] text-[#5F5B52] dark:text-[#AAA] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#FAF6EE] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to App Home</span>
          </Link>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-[11px] text-[#5F5B52] pb-4">
        MSBTE Scholar 2.0 PWA • Offline Service Worker Cache Active
      </div>
    </div>
  );
}
