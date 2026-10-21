'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Logo } from '@/components/brand/Logo';
import {
  BookOpen,
  Briefcase,
  FolderGit2,
  Users,
  Check,
  ArrowRight,
  ShieldCheck,
  Star,
  Play,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const DesktopLandingPage: React.FC = () => {
  const { setDesktopTab, setMobileScreen, openModal } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#0C0C0C] text-[#141414] dark:text-[#F5F5F5] select-none">
      {/* Public Navbar */}
      <nav className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between border-b border-[#E6DCC6] dark:border-[#262626]">
        <Logo size="md" />

        <div className="hidden md:flex items-center gap-8 text-xs font-bold text-[#5F5B52] dark:text-[#A09A8F]">
          <a href="#features" className="hover:text-[#0B3B2E] dark:hover:text-[#D4AF37] transition-colors">
            Features
          </a>
          <a href="#plans" className="hover:text-[#0B3B2E] dark:hover:text-[#D4AF37] transition-colors">
            Pricing (₹199)
          </a>
          <a href="#faq" className="hover:text-[#0B3B2E] dark:hover:text-[#D4AF37] transition-colors">
            FAQs
          </a>
          <button
            onClick={() => setDesktopTab('updates')}
            className="text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
          >
            MSBTE Circulars
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDesktopTab('dashboard')}
            className="px-4 py-2 text-xs font-bold text-[#0B3B2E] dark:text-[#FAF6EE] hover:bg-[#E6DCC6]/40 rounded-xl transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => setDesktopTab('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-[#0B3B2E]/20 transition-all active:scale-95"
          >
            <span>Enter App</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F2EE] dark:bg-[#0B3B2E] border border-[#0B3B2E]/20 text-xs font-bold text-[#0B3B2E] dark:text-[#F1DFA4]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tailored for MSBTE K-Scheme & I-Scheme Students</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#0B3B2E] dark:text-white leading-[1.15]">
              Everything a Diploma Student Needs.
            </h1>

            <p className="text-sm sm:text-base text-[#5F5B52] dark:text-[#A89F91] leading-relaxed max-w-lg">
              Stop wandering through random WhatsApp groups. Access verified handwritten notes, solved lab manuals, model answer question papers, verified diploma jobs, and complete micro-projects in one dedicated student platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setDesktopTab('dashboard')}
                className="px-7 py-3.5 rounded-2xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-sm font-extrabold flex items-center gap-2 shadow-gold transition-all active:scale-98"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => setDesktopTab('study')}
                className="px-6 py-3.5 rounded-2xl border-2 border-[#0B3B2E] dark:border-[#D4AF37] text-[#0B3B2E] dark:text-[#F1DFA4] text-sm font-bold flex items-center gap-2 hover:bg-[#E7F2EE] dark:hover:bg-[#1E1E1E] transition-all"
              >
                <Play className="w-4 h-4 fill-[#0B3B2E] dark:fill-[#D4AF37]" />
                <span>Explore Notes</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-lg bg-gradient-to-tr from-[#0B3B2E] via-[#062D24] to-[#124D3D] p-8 rounded-3xl border-3 border-[#D4AF37] shadow-elevated text-white space-y-6">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#062D24] flex items-center justify-center font-black">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Polytechnic Scholar Suite</h3>
                    <span className="text-[11px] text-[#F1DFA4]">Official Curriculum Aligned</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1FA971] text-white font-bold">
                  K Scheme Live
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>Handwritten Topper Notes & Solved Manuals</span>
                  </span>
                  <strong className="text-[#1FA971]">100% Free</strong>
                </div>

                <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                    <span>TCS Smart Hiring & Govt NATS Openings</span>
                  </span>
                  <strong className="text-[#F1DFA4]">Verified</strong>
                </div>

                <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Tested Final Year Capstone Projects + Viva</span>
                  </span>
                  <strong className="text-[#D4AF37]">Ready</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar matching blueprint */}
      <section className="bg-white dark:bg-[#141414] border-y border-[#E6DCC6] dark:border-[#262626] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-heading font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              50K+
            </div>
            <div className="text-xs font-semibold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider mt-1">
              Active Diploma Students
            </div>
          </div>

          <div>
            <div className="text-3xl lg:text-4xl font-heading font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              10K+
            </div>
            <div className="text-xs font-semibold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider mt-1">
              Curated Study Resources
            </div>
          </div>

          <div>
            <div className="text-3xl lg:text-4xl font-heading font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              5K+
            </div>
            <div className="text-xs font-semibold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider mt-1">
              Verified Job & NATS Alerts
            </div>
          </div>

          <div>
            <div className="text-3xl lg:text-4xl font-heading font-black text-[#0B3B2E] dark:text-[#D4AF37]">
              1K+
            </div>
            <div className="text-xs font-semibold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider mt-1">
              Tested Capstone Projects
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B3B2E] dark:text-[#D4AF37]">
            BUILT EXCLUSIVELY FOR MSBTE
          </span>
          <h2 className="text-3xl font-heading font-black text-[#0B3B2E] dark:text-white">
            Four Core Pillars Every Polytechnic Student Needs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Study Material',
              desc: 'Official K-Scheme syllabus, handwritten toppers notes, complete solved lab manuals with verified program outputs, and winter/summer question papers.',
              icon: BookOpen,
              tab: 'study',
            },
            {
              title: 'Job Alerts & NATS',
              desc: 'Direct hiring links from Tata, L&T, Mahavitaran, Infosys, and government PSUs. Never waste time on fake spam job portals.',
              icon: Briefcase,
              tab: 'jobs',
            },
            {
              title: 'Project Hub',
              desc: 'Tested micro-projects and final year capstone submissions. Includes full source code, MSBTE format Word report, PPT, and 50+ viva questions.',
              icon: FolderGit2,
              tab: 'projects',
            },
            {
              title: 'Student Community',
              desc: 'Safe peer-to-peer discussions for practical help, manual program troubleshooting, and placement advice across all branches.',
              icon: Users,
              tab: 'community',
            },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => setDesktopTab(feat.tab as any)}
                className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle hover:border-[#0B3B2E] transition-all cursor-pointer group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] flex items-center justify-center group-hover:bg-[#0B3B2E] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#141414] dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#5F5B52] dark:text-[#AAA] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing / Plan Comparison */}
      <section id="plans" className="bg-[#FAF6EE] dark:bg-[#0C0C0C] py-16 border-t border-[#E6DCC6] dark:border-[#262626]">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase tracking-wider">
              TRANSPARENT STUDENT PRICING
            </span>
            <h2 className="text-3xl font-heading font-black text-[#0B3B2E] dark:text-white">
              Accessible to Every Diploma Engineer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="bg-white dark:bg-[#161616] p-8 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] space-y-6 shadow-subtle">
              <div>
                <h3 className="text-lg font-bold text-[#141414] dark:text-white">Free Forever</h3>
                <p className="text-xs text-[#5F5B52]">Essential resources for all diploma students</p>
                <div className="text-3xl font-black text-[#0B3B2E] dark:text-white mt-4">₹0</div>
              </div>

              <div className="space-y-2.5 text-xs text-[#5F5B52] dark:text-[#AAA]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1FA971]" /> MSBTE K-Scheme Syllabus Copies
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1FA971]" /> Previous Question Papers & Answer Keys
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1FA971]" /> Unlimited Verified Job Alerts
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1FA971]" /> Student Community Discussion Access
                </div>
              </div>

              <button
                onClick={() => setDesktopTab('dashboard')}
                className="w-full py-3 rounded-xl border border-[#0B3B2E] text-[#0B3B2E] dark:border-[#D4AF37] dark:text-[#D4AF37] text-xs font-bold hover:bg-[#E7F2EE]"
              >
                Access Free Tier
              </button>
            </div>

            {/* Premium Semester Pass */}
            <div className="bg-gradient-to-b from-[#0B3B2E] to-[#062D24] text-white p-8 rounded-3xl border-2 border-[#D4AF37] space-y-6 shadow-card relative">
              <span className="absolute -top-3 right-6 bg-[#D4AF37] text-[#062D24] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                POPULAR CHOICE
              </span>

              <div>
                <h3 className="text-lg font-bold text-white">Semester Pro Pass</h3>
                <p className="text-xs text-[#F1DFA4]">Complete academic & viva preparation pack</p>
                <div className="text-3xl font-black text-[#D4AF37] mt-4">
                  ₹199 <span className="text-xs text-white/70 font-normal">/ semester</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" /> Everything in Free Forever
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" /> Full Solved Lab Manuals with Verified Outputs
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" /> High-Scoring Toppers Handwritten Notes
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" /> Final Year Micro-Project Viva Question Banks
                </div>
              </div>

              <button
                onClick={() =>
                  openModal('checkout', {
                    type: 'premium',
                    title: 'Semester Pro Pass (MSBTE 4th Sem)',
                    amount: 199,
                  })
                }
                className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29e2e] text-[#062D24] text-xs font-black shadow-gold transition-all"
              >
                Get Semester Pass (₹199)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-heading font-black text-[#0B3B2E] dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#5F5B52]">Answers to common student questions</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Is MSBTE Scholar affiliated with the government MSBTE board?',
              a: 'No. MSBTE Scholar is an independent educational platform created by and for diploma engineers. All circulars are verified against official releases on msbte.ac.in.',
            },
            {
              q: 'Are K-Scheme notes available for Computer, Mechanical, and Civil?',
              a: 'Yes! The entire platform is updated to support the latest K-Scheme curriculum, while retaining full archive archives for I-Scheme and G-Scheme.',
            },
            {
              q: 'Can I install this on my Android phone as an app?',
              a: 'Yes! MSBTE Scholar is an installable Progressive Web App (PWA). You can tap "Install" from Chrome on Android to get a fast, native-like fullscreen icon on your home screen.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] space-y-1.5"
            >
              <h4 className="text-xs sm:text-sm font-bold text-[#0B3B2E] dark:text-[#D4AF37]">
                {item.q}
              </h4>
              <p className="text-xs text-[#5F5B52] dark:text-[#AAA] leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#062D24] text-[#FAF6EE] border-t border-[#0B3B2E] py-12 select-none">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <Logo size="md" light />
            <div className="text-xs text-[#F1DFA4] flex flex-wrap gap-6 font-semibold">
              <a href="#" className="hover:underline">Contact Support</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Refund Policy</a>
            </div>
          </div>

          <div className="pt-6 border-t border-[#0B3B2E] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF6EE]/70">
            <span>© 2026 MSBTE Scholar (msbtescholar.com) • Everything a Diploma Student Needs</span>
            <span>Independent Educational Platform • Not affiliated with MSBTE Mumbai</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
