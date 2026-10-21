'use client';

import React from 'react';
import { ArrowLeft, Bell, Download, Moon, Sun, Search, Sparkles } from 'lucide-react';
import { useApp, MobileScreen } from '@/context/AppContext';
import { Logo } from '@/components/brand/Logo';

export const MobileHeader: React.FC = () => {
  const {
    mobileScreen,
    setMobileScreen,
    navigateBackMobile,
    canGoBackMobile,
    notifications,
    darkMode,
    toggleDarkMode,
    canInstall,
    promptInstall,
  } = useApp();

  const getScreenTitle = (screen: MobileScreen): string => {
    switch (screen) {
      case 'home':
        return 'MSBTE Scholar';
      case 'study':
        return 'Study Material';
      case 'mock-tests':
        return 'Mock Tests';
      case 'jobs':
        return 'Jobs & Alerts';
      case 'projects':
        return 'Project Hub';
      case 'community':
        return 'Student Community';
      case 'courses':
        return 'Courses & Career';
      case 'updates':
        return 'MSBTE Circulars';
      case 'notifications':
        return 'Notifications';
      case 'profile':
        return 'Profile & Settings';
      case 'profile-setup':
        return 'Academic Profile';
      case 'search':
        return 'Universal Search';
      default:
        return 'MSBTE Scholar';
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-[#0B3B2E] border-b border-[#062D24] text-white px-3.5 py-2.5 flex items-center justify-between shadow-md select-none safe-top">
      {/* Left Action: Back Button or Logo */}
      <div className="flex items-center gap-2 min-w-0">
        {canGoBackMobile ? (
          <button
            onClick={navigateBackMobile}
            className="flex items-center gap-1.5 px-2 py-1 -ml-1 rounded-xl hover:bg-white/10 text-white font-bold text-xs transition-colors"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden xs:inline">Back</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#062D24] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-xs font-black">
              🎓
            </div>
          </div>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="text-xs sm:text-sm font-extrabold font-heading text-white truncate leading-tight">
            {canGoBackMobile ? getScreenTitle(mobileScreen) : 'MSBTE Scholar 2.0'}
          </h1>
          {!canGoBackMobile && (
            <span className="text-[10px] text-[#F1DFA4] truncate leading-tight">
              K-Scheme • Diploma Hub
            </span>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {canInstall && (
          <button
            onClick={promptInstall}
            className="p-1.5 rounded-lg bg-[#062D24] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#041D17]"
            title="Install App"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={() => setMobileScreen('notifications')}
          className="relative p-1.5 rounded-lg bg-[#062D24] border border-[#0B3B2E] text-white hover:bg-[#041D17]"
          aria-label="Notifications"
        >
          <Bell className="w-3.5 h-3.5 text-[#F1DFA4]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#B3202F] text-[9px] font-black flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg bg-[#062D24] border border-[#0B3B2E] text-white hover:text-[#D4AF37]"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-[#F1DFA4]" />}
        </button>
      </div>
    </header>
  );
};
