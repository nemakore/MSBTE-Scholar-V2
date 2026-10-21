'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { SUBJECTS, BRANCHES, SCHEMES, SEMESTERS } from '@/data/mockData';
import { BranchCode, SchemeType, SemesterNumber, ResourceCategory, StudyResource } from '@/data/types';
import {
  Search,
  BookOpen,
  FileText,
  Download,
  Eye,
  Bookmark,
  CheckCircle2,
  Layers,
  ChevronDown,
  Sparkles,
  Calendar,
  FileCheck,
  Share2,
  MessageCircle,
  Filter,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; color: string; bg: string; border: string }
> = {
  Syllabus: {
    label: 'Syllabus',
    icon: <BookOpen className="w-3.5 h-3.5 text-[#0B3B2E] dark:text-[#D4AF37]" />,
    color: 'text-[#0B3B2E] dark:text-[#F1DFA4]',
    bg: 'bg-[#E7F2EE] dark:bg-[#152820]',
    border: 'border-[#0B3B2E]/20',
  },
  Notes: {
    label: 'Notes',
    icon: <FileText className="w-3.5 h-3.5 text-[#1FA971]" />,
    color: 'text-[#1FA971]',
    bg: 'bg-[#E7F2EE] dark:bg-[#122B21]',
    border: 'border-[#1FA971]/25',
  },
  'Solved Manuals': {
    label: 'Solved Manuals',
    icon: <FileCheck className="w-3.5 h-3.5 text-[#D4AF37]" />,
    color: 'text-[#967417] dark:text-[#F1DFA4]',
    bg: 'bg-[#FBF5E6] dark:bg-[#2A2312]',
    border: 'border-[#D4AF37]/30',
  },
  'Previous Question Papers': {
    label: 'Question Papers',
    icon: <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />,
    color: 'text-[#7C3AED] dark:text-[#C4B5FD]',
    bg: 'bg-[#F5F3FF] dark:bg-[#231A38]',
    border: 'border-[#7C3AED]/25',
  },
  'Model Answers': {
    label: 'Model Answers',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />,
    color: 'text-[#059669] dark:text-[#6EE7B7]',
    bg: 'bg-[#ECFDF5] dark:bg-[#132A22]',
    border: 'border-[#059669]/25',
  },
  'Important Questions': {
    label: 'Important Questions',
    icon: <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />,
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

export const MobileStudyScreen: React.FC = () => {
  const {
    profile,
    setBranch,
    setScheme,
    setSemester,
    studyResources,
    openModal,
    toggleSaveResource,
  } = useApp();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter subjects for current student branch, scheme, sem
  const filteredSubjects = useMemo(() => {
    return SUBJECTS.filter(
      (s) => s.branch === profile.branch && s.semester === profile.semester
    );
  }, [profile.branch, profile.semester]);

  const activeSubject = useMemo(() => {
    if (selectedSubjectId === 'all') return null;
    return filteredSubjects.find((s) => s.id === selectedSubjectId) || null;
  }, [selectedSubjectId, filteredSubjects]);

  // Filter resources
  const filteredResources = useMemo(() => {
    return studyResources.filter((res) => {
      let matchesSubject = false;
      if (selectedSubjectId === 'all') {
        const validSubjectIds = new Set(filteredSubjects.map((s) => s.id));
        matchesSubject = validSubjectIds.size === 0 || validSubjectIds.has(res.subjectId);
      } else {
        matchesSubject = res.subjectId === selectedSubjectId;
      }

      const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesCategory && matchesQuery;
    });
  }, [studyResources, selectedSubjectId, filteredSubjects, selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    ORDERED_CATEGORIES.forEach((cat) => {
      counts[cat] = 0;
    });

    studyResources.forEach((res) => {
      let matchesSubject = false;
      if (selectedSubjectId === 'all') {
        const validSubjectIds = new Set(filteredSubjects.map((s) => s.id));
        matchesSubject = validSubjectIds.size === 0 || validSubjectIds.has(res.subjectId);
      } else {
        matchesSubject = res.subjectId === selectedSubjectId;
      }

      if (matchesSubject) {
        counts.All = (counts.All || 0) + 1;
        if (counts[res.category] !== undefined) {
          counts[res.category] = (counts[res.category] || 0) + 1;
        }
      }
    });

    return counts;
  }, [studyResources, selectedSubjectId, filteredSubjects]);

  const handleShareWhatsApp = (res: StudyResource, e: React.MouseEvent) => {
    e.stopPropagation();
    const txt = encodeURIComponent(
      `📚 MSBTE Scholar:\n*${res.title}*\nSubject: ${res.subjectName}\nCategory: ${res.category}\n\n👉 Download on: ${window.location.origin}/#study`
    );
    window.open(`https://api.whatsapp.com/send?text=${txt}`, '_blank');
  };

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Sticky Header with Branch / Scheme / Semester Breadcrumbs */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-[#E6DCC6] dark:border-[#262626] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-extrabold text-[#0B3B2E] dark:text-[#FAF6EE]">
              Study Material
            </h2>
            <p className="text-[11px] text-[#5F5B52] dark:text-[#A09A8F]">
              Handwritten Notes • Solved Manuals • Model Answers
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                openModal('create-resource', {
                  branch: profile.branch,
                  semester: profile.semester,
                  subjectId: selectedSubjectId !== 'all' ? selectedSubjectId : undefined,
                  category: selectedCategory !== 'All' ? selectedCategory : 'Notes',
                })
              }
              className="px-2.5 py-1 rounded-xl bg-[#0B3B2E] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm border border-[#D4AF37]/40"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" />
              <span>+ Post</span>
            </button>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-bold border border-[#0B3B2E]/20">
              {profile.branch} • Sem {profile.semester}
            </span>
          </div>
        </div>

        {/* Academic Selectors Row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Branch */}
          <select
            value={profile.branch}
            onChange={(e) => {
              setBranch(e.target.value as BranchCode);
              setSelectedSubjectId('all');
            }}
            className="px-2 py-1.5 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-semibold text-[#141414] dark:text-white focus:outline-none"
          >
            {BRANCHES.map((b) => (
              <option key={b.code} value={b.code}>
                {b.code} Branch
              </option>
            ))}
          </select>

          {/* Scheme */}
          <select
            value={profile.scheme}
            onChange={(e) => setScheme(e.target.value as SchemeType)}
            className="px-2 py-1.5 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-semibold text-[#141414] dark:text-white focus:outline-none"
          >
            {SCHEMES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Semester */}
          <select
            value={profile.semester}
            onChange={(e) => {
              setSemester(Number(e.target.value) as SemesterNumber);
              setSelectedSubjectId('all');
            }}
            className="px-2 py-1.5 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-semibold text-[#141414] dark:text-white focus:outline-none"
          >
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                Sem {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#5F5B52] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, topics, or notes..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-medium focus:outline-none focus:border-[#0B3B2E]"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Subject Selection Bar with Select Dropdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5F5B52] dark:text-[#A09A8F] uppercase tracking-wider">
              Select Subject:
            </span>
            {selectedSubjectId !== 'all' && (
              <button
                onClick={() => setSelectedSubjectId('all')}
                className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSubjectId('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedSubjectId === 'all'
                  ? 'bg-[#0B3B2E] text-white shadow-sm'
                  : 'bg-white dark:bg-[#1C1C1C] border border-[#E6DCC6] dark:border-[#2C2C2C] text-[#5F5B52]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({filteredSubjects.length})</span>
            </button>

            {/* Select Subject Dropdown */}
            <div className="relative flex-1">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-white dark:bg-[#1C1C1C] text-[#141414] dark:text-white focus:outline-none ${
                  selectedSubjectId !== 'all'
                    ? 'border-[#0B3B2E] dark:border-[#D4AF37] ring-1 ring-[#0B3B2E]/20'
                    : 'border-[#E6DCC6] dark:border-[#2C2C2C]'
                }`}
              >
                <option value="all">📂 -- Choose Subject --</option>
                {filteredSubjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.shortName} ({sub.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Subject Chips Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filteredSubjects.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#0B3B2E] text-white shadow-sm'
                      : 'bg-white dark:bg-[#1C1C1C] border border-[#E6DCC6] dark:border-[#2C2C2C] text-[#5F5B52]'
                  }`}
                >
                  {sub.shortName} ({sub.code})
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Subject Showcase Card */}
        {activeSubject && (
          <div className="bg-gradient-to-br from-[#0B3B2E] to-[#041D17] text-white p-4 rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] text-[10px] font-black">
                Code: {activeSubject.code}
              </span>
              <span className="text-[10px] text-[#FAF6EE]/80">
                {profile.branch} • Sem {profile.semester}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{activeSubject.name}</h3>
              <p className="text-[11px] text-[#FAF6EE]/80 line-clamp-2 mt-0.5">
                {activeSubject.description}
              </p>
            </div>

            <a
              href="https://chat.whatsapp.com/K6roXGbgAsFLSV1vdhZEQM"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Join Subject WhatsApp Group</span>
            </a>
          </div>
        )}

        {/* Resource Categories Tabs */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#5F5B52] dark:text-[#A09A8F] uppercase tracking-wider block">
            Category Filter:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'All'
                  ? 'bg-[#0B3B2E] text-white shadow-sm'
                  : 'bg-white dark:bg-[#1C1C1C] border border-[#E6DCC6] text-[#5F5B52]'
              }`}
            >
              <span>All ({categoryCounts.All})</span>
            </button>

            {ORDERED_CATEGORIES.map((catKey) => {
              const isSelected = selectedCategory === catKey;
              const count = categoryCounts[catKey] || 0;
              const config = CATEGORY_CONFIG[catKey];

              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0B3B2E] text-white shadow-sm'
                      : 'bg-white dark:bg-[#1C1C1C] border border-[#E6DCC6] text-[#5F5B52]'
                  }`}
                >
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Listing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#141414] dark:text-white">
              Available Resources ({filteredResources.length})
            </span>
            <span className="text-[11px] text-[#1FA971] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct PDF Downloads
            </span>
          </div>

          {filteredResources.length === 0 ? (
            <div className="bg-white dark:bg-[#161616] p-8 rounded-2xl border border-[#E6DCC6] text-center space-y-2">
              <FileText className="w-10 h-10 text-[#5F5B52] mx-auto opacity-40" />
              <h4 className="text-sm font-bold text-[#141414] dark:text-white">
                No resources found
              </h4>
              <p className="text-xs text-[#5F5B52]">
                Try selecting "All Subjects" or a different category filter.
              </p>
            </div>
          ) : (
            filteredResources.map((res) => {
              const isSaved = profile.savedResources.includes(res.id);
              const config = CATEGORY_CONFIG[res.category] || CATEGORY_CONFIG.Notes;

              return (
                <div
                  key={res.id}
                  onClick={() => openModal('pdf-preview', res)}
                  className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-sm space-y-3 hover:border-[#0B3B2E] transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] dark:bg-[#202020] text-[#0B3B2E] dark:text-[#D4AF37] border border-[#E6DCC6] dark:border-[#333] flex items-center justify-center flex-shrink-0">
                        {config.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${config.bg} ${config.color} ${config.border}`}>
                            {res.category}
                          </span>
                          <span className="text-[10px] text-[#5F5B52] font-semibold">
                            {res.subjectName}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#141414] dark:text-white line-clamp-2 leading-tight mt-1">
                          {res.title}
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveResource(res.id);
                      }}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isSaved
                          ? 'bg-[#0B3B2E] text-white border-[#0B3B2E]'
                          : 'border-[#E6DCC6] text-[#5F5B52] hover:bg-[#FAF6EE]'
                      }`}
                      aria-label="Save resource"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#5F5B52] dark:text-[#999] pt-1 border-t border-[#E6DCC6]/60 dark:border-[#242424]">
                    <div className="flex items-center gap-3">
                      <span>📄 {res.pageCount} pgs</span>
                      <span>💾 {res.fileSize}</span>
                      <span>⬇️ {res.downloadCount.toLocaleString()}</span>
                    </div>
                    <StatusBadge type="verified" label="Verified" size="sm" />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('pdf-preview', res);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl border border-[#0B3B2E] text-[#0B3B2E] dark:text-[#F1DFA4] dark:border-[#D4AF37] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#E7F2EE]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('pdf-preview', res);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#062D24] shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={(e) => handleShareWhatsApp(res, e)}
                      className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 transition-colors"
                      title="Share to WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
