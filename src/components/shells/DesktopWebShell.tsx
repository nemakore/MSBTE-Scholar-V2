'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { DesktopSidebar } from '../desktop/DesktopSidebar';
import { DesktopHeader } from '../desktop/DesktopHeader';
import { DesktopDashboard } from '../desktop/DesktopDashboard';
import { DesktopStudyMaterial } from '../desktop/DesktopStudyMaterial';
import { DesktopJobs } from '../desktop/DesktopJobs';
import { DesktopProjects } from '../desktop/DesktopProjects';
import { DesktopCommunity } from '../desktop/DesktopCommunity';
import { DesktopCareerCourses } from '../desktop/DesktopCareerCourses';
import { DesktopUpdates } from '../desktop/DesktopUpdates';
import { DesktopNotificationsProfile } from '../desktop/DesktopNotificationsProfile';
import { DesktopAdminDashboard } from '../desktop/DesktopAdminDashboard';
import { DesktopLandingPage } from '../desktop/DesktopLandingPage';
import { MockQuizModal } from '../common/MockQuizModal';
import { ResourcePdfModal } from '../common/ResourcePdfModal';
import { PaymentModal } from '../common/PaymentModal';
import { CreateStudyMaterialModal } from '../common/CreateStudyMaterialModal';
import { OfflineIndicator } from '../common/OfflineIndicator';
import { ChevronRight, Home, Info } from 'lucide-react';

export const DesktopWebShell: React.FC = () => {
  const { desktopTab, setDesktopTab, activeModal, closeModal, mockTests, openModal, profile } = useApp();

  if (desktopTab === 'landing') {
    return <DesktopLandingPage />;
  }

  const getBreadcrumbLabel = () => {
    switch (desktopTab) {
      case 'dashboard':
        return 'Home Dashboard';
      case 'study':
        return 'Study Material Repository';
      case 'mock-tests':
        return 'Mock Tests & Quizzes';
      case 'jobs':
        return 'Jobs & Apprenticeships';
      case 'projects':
        return 'Capstone Project Hub';
      case 'community':
        return 'Student Community Discussions';
      case 'updates':
        return 'Official MSBTE Circulars';
      case 'career':
        return 'Career Hub & Roadmaps';
      case 'courses':
        return 'Course Catalog';
      case 'notifications':
        return 'Notification Center';
      case 'profile':
        return 'Profile & Library';
      case 'admin':
        return 'Administrative Operations';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (desktopTab) {
      case 'dashboard':
        return <DesktopDashboard />;
      case 'study':
        return <DesktopStudyMaterial />;
      case 'mock-tests':
        return (
          <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-heading font-black text-[#0B3B2E] dark:text-white">
                  MSBTE Online Mock Tests & Model Question Drills
                </h1>
                <p className="text-xs text-[#5F5B52] dark:text-[#888]">
                  Practice timed multiple choice questions with real score calculation and step-by-step explanations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTests.map((t) => (
                <div
                  key={t.id}
                  className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase">
                      {t.subjectName}
                    </span>
                    <h3 className="text-base font-bold text-[#141414] dark:text-white">
                      {t.title}
                    </h3>
                    <p className="text-xs text-[#5F5B52]">
                      Topic: <strong>{t.topic}</strong>
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#5F5B52] pt-2">
                      <span>⏱️ {t.durationMinutes} Minutes</span>
                      <span>📝 {t.questionCount} Questions</span>
                      <span>🎯 {t.totalMarks} Marks</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openModal('quiz', t)}
                    className="w-full py-3 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-black shadow-gold flex items-center justify-center gap-2"
                  >
                    <span>Launch Timed Mock Exam</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'jobs':
        return <DesktopJobs />;
      case 'projects':
        return <DesktopProjects />;
      case 'community':
        return <DesktopCommunity />;
      case 'updates':
        return <DesktopUpdates />;
      case 'career':
      case 'courses':
        return <DesktopCareerCourses />;
      case 'notifications':
      case 'profile':
        return <DesktopNotificationsProfile />;
      case 'admin':
        return <DesktopAdminDashboard />;
      default:
        return <DesktopDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FAF6EE] dark:bg-[#0C0C0C] overflow-hidden select-none">
      {/* Persistent Left Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Offline Status Banner */}
        <OfflineIndicator />

        {/* Top Header */}
        <DesktopHeader />

        {/* Breadcrumbs Navigation Bar */}
        <div className="bg-[#FAF6EE] dark:bg-[#101010] border-b border-[#E6DCC6]/60 dark:border-[#202020] px-8 py-2.5 flex items-center justify-between text-xs text-[#5F5B52] dark:text-[#888]">
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={() => setDesktopTab('dashboard')}
              className="flex items-center gap-1 hover:text-[#0B3B2E] dark:hover:text-white"
            >
              <Home className="w-3.5 h-3.5" />
              <span>MSBTE Scholar</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#E6DCC6]" />
            <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">
              {getBreadcrumbLabel()}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#5F5B52] bg-white/70 dark:bg-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-[#E6DCC6]/60">
            <Info className="w-3 h-3 text-[#0B3B2E] dark:text-[#D4AF37]" />
            <span>K-Scheme • Sem {profile.semester} • Demo fixtures labeled clearly</span>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          {renderContent()}
        </main>
      </div>

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
};
