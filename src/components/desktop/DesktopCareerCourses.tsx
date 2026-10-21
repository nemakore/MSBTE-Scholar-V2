'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { GraduationCap, Star, Clock, Layers, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export const DesktopCareerCourses: React.FC = () => {
  const { courses, openModal } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'roadmaps'>('all');

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
            Career Hub & Industry Skill Courses
          </h1>
          <p className="text-xs text-[#5F5B52] dark:text-[#888]">
            Master technical interview skills, full stack web development, and diploma campus placement cracking
          </p>
        </div>

        <div className="flex items-center bg-white dark:bg-[#1E1E1E] p-1 rounded-2xl border border-[#E6DCC6] dark:border-[#2E2E2E]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#0B3B2E] text-white shadow-sm'
                : 'text-[#5F5B52]'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setActiveTab('roadmaps')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'roadmaps'
                ? 'bg-[#0B3B2E] text-white shadow-sm'
                : 'text-[#5F5B52]'
            }`}
          >
            Branch Roadmaps
          </button>
        </div>
      </div>

      {activeTab === 'all' ? (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-[#161616] rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle overflow-hidden flex flex-col justify-between hover:border-[#0B3B2E] transition-all"
            >
              <div>
                <div className="h-44 relative overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#0B3B2E]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {c.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#062D24] text-xs font-black px-2.5 py-1 rounded-full">
                    ₹{c.price}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-bold text-[#141414] dark:text-white leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#5F5B52] dark:text-[#888]">
                    Instructor: <strong>{c.instructor}</strong>
                  </p>
                  <p className="text-xs text-[#5F5B52] dark:text-[#AAA] line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#5F5B52] pt-2 border-t border-[#E6DCC6]/60">
                    <span className="flex items-center gap-1 font-bold text-[#D4AF37]">
                      <Star className="w-4 h-4 fill-[#D4AF37]" /> {c.rating} ({c.enrolledStudents.toLocaleString()})
                    </span>
                    <span>{c.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                {c.isEnrolled ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#1FA971]">Enrolled</span>
                      <span>{c.progressPercent}% Completed</span>
                    </div>
                    <div className="w-full bg-[#FAF6EE] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1FA971] h-full rounded-full"
                        style={{ width: `${c.progressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      openModal('checkout', {
                        type: 'project',
                        title: c.title,
                        amount: c.price,
                      })
                    }
                    className="w-full py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Enroll Now (₹{c.price})</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Career Roadmaps */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] space-y-4">
            <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase">
              Track 1: Software & Web Development (CO / IT)
            </span>
            <div className="space-y-3">
              <div className="p-3 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Step 1: C, Java & Data Structures</span>
                <p className="text-[#5F5B52]">Master OOP concepts, pointers, memory stack/heap, and common MSBTE algorithm implementations.</p>
              </div>
              <div className="p-3 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Step 2: Full Stack JavaScript & React</span>
                <p className="text-[#5F5B52]">Build real client-server database web apps for your 5th/6th semester capstone micro-project.</p>
              </div>
              <div className="p-3 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Step 3: TCS & Campus Aptitude Drills</span>
                <p className="text-[#5F5B52]">Practice quantitative aptitude, coding tests, and technical HR interview questions.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] space-y-4">
            <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase">
              Track 2: Core Engineering & Govt PSUs (EE / ME / CE)
            </span>
            <div className="space-y-3">
              <div className="p-3 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Step 1: Board Subject Foundations</span>
                <p className="text-[#5F5B52]">Solid theoretical grasp of circuit theory, thermodynamics, mechanics, and surveying.</p>
              </div>
              <div className="p-3 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Step 2: NATS Apprenticeship Registration</span>
                <p className="text-[#5F5B52]">Register on the national portal (mhrdnats.gov.in) with 60%+ aggregate diploma scores.</p>
              </div>
              <div className="p-3 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Step 3: Mahavitaran / Mahatransco / PWD Tests</span>
                <p className="text-[#5F5B52]">Crack Maharashtra state competitive exams for Junior Engineer (JE) technical posts.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
