'use client';

import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = useApp();

  if (isOnline) return null;

  return (
    <div className="bg-[#B3202F] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md z-50 sticky top-0 animate-fadeIn">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 animate-pulse text-[#F1DFA4]" />
        <span>You are currently offline. Viewing cached MSBTE notes and saved items.</span>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Check Connection</span>
      </button>
    </div>
  );
};
