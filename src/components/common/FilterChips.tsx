'use client';

import React from 'react';

interface FilterChipsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  selected,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none ${className}`}>
      {options.map((option) => {
        const isSelected = selected.toLowerCase() === option.toLowerCase();
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
              isSelected
                ? 'bg-[#0B3B2E] text-[#FAF6EE] shadow-sm ring-1 ring-[#0B3B2E] dark:bg-[#D4AF37] dark:text-[#062D24] dark:ring-[#D4AF37]'
                : 'bg-white text-[#5F5B52] border border-[#E6DCC6] hover:bg-[#FAF6EE] hover:text-[#141414] dark:bg-[#1A1A1A] dark:text-[#A09A8F] dark:border-[#2C2C2C] dark:hover:bg-[#222222]'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
