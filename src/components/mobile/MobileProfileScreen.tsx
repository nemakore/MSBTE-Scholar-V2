'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Bookmark,
  Briefcase,
  FolderGit2,
  GraduationCap,
  CreditCard,
  Bell,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit3,
  Layers,
  Sparkles,
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: any;
  badge?: string;
  action?: () => void;
  customRight?: React.ReactNode;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const MobileProfileScreen: React.FC = () => {
  const { profile, setMobileScreen, darkMode, toggleDarkMode, openModal, logout } = useApp();

  const menuSections: MenuSection[] = [
    {
      title: 'My Learning & Saved Content',
      items: [
        {
          label: 'Saved Study Material',
          icon: Bookmark,
          badge: `${profile.savedResources.length}`,
          action: () => setMobileScreen('study'),
        },
        {
          label: 'Saved Job Alerts',
          icon: Briefcase,
          badge: `${profile.savedJobs.length}`,
          action: () => setMobileScreen('jobs'),
        },
        {
          label: 'My Enrolled Courses',
          icon: GraduationCap,
          badge: `${profile.enrolledCourses.length}`,
          action: () => setMobileScreen('courses'),
        },
        {
          label: 'My Capstone Projects',
          icon: FolderGit2,
          badge: `${profile.savedProjects.length}`,
          action: () => setMobileScreen('projects'),
        },
      ],
    },
    {
      title: 'Account & Preferences',
      items: [
        {
          label: 'Academic Preferences (Branch & Scheme)',
          icon: Layers,
          action: () => setMobileScreen('profile-setup'),
        },
        {
          label: 'Purchase & Invoice History',
          icon: CreditCard,
          action: () => alert('Displaying MSBTE Scholar purchase invoice history.'),
        },
        {
          label: 'Notification Settings',
          icon: Bell,
          action: () => setMobileScreen('notifications'),
        },
        {
          label: 'Dark Mode Appearance',
          icon: darkMode ? Sun : Moon,
          customRight: (
            <button
              onClick={toggleDarkMode}
              className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                darkMode ? 'bg-[#0B3B2E] justify-end' : 'bg-[#E6DCC6] justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          ),
        },
      ],
    },
    {
      title: 'Support & Security',
      items: [
        {
          label: 'Privacy Policy & Terms',
          icon: Shield,
          action: () => alert('MSBTE Scholar Privacy & Student Data Protection terms.'),
        },
        {
          label: 'Help & Polytechnic Support',
          icon: HelpCircle,
          action: () => alert('Support helpline: support@msbtescholar.com'),
        },
      ],
    },
  ];

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-[#0B3B2E] to-[#062D24] text-white p-5 pt-6 rounded-b-3xl shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-3 border-[#D4AF37] bg-white shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#1FA971] rounded-full border-2 border-[#0B3B2E]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-heading font-black text-white">
                  {profile.name}
                </h2>
                {profile.isPremium && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] text-[9px] font-black">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-[#F1DFA4] mt-0.5">{profile.college}</p>
              <p className="text-[11px] text-white/70">ID: {profile.enrollmentNumber}</p>
            </div>
          </div>

          <button
            onClick={() => setMobileScreen('profile-setup')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Academic Card */}
        <div className="bg-[#FAF6EE] dark:bg-[#1A1A1A] text-[#141414] dark:text-white p-3.5 rounded-2xl border border-[#D4AF37]/40 flex items-center justify-between text-xs font-semibold">
          <div>
            <span className="text-[10px] text-[#5F5B52] dark:text-[#888] uppercase block">
              Registered Curriculum
            </span>
            <span>
              {profile.branch} Engg • {profile.scheme} • Sem {profile.semester}
            </span>
          </div>
          <button
            onClick={() => setMobileScreen('profile-setup')}
            className="text-xs text-[#0B3B2E] dark:text-[#D4AF37] font-bold underline"
          >
            Update
          </button>
        </div>

        {/* Upgrade to Semester Pass Banner if not premium */}
        {!profile.isPremium ? (
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#F1DFA4] text-[#062D24] p-3 rounded-2xl flex items-center justify-between shadow-gold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#062D24]" />
              <div>
                <h4 className="text-xs font-black">MSBTE Semester Pass</h4>
                <p className="text-[10px] font-medium">Unlimited verified notes & model answers</p>
              </div>
            </div>
            <button
              onClick={() =>
                openModal('checkout', {
                  type: 'premium',
                  title: 'MSBTE Scholar Semester Pass (4th Sem)',
                  amount: 199,
                })
              }
              className="px-3 py-1.5 rounded-xl bg-[#062D24] text-white text-xs font-extrabold"
            >
              ₹199
            </button>
          </div>
        ) : null}
      </div>

      {/* Menu Sections */}
      <div className="p-4 space-y-5">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1.5">
            <h3 className="text-[11px] font-bold text-[#5F5B52] dark:text-[#A09A8F] uppercase tracking-wider px-1">
              {section.title}
            </h3>

            <div className="bg-white dark:bg-[#161616] rounded-2xl border border-[#E6DCC6] dark:border-[#262626] divide-y divide-[#E6DCC6]/60 dark:divide-[#262626] overflow-hidden shadow-subtle">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    onClick={item.action}
                    className="p-3.5 flex items-center justify-between hover:bg-[#FAF6EE] dark:hover:bg-[#1F1F1F] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#141414] dark:text-white">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] dark:bg-[#0B3B2E] dark:text-[#F1DFA4]">
                          {item.badge}
                        </span>
                      )}
                      {item.customRight || <ChevronRight className="w-4 h-4 text-[#5F5B52]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full py-3 rounded-2xl border border-[#B3202F]/30 bg-white dark:bg-[#161616] text-[#B3202F] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FDECEE] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of MSBTE Scholar</span>
        </button>
      </div>
    </div>
  );
};
