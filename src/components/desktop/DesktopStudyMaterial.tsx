'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { SUBJECTS, BRANCHES, SCHEMES, SEMESTERS } from '@/data/mockData';
import { BranchCode, SchemeType, SemesterNumber, StudyResource, ResourceCategory } from '@/data/types';
import {
  Search,
  Download,
  Eye,
  Bookmark,
  FileText,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  FileCheck,
  Calendar,
  Sparkles,
  Share2,
  ChevronRight,
  Filter,
  GraduationCap,
  MessageCircle,
  Layers,
  Plus,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

// Categorical metadata with tailored icons and color themes
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; color: string; bg: string; border: string }
> = {
  Syllabus: {
    label: 'Syllabus',
    icon: <BookOpen className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />,
    color: 'text-[#0B3B2E] dark:text-[#F1DFA4]',
    bg: 'bg-[#E7F2EE] dark:bg-[#152820]',
    border: 'border-[#0B3B2E]/20 dark:border-[#0B3B2E]/40',
  },
  Notes: {
    label: 'Notes',
    icon: <FileText className="w-4 h-4 text-[#1FA971]" />,
    color: 'text-[#1FA971]',
    bg: 'bg-[#E7F2EE] dark:bg-[#122B21]',
    border: 'border-[#1FA971]/25',
  },
  'Solved Manuals': {
    label: 'Solved Manuals',
    icon: <FileCheck className="w-4 h-4 text-[#D4AF37]" />,
    color: 'text-[#967417] dark:text-[#F1DFA4]',
    bg: 'bg-[#FBF5E6] dark:bg-[#2A2312]',
    border: 'border-[#D4AF37]/30',
  },
  'Previous Question Papers': {
    label: 'Question Papers',
    icon: <Calendar className="w-4 h-4 text-[#7C3AED]" />,
    color: 'text-[#7C3AED] dark:text-[#C4B5FD]',
    bg: 'bg-[#F5F3FF] dark:bg-[#231A38]',
    border: 'border-[#7C3AED]/25',
  },
  'Model Answers': {
    label: 'Model Answers',
    icon: <CheckCircle2 className="w-4 h-4 text-[#059669]" />,
    color: 'text-[#059669] dark:text-[#6EE7B7]',
    bg: 'bg-[#ECFDF5] dark:bg-[#132A22]',
    border: 'border-[#059669]/25',
  },
  'Important Questions': {
    label: 'Important Questions',
    icon: <Sparkles className="w-4 h-4 text-[#DC2626]" />,
    color: 'text-[#DC2626] dark:text-[#FCA5A5]',
    bg: 'bg-[#FEF2F2] dark:bg-[#2F1515]',
    border: 'border-[#DC2626]/25',
  },
};

const ORDERED_CATEGORIES: ResourceCategory[] = [
  'Syllabus',
  'Notes',
  'Solved Manuals',
  'Previous Question Papers',
  'Model Answers',
  'Important Questions',
];

