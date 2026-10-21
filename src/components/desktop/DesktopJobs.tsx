'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JobListing, JobType } from '@/data/types';
import { Search, Briefcase, MapPin, Building2, Calendar, ExternalLink, Bookmark, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { FilterChips } from '@/components/common/FilterChips';

export const DesktopJobs: React.FC = () => {
  const { jobListings, toggleSaveJob, profile, searchQuery } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [query, setQuery] = useState<string>(searchQuery);

  const categories = ['All', 'Private', 'Government', 'Apprenticeship', 'Internship', 'Fresher', 'Remote'];

  const effectiveQuery = (query || searchQuery || '').toLowerCase().trim();

  const filtered = jobListings.filter((job) => {
    const matchCat = selectedCat === 'All' || job.category === selectedCat;
    const matchQuery =
      effectiveQuery === '' ||
      job.title.toLowerCase().includes(effectiveQuery) ||
      job.company.toLowerCase().includes(effectiveQuery) ||
      job.location.toLowerCase().includes(effectiveQuery);
    return matchCat && matchQuery;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
            Diploma Jobs & Apprenticeship Portal
          </h1>
          <p className="text-xs text-[#5F5B52] dark:text-[#888]">
            Verified Diploma Trainee Engineer (DTE), NATS Apprenticeships, and Government PSUs
          </p>
        </div>

        <div className="w-80 relative">
          <Search className="w-4 h-4 text-[#5F5B52] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, company, or city..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>
      </div>

      {/* Categories */}
      <FilterChips
        options={categories}
        selected={selectedCat}
        onSelect={(c) => setSelectedCat(c)}
      />

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((job) => {
          const isSaved = profile.savedJobs.includes(job.id);
          return (
            <div
              key={job.id}
              className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle hover:border-[#0B3B2E] transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E6DCC6]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        {job.category}
                      </span>
                      <StatusBadge type="verified" label="Verified Opening" size="sm" />
                    </div>
                    <h3 className="text-sm font-bold text-[#141414] dark:text-white leading-tight mt-0.5">
                      {job.title}
                    </h3>
                    <p className="text-xs text-[#5F5B52] dark:text-[#888] font-medium">
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
                  title="Bookmark Job"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#5F5B52] dark:text-[#AAA] line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#5F5B52] dark:text-[#999] bg-[#FAF6EE] dark:bg-[#1D1D1D] p-3 rounded-2xl border border-[#E6DCC6]/60">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#0B3B2E] dark:text-[#D4AF37]" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="font-bold text-[#0B3B2E] dark:text-[#D4AF37] truncate">
                  💰 {job.salary}
                </div>
                <div className="truncate">
                  🎓 {job.qualification}
                </div>
                <div className="text-[#B3202F] font-semibold truncate">
                  ⏳ Deadline: {job.deadline}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#5F5B52] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1FA971]" /> Posted {job.postedDate}
                </span>

                <a
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
