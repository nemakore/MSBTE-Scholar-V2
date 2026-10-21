'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BRANCHES, SCHEMES, SEMESTERS } from '@/data/mockData';
import { BranchCode, SchemeType, SemesterNumber } from '@/data/types';
import { Check, ArrowRight, Camera, GraduationCap } from 'lucide-react';

export const MobileProfileSetup: React.FC = () => {
  const { profile, updateProfile, setMobileScreen } = useApp();

  const [name, setName] = useState(profile.name);
  const [branch, setBranchState] = useState<BranchCode>(profile.branch);
  const [scheme, setSchemeState] = useState<SchemeType>(profile.scheme);
  const [year, setYearState] = useState<1 | 2 | 3>(
    profile.year || (Math.ceil(profile.semester / 2) as 1 | 2 | 3)
  );
  const [semester, setSemesterState] = useState<SemesterNumber>(profile.semester);
  const [college, setCollege] = useState(profile.college);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      branch,
      scheme,
      year,
      semester,
      college,
    });
    setMobileScreen('home');
  };

  return (
    <div className="min-h-full flex-1 flex flex-col justify-between bg-[#FAF6EE] dark:bg-[#0C0C0C] p-6 select-none">
      {/* Header */}
      <div className="pt-2 text-center space-y-1">
        <h2 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-[#FAF6EE]">
          Complete Your Profile
        </h2>
        <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F]">
          Personalize your MSBTE study feeds, question papers, and job alerts
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="my-auto space-y-4 py-4 max-w-sm mx-auto w-full">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-3 border-[#D4AF37] bg-white shadow-md"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0B3B2E] text-white border-2 border-white"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
            Student Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
            required
          />
        </div>

        {/* Branch Selection */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
            Diploma Branch
          </label>
          <select
            value={branch}
            onChange={(e) => setBranchState(e.target.value as BranchCode)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs font-semibold focus:outline-none focus:border-[#0B3B2E]"
          >
            {BRANCHES.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name} ({b.code})
              </option>
            ))}
          </select>
        </div>

        {/* Diploma Year */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
            Diploma Year
          </label>
          <select
            value={year}
            onChange={(e) => {
              const yr = Number(e.target.value) as 1 | 2 | 3;
              setYearState(yr);
              setSemesterState(((yr * 2) - 1) as SemesterNumber);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3B2E] dark:border-[#D4AF37] bg-white dark:bg-[#1A1A1A] text-[#0B3B2E] dark:text-[#D4AF37] text-xs font-bold focus:outline-none focus:border-[#0B3B2E]"
          >
            <option value={1}>1st Year (FY - First Year)</option>
            <option value={2}>2nd Year (SY - Second Year)</option>
            <option value={3}>3rd Year (TY - Third Year)</option>
          </select>
        </div>

        {/* Scheme & Semester side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
              MSBTE Scheme
            </label>
            <select
              value={scheme}
              onChange={(e) => setSchemeState(e.target.value as SchemeType)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs font-semibold focus:outline-none focus:border-[#0B3B2E]"
            >
              {SCHEMES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
              Current Semester
            </label>
            <select
              value={semester}
              onChange={(e) => {
                const sem = Number(e.target.value) as SemesterNumber;
                setSemesterState(sem);
                setYearState(Math.ceil(sem / 2) as 1 | 2 | 3);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs font-semibold focus:outline-none focus:border-[#0B3B2E]"
            >
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}th Semester
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* College Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
            Polytechnic / College Name (Optional)
          </label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="e.g. Govt Polytechnic Pune"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 mt-2"
        >
          <span>Save & Continue to App</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </form>

      <div className="text-center pb-2">
        <span className="text-[11px] text-[#5F5B52] dark:text-[#888]">
          You can change your academic scheme and branch anytime from settings.
        </span>
      </div>
    </div>
  );
};
