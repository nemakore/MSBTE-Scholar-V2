'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, Briefcase, Code, ArrowRight, Check } from 'lucide-react';

export const MobileOnboarding: React.FC = () => {
  const { onboardingStep, setOnboardingStep, setMobileScreen } = useApp();

  const slides = [
    {
      step: 1,
      tag: 'Academic Excellence',
      title: 'Study Smarter',
      description: 'Access complete MSBTE K-Scheme & I-Scheme handwritten notes, solved manuals, syllabus copies, and previous year model answer papers.',
      icon: BookOpen,
      badge: 'All Diploma Branches',
      highlight: '10,000+ Curated Resources',
    },
    {
      step: 2,
      tag: 'Career & Growth',
      title: 'Discover Jobs & Internships',
      description: 'Find verified diploma trainee engineer (DTE) jobs, government apprenticeships (NATS), and paid internships across Maharashtra.',
      icon: Briefcase,
      badge: 'Zero Fake Openings',
      highlight: 'Direct Recruitment Links',
    },
    {
      step: 3,
      tag: 'Practical Mastery',
      title: 'Build Projects & Skills',
      description: 'Explore ready-to-present capstone micro-projects with circuit diagrams, source code, report documents, PPTs, and viva interview guides.',
      icon: Code,
      badge: 'Tested Deliverables',
      highlight: 'Complete Viva Preparation',
    },
  ];

  const currentSlide = slides[onboardingStep - 1] || slides[0];
  const IconComponent = currentSlide.icon;

  const handleNext = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setMobileScreen('login');
    }
  };

  return (
    <div className="min-h-full flex-1 flex flex-col justify-between bg-[#FAF6EE] dark:bg-[#0C0C0C] p-6 select-none">
      {/* Top Bar with Skip */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] px-3 py-1 rounded-full bg-[#E7F2EE] dark:bg-[#0B3B2E] border border-[#0B3B2E]/20">
          {currentSlide.tag}
        </span>
        <button
          onClick={() => setMobileScreen('login')}
          className="text-xs font-semibold text-[#5F5B52] dark:text-[#A09A8F] hover:text-[#0B3B2E]"
        >
          Skip
        </button>
      </div>

      {/* Slide Illustration / Visual Showcase */}
      <div className="my-auto flex flex-col items-center text-center space-y-6">
        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#0B3B2E] via-[#062D24] to-[#135442] p-1 flex items-center justify-center relative shadow-elevated">
          <div className="w-full h-full rounded-full bg-[#0B3B2E] flex flex-col items-center justify-center p-6 text-center border-4 border-[#FAF6EE] dark:border-[#141414]">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] text-[#062D24] flex items-center justify-center mb-2 shadow-gold">
              <IconComponent className="w-8 h-8 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-[#F1DFA4] uppercase tracking-wide">
              {currentSlide.badge}
            </span>
          </div>

          <div className="absolute -bottom-2 bg-[#D4AF37] text-[#062D24] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
            {currentSlide.highlight}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 max-w-xs">
          <h2 className="text-2xl font-heading font-black text-[#0B3B2E] dark:text-[#FAF6EE]">
            {currentSlide.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5B52] dark:text-[#A89F91] leading-relaxed">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-6 pb-4">
        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((s) => (
            <button
              key={s.step}
              onClick={() => setOnboardingStep(s.step)}
              className={`h-2 rounded-full transition-all ${
                onboardingStep === s.step
                  ? 'w-8 bg-[#0B3B2E] dark:bg-[#D4AF37]'
                  : 'w-2 bg-[#E6DCC6] dark:bg-[#333]'
              }`}
              aria-label={`Go to slide ${s.step}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {onboardingStep > 1 && (
            <button
              onClick={() => setOnboardingStep(onboardingStep - 1)}
              className="px-4 py-3.5 rounded-2xl border border-[#E6DCC6] bg-white dark:bg-[#1A1A1A] text-xs font-bold text-[#5F5B52] hover:bg-[#FAF6EE]"
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-3.5 rounded-2xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <span>{onboardingStep === 3 ? 'Get Started' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  );
};
