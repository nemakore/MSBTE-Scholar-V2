'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Clock, HelpCircle, Award, CheckCircle2, Play, Flame } from 'lucide-react';
import { MOCK_TESTS } from '@/data/mockData';

export const MobileMockTestsScreen: React.FC = () => {
  const { mockTests, openModal } = useApp();
  const [selectedTestId, setSelectedTestId] = useState<string>(mockTests[0]?.id || '');

  const currentTest = mockTests.find((t) => t.id === selectedTestId) || mockTests[0];

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Header */}
      <div className="bg-[#0B3B2E] text-white p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#F1DFA4]">
            MSBTE Board Exam Prep
          </span>
        </div>
        <h2 className="text-xl font-heading font-black">
          Mock Tests & MCQ Drills
        </h2>
        <p className="text-xs text-white/80">
          Practice timed MSBTE online quizzes with instant scoring and explanations.
        </p>
      </div>

      <div className="p-4 space-y-5">
        {/* Test Selector Cards */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#5F5B52] dark:text-[#A09A8F]">
            Select Exam Paper:
          </label>
          <div className="space-y-2">
            {mockTests.map((t) => {
              const isSelected = t.id === currentTest.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTestId(t.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#0B3B2E] bg-white dark:bg-[#1C1C1C] ring-2 ring-[#0B3B2E] dark:ring-[#D4AF37] shadow-md'
                      : 'border-[#E6DCC6] bg-white/70 dark:bg-[#161616] text-[#5F5B52]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      {t.subjectName}
                    </span>
                    <h4 className="text-xs font-bold text-[#141414] dark:text-white mt-0.5">
                      {t.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-[#5F5B52] dark:text-[#888] mt-1">
                      <span>⏱️ {t.durationMinutes} Mins</span>
                      <span>📝 {t.questionCount} MCQs</span>
                      <span>🎯 {t.totalMarks} Marks</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-[#0B3B2E] text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Test Launch Card */}
        {currentTest && (
          <div className="bg-gradient-to-br from-white to-[#FAF6EE] dark:from-[#181818] dark:to-[#121212] p-5 rounded-2xl border-2 border-[#D4AF37] shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#0B3B2E] dark:text-[#D4AF37] bg-[#E7F2EE] dark:bg-[#0B3B2E] px-2.5 py-1 rounded-full">
                READY TO BEGIN
              </span>
              <span className="text-xs font-bold text-[#1FA971] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> High Repeat Probability
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#0B3B2E] dark:text-white">
                {currentTest.title}
              </h3>
              <p className="text-xs text-[#5F5B52] dark:text-[#AAA] mt-1">
                Focus Unit: {currentTest.topic}
              </p>
            </div>

            {/* Test Stats Grid */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#E6DCC6] dark:border-[#2C2C2C] text-center">
              <div className="p-2 bg-white dark:bg-[#202020] rounded-xl">
                <HelpCircle className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37] mx-auto mb-1" />
                <span className="text-xs font-black block">{currentTest.questionCount}</span>
                <span className="text-[9px] text-[#5F5B52] uppercase font-semibold">Questions</span>
              </div>
              <div className="p-2 bg-white dark:bg-[#202020] rounded-xl">
                <Clock className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37] mx-auto mb-1" />
                <span className="text-xs font-black block">{currentTest.durationMinutes}m</span>
                <span className="text-[9px] text-[#5F5B52] uppercase font-semibold">Duration</span>
              </div>
              <div className="p-2 bg-white dark:bg-[#202020] rounded-xl">
                <Award className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37] mx-auto mb-1" />
                <span className="text-xs font-black block">{currentTest.totalMarks}</span>
                <span className="text-[9px] text-[#5F5B52] uppercase font-semibold">Total Marks</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#5F5B52] dark:text-[#999]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1FA971]" />
                <span>Timer auto-submits upon completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1FA971]" />
                <span>Includes step-by-step model explanations</span>
              </div>
            </div>

            <button
              onClick={() => openModal('quiz', currentTest)}
              className="w-full py-3.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-gold transition-all active:scale-98"
            >
              <Play className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Start Timed Test Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
