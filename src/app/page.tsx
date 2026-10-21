'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ViewportSwitcher } from '@/components/brand/ViewportSwitcher';
import { MobileAppShell } from '@/components/shells/MobileAppShell';
import { DesktopWebShell } from '@/components/shells/DesktopWebShell';

export default function Home() {
  const { viewportMode, isStandalone } = useApp();
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // During SSR or first hydration pass, default to desktop or adapt cleanly
  const isMobileViewport = windowWidth < 768;

  // Real Mobile experience: small screen or installed PWA on mobile
  const shouldRenderMobileApp =
    viewportMode === 'mobile' || (viewportMode === 'auto' && (isMobileViewport || (isStandalone && isMobileViewport)));

  return (
    <div className="min-h-screen w-full bg-[#FAF6EE] dark:bg-[#0C0C0C] flex flex-col relative overflow-x-hidden">
      {/* Dynamic App Experience */}
      {viewportMode === 'mobile' && !isMobileViewport ? (
        // Desktop user explicitly testing 390px Phone Frame Mockup
        <div className="flex-1 py-8 px-4 flex items-center justify-center bg-gradient-to-b from-[#FAF6EE] via-[#EBDDC0]/20 to-[#FAF6EE] dark:from-[#0C0C0C] dark:via-[#161616] dark:to-[#0C0C0C]">
          <MobileAppShell isMockupFrame={true} />
        </div>
      ) : shouldRenderMobileApp ? (
        // Authentic Full-Bleed Mobile PWA Experience (no desktop sidebar, no fake frames)
        <MobileAppShell isMockupFrame={false} />
      ) : (
        // Desktop Web Dashboard Experience
        <DesktopWebShell />
      )}

      {/* Floating Developer / Preview Tool (unobtrusive pill in bottom-right) */}
      {mounted && <ViewportSwitcher />}
    </div>
  );
}
