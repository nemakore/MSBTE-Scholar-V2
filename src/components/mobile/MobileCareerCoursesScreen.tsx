'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CourseItem } from '@/data/types';
import { GraduationCap, Star, Clock, BookOpen, CheckCircle2, Play, Sparkles, ShoppingBag } from 'lucide-react';

export const MobileCareerCoursesScreen: React.FC = () => {
  const { courses, enrollInCourse, openModal } = useApp();
  const [activeTab, setActiveTab] = useState<'courses' | 'roadmaps'>('courses');

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Header */}
      <div className="bg-[#0B3B2E] text-white p-5 space-y-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#F1DFA4]">
            CAREER & COURSES HUB
          </span>
        </div>
        <h2 className="text-xl font-heading font-black">
          Industry Skills for Diploma Engineers
        </h2>
        <p className="text-xs text-white/80">
          Curated masterclasses and step-by-step career roadmaps from polytechnic to tech jobs.
        </p>

        {/* Tab Switcher */}
        <div className="flex bg-[#062D24] p-1 rounded-xl border border-[#D4AF37]/30">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'courses'
                ? 'bg-[#0B3B2E] text-[#D4AF37] shadow-sm'
                : 'text-white/70'
            }`}
          >
            Video Courses
          </button>
          <button
            onClick={() => setActiveTab('roadmaps')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'roadmaps'
                ? 'bg-[#0B3B2E] text-[#D4AF37] shadow-sm'
                : 'text-white/70'
            }`}
          >
            Career Roadmaps
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'courses' ? (
          <div className="space-y-4">
            {courses.map((course) => {
              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-[#161616] rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle overflow-hidden space-y-3 p-4"
                >
                  <div className="relative rounded-xl overflow-hidden h-36">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#0B3B2E]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {course.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-[#D4AF37] text-[#062D24] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                      ₹{course.price}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#141414] dark:text-white leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F] mt-1 font-medium">
                      By: {course.instructor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#5F5B52] dark:text-[#888] pt-1 border-t border-[#E6DCC6]/60">
                    <div className="flex items-center gap-1 font-bold text-[#D4AF37]">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      <span>{course.rating}</span>
                      <span className="text-[#5F5B52] font-normal">
                        ({course.enrolledStudents.toLocaleString()} students)
                      </span>
                    </div>
                    <span>{course.duration}</span>
                  </div>

                  {course.isEnrolled ? (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-[#1FA971]">Enrolled • In Progress</span>
                        <span>{course.progressPercent}% Completed</span>
                      </div>
                      <div className="w-full bg-[#FAF6EE] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#1FA971] h-full rounded-full"
                          style={{ width: `${course.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        openModal('checkout', {
                          type: 'project',
                          title: course.title,
                          amount: course.price,
                        })
                      }
                      className="w-full py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Enroll Now (₹{course.price})</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Roadmaps View */
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] space-y-3">
              <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase">
                Computer & IT Diploma Path
              </span>
              <h3 className="text-sm font-bold text-[#141414] dark:text-white">
                From Polytechnic to Top IT Placements (TCS, Infosys, Tech Startups)
              </h3>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0B3B2E] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                      Core Academic Foundations (Sem 1-3)
                    </h4>
                    <p className="text-[11px] text-[#5F5B52]">
                      Master C Programming, Data Structures (DSU), and Digital Techniques. Clear all MSBTE theory papers with 75%+.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0B3B2E] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                      Practical Development & Micro-Projects (Sem 4-5)
                    </h4>
                    <p className="text-[11px] text-[#5F5B52]">
                      Build full-stack applications in Java/PHP/React. Complete practical manuals cleanly with actual working database connections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#062D24] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                      Placement Season & Capstone Defense (Sem 6)
                    </h4>
                    <p className="text-[11px] text-[#5F5B52]">
                      Prepare Aptitude, Technical viva questions, and apply to TCS Smart Hiring, L&T, and Mahavitaran apprenticeships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
