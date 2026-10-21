'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JobType, JobListing } from '@/data/types';
import { Search, Briefcase, Bookmark, MapPin, Building2, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { FilterChips } from '@/components/common/FilterChips';
import { StatusBadge } from '@/components/common/StatusBadge';

export const MobileJobsScreen: React.FC = () => {
  const { jobListings, toggleSaveJob, profile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Private',
    'Government',
    'Apprenticeship',
    'Internship',
    'Fresher',
    'Remote',
  ];

  const filteredJobs = jobListings.filter((job) => {
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-[#E6DCC6] dark:border-[#262626] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-extrabold text-[#0B3B2E] dark:text-[#FAF6EE]">
              Job Alerts & Internships
            </h2>
            <p className="text-[11px] text-[#5F5B52] dark:text-[#A09A8F]">
              Verified Diploma Engineer Trainee (DET) & NATS Openings
            </p>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-bold border border-[#0B3B2E]/20">
            {profile.branch} Matched
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#5F5B52] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, title, or city..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Category Filter Chips */}
        <FilterChips
          options={categories}
          selected={selectedCategory}
          onSelect={(cat) => setSelectedCategory(cat)}
        />

        {/* Job List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#141414] dark:text-white">
              Verified Openings ({filteredJobs.length})
            </span>
            <span className="text-[11px] text-[#5F5B52]">Direct official portals only</span>
          </div>

          {filteredJobs.map((job) => {
            const isSaved = profile.savedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3 hover:border-[#0B3B2E] transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-11 h-11 rounded-xl object-cover border border-[#E6DCC6]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                          {job.category}
                        </span>
                        <StatusBadge type="verified" label="Verified" size="sm" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#141414] dark:text-white leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-[11px] text-[#5F5B52] dark:text-[#999] font-medium">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-xl border text-xs transition-colors ${
                      isSaved
                        ? 'bg-[#0B3B2E] text-white border-[#0B3B2E]'
                        : 'border-[#E6DCC6] hover:bg-[#FAF6EE] text-[#5F5B52]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Job Info Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5F5B52] dark:text-[#A09A8F] bg-[#FAF6EE] dark:bg-[#1C1C1C] p-2.5 rounded-xl border border-[#E6DCC6]/60">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#0B3B2E] dark:text-[#D4AF37] flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="font-bold text-[#0B3B2E] dark:text-[#D4AF37] truncate">
                    💰 {job.salary}
                  </div>
                  <div className="truncate">
                    🎓 {job.qualification}
                  </div>
                  <div className="truncate text-[#B3202F] font-semibold">
                    ⏳ Due: {job.deadline}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-1">
                  <a
                    href={job.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-center"
                  >
                    <span>View & Apply at Official Link</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
