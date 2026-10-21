'use client';

import React, { useState } from 'react';
import { Smartphone, Download, X, HelpCircle, CheckCircle2, Share, PlusSquare, MoreVertical } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const InstallAppBanner: React.FC = () => {
  const { isStandalone, canInstall, promptInstall, showInstallGuideModal, setShowInstallGuideModal } = useApp();
  const [dismissed, setDismissed] = useState(false);

  // If already running inside installed standalone PWA, don't show install banner
  if (isStandalone || dismissed) return null;

  return (
    <>
      {/* Discreet In-App Install Prompt Banner */}
      <div className="bg-gradient-to-r from-[#0B3B2E] to-[#062D24] border-b border-[#D4AF37]/40 text-white px-3.5 py-2.5 flex items-center justify-between text-xs shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#D4AF37] text-[#062D24] flex items-center justify-center font-bold flex-shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-[#FAF6EE] text-[11px] leading-tight">
              Install MSBTE Scholar 2.0 App
            </div>
            <div className="text-[10px] text-[#F1DFA4] leading-tight">
              Instant offline access to handwritten notes & question papers
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={promptInstall}
            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c29e2e] text-[#062D24] text-[11px] font-black flex items-center gap-1 shadow-sm transition-all"
          >
            <Download className="w-3 h-3" />
            <span>Install App</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-white/70 hover:text-white"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Manual Installation Guide Modal (for Android Chrome / iOS) */}
      {showInstallGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] dark:bg-[#141414] border border-[#E6DCC6] dark:border-[#2C2C2C] rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6DCC6] dark:border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#0B3B2E] dark:text-[#D4AF37]" />
                <h3 className="font-heading font-black text-sm text-[#0B3B2E] dark:text-white">
                  How to Install MSBTE Scholar App
                </h3>
              </div>
              <button
                onClick={() => setShowInstallGuideModal(false)}
                className="p-1 text-[#5F5B52] hover:text-[#141414]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="bg-white dark:bg-[#1C1C1C] p-3 rounded-2xl border border-[#E6DCC6] dark:border-[#2C2C2C] space-y-2">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37] flex items-center gap-1.5">
                  <MoreVertical className="w-3.5 h-3.5" /> For Android (Google Chrome):
                </span>
                <ol className="list-decimal pl-5 space-y-1 text-[#5F5B52] dark:text-[#AAA]">
                  <li>Tap the <strong>three dots menu (⋮)</strong> in Chrome top-right.</li>
                  <li>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                  <li>Tap <strong>&quot;Install&quot;</strong> to place the MSBTE Scholar icon on your phone!</li>
                </ol>
              </div>

              <div className="bg-white dark:bg-[#1C1C1C] p-3 rounded-2xl border border-[#E6DCC6] dark:border-[#2C2C2C] space-y-2">
                <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37] flex items-center gap-1.5">
                  <Share className="w-3.5 h-3.5" /> For iPhone (Apple Safari):
                </span>
                <ol className="list-decimal pl-5 space-y-1 text-[#5F5B52] dark:text-[#AAA]">
                  <li>Tap the <strong>Share icon</strong> at the bottom of Safari.</li>
                  <li>Scroll and tap <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                  <li>Tap <strong>&quot;Add&quot;</strong> in the top-right corner.</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowInstallGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold hover:bg-[#062D24]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
