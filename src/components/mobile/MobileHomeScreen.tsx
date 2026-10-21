'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Briefcase,
  FolderGit2,
  Users,
  Bell,
  GraduationCap,
  Sparkles,
  Search,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

export const MobileHomeScreen: React.FC = () => {
  const {
    profile,
    setMobileScreen,
    setIsSearchOpen,
    studyResources,
    jobListings,
    msbteUpdates,
    courses,
    openModal,
    toggleSaveJob,
    toggleSaveResource,
  } = useApp();

  const quickActions = [
    { label: 'Study Material', icon: BookOpen, screen: 'study', badge: '10K+' },
    { label: 'Jobs & Alerts', icon: Briefcase, screen: 'jobs', badge: 'New' },
    { label: 'Project Hub', icon: FolderGit2, screen: 'projects', badge: 'Viva Qs' },
    { label: 'Community', icon: Users, screen: 'community', badge: 'Active' },
    { label: 'MSBTE Updates', icon: Bell, screen: 'updates', badge: 'Official' },
    { label: 'Mock Tests', icon: Sparkles, screen: 'mock-tests', badge: 'MCQs' },
    { label: 'Career Hub', icon: GraduationCap, screen: 'courses', badge: 'Roadmaps' },
    { label: 'Saved Library', icon: Bookmark, screen: 'profile', badge: `${profile.savedResources.length}` },
  ];

  const featuredUpdate = msbteUpdates[0];
  const featuredJob = jobListings[0];
  const activeCourse = courses.find((c) => c.isEnrolled) || courses[0];

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Top Header & Greeting */}
      <div className="bg-gradient-to-b from-[#0B3B2E] via-[#0B3B2E] to-[#FAF6EE] dark:to-[#0C0C0C] pt-4 px-4 pb-4">
        <div className="flex items-center justify-between text-white mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileScreen('profile')}
              className="relative"
            >
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-11 h-11 rounded-full border-2 border-[#D4AF37] bg-white shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#1FA971] rounded-full border-2 border-[#0B3B2E]" />
            </button>
            <div>
              <span className="text-[11px] font-medium text-[#F1DFA4] block leading-tight">
                Welcome back,
              </span>
              <h2 className="text-base font-extrabold font-heading text-white tracking-tight leading-tight">
                {profile.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileScreen('notifications')}
              className="w-9 h-9 rounded-xl bg-[#062D24] border border-[#D4AF37]/40 flex items-center justify-center text-white relative hover:bg-[#041D17]"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-[#F1DFA4]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B3202F] animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B3202F]" />
            </button>
          </div>
        </div>

        {/* Search Bar Button */}
        <button
          onClick={() => {
            setMobileScreen('search');
            setIsSearchOpen(true);
          }}
          className="w-full bg-white dark:bg-[#1A1A1A] text-[#5F5B52] dark:text-[#A89F91] border border-[#E6DCC6] dark:border-[#2C2C2C] px-3.5 py-2.5 rounded-xl flex items-center justify-between shadow-subtle hover:border-[#0B3B2E] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />
            <span className="text-xs font-medium">Search notes, papers, jobs, projects...</span>
          </div>
          <span className="text-[10px] bg-[#FAF6EE] dark:bg-[#262626] text-[#0B3B2E] dark:text-[#F1DFA4] px-2 py-0.5 rounded font-mono font-bold">
            ⌘K
          </span>
        </button>

        {/* Current Scheme & Semester Card */}
        <div className="mt-3 bg-gradient-to-r from-[#062D24] to-[#0B3B2E] p-3.5 rounded-2xl border border-[#D4AF37]/50 shadow-md text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B3B2E] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#D4AF37]">
                  {profile.scheme}
                </span>
                <span className="text-xs text-white/80">• {profile.branch} Engg</span>
              </div>
              <p className="text-xs font-bold text-white">
                Semester {profile.semester} Curriculum
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileScreen('profile-setup')}
            className="px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29e2e] text-[#062D24] text-xs font-extrabold flex items-center gap-1 shadow-sm transition-all"
          >
            <span>Change</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-4 space-y-5 mt-2">
        {/* Quick Action Grid (4 columns x 2 rows) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F5B52] dark:text-[#A09A8F]">
              Quick Access Hub
            </h3>
            <span className="text-[11px] font-semibold text-[#0B3B2E] dark:text-[#D4AF37]">
              Diploma Essentials
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => setMobileScreen(action.screen as any)}
                  className="bg-white dark:bg-[#161616] p-2.5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle hover:border-[#0B3B2E] dark:hover:border-[#D4AF37] transition-all flex flex-col items-center text-center group active:scale-95"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] flex items-center justify-center mb-1.5 group-hover:bg-[#0B3B2E] group-hover:text-white transition-colors relative">
                    <Icon className="w-5 h-5 stroke-[2]" />
                    {action.badge && (
                      <span className="absolute -top-1.5 -right-1 text-[8px] font-extrabold bg-[#D4AF37] text-[#062D24] px-1 rounded-full leading-tight">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-[#141414] dark:text-[#EDEDED] line-clamp-2 leading-tight">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exam Countdown & Notice Widget */}
        <div className="bg-[#FFF8E6] dark:bg-[#1D170D] p-3.5 rounded-2xl border border-[#D4AF37]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 text-[#062D24] dark:text-[#F1DFA4] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-[#B3202F] tracking-wide">
                  COUNTDOWN
                </span>
                <span className="text-[10px] text-[#5F5B52] dark:text-[#A09A8F]">
                  • Winter 2026 Exams
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#0B3B2E] dark:text-[#F1DFA4]">
                36 Days Remaining for Theory Board Exams
              </h4>
            </div>
          </div>
          <button
            onClick={() => setMobileScreen('updates')}
            className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline flex-shrink-0"
          >
            Timetable →
          </button>
        </div>

        {/* Latest MSBTE Official Update */}
        {featuredUpdate && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1FA971]" />
                <h3 className="text-xs font-bold text-[#141414] dark:text-white uppercase tracking-wider">
                  Latest MSBTE Circular
                </h3>
              </div>
              <button
                onClick={() => setMobileScreen('updates')}
                className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-2.5">
              <div className="flex items-center justify-between">
                <StatusBadge type="verified" label="Official Verified" size="sm" />
                <span className="text-[10px] font-medium text-[#5F5B52] dark:text-[#888]">
                  {featuredUpdate.date}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#0B3B2E] dark:text-white leading-snug">
                {featuredUpdate.title}
              </h4>
              <p className="text-[11px] text-[#5F5B52] dark:text-[#999] line-clamp-2 leading-relaxed">
                {featuredUpdate.details}
              </p>
              <div className="pt-1 flex items-center justify-between border-t border-[#E6DCC6]/60 dark:border-[#262626]">
                <a
                  href={featuredUpdate.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-semibold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
                >
                  Source: msbte.ac.in ↗
                </a>
                <span className="text-[9px] text-[#5F5B52]">Independent Educational Info</span>
              </div>
            </div>
          </div>
        )}

        {/* Continue Learning Widget */}
        {activeCourse && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#141414] dark:text-white uppercase tracking-wider">
                Continue Learning
              </h3>
              <button
                onClick={() => setMobileScreen('courses')}
                className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                My Courses
              </button>
            </div>

            <div className="bg-white dark:bg-[#161616] p-3.5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle flex items-center gap-3">
              <img
                src={activeCourse.thumbnail}
                alt={activeCourse.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#141414] dark:text-white truncate">
                  {activeCourse.title}
                </h4>
                <p className="text-[10px] text-[#5F5B52] dark:text-[#888] truncate mt-0.5">
                  Instructor: {activeCourse.instructor}
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-[#0B3B2E] dark:text-[#D4AF37]">Progress</span>
                    <span>{activeCourse.progressPercent || 40}%</span>
                  </div>
                  <div className="w-full bg-[#FAF6EE] dark:bg-[#282828] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0B3B2E] dark:bg-[#D4AF37] h-full rounded-full transition-all"
                      style={{ width: `${activeCourse.progressPercent || 40}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Jobs & Internships */}
        {featuredJob && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#141414] dark:text-white uppercase tracking-wider">
                Recommended Opportunity
              </h3>
              <button
                onClick={() => setMobileScreen('jobs')}
                className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                Explore All Jobs
              </button>
            </div>

            <div className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredJob.logo}
                    alt={featuredJob.company}
                    className="w-10 h-10 rounded-xl object-cover border border-[#E6DCC6]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] dark:text-white line-clamp-1">
                      {featuredJob.title}
                    </h4>
                    <span className="text-[11px] text-[#5F5B52] dark:text-[#999] block">
                      {featuredJob.company} • {featuredJob.location}
                    </span>
                  </div>
                </div>
                <StatusBadge type="verified" label="Verified" size="sm" />
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-[#222] text-[#0B3B2E] dark:text-[#F1DFA4] font-semibold border border-[#E6DCC6]/60">
                  💰 {featuredJob.salary}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-[#222] text-[#5F5B52] dark:text-[#AAA] font-medium border border-[#E6DCC6]/60">
                  ⏳ Deadline: {featuredJob.deadline}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => toggleSaveJob(featuredJob.id)}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    profile.savedJobs.includes(featuredJob.id)
                      ? 'bg-[#0B3B2E] text-white border-[#0B3B2E]'
                      : 'border-[#E6DCC6] hover:bg-[#FAF6EE] text-[#5F5B52]'
                  }`}
                  aria-label="Save Job"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <a
                  href={featuredJob.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-xs flex items-center justify-center gap-1.5 text-center"
                >
                  <span>Apply on Official Portal</span>
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
