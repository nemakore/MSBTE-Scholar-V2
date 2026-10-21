'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, CheckCheck, Briefcase, FileText, MessageSquare, BookOpen, Clock } from 'lucide-react';
import { FilterChips } from '@/components/common/FilterChips';

export const MobileNotificationsScreen: React.FC = () => {
  const { notifications, markAllNotificationsRead, setMobileScreen } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Jobs', 'Updates', 'Community', 'Courses'];

  const filtered = notifications.filter((n) => {
    if (selectedFilter === 'Jobs') return n.category === 'job';
    if (selectedFilter === 'Updates') return n.category === 'update';
    if (selectedFilter === 'Community') return n.category === 'community';
    if (selectedFilter === 'Courses') return n.category === 'course';
    return true;
  });

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'job':
        return <Briefcase className="w-4 h-4 text-[#D4AF37]" />;
      case 'update':
        return <FileText className="w-4 h-4 text-[#B3202F]" />;
      case 'community':
        return <MessageSquare className="w-4 h-4 text-[#1FA971]" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#0B3B2E]" />;
    }
  };

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Header */}
      <div className="bg-[#0B3B2E] text-white p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="text-xl font-heading font-black">
              Notification Center
            </h2>
          </div>
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-xs text-[#F1DFA4] hover:underline font-semibold"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>
        <p className="text-xs text-white/80">
          Stay informed on timetable changes, verified job openings, and replies.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Filters */}
        <FilterChips
          options={filters}
          selected={selectedFilter}
          onSelect={(f) => setSelectedFilter(f)}
        />

        {/* Notification list */}
        <div className="space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                item.isRead
                  ? 'bg-white/80 dark:bg-[#161616] border-[#E6DCC6] dark:border-[#262626] opacity-80'
                  : 'bg-white dark:bg-[#1C1C1C] border-[#0B3B2E]/40 dark:border-[#D4AF37]/40 shadow-sm'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] dark:bg-[#252525] border border-[#E6DCC6] dark:border-[#333] flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#141414] dark:text-white truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#5F5B52] dark:text-[#888] flex-shrink-0 ml-2">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F] mt-0.5 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {!item.isRead && (
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
