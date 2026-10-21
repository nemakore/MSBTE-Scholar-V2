'use client';

import React from 'react';
import { Home, BookOpen, Search, Briefcase, Users } from 'lucide-react';
import { useApp, MobileScreen } from '@/context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { mobileScreen, setMobileScreen, setIsSearchOpen } = useApp();

  const isTabActive = (screen: MobileScreen) => {
    if (screen === 'home' && mobileScreen === 'home') return true;
    if (screen === 'study' && (mobileScreen === 'study' || mobileScreen === 'mock-tests')) return true;
    if (screen === 'jobs' && mobileScreen === 'jobs') return true;
    if (screen === 'community' && mobileScreen === 'community') return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-[#E6DCC6] dark:border-[#262626] safe-bottom w-full max-w-md mx-auto shadow-elevated">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {/* 1. Home */}
        <button
          onClick={() => setMobileScreen('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isTabActive('home')
              ? 'text-[#0B3B2E] dark:text-[#D4AF37] font-bold'
              : 'text-[#5F5B52] dark:text-[#888888] hover:text-[#0B3B2E]'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${isTabActive('home') ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
          {isTabActive('home') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 2. Study */}
        <button
          onClick={() => setMobileScreen('study')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isTabActive('study')
              ? 'text-[#0B3B2E] dark:text-[#D4AF37] font-bold'
              : 'text-[#5F5B52] dark:text-[#888888] hover:text-[#0B3B2E]'
          }`}
        >
          <BookOpen className={`w-5 h-5 transition-transform ${isTabActive('study') ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Study</span>
          {isTabActive('study') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 3. Central Raised Search Button */}
        <div className="relative -top-5 flex-shrink-0 flex flex-col items-center">
          <button
            onClick={() => {
              setMobileScreen('search');
              setIsSearchOpen(true);
            }}
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#0B3B2E] to-[#062D24] border-3 border-[#D4AF37] shadow-gold flex items-center justify-center text-[#FAF6EE] active:scale-95 transition-transform"
            aria-label="Universal Search"
          >
            <Search className="w-6 h-6 stroke-[2.3] text-[#FAF6EE]" />
          </button>
          <span className="text-[9px] font-semibold text-[#5F5B52] dark:text-[#A09A8F] mt-1">
            Search
          </span>
        </div>

        {/* 4. Jobs */}
        <button
          onClick={() => setMobileScreen('jobs')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isTabActive('jobs')
              ? 'text-[#0B3B2E] dark:text-[#D4AF37] font-bold'
              : 'text-[#5F5B52] dark:text-[#888888] hover:text-[#0B3B2E]'
          }`}
        >
          <Briefcase className={`w-5 h-5 transition-transform ${isTabActive('jobs') ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Jobs</span>
          {isTabActive('jobs') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 5. Community */}
        <button
          onClick={() => setMobileScreen('community')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isTabActive('community')
              ? 'text-[#0B3B2E] dark:text-[#D4AF37] font-bold'
              : 'text-[#5F5B52] dark:text-[#888888] hover:text-[#0B3B2E]'
          }`}
        >
          <Users className={`w-5 h-5 transition-transform ${isTabActive('community') ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Community</span>
          {isTabActive('community') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
