'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { OfflineIndicator } from '../common/OfflineIndicator';
import { InstallAppBanner } from '../common/InstallAppBanner';
import { MobileSplashScreen } from '../mobile/MobileSplashScreen';
import { MobileOnboarding } from '../mobile/MobileOnboarding';
import { MobileAuthScreen } from '../mobile/MobileAuthScreen';
import { MobileProfileSetup } from '../mobile/MobileProfileSetup';
import { MobileHomeScreen } from '../mobile/MobileHomeScreen';
import { MobileStudyScreen } from '../mobile/MobileStudyScreen';
import { MobileMockTestsScreen } from '../mobile/MobileMockTestsScreen';
import { MobileJobsScreen } from '../mobile/MobileJobsScreen';
import { MobileProjectsScreen } from '../mobile/MobileProjectsScreen';
import { MobileCommunityScreen } from '../mobile/MobileCommunityScreen';
import { MobileCareerCoursesScreen } from '../mobile/MobileCareerCoursesScreen';
import { MobileUpdatesScreen } from '../mobile/MobileUpdatesScreen';
import { MobileNotificationsScreen } from '../mobile/MobileNotificationsScreen';
import { MobileProfileScreen } from '../mobile/MobileProfileScreen';
import { MobileSearchSheet } from '../mobile/MobileSearchSheet';
import { MockQuizModal } from '../common/MockQuizModal';
import { ResourcePdfModal } from '../common/ResourcePdfModal';
import { PaymentModal } from '../common/PaymentModal';
import { CreateStudyMaterialModal } from '../common/CreateStudyMaterialModal';

interface MobileAppShellProps {
  isMockupFrame?: boolean;
}

export const MobileAppShell: React.FC<MobileAppShellProps> = ({ isMockupFrame = false }) => {
  const { mobileScreen, activeModal, closeModal } = useApp();

  const isFullscreenScreen = ['splash', 'onboarding'].includes(mobileScreen);

  const showHeader = !['splash', 'onboarding'].includes(mobileScreen);

  const showBottomNav = ![
    'splash',
    'onboarding',
    'login',
    'profile-setup',
  ].includes(mobileScreen);

  const renderScreen = () => {
    switch (mobileScreen) {
      case 'splash':
        return <MobileSplashScreen />;
      case 'onboarding':
        return <MobileOnboarding />;
      case 'login':
        return <MobileAuthScreen />;
      case 'profile-setup':
        return <MobileProfileSetup />;
      case 'home':
        return <MobileHomeScreen />;
      case 'study':
        return <MobileStudyScreen />;
      case 'mock-tests':
        return <MobileMockTestsScreen />;
      case 'jobs':
        return <MobileJobsScreen />;
      case 'projects':
        return <MobileProjectsScreen />;
      case 'community':
        return <MobileCommunityScreen />;
      case 'courses':
        return <MobileCareerCoursesScreen />;
      case 'updates':
        return <MobileUpdatesScreen />;
      case 'notifications':
        return <MobileNotificationsScreen />;
      case 'profile':
        return <MobileProfileScreen />;
      case 'search':
        return <MobileSearchSheet />;
      default:
        return <MobileHomeScreen />;
    }
  };

  const appContent = (
    <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden bg-[#FAF6EE] dark:bg-[#0C0C0C]">
      {/* Offline Status Warning Bar */}
      <OfflineIndicator />

      {/* Sticky Native Mobile Header */}
      {showHeader && <MobileHeader />}

      {/* In-App PWA Install Banner */}
      {showBottomNav && <InstallAppBanner />}

      {/* Main Screen Body */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar">
        {renderScreen()}
      </main>

      {/* Fixed Bottom Navigation */}
      {showBottomNav && <MobileBottomNav />}

      {/* Modals */}
      {activeModal.type === 'quiz' && activeModal.data && (
        <MockQuizModal test={activeModal.data} onClose={closeModal} />
      )}

      {activeModal.type === 'pdf-preview' && activeModal.data && (
        <ResourcePdfModal resource={activeModal.data} onClose={closeModal} />
      )}

      {activeModal.type === 'checkout' && activeModal.data && (
        <PaymentModal
          itemType={activeModal.data.type}
          title={activeModal.data.title}
          amount={activeModal.data.amount}
          onSuccess={() => {}}
          onClose={closeModal}
        />
      )}

      {activeModal.type === 'create-resource' && (
        <CreateStudyMaterialModal
          onClose={closeModal}
          defaultBranch={activeModal.data?.branch}
          defaultSemester={activeModal.data?.semester}
          defaultSubjectId={activeModal.data?.subjectId}
          defaultCategory={activeModal.data?.category}
        />
      )}
    </div>
  );

  // If in desktop developer mockup mode, frame it inside the simulated iPhone body
  if (isMockupFrame) {
    return (
      <div className="mobile-app-viewport relative flex flex-col bg-[#FAF6EE] dark:bg-[#0C0C0C] min-h-[844px] h-[844px] shadow-elevated border-8 border-[#1C1C1C] rounded-[48px] overflow-hidden select-none">
        {/* Simulated speaker island notch */}
        <div className="absolute top-0 left-0 right-0 h-6 z-50 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-3.5 bg-[#141414] rounded-full shadow-inner flex items-center justify-end px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0B3B2E]/70 border border-[#D4AF37]/50" />
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-5 overflow-hidden">
          {appContent}
        </div>
      </div>
    );
  }

  // Real mobile device / standalone PWA: 100% full-bleed viewport
  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-[#FAF6EE] dark:bg-[#0C0C0C] overflow-hidden select-none">
      {appContent}
    </div>
  );
};
