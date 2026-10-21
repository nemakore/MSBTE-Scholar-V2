'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  light = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg font-extrabold tracking-tight',
    lg: 'text-2xl font-black tracking-tight',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblem */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#0B3B2E] via-[#062D24] to-[#041D17] border-2 border-[#D4AF37] flex items-center justify-center shadow-md relative overflow-hidden flex-shrink-0 group`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent pointer-events-none" />
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4 text-[#D4AF37] drop-shadow-sm"
        >
          {/* Graduation Cap */}
          <path
            d="M24 10L39 18L24 26L9 18L24 10Z"
            fill="#D4AF37"
            stroke="#F1DFA4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M15 21.5V29C15 32.5 24 35 24 35C24 35 33 32.5 33 29V21.5"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Tassel */}
          <path d="M35 20V30L33 32" stroke="#F1DFA4" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="33" cy="32.5" r="1.5" fill="#D4AF37" />
          {/* Book Base */}
          <path
            d="M12 37C18 34.5 24 36 24 36C24 36 30 34.5 36 37V39C30 36.5 24 38 24 38C24 38 18 36.5 12 39V37Z"
            fill="#FAF6EE"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`${titleSizes[size]} font-heading ${
              light ? 'text-[#FAF6EE]' : 'text-[#0B3B2E] dark:text-[#FAF6EE]'
            }`}
          >
            MSBTE Scholar <span className="text-[#D4AF37]">2.0</span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium leading-none ${
              light ? 'text-[#F1DFA4]' : 'text-[#5F5B52] dark:text-[#A89F91]'
            }`}
          >
            Everything a Diploma Student Needs
          </span>
        )}
      </div>
    </div>
  );
};
