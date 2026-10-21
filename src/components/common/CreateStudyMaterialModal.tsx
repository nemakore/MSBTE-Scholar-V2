'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Plus,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Upload,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle2,
  Share2,
  Calendar,
  FileCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SUBJECTS, BRANCHES, SCHEMES, SEMESTERS } from '@/data/mockData';
import { BranchCode, SemesterNumber, ResourceCategory, StudyResource } from '@/data/types';

interface CreateStudyMaterialModalProps {
  onClose: () => void;
  defaultBranch?: BranchCode;
  defaultSemester?: SemesterNumber;
  defaultSubjectId?: string;
  defaultCategory?: ResourceCategory;
}

const CATEGORIES: ResourceCategory[] = [
  'Notes',
  'Solved Manuals',
  'Previous Question Papers',
  'Model Answers',
  'Important Questions',
  'Syllabus',
];

export const CreateStudyMaterialModal: React.FC<CreateStudyMaterialModalProps> = ({
  onClose,
  defaultBranch,
  defaultSemester,
  defaultSubjectId,
  defaultCategory = 'Notes',
}) => {
  const { profile, addStudyResource } = useApp();

  const [activeTab, setActiveTab] = useState<'publish' | 'blogger' | 'preview'>('publish');

  // Form Fields
  const [branch, setBranch] = useState<BranchCode>(defaultBranch || profile.branch);
  const [semester, setSemester] = useState<SemesterNumber>(defaultSemester || profile.semester);
  const [category, setCategory] = useState<ResourceCategory>(defaultCategory);

  // Available subjects for selected branch & sem
  const availableSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.branch === branch && s.semester === semester);
  }, [branch, semester]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    defaultSubjectId || availableSubjects[0]?.id || ''
  );

  const currentSubject = useMemo(() => {
    return availableSubjects.find((s) => s.id === selectedSubjectId) || availableSubjects[0] || null;
  }, [availableSubjects, selectedSubjectId]);

  const [title, setTitle] = useState<string>(
    `Unit 1 & 2: ${currentSubject?.shortName || 'Subject'} Complete Notes (K-Scheme)`
  );
  const [fileUrl, setFileUrl] = useState<string>('https://drive.google.com/');
  const [author, setAuthor] = useState<string>(profile.name || 'MSBTE State Topper');
  const [fileSize, setFileSize] = useState<string>('4.2 MB');
  const [pageCount, setPageCount] = useState<number>(36);
  const [year, setYear] = useState<string>('Summer 2025');
  const [topics, setTopics] = useState<string>(
    '• Complete coverage of Unit 1 and Unit 2\n• Step-by-step solved MSBTE 4-mark and 6-mark questions\n• Diagrams, syntax, and memory tricks for fast revision\n• Verified according to official K-Scheme curriculum'
  );

  const [copiedLabels, setCopiedLabels] = useState<boolean>(false);
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [publishedSuccess, setPublishedSuccess] = useState<boolean>(false);

  // Update title when subject or category changes
  const handleSubjectChange = (newSubId: string) => {
    setSelectedSubjectId(newSubId);
    const sub = availableSubjects.find((s) => s.id === newSubId);
    if (sub) {
      setTitle(`${category}: ${sub.shortName} (${sub.code}) - Verified Resource`);
    }
  };

  const handleCategoryChange = (newCat: ResourceCategory) => {
    setCategory(newCat);
    if (currentSubject) {
      setTitle(`${newCat}: ${currentSubject.shortName} (${currentSubject.code}) - Verified Resource`);
    }
  };

  // Generated Blogger Labels (Comma Separated for Blogger Post Editor)
  const bloggerLabels = useMemo(() => {
    const labels = [
      category,
      branch,
      `Semester ${semester}`,
      currentSubject?.shortName || '',
      currentSubject?.code || '',
      'K-Scheme',
      'MSBTE Scholar',
    ].filter(Boolean);
    return labels.join(', ');
  }, [category, branch, semester, currentSubject]);

  // Generated Clean, Responsive Blogger Post HTML
  const bloggerPostHtml = useMemo(() => {
    const formattedTopics = topics
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `<li style="margin-bottom: 8px;">${t.replace(/^•\s*/, '')}</li>`)
      .join('\n');

    return `<!-- MSBTE SCHOLAR 2.0 VERIFIED STUDY MATERIAL POST -->
<div class="msbte-post-wrapper" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; color: #141414; line-height: 1.6;">

  <!-- Quick Badges -->
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
    <span style="background: #E7F2EE; color: #0B3B2E; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 800; border: 1px solid rgba(11,59,46,0.2);">
      ${category}
    </span>
    <span style="background: #FAF6EE; color: #5F5B52; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid #E6DCC6;">
      ${branch} • Semester ${semester}
    </span>
    <span style="background: #FAF6EE; color: #0B3B2E; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid #E6DCC6;">
      Course Code: ${currentSubject?.code || 'MSBTE'}
    </span>
  </div>

  <!-- Document Summary Box -->
  <div style="background: #ffffff; border: 1px solid #E6DCC6; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
    <h3 style="color: #0B3B2E; margin-top: 0; font-size: 18px; font-weight: 800;">
      📖 What This Document Contains:
    </h3>
    <ul style="padding-left: 20px; color: #333; font-size: 14px;">
      ${formattedTopics}
    </ul>
    <div style="margin-top: 14px; font-size: 12px; color: #666; border-top: 1px dashed #E6DCC6; padding-top: 10px;">
      <strong>Specs:</strong> ${pageCount} Pages • ${fileSize} • Prepared by: ${author}
    </div>
  </div>

  <!-- Big Download Button -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #0B3B2E 0%, #062D24 100%); color: #FAF6EE; padding: 14px 28px; border-radius: 14px; font-size: 15px; font-weight: 800; text-decoration: none; box-shadow: 0 6px 18px rgba(11,59,46,0.3);">
      <span>⬇️ Click Here to Download PDF</span>
    </a>
    <p style="font-size: 11px; color: #777; margin-top: 8px;">⚡ High-speed direct link • 100% Free educational resource</p>
  </div>

  <!-- WhatsApp Study Community CTA -->
  <div style="background: #E7F2EE; border: 1px solid rgba(37,211,102,0.3); border-radius: 16px; padding: 18px; margin-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
    <div>
      <h4 style="margin: 0; color: #0B3B2E; font-size: 15px; font-weight: 800;">💬 Join MSBTE Subject WhatsApp Group</h4>
      <p style="margin: 4px 0 0 0; color: #5F5B52; font-size: 12px;">Get instant model question papers, viva solutions, and teacher updates directly.</p>
    </div>
    <a href="https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM" target="_blank" rel="noopener noreferrer" style="background: #25D366; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 10px rgba(37,211,102,0.3);">
      Join Group →
    </a>
  </div>

  <!-- Disclaimer -->
  <p style="font-size: 11px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #E6DCC6; padding-top: 15px;">
    Official Maharashtra State Board of Technical Education (MSBTE) Curriculum Companion • Published by MSBTE Scholar 2.0
  </p>
</div>`;
  }, [category, branch, semester, currentSubject, topics, pageCount, fileSize, author, fileUrl]);

  // Action: Add Directly to Website State
  const handlePublishToWebsite = () => {
    const newResource: StudyResource = {
      id: `custom-res-${Date.now()}`,
      subjectId: selectedSubjectId || (availableSubjects[0]?.id ?? 'sub-co401'),
      subjectName: currentSubject ? `${currentSubject.shortName} (${currentSubject.code})` : 'MSBTE Subject',
      title,
      category,
      fileSize,
      pageCount,
      downloadCount: 1,
      isVerified: true,
      fileUrl,
      previewUrl: fileUrl,
      author,
      uploadDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      year: category === 'Previous Question Papers' || category === 'Model Answers' ? year : undefined,
    };

    addStudyResource(newResource);
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      onClose();
    }, 1800);
  };

  // Copy Blogger Labels
  const copyLabels = () => {
    navigator.clipboard.writeText(bloggerLabels);
    setCopiedLabels(true);
    setTimeout(() => setCopiedLabels(false), 2000);
  };

  // Copy Blogger HTML
  const copyHtml = () => {
    navigator.clipboard.writeText(bloggerPostHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FAF6EE] dark:bg-[#141414] border border-[#E6DCC6] dark:border-[#2A2A2A] rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#0B3B2E] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#062D24] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>Create &amp; Publish Study Material</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] font-black">
                  CMS Publisher
                </span>
              </h2>
              <p className="text-xs text-[#FAF6EE]/80">
                Publish Syllabus, Notes, Manuals, PYQs, and Model Answers directly to site &amp; Blogger
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#E6DCC6] dark:border-[#262626] bg-white dark:bg-[#161616] flex-shrink-0">
          <button
            onClick={() => setActiveTab('publish')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'publish'
                ? 'border-[#0B3B2E] text-[#0B3B2E] dark:text-[#D4AF37] dark:border-[#D4AF37]'
                : 'border-transparent text-[#5F5B52] hover:text-[#141414]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>1. Material Details</span>
          </button>

          <button
            onClick={() => setActiveTab('blogger')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'blogger'
                ? 'border-[#0B3B2E] text-[#0B3B2E] dark:text-[#D4AF37] dark:border-[#D4AF37]'
                : 'border-transparent text-[#5F5B52] hover:text-[#141414]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Blogger Post Code &amp; Labels</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'border-[#0B3B2E] text-[#0B3B2E] dark:text-[#D4AF37] dark:border-[#D4AF37]'
                : 'border-transparent text-[#5F5B52] hover:text-[#141414]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3. Live Card Preview</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'publish' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Academic Metadata */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#5F5B52] uppercase tracking-wider">
                  Academic Classification
                </h3>

                {/* Branch & Semester */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                      Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value as BranchCode)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs font-bold focus:outline-none focus:border-[#0B3B2E]"
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.name} ({b.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                      Semester
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(Number(e.target.value) as SemesterNumber)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs font-bold focus:outline-none focus:border-[#0B3B2E]"
                    >
                      {SEMESTERS.map((s) => (
                        <option key={s} value={s}>
                          Semester {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject Selector */}
                <div>
                  <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                    Select Subject
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#0B3B2E] bg-white dark:bg-[#202020] text-xs font-bold focus:outline-none ring-1 ring-[#0B3B2E]/20"
                  >
                    {availableSubjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.shortName} • {sub.name} ({sub.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Selector */}
                <div>
                  <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                    Material Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex items-center justify-between cursor-pointer ${
                          category === cat
                            ? 'bg-[#0B3B2E] text-white border-[#0B3B2E] shadow-sm'
                            : 'bg-white dark:bg-[#202020] text-[#5F5B52] border-[#E6DCC6] hover:border-[#0B3B2E]'
                        }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Document Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#5F5B52] uppercase tracking-wider">
                  Document Content &amp; File
                </h3>

                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                    Post / Document Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Unit 2: Inheritance Handwritten Notes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs font-semibold focus:outline-none focus:border-[#0B3B2E]"
                  />
                </div>

                {/* Download URL */}
                <div>
                  <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                    PDF Download Link (Google Drive / Direct URL)
                  </label>
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs font-mono focus:outline-none focus:border-[#0B3B2E]"
                  />
                </div>

                {/* Author, Pages & Size */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#5F5B52] block mb-1">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#5F5B52] block mb-1">Pages</label>
                    <input
                      type="number"
                      value={pageCount}
                      onChange={(e) => setPageCount(Number(e.target.value))}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#5F5B52] block mb-1">Size</label>
                    <input
                      type="text"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs"
                    />
                  </div>
                </div>

                {/* Topics / Bullet points */}
                <div>
                  <label className="text-xs font-bold text-[#0B3B2E] dark:text-white block mb-1">
                    What does this document cover? (Topics checklist)
                  </label>
                  <textarea
                    rows={4}
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    placeholder="List chapters, question numbers, or syllabus topics..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#202020] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogger' && (
            <div className="space-y-6">
              {/* Step 1: Blogger Labels */}
              <div className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#E7F2EE] text-[#0B3B2E] text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h4 className="text-sm font-bold text-[#0B3B2E] dark:text-white">
                      Blogger Labels (लेबले) to Paste:
                    </h4>
                  </div>
                  <button
                    onClick={copyLabels}
                    className="px-3 py-1.5 rounded-lg bg-[#0B3B2E] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#062D24] cursor-pointer"
                  >
                    {copiedLabels ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLabels ? 'Copied!' : 'Copy Labels'}</span>
                  </button>
                </div>
                <p className="text-xs text-[#5F5B52]">
                  Paste these exact labels into the right sidebar of the Blogger Post editor:
                </p>
                <div className="p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] border border-[#E6DCC6] font-mono text-xs text-[#0B3B2E] dark:text-[#D4AF37] select-all">
                  {bloggerLabels}
                </div>
              </div>

              {/* Step 2: Blogger Post HTML */}
              <div className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#E7F2EE] text-[#0B3B2E] text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h4 className="text-sm font-bold text-[#0B3B2E] dark:text-white">
                      Blogger Post HTML Code:
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyHtml}
                      className="px-3 py-1.5 rounded-lg bg-[#0B3B2E] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#062D24] cursor-pointer"
                    >
                      {copiedHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedHtml ? 'Copied HTML!' : 'Copy Post HTML'}</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#5F5B52]">
                  In the Blogger post editor, click the pencil icon ➔ switch to <strong>HTML View</strong> ➔ paste this code:
                </p>
                <textarea
                  readOnly
                  rows={8}
                  value={bloggerPostHtml}
                  className="w-full p-3 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] border border-[#E6DCC6] font-mono text-xs text-[#333] dark:text-[#ccc] focus:outline-none select-all"
                />
              </div>

              {/* Step 3: Blogger Link */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#E7F2EE] border border-[#0B3B2E]/20">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#0B3B2E]">Ready to Publish on Blogger?</h4>
                  <p className="text-[11px] text-[#5F5B52]">
                    Open your Blogger Post Editor in a new tab, paste labels and HTML, and hit Publish!
                  </p>
                </div>
                <a
                  href="https://draft.blogger.com/blog/posts/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold hover:bg-[#062D24] flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Blogger Editor</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5F5B52] uppercase tracking-wider">
                  Live Card Preview on Website:
                </span>
                <span className="text-xs text-[#1FA971] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> K-Scheme Verified Format
                </span>
              </div>

              {/* Mock Card Preview */}
              <div className="max-w-md mx-auto bg-white dark:bg-[#161616] rounded-2xl border-2 border-[#0B3B2E] p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] text-[11px] font-bold border border-[#0B3B2E]/20">
                    {category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#0B3B2E] text-[10px] font-bold">
                    Sem {semester} ({branch})
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] block">
                    {currentSubject ? `${currentSubject.shortName} (${currentSubject.code})` : 'Subject'}
                  </span>
                  <h4 className="text-sm font-bold text-[#141414] dark:text-white leading-snug mt-0.5">
                    {title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-[#E6DCC6] flex items-center justify-between text-[11px] text-[#5F5B52]">
                  <span>📄 {pageCount} pgs • 💾 {fileSize}</span>
                  <span>By: {author}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6DCC6]">
                  <div className="py-2 text-center rounded-xl bg-[#FAF6EE] text-[#0B3B2E] text-xs font-bold border border-[#E6DCC6]">
                    Preview (वाचा)
                  </div>
                  <div className="py-2 text-center rounded-xl bg-[#0B3B2E] text-white text-xs font-bold">
                    Download PDF
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Action Bar */}
        <div className="px-6 py-4 bg-white dark:bg-[#161616] border-t border-[#E6DCC6] dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-[#5F5B52]">
            {publishedSuccess ? (
              <span className="text-[#1FA971] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Added to website successfully!
              </span>
            ) : (
              <span>Add directly to website or copy code for Blogger.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#E6DCC6] text-xs font-bold text-[#5F5B52] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handlePublishToWebsite}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>⚡ Publish to Website Directly</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
