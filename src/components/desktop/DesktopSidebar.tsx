'use client';

import React from 'react';
import { useApp, DesktopTab } from '@/context/AppContext';
import { Logo } from '@/components/brand/Logo';
import {
  Home,
  BookOpen,
  Sparkles,
  Briefcase,
  FolderGit2,
  Users,
  Bell,
  GraduationCap,
  Layers,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const {
    desktopTab,
    setDesktopTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    profile,
  } = useApp();

  const navItems: { tab: DesktopTab; label: string; icon: any; badge?: string }[] = [
    { tab: 'dashboard', label: 'Home Dashboard', icon: Home },
    { tab: 'study', label: 'Study Material', icon: BookOpen, badge: '10K+' },
    { tab: 'mock-tests', label: 'Mock Tests', icon: Sparkles, badge: 'MCQs' },
    { tab: 'jobs', label: 'Jobs & Internships', icon: Briefcase, badge: 'New' },
    { tab: 'projects', label: 'Project Hub', icon: FolderGit2, badge: 'Viva' },
    { tab: 'community', label: 'Community', icon: Users },
    { tab: 'updates', label: 'MSBTE Updates', icon: Bell, badge: 'Official' },
    { tab: 'career', label: 'Career Roadmaps', icon: GraduationCap },
    { tab: 'courses', label: 'Courses Hub', icon: Layers },
    { tab: 'notifications', label: 'Notifications', icon: Bell },
    { tab: 'profile', label: 'Profile & Library', icon: User },
    { tab: 'admin', label: 'Admin Panel', icon: ShieldCheck, badge: 'Mod' },
  ];

  return (
    <aside
      className={`relative z-30 flex flex-col bg-[#062D24] border-r border-[#0B3B2E] text-[#FAF6EE] transition-all duration-300 ease-in-out select-none flex-shrink-0 ${
        isSidebarCollapsed ? 'w-[72px]' : 'w-[250px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#0B3B2E] overflow-hidden">
        {!isSidebarCollapsed ? (
          <div className="flex items-center gap-2">
            <Logo size="sm" light showTagline={false} />
          </div>
        ) : (
          <div className="mx-auto">
            <div className="w-9 h-9 rounded-xl bg-[#0B3B2E] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-black text-xs">
              M2
            </div>
          </div>
        )}

        <button
          onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#F1DFA4]" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = desktopTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setDesktopTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#0B3B2E] to-[#0E4A3A] text-white border-l-4 border-[#D4AF37] shadow-sm font-bold'
                  : 'text-[#FAF6EE]/80 hover:bg-white/5 hover:text-white'
              }`}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-transform ${
                  isActive ? 'text-[#D4AF37] scale-110' : 'text-[#FAF6EE]/70 group-hover:text-[#D4AF37]'
                }`}
              />

              {!isSidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#062D24]'
                          : 'bg-[#0B3B2E] text-[#D4AF37]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info / Public Landing trigger */}
      <div className="p-3 border-t border-[#0B3B2E] space-y-2">
        <button
          onClick={() => setDesktopTab(desktopTab === 'landing' ? 'dashboard' : 'landing')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#F1DFA4] hover:bg-white/5 transition-colors"
          title="View Public Landing Page"
        >
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          {!isSidebarCollapsed && (
            <span className="truncate font-medium">
              {desktopTab === 'landing' ? '← Back to App' : 'Public Landing'}
            </span>
          )}
        </button>

        {!isSidebarCollapsed && (
          <div className="bg-[#041D17] p-2.5 rounded-xl border border-[#0B3B2E] text-[10px] text-[#F1DFA4]/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">msbtescholar.com</span>
              <span>K-Scheme • Sem {profile.semester}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#1FA971]" />
          </div>
        )}
      </div>
    </aside>
  );
};
