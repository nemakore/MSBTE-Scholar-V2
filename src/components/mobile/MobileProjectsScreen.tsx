'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ProjectItem } from '@/data/types';
import { Search, FolderGit2, Star, Download, Eye, Check, ShieldCheck, ShoppingCart } from 'lucide-react';
import { FilterChips } from '@/components/common/FilterChips';

export const MobileProjectsScreen: React.FC = () => {
  const { projects, openModal, profile, toggleSaveProject } = useApp();
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const branches = ['All', 'Computer', 'IT', 'Electrical', 'Mechanical', 'Civil'];

  const filteredProjects = projects.filter((p) => {
    const matchesBranch =
      selectedBranch === 'All' ||
      (selectedBranch === 'Computer' && p.branch === 'CO') ||
      (selectedBranch === 'IT' && p.branch === 'IT') ||
      (selectedBranch === 'Electrical' && p.branch === 'EE') ||
      (selectedBranch === 'Mechanical' && p.branch === 'ME') ||
      (selectedBranch === 'Civil' && p.branch === 'CE');

    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesBranch && matchesSearch;
  });

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-[#E6DCC6] dark:border-[#262626] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-extrabold text-[#0B3B2E] dark:text-[#FAF6EE]">
              Project Hub & Micro-Projects
            </h2>
            <p className="text-[11px] text-[#5F5B52] dark:text-[#A09A8F]">
              Tested Final Year Capstone Projects with Viva Questions
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-bold border border-[#0B3B2E]/20">
            MSBTE Approved
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#5F5B52] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Java, Python, IoT, PHP projects..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Branch Chips */}
        <FilterChips
          options={branches}
          selected={selectedBranch}
          onSelect={(b) => setSelectedBranch(b)}
        />

        {/* Project List */}
        <div className="space-y-4">
          {filteredProjects.map((proj) => {
            return (
              <div
                key={proj.id}
                className="bg-white dark:bg-[#161616] rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle overflow-hidden space-y-3 p-4 hover:border-[#0B3B2E] transition-all"
              >
                {/* Thumbnail Image */}
                <div className="relative rounded-xl overflow-hidden h-36 border border-[#E6DCC6]/60">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0B3B2E]/90 text-white backdrop-blur-sm">
                      {proj.branch} Engg
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#062D24]/90 text-[#F1DFA4] backdrop-blur-sm">
                      Sem {proj.semester}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    {proj.isPaid ? (
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] shadow-sm">
                        ₹{proj.price}
                      </span>
                    ) : (
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#1FA971] text-white shadow-sm">
                        FREE
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Title and Details */}
                <div>
                  <h3 className="text-sm font-bold text-[#141414] dark:text-white leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F] mt-1 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] font-semibold border border-[#E6DCC6]/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Deliverables Checklist */}
                <div className="bg-[#FAF6EE] dark:bg-[#1D1D1D] p-2.5 rounded-xl border border-[#E6DCC6]/60 text-[10px] text-[#5F5B52] dark:text-[#A09A8F] flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-[#1FA971]">
                    <Check className="w-3 h-3" /> Full Source Code
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#1FA971]">
                    <Check className="w-3 h-3" /> Word Report (MSBTE Format)
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#1FA971]">
                    <Check className="w-3 h-3" /> PPT Presentation
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#D4AF37]">
                    <Check className="w-3 h-3" /> 50+ Viva Questions
                  </span>
                </div>

                {/* Bottom Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      alert(`Project Deliverable Preview:\n${proj.title}\nIncludes full source directory structure, schema scripts, and synopsis document.`);
                    }}
                    className="py-2.5 rounded-xl border border-[#0B3B2E] text-[#0B3B2E] dark:text-[#F1DFA4] dark:border-[#D4AF37] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#E7F2EE] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Synopsis</span>
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
                      <span>Unlock Code (₹{proj.price})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        alert(`Downloading complete free project package for ${proj.title}`);
                      }}
                      className="py-2.5 rounded-xl bg-[#1FA971] hover:bg-[#188B5D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Free</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
