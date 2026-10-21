'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ProjectItem } from '@/data/types';
import { Search, FolderGit2, Check, Download, Eye, ShoppingCart, Star, ShieldCheck } from 'lucide-react';
import { FilterChips } from '@/components/common/FilterChips';

export const DesktopProjects: React.FC = () => {
  const { projects, openModal, searchQuery } = useApp();
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [query, setQuery] = useState<string>(searchQuery);

  const branches = ['All', 'Computer', 'IT', 'Electrical', 'Mechanical', 'Civil'];

  const effectiveQuery = (query || searchQuery || '').toLowerCase().trim();

  const filtered = projects.filter((p) => {
    const matchBranch =
      selectedBranch === 'All' ||
      (selectedBranch === 'Computer' && p.branch === 'CO') ||
      (selectedBranch === 'IT' && p.branch === 'IT') ||
      (selectedBranch === 'Electrical' && p.branch === 'EE') ||
      (selectedBranch === 'Mechanical' && p.branch === 'ME') ||
      (selectedBranch === 'Civil' && p.branch === 'CE');

    const matchQuery =
      effectiveQuery === '' ||
      p.title.toLowerCase().includes(effectiveQuery) ||
      p.techStack.some((t) => t.toLowerCase().includes(effectiveQuery));

    return matchBranch && matchQuery;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
            Capstone Micro-Project Hub
          </h1>
          <p className="text-xs text-[#5F5B52] dark:text-[#888]">
            Pre-evaluated MSBTE 5th & 6th semester projects with report docs, circuit schematics, and external examiner viva preparation
          </p>
        </div>

        <div className="w-80 relative">
          <Search className="w-4 h-4 text-[#5F5B52] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PHP, Java, IoT, React projects..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>
      </div>

      {/* Branch Tabs */}
      <FilterChips
        options={branches}
        selected={selectedBranch}
        onSelect={(b) => setSelectedBranch(b)}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-white dark:bg-[#161616] rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle overflow-hidden flex flex-col justify-between hover:border-[#0B3B2E] transition-all"
          >
            <div>
              {/* Thumbnail */}
              <div className="h-44 relative overflow-hidden">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0B3B2E]/90 text-white backdrop-blur-sm">
                    {proj.branch} Engg
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#062D24]/90 text-[#F1DFA4] backdrop-blur-sm">
                    Sem {proj.semester}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  {proj.isPaid ? (
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#062D24] shadow-md">
                      ₹{proj.price}
                    </span>
                  ) : (
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#1FA971] text-white shadow-md">
                      FREE
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-bold text-[#141414] dark:text-white leading-tight">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#5F5B52] dark:text-[#AAA] line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] border border-[#E6DCC6]/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Deliverables Checklist */}
                <div className="bg-[#FAF6EE] dark:bg-[#1C1C1C] p-3 rounded-2xl border border-[#E6DCC6]/60 text-[10px] text-[#5F5B52] dark:text-[#999] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#1FA971] font-semibold">
                    <Check className="w-3.5 h-3.5" /> Full Source Code & Database Script
                  </div>
                  <div className="flex items-center gap-1.5 text-[#1FA971] font-semibold">
                    <Check className="w-3.5 h-3.5" /> Word Report Document (MSBTE format)
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                    <Check className="w-3.5 h-3.5" /> 50+ External Viva Questions & Answers
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  alert(`Project Synopsis Preview:\n\n${proj.title}\nBranch: ${proj.branch}\nDeliverables: Source code, MSBTE report, PPT, Viva FAQs.`)
                }
                className="py-2.5 rounded-xl border border-[#0B3B2E] dark:border-[#D4AF37] text-[#0B3B2E] dark:text-[#D4AF37] text-xs font-bold hover:bg-[#E7F2EE] transition-colors"
              >
                Synopsis
              </button>

              {proj.isPaid ? (
                <button
                  onClick={() =>
                    openModal('checkout', {
                      type: 'project',
                      title: proj.title,
                      amount: proj.price,
                    })
                  }
                  className="py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-gold transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Unlock (₹{proj.price})</span>
                </button>
              ) : (
                <button
                  onClick={() => alert(`Free project files for ${proj.title} downloaded successfully!`)}
                  className="py-2.5 rounded-xl bg-[#1FA971] hover:bg-[#188B5D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
