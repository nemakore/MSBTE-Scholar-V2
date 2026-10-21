'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, ExternalLink, ShieldCheck, AlertCircle, Calendar } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { FilterChips } from '@/components/common/FilterChips';

export const MobileUpdatesScreen: React.FC = () => {
  const { msbteUpdates } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Timetable', 'Results', 'Scholarship', 'Hackathon'];

  const filtered = msbteUpdates.filter((u) => {
    return selectedFilter === 'All' || u.category === selectedFilter;
  });

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Header */}
      <div className="bg-[#0B3B2E] text-white p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#F1DFA4]">
            BOARD CIRCULARS & NOTICES
          </span>
        </div>
        <h2 className="text-xl font-heading font-black">
          Official MSBTE Updates
        </h2>
        <p className="text-xs text-white/80">
          Verified notifications directly from Maharashtra State Board of Technical Education.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Independent Platform Disclaimer */}
        <div className="bg-[#FFF8E6] dark:bg-[#1D170D] p-3 rounded-xl border border-[#D4AF37]/50 flex items-start gap-2.5 text-xs text-[#5F5B52] dark:text-[#E0D8C8]">
          <ShieldCheck className="w-4 h-4 text-[#B08F26] flex-shrink-0 mt-0.5" />
          <span>
            <strong>Disclaimer:</strong> MSBTE Scholar is an independent educational platform. All circulars are verified against official releases on <code>msbte.ac.in</code>.
          </span>
        </div>

        {/* Filters */}
        <FilterChips
          options={filters}
          selected={selectedFilter}
          onSelect={(f) => setSelectedFilter(f)}
        />

        {/* Updates List */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3"
            >
              <div className="flex items-center justify-between">
                <StatusBadge
                  type={item.type === 'Official Verified' ? 'verified' : 'opportunity'}
                  label={item.type}
                  size="sm"
                />
                <span className="text-[10px] text-[#5F5B52] dark:text-[#888] flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#141414] dark:text-white mt-0.5 leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-[#5F5B52] dark:text-[#AAA] leading-relaxed">
                {item.details}
              </p>

              <div className="pt-2 border-t border-[#E6DCC6]/60 dark:border-[#262626] flex items-center justify-between">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] flex items-center gap-1 hover:underline"
                >
                  <span>Verify on Official Board Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
