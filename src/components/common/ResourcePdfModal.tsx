'use client';

import React, { useState } from 'react';
import { X, Download, Bookmark, FileText, CheckCircle2, Flag, Eye, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StudyResource } from '@/data/types';

interface ResourcePdfModalProps {
  resource: StudyResource;
  onClose: () => void;
}

export const ResourcePdfModal: React.FC<ResourcePdfModalProps> = ({ resource, onClose }) => {
  const { toggleSaveResource, profile } = useApp();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [reported, setReported] = useState(false);

  const isSaved = profile.savedResources.includes(resource.id);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Create a downloadable mock text/pdf blob
      const content = `MSBTE SCHOLAR 2.0 - OFFICIAL STUDY MATERIAL
Title: ${resource.title}
Subject: ${resource.subjectName}
Category: ${resource.category}
Verified by: MSBTE Scholar Academic Cell
Published: ${resource.uploadDate}

==================================================
SUMMARY & SYLLABUS HIGHLIGHTS:
- Complete step-by-step MSBTE K-Scheme curriculum coverage
- Key definitions, block diagrams, and solved sample model answers
- Prepared in accordance with Maharashtra State Board of Technical Education norms.
==================================================
Website: msbtescholar.com | Everything a Diploma Student Needs`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF6EE] dark:bg-[#141414] border border-[#E6DCC6] dark:border-[#2A2A2A] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0B3B2E] text-[#FAF6EE] px-5 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#062D24] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1FA971]/20 text-[#1FA971] font-semibold border border-[#1FA971]/30">
                  {resource.category}
                </span>
                <span className="text-xs text-[#F1DFA4] font-medium">{resource.subjectName}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 mt-0.5">
                {resource.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview Canvas */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#1A1A1A] p-3.5 rounded-xl border border-[#E6DCC6] dark:border-[#262626] text-xs">
            <div className="flex items-center gap-4 text-[#5F5B52] dark:text-[#A09A8F]">
              <span>📄 {resource.pageCount} Pages</span>
              <span>💾 {resource.fileSize}</span>
              <span>⬇️ {resource.downloadCount.toLocaleString()} Downloads</span>
              <span>📅 {resource.uploadDate}</span>
            </div>
            {resource.author && (
              <span className="text-[#0B3B2E] dark:text-[#D4AF37] font-semibold">
                By: {resource.author}
              </span>
            )}
          </div>

          {/* Interactive Document Viewer Simulator */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E6DCC6] dark:border-[#262626] p-6 shadow-inner min-h-[280px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b-2 border-[#0B3B2E] dark:border-[#D4AF37] pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-extrabold text-lg text-[#0B3B2E] dark:text-[#D4AF37]">
                    MAHARASHTRA STATE BOARD OF TECHNICAL EDUCATION
                  </h4>
                  <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F]">
                    Autonomous Board • Mumbai | Curriculum Implementation Reference
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#FAF6EE] dark:bg-[#222] border border-[#D4AF37] text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37]">
                    K SCHEME
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#141414] dark:text-[#DDD]">
                <p className="font-semibold text-base text-[#0B3B2E] dark:text-[#F1DFA4]">
                  Document Preview: {resource.title}
                </p>
                <div className="p-3 bg-[#FAF6EE] dark:bg-[#202020] rounded-lg border border-[#E6DCC6]/60 leading-relaxed font-mono text-xs">
                  <p className="text-[#0B3B2E] dark:text-[#D4AF37] font-bold">1.0 COURSE OUTCOMES & PRACTICAL CONCEPTS</p>
                  <p className="mt-1 text-[#5F5B52] dark:text-[#A09A8F]">
                    This verified study compilation covers all essential units aligned directly with the MSBTE syllabus structure. Includes practical observations, code listings, standard model question solutions with rubrics, and previous board exam patterns.
                  </p>
                </div>
                <p className="text-[#5F5B52] dark:text-[#999] text-xs">
                  Full high-resolution PDF contains complete diagrams, schema models, and step-by-step solutions verified by polytechnic subject teachers.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6DCC6]/60 dark:border-[#2C2C2C] flex items-center justify-between text-xs text-[#5F5B52]">
              <span className="flex items-center gap-1.5 text-[#1FA971] font-semibold">
                <CheckCircle2 className="w-4 h-4" /> MSBTE Scholar Verified Document
              </span>
              <span>Page 1 of {resource.pageCount}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white dark:bg-[#181818] p-4 border-t border-[#E6DCC6] dark:border-[#262626] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveResource(resource.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isSaved
                  ? 'bg-[#0B3B2E] text-white border-[#0B3B2E] dark:bg-[#D4AF37] dark:text-[#062D24]'
                  : 'border-[#E6DCC6] hover:bg-[#FAF6EE] text-[#5F5B52]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              {isSaved ? 'Saved to Library' : 'Save for Later'}
            </button>

            <button
              onClick={() => setReported(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-[#E6DCC6] hover:bg-[#FDECEE] text-[#5F5B52] hover:text-[#B3202F] transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              {reported ? 'Reported' : 'Report Error'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {downloadSuccess && (
              <span className="text-xs text-[#1FA971] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Download Started!
              </span>
            )}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B3B2E] text-white hover:bg-[#062D24] shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              {downloading ? 'Preparing PDF...' : `Download PDF (${resource.fileSize})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
