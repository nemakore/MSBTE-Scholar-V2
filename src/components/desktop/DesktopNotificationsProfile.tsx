'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BRANCHES, SCHEMES, SEMESTERS } from '@/data/mockData';
import { BranchCode, SchemeType, SemesterNumber } from '@/data/types';
import {
  Bell,
  User,
  Bookmark,
  CheckCheck,
  Briefcase,
  Layers,
  FileText,
  CreditCard,
  Moon,
  Sun,
  Shield,
  Save,
  CheckCircle2,
  LogOut,
} from 'lucide-react';

export const DesktopNotificationsProfile: React.FC = () => {
  const {
    profile,
    updateProfile,
    notifications,
    markAllNotificationsRead,
    studyResources,
    jobListings,
    openModal,
    darkMode,
    toggleDarkMode,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'saved'>('profile');
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, college });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const savedResourceItems = studyResources.filter((r) =>
    profile.savedResources.includes(r.id)
  );
  const savedJobItems = jobListings.filter((j) => profile.savedJobs.includes(j.id));

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Tab Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
            Student Account & Preferences
          </h1>
          <p className="text-xs text-[#5F5B52] dark:text-[#888]">
            Manage your academic branch settings, offline study library, and notification feeds
          </p>
        </div>

        <div className="flex bg-white dark:bg-[#1C1C1C] p-1 rounded-2xl border border-[#E6DCC6] dark:border-[#2E2E2E]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-[#0B3B2E] text-white shadow-sm'
                : 'text-[#5F5B52]'
            }`}
          >
            Academic Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#0B3B2E] text-white shadow-sm'
                : 'text-[#5F5B52]'
            }`}
          >
            Notifications ({notifications.filter((n) => !n.isRead).length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#0B3B2E] text-white shadow-sm'
                : 'text-[#5F5B52]'
            }`}
          >
            Saved Library
          </button>
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-5 text-center flex flex-col items-center">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-[#D4AF37] bg-white shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#1FA971] rounded-full border-2 border-white" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#141414] dark:text-white">
                {profile.name}
              </h3>
              <p className="text-xs text-[#5F5B52] dark:text-[#888]">{profile.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F2EE] text-[#0B3B2E] text-xs font-bold">
                <span>{profile.branch} Engineering</span>
                <span>• {profile.year === 1 ? '1st Year (FY)' : profile.year === 3 ? '3rd Year (TY)' : '2nd Year (SY)'}</span>
                <span>• Sem {profile.semester}</span>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-[#E6DCC6]/60 dark:border-[#262626] text-xs space-y-2 text-left">
              <div className="flex justify-between text-[#5F5B52]">
                <span>Board Scheme:</span>
                <strong className="text-[#0B3B2E] dark:text-[#D4AF37]">{profile.scheme}</strong>
              </div>
              <div className="flex justify-between text-[#5F5B52]">
                <span>Enrollment No:</span>
                <strong className="font-mono text-[#141414] dark:text-white">{profile.enrollmentNumber}</strong>
              </div>
              <div className="flex justify-between text-[#5F5B52]">
                <span>Status:</span>
                <span className="text-[#1FA971] font-bold">Verified Student</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl border border-[#B3202F]/30 bg-white dark:bg-[#1A1A1A] hover:bg-[#FDECEE] text-[#B3202F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors mt-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out of Session</span>
            </button>
          </div>

          {/* Edit Form */}
          <div className="md:col-span-2 bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-5">
            <h3 className="text-sm font-bold text-[#141414] dark:text-white uppercase tracking-wider">
              Edit Academic Details
            </h3>

            {savedSuccess && (
              <div className="p-3 bg-[#E7F7EE] text-[#1FA971] border border-[#1FA971]/30 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA] block mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1F1F1F] text-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA] block mb-1">
                    Polytechnic College
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1F1F1F] text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA] block mb-1">
                    Branch
                  </label>
                  <select
                    value={profile.branch}
                    onChange={(e) => updateProfile({ branch: e.target.value as BranchCode })}
                    className="w-full p-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1F1F1F] text-xs font-semibold"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA] block mb-1">
                    Diploma Year
                  </label>
                  <select
                    value={profile.year || Math.ceil(profile.semester / 2)}
                    onChange={(e) => {
                      const yr = Number(e.target.value) as 1 | 2 | 3;
                      const sem = ((yr * 2) - 1) as SemesterNumber;
                      updateProfile({ year: yr, semester: sem });
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#0B3B2E] dark:border-[#D4AF37] bg-white dark:bg-[#1F1F1F] text-[#0B3B2E] dark:text-[#D4AF37] text-xs font-bold"
                  >
                    <option value={1}>1st Year (FY)</option>
                    <option value={2}>2nd Year (SY)</option>
                    <option value={3}>3rd Year (TY)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA] block mb-1">
                    Semester
                  </label>
                  <select
                    value={profile.semester}
                    onChange={(e) => {
                      const sem = Number(e.target.value) as SemesterNumber;
                      updateProfile({ semester: sem, year: Math.ceil(sem / 2) as 1 | 2 | 3 });
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1F1F1F] text-xs font-semibold"
                  >
                    {SEMESTERS.map((sem) => (
                      <option key={sem} value={sem}>
                        Sem {sem} (Year {Math.ceil(sem / 2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5F5B52] dark:text-[#AAA] block mb-1">
                    Board Scheme
                  </label>
                  <select
                    value={profile.scheme}
                    onChange={(e) => updateProfile({ scheme: e.target.value as SchemeType })}
                    className="w-full p-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1F1F1F] text-xs font-semibold"
                  >
                    {SCHEMES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold hover:bg-[#062D24] flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#141414] dark:text-white uppercase tracking-wider">
              Recent Alerts
            </h3>
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#0B3B2E] dark:text-[#D4AF37] font-bold hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  n.isRead
                    ? 'bg-white/70 dark:bg-[#181818] border-[#E6DCC6]/60 opacity-80'
                    : 'bg-[#FAF6EE] dark:bg-[#1F1F1F] border-[#0B3B2E]/40 shadow-sm'
                }`}
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#141414] dark:text-white">
                    {n.title}
                  </h4>
                  <p className="text-xs text-[#5F5B52] dark:text-[#AAA] mt-0.5">{n.description}</p>
                </div>
                <span className="text-[11px] text-[#5F5B52] whitespace-nowrap">{n.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-[#141414] dark:text-white uppercase tracking-wider">
              Saved Handwritten Notes ({savedResourceItems.length})
            </h3>
            <div className="divide-y divide-[#E6DCC6]/60 dark:divide-[#262626]">
              {savedResourceItems.map((r) => (
                <div key={r.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] dark:text-white">{r.title}</h4>
                    <span className="text-[11px] text-[#5F5B52]">
                      {r.subjectName} • {r.fileSize}
                    </span>
                  </div>
                  <button
                    onClick={() => openModal('pdf-preview', r)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold hover:bg-[#062D24]"
                  >
                    View Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
