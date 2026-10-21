'use client';

import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  type: 'verified' | 'opportunity' | 'alert' | 'premium';
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  label,
  size = 'md',
}) => {
  if (type === 'verified') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#E7F7EE] text-[#1FA971] border border-[#1FA971]/30 dark:bg-[#1FA971]/20 dark:text-[#38D397] ${
          size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
        }`}
      >
        <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{label || 'Verified'}</span>
      </span>
    );
  }

  if (type === 'opportunity') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#FFF8E6] text-[#B08F26] border border-[#D4AF37]/40 dark:bg-[#D4AF37]/20 dark:text-[#F1DFA4] ${
          size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
        }`}
      >
        <Sparkles className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{label || 'Opportunity'}</span>
      </span>
    );
  }

  if (type === 'premium') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-bold rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#FAF6EE] text-[#062D24] border border-[#D4AF37] dark:text-[#F1DFA4] dark:from-[#D4AF37]/30 dark:to-transparent ${
          size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs'
        }`}
      >
        <span>★ {label || 'Premium'}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#FDECEE] text-[#B3202F] border border-[#B3202F]/30 dark:bg-[#B3202F]/20 dark:text-[#FF6B6B] ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <AlertCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{label || 'Notice'}</span>
    </span>
  );
};
