'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, Maximize2, Moon, Sun, ShieldCheck, ChevronUp, ChevronDown, Wrench, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ViewportSwitcher: React.FC = () => {
  const {
    viewportMode,
    setViewportMode,
    darkMode,
    toggleDarkMode,
    desktopTab,
    setDesktopTab,
    previewToolbarVisible,
    setPreviewToolbarVisible,
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);

  // If user explicitly minimized the dev pill, render an unobtrusive tiny badge
  if (!previewToolbarVisible) {
    return (
      <button
        onClick={() => setPreviewToolbarVisible(true)}
        className="fixed bottom-3 right-3 z-50 bg-[#062D24]/90 hover:bg-[#062D24] text-[#D4AF37] border border-[#D4AF37]/50 p-2 rounded-full shadow-lg backdrop-blur-sm opacity-60 hover:opacity-100 transition-opacity"
        title="Open Developer / Preview Switcher (Ctrl+Shift+D)"
        aria-label="Open Developer Preview"
      >
        <Wrench className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end select-none">
      {/* Floating Toolbar Window */}
      {isExpanded ? (
        <div className="bg-[#062D24]/95 backdrop-blur-md border-2 border-[#D4AF37] text-[#FAF6EE] rounded-2xl p-3 shadow-2xl space-y-2.5 max-w-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#0B3B2E] pb-2 gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1FA971] animate-pulse" />
              <span className="text-[10px] font-black uppercase text-[#F1DFA4] tracking-wider">
                Preview & Dev Tools
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-white/60 hover:text-white"
                title="Collapse"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewToolbarVisible(false)}
                className="p-1 text-white/60 hover:text-[#B3202F]"
                title="Close Dev Mode"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-3 gap-1 bg-[#041D17] p-1 rounded-xl border border-[#0B3B2E]">
            <button
              onClick={() => setViewportMode('auto')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                viewportMode === 'auto'
                  ? 'bg-[#0B3B2E] text-[#D4AF37] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Auto</span>
            </button>

            <button
              onClick={() => setViewportMode('mobile')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-[#0B3B2E] text-[#D4AF37] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </button>

            <button
              onClick={() => setViewportMode('desktop')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                viewportMode === 'desktop'
                  ? 'bg-[#0B3B2E] text-[#D4AF37] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>

          {/* Shortcuts */}
          <div className="flex items-center justify-between pt-1 gap-2">
            <button
              onClick={() => setDesktopTab(desktopTab === 'admin' ? 'dashboard' : 'admin')}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-colors text-center ${
                desktopTab === 'admin'
                  ? 'bg-[#D4AF37] text-[#062D24] border-[#D4AF37]'
                  : 'border-[#0B3B2E] text-[#F1DFA4] hover:bg-white/10'
              }`}
            >
              Admin Mode
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg border border-[#0B3B2E] text-white hover:text-[#D4AF37] bg-[#041D17]"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-[#F1DFA4]" />}
            </button>
          </div>
        </div>
      ) : (
        /* Minimized Pill Badge */
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#062D24]/90 border border-[#D4AF37] text-[#D4AF37] text-[11px] font-black shadow-lg backdrop-blur-sm hover:bg-[#062D24] transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#1FA971] animate-ping" />
          <span>Device Preview ({viewportMode})</span>
          <ChevronUp className="w-3 h-3 text-[#F1DFA4]" />
        </button>
      )}
    </div>
  );
};
