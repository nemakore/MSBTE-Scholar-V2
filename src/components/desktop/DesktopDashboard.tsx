'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Briefcase,
  FolderGit2,
  Users,
  Bell,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

export const DesktopDashboard: React.FC = () => {
  const {
    profile,
    setDesktopTab,
    studyResources,
    jobListings,
    msbteUpdates,
    courses,
    openModal,
    toggleSaveJob,
    toggleSaveResource,
  } = useApp();

  const activeCourse = courses.find((c) => c.isEnrolled) || courses[0];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B3B2E] via-[#062D24] to-[#041D17] text-white p-6 rounded-3xl border-2 border-[#D4AF37]/50 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] font-black uppercase tracking-wider">
              {profile.scheme}
            </span>
            <span className="text-xs text-[#F1DFA4] font-medium">
              {profile.branch} Engineering • 4th Semester
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-heading font-black tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6EE]/80 max-w-xl leading-relaxed">
            Here is your diploma academic dashboard. Access the latest K-Scheme syllabus, handwritten notes, job vacancies, and board notifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDesktopTab('study')}
            className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29e2e] text-[#062D24] text-xs font-black flex items-center gap-2 shadow-gold transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Notes</span>
          </button>
          <button
            onClick={() => setDesktopTab('mock-tests')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all"
          >
            Take Mock Test
          </button>
        </div>
      </div>

      {/* 3 Metric Cards matching blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <div
          onClick={() => setDesktopTab('study')}
          className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle hover:border-[#0B3B2E] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider">
              Saved Study Material
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] flex items-center justify-center group-hover:bg-[#0B3B2E] group-hover:text-white transition-colors">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              {profile.savedResources.length || 12}
            </span>
            <span className="text-xs text-[#1FA971] font-semibold">Available offline</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => setDesktopTab('courses')}
          className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle hover:border-[#0B3B2E] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider">
              Active Courses
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] flex items-center justify-center group-hover:bg-[#0B3B2E] group-hover:text-white transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              {profile.enrolledCourses.length || 3}
            </span>
            <span className="text-xs text-[#5F5B52] font-semibold">In Progress</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => setDesktopTab('jobs')}
          className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle hover:border-[#0B3B2E] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider">
              Saved Job Alerts
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] flex items-center justify-center group-hover:bg-[#0B3B2E] group-hover:text-white transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              {profile.savedJobs.length || 5}
            </span>
            <span className="text-xs text-[#D4AF37] font-semibold">Upcoming deadlines</span>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide): Recommended Jobs + Study shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommended Jobs */}
          <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#141414] dark:text-white">
                  Recommended Jobs for {profile.branch} Engineers
                </h3>
                <p className="text-xs text-[#5F5B52] dark:text-[#888]">
                  Verified openings with active application links
                </p>
              </div>
              <button
                onClick={() => setDesktopTab('jobs')}
                className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {jobListings.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-2xl border border-[#E6DCC6]/80 dark:border-[#262626] hover:border-[#0B3B2E] transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-10 h-10 rounded-xl object-cover border border-[#E6DCC6]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-[#141414] dark:text-white">
                          {job.title}
                        </h4>
                        <StatusBadge type="verified" label="Verified" size="sm" />
                      </div>
                      <p className="text-xs text-[#5F5B52] dark:text-[#888]">
                        {job.company} • {job.location} • <strong className="text-[#0B3B2E] dark:text-[#D4AF37]">{job.salary}</strong>
                      </p>
                    </div>
                  </div>

                  <a
                    href={job.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold hover:bg-[#062D24] flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Study Resources Table */}
          <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#141414] dark:text-white">
                  Recently Viewed Study Materials
                </h3>
                <p className="text-xs text-[#5F5B52] dark:text-[#888]">
                  Handwritten notes and model question papers
                </p>
              </div>
              <button
                onClick={() => setDesktopTab('study')}
                className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                Open Library →
              </button>
            </div>

            <div className="divide-y divide-[#E6DCC6]/60 dark:divide-[#262626]">
              {studyResources.slice(0, 3).map((res) => (
                <div
                  key={res.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] text-[#0B3B2E] dark:bg-[#202020] dark:text-[#D4AF37] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                        {res.title}
                      </h4>
                      <span className="text-[11px] text-[#5F5B52] dark:text-[#888]">
                        {res.category} • {res.subjectName} • {res.fileSize}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openModal('pdf-preview', res)}
                    className="px-3 py-1.5 rounded-lg border border-[#0B3B2E] text-[#0B3B2E] dark:border-[#D4AF37] dark:text-[#D4AF37] text-xs font-bold hover:bg-[#E7F2EE]"
                  >
                    View PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col wide): MSBTE Updates + Continue Learning */}
        <div className="space-y-6">
          {/* Continue Learning Card */}
          {activeCourse && (
            <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F5B52] dark:text-[#888]">
                Continue Learning
              </h3>

              <div className="rounded-xl overflow-hidden h-32 relative">
                <img
                  src={activeCourse.thumbnail}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                  <h4 className="text-xs font-bold text-white line-clamp-2">
                    {activeCourse.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#0B3B2E] dark:text-[#D4AF37]">Course Progress</span>
                  <span>{activeCourse.progressPercent || 65}%</span>
                </div>
                <div className="w-full bg-[#FAF6EE] dark:bg-[#282828] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0B3B2E] dark:bg-[#D4AF37] h-full rounded-full"
                    style={{ width: `${activeCourse.progressPercent || 65}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setDesktopTab('courses')}
                className="w-full py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Resume Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          )}

          {/* Recent MSBTE Circulars */}
          <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F5B52] dark:text-[#888]">
                Recent MSBTE Updates
              </h3>
              <button
                onClick={() => setDesktopTab('updates')}
                className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                All
              </button>
            </div>

            <div className="space-y-3">
              {msbteUpdates.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#FAF6EE] dark:bg-[#1F1F1F] border border-[#E6DCC6]/60 dark:border-[#2C2C2C] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-[#5F5B52]">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#141414] dark:text-white line-clamp-2">
                    {item.title}
                  </h4>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[#0B3B2E] dark:text-[#D4AF37] font-semibold hover:underline block pt-0.5"
                  >
                    View Official Notice →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
