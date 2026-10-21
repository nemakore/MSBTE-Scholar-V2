'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, ExternalLink, ShieldCheck, Calendar, Search } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { FilterChips } from '@/components/common/FilterChips';

export const DesktopUpdates: React.FC = () => {
  const { msbteUpdates, searchQuery } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');
  const [query, setQuery] = useState(searchQuery);

  const categories = ['All', 'Timetable', 'Results', 'Scholarship', 'Hackathon'];

  const effectiveQuery = (query || searchQuery || '').toLowerCase().trim();

  const filtered = msbteUpdates.filter((u) => {
    const matchCat = selectedCat === 'All' || u.category === selectedCat;
    const matchQuery = effectiveQuery === '' || u.title.toLowerCase().includes(effectiveQuery);
    return matchCat && matchQuery;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
            MSBTE Official Board Notifications & Circulars
          </h1>
          <p className="text-xs text-[#5F5B52] dark:text-[#888]">
            Theory exam timetables, hall tickets, revaluation results, and MahaDBT scholarships
          </p>
        </div>

        <div className="w-80 relative">
          <Search className="w-4 h-4 text-[#5F5B52] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search circular title..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>
      </div>

      {/* Independent Platform Disclaimer */}
      <div className="bg-[#FFF8E6] dark:bg-[#1D170D] p-4 rounded-2xl border border-[#D4AF37]/50 flex items-start gap-3 text-xs text-[#5F5B52] dark:text-[#E0D8C8]">
        <ShieldCheck className="w-5 h-5 text-[#B08F26] flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0B3B2E] dark:text-[#D4AF37]">Independent Educational Platform Disclaimer:</strong>
          <span className="block mt-0.5">
            MSBTE Scholar is an independent platform built by and for diploma students. We are not an official government branch of the Maharashtra State Board of Technical Education. All notices are verified against public board releases on <code>msbte.ac.in</code>.
          </span>
        </div>
      </div>

      {/* Filters */}
      <FilterChips
        options={categories}
        selected={selectedCat}
        onSelect={(c) => setSelectedCat(c)}
      />

      {/* Circulars List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3 hover:border-[#0B3B2E] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <StatusBadge
                  type={item.type === 'Official Verified' ? 'verified' : 'opportunity'}
                  label={item.type}
                  size="sm"
                />
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <span className="text-xs text-[#5F5B52] dark:text-[#888] flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" /> Published: {item.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#141414] dark:text-white leading-snug">
              {item.title}
            </h3>

            <p className="text-xs text-[#5F5B52] dark:text-[#AAA] leading-relaxed">
              {item.details}
            </p>

            <div className="pt-2 border-t border-[#E6DCC6]/60 dark:border-[#262626] flex items-center justify-between">
              <span className="text-[11px] text-[#5F5B52]">
                Authority: MSBTE Kherwadi, Bandra (E), Mumbai - 400 051
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FAF6EE] dark:bg-[#222] border border-[#0B3B2E] dark:border-[#D4AF37] text-[#0B3B2E] dark:text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 hover:bg-[#0B3B2E] hover:text-white transition-all"
              >
                <span>Read Board Circular</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
