'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, X, BookOpen, Briefcase, FolderGit2, Bell, ArrowRight } from 'lucide-react';
import { FilterChips } from '@/components/common/FilterChips';

export const MobileSearchSheet: React.FC = () => {
  const {
    studyResources,
    jobListings,
    projects,
    msbteUpdates,
    setMobileScreen,
    openModal,
    setIsSearchOpen,
  } = useApp();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Notes & Papers', 'Jobs', 'Projects', 'Updates'];

  // Multi-entity search
  const matchedResources = studyResources.filter(
    (r) =>
      query.length > 1 &&
      (r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subjectName.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedJobs = jobListings.filter(
    (j) =>
      query.length > 1 &&
      (j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedProjects = projects.filter(
    (p) =>
      query.length > 1 &&
      (p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase())))
  );

  const matchedUpdates = msbteUpdates.filter(
    (u) => query.length > 1 && u.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    matchedResources.length + matchedJobs.length + matchedProjects.length + matchedUpdates.length;

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Header with Search Bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-[#141414] border-b border-[#E6DCC6] dark:border-[#262626] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across MSBTE Scholar..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#0B3B2E] dark:border-[#D4AF37] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-semibold focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F5B52]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setMobileScreen('home');
            }}
            className="text-xs font-bold text-[#5F5B52] hover:text-[#0B3B2E]"
          >
            Cancel
          </button>
        </div>

        <FilterChips
          options={filters}
          selected={filter}
          onSelect={(f) => setFilter(f)}
        />
      </div>

      <div className="p-4 space-y-4">
        {query.length <= 1 ? (
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#5F5B52] dark:text-[#A09A8F] uppercase tracking-wider block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'DBMS Solved Manual',
                'Java Question Bank',
                'TCS Smart Hiring',
                'Winter 2026 Timetable',
                'IoT Micro Project',
                'K Scheme 4th Sem',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E6DCC6] dark:border-[#2D2D2D] text-xs font-medium text-[#141414] dark:text-white hover:border-[#0B3B2E]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#5F5B52]">
              Found {totalResults} results for "{query}"
            </div>

            {/* Study Resources */}
            {(filter === 'All' || filter === 'Notes & Papers') && matchedResources.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase tracking-wider">
                  Study Resources ({matchedResources.length})
                </span>
                {matchedResources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => openModal('pdf-preview', res)}
                    className="p-3 bg-white dark:bg-[#161616] rounded-xl border border-[#E6DCC6] cursor-pointer flex items-center justify-between hover:border-[#0B3B2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#141414] dark:text-white line-clamp-1">
                          {res.title}
                        </h4>
                        <span className="text-[10px] text-[#5F5B52]">
                          {res.category} • {res.subjectName}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5F5B52]" />
                  </div>
                ))}
              </div>
            )}

            {/* Jobs */}
            {(filter === 'All' || filter === 'Jobs') && matchedJobs.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase tracking-wider">
                  Jobs & Internships ({matchedJobs.length})
                </span>
                {matchedJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setMobileScreen('jobs')}
                    className="p-3 bg-white dark:bg-[#161616] rounded-xl border border-[#E6DCC6] cursor-pointer flex items-center justify-between hover:border-[#0B3B2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                          {job.title}
                        </h4>
                        <span className="text-[10px] text-[#5F5B52]">
                          {job.company} • {job.salary}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5F5B52]" />
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {(filter === 'All' || filter === 'Projects') && matchedProjects.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase tracking-wider">
                  Projects ({matchedProjects.length})
                </span>
                {matchedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setMobileScreen('projects')}
                    className="p-3 bg-white dark:bg-[#161616] rounded-xl border border-[#E6DCC6] cursor-pointer flex items-center justify-between hover:border-[#0B3B2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderGit2 className="w-4 h-4 text-[#0B3B2E]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                          {proj.title}
                        </h4>
                        <span className="text-[10px] text-[#5F5B52]">
                          {proj.techStack.join(', ')}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5F5B52]" />
                  </div>
                ))}
              </div>
            )}

            {/* Updates */}
            {(filter === 'All' || filter === 'Updates') && matchedUpdates.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase tracking-wider">
                  MSBTE Circulars ({matchedUpdates.length})
                </span>
                {matchedUpdates.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => setMobileScreen('updates')}
                    className="p-3 bg-white dark:bg-[#161616] rounded-xl border border-[#E6DCC6] cursor-pointer flex items-center justify-between hover:border-[#0B3B2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-[#B3202F]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                          {u.title}
                        </h4>
                        <span className="text-[10px] text-[#5F5B52]">{u.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5F5B52]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
