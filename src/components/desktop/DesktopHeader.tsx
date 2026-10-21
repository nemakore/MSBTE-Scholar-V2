'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Bell, Layers, ChevronDown, CheckCircle2, Bookmark } from 'lucide-react';

export const DesktopHeader: React.FC = () => {
  const {
    profile,
    searchQuery,
    setSearchQuery,
    setDesktopTab,
    notifications,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-16 bg-white dark:bg-[#141414] border-b border-[#E6DCC6] dark:border-[#262626] px-6 flex items-center justify-between sticky top-0 z-20 shadow-subtle select-none">
      {/* Global Search Bar */}
      <div className="w-96 relative">
        <Search className="w-4 h-4 text-[#5F5B52] dark:text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              setDesktopTab('study');
            }
          }}
          placeholder="Search subjects, handwritten notes, QP, jobs..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-medium text-[#141414] dark:text-white focus:outline-none focus:border-[#0B3B2E] dark:focus:border-[#D4AF37]"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Academic Scheme Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6EE] dark:bg-[#1C1C1C] border border-[#E6DCC6] dark:border-[#2E2E2E] text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-[#0B3B2E] dark:text-[#D4AF37]" />
          <span className="text-[#0B3B2E] dark:text-[#D4AF37] font-bold">{profile.scheme}</span>
          <span className="text-[#5F5B52] dark:text-[#888]">• {profile.branch} Engg (Sem {profile.semester})</span>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={() => setDesktopTab('notifications')}
          className="relative p-2 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] hover:bg-[#FAF6EE] dark:hover:bg-[#1E1E1E] text-[#141414] dark:text-white transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B3202F] text-white text-[9px] font-black flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <button
          onClick={() => setDesktopTab('profile')}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#FAF6EE] dark:hover:bg-[#1E1E1E] transition-colors"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-8 h-8 rounded-full border border-[#D4AF37] bg-white object-cover"
          />
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold text-[#141414] dark:text-white block leading-tight">
              {profile.name}
            </span>
            <span className="text-[10px] text-[#5F5B52] dark:text-[#888] leading-tight">
              {profile.college.split(',')[0] || 'Diploma Student'}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#5F5B52]" />
        </button>
      </div>
    </header>
  );
};