export const DesktopStudyMaterial: React.FC = () => {
  const {
    profile,
    setBranch,
    setScheme,
    setSemester,
    studyResources,
    openModal,
    toggleSaveResource,
    searchQuery,
  } = useApp();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>(searchQuery);

  // Subjects for the current active Branch & Semester
  const currentSemesterSubjects = useMemo(() => {
    return SUBJECTS.filter(
      (s) => s.branch === profile.branch && s.semester === profile.semester
    );
  }, [profile.branch, profile.semester]);

  // Currently selected subject object (if not 'all')
  const activeSubject = useMemo(() => {
    if (selectedSubjectId === 'all') return null;
    return currentSemesterSubjects.find((s) => s.id === selectedSubjectId) || null;
  }, [selectedSubjectId, currentSemesterSubjects]);

  const effectiveQuery = (query || searchQuery || '').toLowerCase().trim();

  // Filter resources based on Subject, Category, and Search Query
  const filteredResources = useMemo(() => {
    return studyResources.filter((res) => {
      // If a specific subject is picked, match strictly; else match all subjects for current semester
      let matchSubject = false;
      if (selectedSubjectId === 'all') {
        const validSubjectIds = new Set(currentSemesterSubjects.map((s) => s.id));
        matchSubject = validSubjectIds.size === 0 || validSubjectIds.has(res.subjectId);
      } else {
        matchSubject = res.subjectId === selectedSubjectId;
      }

      const matchCat = selectedCategory === 'All' || res.category === selectedCategory;
      const matchQuery =
        effectiveQuery === '' ||
        res.title.toLowerCase().includes(effectiveQuery) ||
        res.subjectName.toLowerCase().includes(effectiveQuery) ||
        (res.author && res.author.toLowerCase().includes(effectiveQuery));

      return matchSubject && matchCat && matchQuery;
    });
  }, [studyResources, selectedSubjectId, currentSemesterSubjects, selectedCategory, effectiveQuery]);

  // Calculate resources count per category for the current subject scope
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    ORDERED_CATEGORIES.forEach((cat) => {
      counts[cat] = 0;
    });

    studyResources.forEach((res) => {
      let matchSubject = false;
      if (selectedSubjectId === 'all') {
        const validSubjectIds = new Set(currentSemesterSubjects.map((s) => s.id));
        matchSubject = validSubjectIds.size === 0 || validSubjectIds.has(res.subjectId);
      } else {
        matchSubject = res.subjectId === selectedSubjectId;
      }

      if (matchSubject) {
        counts.All = (counts.All || 0) + 1;
        if (counts[res.category] !== undefined) {
          counts[res.category] = (counts[res.category] || 0) + 1;
        }
      }
    });

    return counts;
  }, [studyResources, selectedSubjectId, currentSemesterSubjects]);

  // Share resource to WhatsApp
  const handleShareToWhatsApp = (resource: StudyResource, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = encodeURIComponent(
      `📚 MSBTE Scholar 2.0 Study Resource:\n*${resource.title}*\nSubject: ${resource.subjectName}\nCategory: ${resource.category}\n\n👉 Download and read verified notes: ${window.location.origin}/#study`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ========================================================= */}
      {/* 1. TOP ACADEMIC FILTER & BREADCRUMB BAR                  */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-[#161616] p-5 sm:p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E7F2EE] dark:bg-[#162B22] text-[#0B3B2E] dark:text-[#D4AF37] text-[11px] font-black border border-[#0B3B2E]/20">
                MSBTE K-Scheme Verified
              </span>
              <span className="text-xs text-[#5F5B52] dark:text-[#888]">
                {profile.branch} • Semester {profile.semester}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0B3B2E] dark:text-white tracking-tight">
              MSBTE Study Material Repository
            </h1>
            <p className="text-xs text-[#5F5B52] dark:text-[#888]">
              Select your subject below to explore Syllabus, Handwritten Notes, Solved Manuals, and Model Answers
            </p>
          </div>

          {/* Branch, Scheme & Semester Dropdown Selectors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Branch Selector */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#5F5B52] uppercase mb-1">Branch</label>
              <select
                value={profile.branch}
                onChange={(e) => {
                  setBranch(e.target.value as BranchCode);
                  setSelectedSubjectId('all');
                }}
                className="px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#202020] text-xs font-bold text-[#141414] dark:text-white focus:outline-none focus:border-[#0B3B2E] cursor-pointer"
              >
                {BRANCHES.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Scheme Selector */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#5F5B52] uppercase mb-1">Scheme</label>
              <select
                value={profile.scheme}
                onChange={(e) => setScheme(e.target.value as SchemeType)}
                className="px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#202020] text-xs font-bold text-[#141414] dark:text-white focus:outline-none focus:border-[#0B3B2E] cursor-pointer"
              >
                {SCHEMES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Selector */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#5F5B52] uppercase mb-1">Semester</label>
              <select
                value={profile.semester}
                onChange={(e) => {
                  setSemester(Number(e.target.value) as SemesterNumber);
                  setSelectedSubjectId('all');
                }}
                className="px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#202020] text-xs font-bold text-[#141414] dark:text-white focus:outline-none focus:border-[#0B3B2E] cursor-pointer"
              >
                {SEMESTERS.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* "+ Post New Material" Action Button */}
            <div className="flex flex-col justify-end">
              <button
                onClick={() =>
                  openModal('create-resource', {
                    branch: profile.branch,
                    semester: profile.semester,
                    subjectId: selectedSubjectId !== 'all' ? selectedSubjectId : undefined,
                    category: selectedCategory !== 'All' ? selectedCategory : 'Notes',
                  })
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B3B2E] to-[#062D24] text-white text-xs font-black shadow-md hover:opacity-95 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer border border-[#D4AF37]/50"
                title="Create a new study material post or generate code for Blogger"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>+ Post Material</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SUBJECT SELECTOR ROW ("All Subjects" + "Select Subject") */}
        {/* ========================================================= */}
        <div className="pt-3 border-t border-[#E6DCC6]/60 dark:border-[#262626] flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Prominent Subject Dropdown Option (User Requested) */}
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setSelectedSubjectId('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                selectedSubjectId === 'all'
                  ? 'bg-[#0B3B2E] text-white'
                  : 'bg-[#FAF6EE] dark:bg-[#202020] text-[#5F5B52] dark:text-[#A09A8F] border border-[#E6DCC6] dark:border-[#333] hover:border-[#0B3B2E]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Subjects ({currentSemesterSubjects.length})</span>
            </button>

            {/* "Select Subject" Dropdown Menu */}
            <div className="relative flex-1">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer appearance-none bg-[#FAF6EE] dark:bg-[#202020] text-[#141414] dark:text-white focus:outline-none ${
                  selectedSubjectId !== 'all'
                    ? 'border-[#0B3B2E] dark:border-[#D4AF37] ring-1 ring-[#0B3B2E]/20'
                    : 'border-[#E6DCC6] dark:border-[#333]'
                }`}
              >
                <option value="all">📂 -- Select Subject From Dropdown --</option>
                {currentSemesterSubjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.shortName} • {sub.name} ({sub.code})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5F5B52]">
                <Filter className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Fast Search input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#5F5B52] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topic, unit, or year..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
            />
          </div>
        </div>

        {/* Horizontal Quick-Pick Subject Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-bold text-[#5F5B52] uppercase flex-shrink-0">
            Quick Pick:
          </span>
          {currentSemesterSubjects.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B3B2E] text-white shadow-sm'
                    : 'bg-[#FAF6EE] dark:bg-[#202020] text-[#5F5B52] dark:text-[#A09A8F] border border-[#E6DCC6] dark:border-[#333] hover:border-[#0B3B2E]'
                }`}
              >
                <span>{sub.shortName}</span>
                <span className="text-[10px] opacity-80 font-mono">({sub.code})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. ACTIVE SUBJECT SHOWCASE CARD (When a Subject is picked) */}
      {/* ========================================================= */}
      {activeSubject && (
        <div className="bg-gradient-to-br from-[#0B3B2E] via-[#062D24] to-[#041D17] text-[#FAF6EE] p-6 rounded-3xl border border-[#D4AF37]/30 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] text-xs font-black">
                  Subject Code: {activeSubject.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                  {profile.branch} Branch • Sem {profile.semester}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                  {activeSubject.credits} Credits
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeSubject.name}
              </h2>
              <p className="text-xs text-[#FAF6EE]/80 max-w-2xl leading-relaxed">
                {activeSubject.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href="https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-90 shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Subject WhatsApp Group</span>
              </a>

              <button
                onClick={() => setSelectedSubjectId('all')}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1 transition-colors cursor-pointer"
                title="View all subjects"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. CATEGORY TABS (Syllabus, Notes, Manuals, PYQs, Answers) */}
      {/* ========================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#5F5B52] dark:text-[#A09A8F] uppercase tracking-wider">
            Material Categories:
          </span>
          <span className="text-xs text-[#1FA971] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High-Speed Direct PDF Downloads
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {/* ALL Tab */}
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#0B3B2E] text-white shadow-md'
                : 'bg-white dark:bg-[#161616] text-[#5F5B52] dark:text-[#A09A8F] border border-[#E6DCC6] dark:border-[#262626] hover:border-[#0B3B2E]'
            }`}
          >
            <span>📁 All Categories</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                selectedCategory === 'All' ? 'bg-white/20 text-white' : 'bg-[#FAF6EE] text-[#0B3B2E]'
              }`}
            >
              {categoryCounts.All}
            </span>
          </button>

          {/* 6 Core Categories */}
          {ORDERED_CATEGORIES.map((catKey) => {
            const config = CATEGORY_CONFIG[catKey];
            const isSelected = selectedCategory === catKey;
            const count = categoryCounts[catKey] || 0;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B3B2E] text-white shadow-md'
                    : 'bg-white dark:bg-[#161616] text-[#5F5B52] dark:text-[#A09A8F] border border-[#E6DCC6] dark:border-[#262626] hover:border-[#0B3B2E]'
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. STRUCTURED CONTENT DISPLAY                            */}
      {/* Either Grouped-by-Category (if All) or Specific Category */}
      {/* ========================================================= */}

      {filteredResources.length === 0 ? (
        // Empty State
        <div className="bg-white dark:bg-[#161616] p-12 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] border border-[#E6DCC6] flex items-center justify-center mx-auto text-2xl">
            📚
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#141414] dark:text-white">
              No Materials Found for this Selection
            </h3>
            <p className="text-xs text-[#5F5B52] dark:text-[#888] max-w-md mx-auto">
              Our academic team and state toppers are constantly scanning and uploading verified files.
              You can request this specific material in our WhatsApp group.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubjectId('all');
                setQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#E6DCC6] text-[#0B3B2E] text-xs font-bold border border-[#E6DCC6] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <a
              href="https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-95 shadow-sm"
            >
              Request on WhatsApp
            </a>
          </div>
        </div>
      ) : selectedCategory === 'All' ? (
        // RENDER STRUCTURED SECTIONS (CATEGORY-WISE GROUPS)
        <div className="space-y-8">
          {ORDERED_CATEGORIES.map((catKey) => {
            const catResources = filteredResources.filter((r) => r.category === catKey);
            if (catResources.length === 0) return null;
            const config = CATEGORY_CONFIG[catKey];

            return (
              <section key={catKey} className="space-y-3">
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-[#E6DCC6] dark:border-[#262626] pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${config.bg} ${config.border} border`}>
                      {config.icon}
                    </div>
                    <h3 className="text-base font-black text-[#0B3B2E] dark:text-white tracking-tight">
                      {config.label}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF6EE] dark:bg-[#202020] text-[#5F5B52] font-bold border border-[#E6DCC6]">
                      {catResources.length} {catResources.length === 1 ? 'file' : 'files'}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCategory(catKey)}
                    className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all {config.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Grid of Resource Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catResources.map((res) => (
                    <ResourceCard
                      key={res.id}
                      resource={res}
                      onPreview={() => openModal('pdf-preview', res)}
                      onSave={() => toggleSaveResource(res.id)}
                      isSaved={profile.savedResources.includes(res.id)}
                      onShare={(e) => handleShareToWhatsApp(res, e)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // RENDER FILTERED CATEGORY GRID
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onPreview={() => openModal('pdf-preview', res)}
              onSave={() => toggleSaveResource(res.id)}
              isSaved={profile.savedResources.includes(res.id)}
              onShare={(e) => handleShareToWhatsApp(res, e)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// STUDENT-FRIENDLY RESPONSIVE RESOURCE CARD COMPONENT
// =========================================================================
interface ResourceCardProps {
  resource: StudyResource;
  onPreview: () => void;
  onSave: () => void;
  isSaved: boolean;
  onShare: (e: React.MouseEvent) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onPreview,
  onSave,
  isSaved,
  onShare,
}) => {
  const config = CATEGORY_CONFIG[resource.category] || CATEGORY_CONFIG.Notes;

  return (
    <div
      onClick={onPreview}
      className="bg-white dark:bg-[#161616] rounded-2xl border border-[#E6DCC6] dark:border-[#262626] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all hover:border-[#0B3B2E] dark:hover:border-[#D4AF37] flex flex-col justify-between group cursor-pointer"
    >
      <div className="space-y-3">
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${config.bg} ${config.color} ${config.border}`}
            >
              {config.icon}
              <span>{resource.category}</span>
            </span>

            {resource.isVerified && (
              <span className="px-2 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] text-[10px] font-bold border border-[#0B3B2E]/20 flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#1FA971]" />
                <span>Verified</span>
              </span>
            )}

            {resource.year && (
              <span className="px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#5F5B52] text-[10px] font-bold border border-[#E6DCC6]">
                {resource.year}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#0B3B2E] text-white border-[#0B3B2E]'
                : 'border-[#E6DCC6] text-[#5F5B52] hover:bg-[#FAF6EE]'
            }`}
            title="Save for revision"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Title & Subject */}
        <div>
          <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] block">
            {resource.subjectName}
          </span>
          <h4 className="text-sm font-bold text-[#141414] dark:text-white line-clamp-2 leading-snug group-hover:text-[#0B3B2E] dark:group-hover:text-[#D4AF37] transition-colors mt-0.5">
            {resource.title}
          </h4>
        </div>

        {/* File Specs & Author */}
        <div className="pt-2 border-t border-[#E6DCC6]/60 dark:border-[#262626] flex items-center justify-between text-[11px] text-[#5F5B52] dark:text-[#888]">
          <div className="flex items-center gap-2">
            <span>📄 {resource.pageCount} pgs</span>
            <span>•</span>
            <span>💾 {resource.fileSize}</span>
          </div>
          <span>⬇️ {resource.downloadCount.toLocaleString()}</span>
        </div>

        {resource.author && (
          <p className="text-[10px] text-[#5F5B52] dark:text-[#777] italic truncate">
            Prepared by: {resource.author}
          </p>
        )}
      </div>

      {/* Action Footer Buttons */}
      <div className="pt-4 mt-3 border-t border-[#E6DCC6]/60 dark:border-[#262626] flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          className="flex-1 py-1.5 px-3 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] hover:bg-[#E6DCC6] text-[#0B3B2E] dark:text-white text-xs font-bold border border-[#E6DCC6] dark:border-[#333] transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#0B3B2E] dark:text-[#D4AF37]" />
          <span>Preview (वाचा)</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          className="py-1.5 px-3 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Download</span>
        </button>

        <button
          onClick={onShare}
          className="p-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 transition-colors cursor-pointer"
          title="Share to WhatsApp"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
