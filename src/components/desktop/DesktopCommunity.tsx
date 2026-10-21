'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CommunityPost, BranchCode, DiplomaYear, AttachedDocument } from '@/data/types';
import { BRANCHES } from '@/data/mockData';
import {
  MessageSquare,
  Heart,
  Send,
  PlusCircle,
  Hash,
  Sparkles,
  Users,
  Shield,
  Flag,
  FileText,
  Download,
  Eye,
  Paperclip,
  Share2,
  CheckCircle2,
  GraduationCap,
  Filter,
  Layers,
  ExternalLink,
  X,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const DesktopCommunity: React.FC = () => {
  const {
    communityPosts,
    toggleLikePost,
    addCommunityPost,
    addPostComment,
    profile,
    updateProfile,
    openModal,
    searchQuery,
  } = useApp();

  // 1. Calculate user's branch and year
  const userBranch: BranchCode = profile.branch || 'CO';
  const userYear: DiplomaYear = (profile.year || Math.ceil(profile.semester / 2) || 2) as DiplomaYear;
  const userYearCode = userYear === 1 ? 'FY' : userYear === 2 ? 'SY' : 'TY';
  const userYearName = userYear === 1 ? '1st Year (FY)' : userYear === 2 ? '2nd Year (SY)' : '3rd Year (TY)';
  const myClassCode = `${userYearCode} ${userBranch}`;

  // 2. Active Channel Selection - defaults to user's class group!
  const [selectedGroup, setSelectedGroup] = useState<string>(myClassCode);

  // 3. Post Creation State
  const [newPostText, setNewPostText] = useState<string>('');
  const [showAttachFile, setShowAttachFile] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileType, setFileType] = useState<'pdf' | 'notes' | 'manual' | 'doc'>('notes');
  const [selectedTag, setSelectedTag] = useState<string>('#Notes');
  const [postTargetGroup, setPostTargetGroup] = useState<string>(myClassCode);

  // 4. Comment / Discussion Threads State
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentFileInputs, setCommentFileInputs] = useState<Record<string, { name: string; url: string }>>({});
  const [showCommentFileFor, setShowCommentFileFor] = useState<Record<string, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'post-01': true, // open first thread by default for rich instant preview
  });

  // Branch details
  const currentBranchObj = BRANCHES.find((b) => b.code === userBranch) || {
    name: 'Computer Engineering',
    code: 'CO',
  };

  // WhatsApp group URLs per branch & year
  const whatsappGroupLinks: Record<string, string> = {
    'FY CO': 'https://chat.whatsapp.com/invite/MSBTE_FY_CO_Community',
    'SY CO': 'https://chat.whatsapp.com/invite/MSBTE_SY_CO_Official',
    'TY CO': 'https://chat.whatsapp.com/invite/MSBTE_TY_CO_Placements',
    'FY IT': 'https://chat.whatsapp.com/invite/MSBTE_FY_IT_Community',
    'SY IT': 'https://chat.whatsapp.com/invite/MSBTE_SY_IT_Official',
    'TY IT': 'https://chat.whatsapp.com/invite/MSBTE_TY_IT_Placements',
    'FY ME': 'https://chat.whatsapp.com/invite/MSBTE_FY_ME_Community',
    'SY ME': 'https://chat.whatsapp.com/invite/MSBTE_SY_ME_Official',
    'TY ME': 'https://chat.whatsapp.com/invite/MSBTE_TY_ME_Placements',
    'FY CE': 'https://chat.whatsapp.com/invite/MSBTE_FY_CE_Community',
    'SY CE': 'https://chat.whatsapp.com/invite/MSBTE_SY_CE_Official',
    'TY CE': 'https://chat.whatsapp.com/invite/MSBTE_TY_CE_Placements',
    'FY EE': 'https://chat.whatsapp.com/invite/MSBTE_FY_EE_Community',
    'SY EE': 'https://chat.whatsapp.com/invite/MSBTE_SY_EE_Official',
    'TY EE': 'https://chat.whatsapp.com/invite/MSBTE_TY_EE_Placements',
    'General MSBTE Lounge': 'https://chat.whatsapp.com/invite/MSBTE_All_Branches_Lounge',
  };

  const activeWhatsAppLink =
    whatsappGroupLinks[selectedGroup] || whatsappGroupLinks[myClassCode] || 'https://chat.whatsapp.com/invite/MSBTEScholarCommunity';

  // 5. Filter posts based on active group channel & search
  const filteredPosts = useMemo(() => {
    return communityPosts.filter((p) => {
      // Group matching logic
      let matchesGroup = false;
      if (selectedGroup === 'All MSBTE Lounge' || selectedGroup === 'General MSBTE Lounge') {
        matchesGroup = p.group === 'General MSBTE Lounge' || p.targetBranch === 'ALL' || p.group === 'General';
      } else if (selectedGroup === `All ${userBranch} Engg`) {
        matchesGroup = p.targetBranch === userBranch || p.authorBranch === userBranch || p.group.includes(userBranch);
      } else {
        // Specific class group (e.g. "SY CO")
        matchesGroup =
          p.group === selectedGroup ||
          (p.targetBranch === userBranch &&
            (p.targetYear === userYear || p.authorYear === userYear));
      }

      // Search matching
      const matchesSearch =
        !searchQuery ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.attachedFile && p.attachedFile.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesGroup && matchesSearch;
    });
  }, [communityPosts, selectedGroup, userBranch, userYear, searchQuery]);

  // Handle Post Creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    let attachedFile: AttachedDocument | undefined = undefined;
    if (showAttachFile && fileName.trim()) {
      attachedFile = {
        name: fileName.trim().endsWith('.pdf') ? fileName.trim() : `${fileName.trim()}.pdf`,
        url: fileUrl.trim() || 'https://msbtesolutions.com/sample.pdf',
        type: fileType,
        size: '2.4 MB',
      };
    }

    addCommunityPost({
      content: newPostText,
      group: postTargetGroup,
      targetBranch: userBranch,
      targetYear: userYear,
      tags: [selectedTag, `#${userYearCode}${userBranch}`, `#MSBTE${userYearName.split(' ')[0]}`],
      attachedFile,
    });

    // Reset form
    setNewPostText('');
    setFileName('');
    setFileUrl('');
    setShowAttachFile(false);
  };

  // Handle Adding Comment/Reply
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const fileData = commentFileInputs[postId];
    let attachedFile: AttachedDocument | undefined = undefined;
    if (fileData && fileData.name.trim()) {
      attachedFile = {
        name: fileData.name.trim().endsWith('.pdf') ? fileData.name.trim() : `${fileData.name.trim()}.pdf`,
        url: fileData.url.trim() || 'https://msbtesolutions.com/sample.pdf',
        type: 'notes',
        size: '1.5 MB',
      };
    }

    addPostComment(postId, text, attachedFile);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setCommentFileInputs((prev) => ({ ...prev, [postId]: { name: '', url: '' } }));
    setShowCommentFileFor((prev) => ({ ...prev, [postId]: false }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  // Preview attached PDF in in-app modal
  const handlePreviewPdf = (doc: AttachedDocument, author: string) => {
    openModal('pdf-preview', {
      title: doc.name,
      fileUrl: doc.url,
      category: doc.type === 'manual' ? 'Solved Manuals' : 'Notes',
      subjectName: `${userBranch} Engineering • ${userYearName}`,
      pageCount: 16,
      downloadCount: 840,
      fileSize: doc.size || '2.4 MB',
      uploadDate: 'Verified Community Resource',
      author,
    });
  };

  // Share post on WhatsApp
  const handleShareToWhatsApp = (post: CommunityPost) => {
    const shareText = `*MSBTE Scholar Community (${post.group})*\n\n*${post.authorName}*: "${post.content}"\n${
      post.attachedFile ? `\n📎 Attached Notes: ${post.attachedFile.name}` : ''
    }\n\nJoin our class group on MSBTE Scholar 2.0!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 1. Header Banner & Class WhatsApp Connect */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#062D24] via-[#0B3B2E] to-[#124E3F] p-6 lg:p-8 text-white shadow-xl border border-[#D4AF37]/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FAF6EE] text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personalized For Your Diploma Batch</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white flex items-center gap-2">
              <span>{currentBranchObj.name}</span>
              <span className="text-[#D4AF37]">•</span>
              <span className="text-[#FAF6EE]">{userYearName}</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
              Live discussion channel dedicated to <strong className="text-white">{myClassCode}</strong> students.
              Share solved manuals, handwritten notes, clarify viva doubts, and chat directly with your classmates.
            </p>

            {/* Quick Year Switcher */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-white/70 font-semibold">Switch Class Year:</span>
              {[
                { yr: 1, code: 'FY', name: '1st Year (FY)' },
                { yr: 2, code: 'SY', name: '2nd Year (SY)' },
                { yr: 3, code: 'TY', name: '3rd Year (TY)' },
              ].map((item) => {
                const isActive = userYear === item.yr;
                return (
                  <button
                    key={item.yr}
                    onClick={() => {
                      updateProfile({
                        year: item.yr as DiplomaYear,
                        semester: ((item.yr * 2) - 1) as any,
                      });
                      setSelectedGroup(`${item.code} ${userBranch}`);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#062D24] shadow-md scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* WhatsApp Direct Join Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-white/20 flex flex-col justify-between gap-3 min-w-[280px]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.07-.941.056-.633-.031-1.353-.298-2.316-.902-1.393-.872-2.3-2.317-2.37-2.41-.07-.094-.564-.75-.564-1.429 0-.679.352-1.012.478-1.144.125-.132.273-.165.364-.165.091 0 .183.001.263.005.085.004.198-.032.31.236.115.275.394.96.429 1.03.035.07.058.153.012.245-.047.092-.07.15-.14.232-.07.082-.148.183-.211.246-.07.07-.143.146-.062.285.082.139.362.597.776.966.533.475.983.622 1.122.692.139.07.221.058.303-.035.082-.094.352-.41.445-.55.093-.14.186-.117.314-.07.127.047.813.383.953.453.139.07.232.105.267.163.035.059.035.342-.109.747z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                  Official Class WhatsApp Group
                </span>
                <span className="text-sm font-bold text-white block">
                  {selectedGroup} Classmates
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#CBD5E1] leading-tight">
              Get urgent exam circulars, question bank answers & live doubt clearance directly on WhatsApp.
            </p>

            <a
              href={activeWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <span>Join Class WhatsApp Group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Community Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Branch & Year Channel Selector */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#161616] p-4 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3">
            <div className="px-2">
              <span className="text-[11px] font-bold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider block">
                Class Channels
              </span>
              <span className="text-[10px] text-[#0B3B2E] dark:text-[#D4AF37] font-semibold">
                {currentBranchObj.name}
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Primary User Class Group (Highlighted!) */}
              <button
                onClick={() => setSelectedGroup(myClassCode)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left ${
                  selectedGroup === myClassCode
                    ? 'bg-[#0B3B2E] text-white shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'bg-[#FAF6EE] dark:bg-[#1F1F1F] text-[#141414] dark:text-white hover:bg-[#F2ECE0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">⭐</span>
                  <div>
                    <span className="block">{myClassCode}</span>
                    <span className={`text-[10px] block ${selectedGroup === myClassCode ? 'text-[#D4AF37]' : 'text-[#1FA971]'}`}>
                      Your Class Group
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] font-black">
                  ACTIVE
                </span>
              </button>

              {/* Other Years in Same Branch */}
              <div className="pt-2 pb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-[#8C867A]">
                Other Years ({userBranch})
              </div>

              {['FY', 'SY', 'TY']
                .filter((code) => code !== userYearCode)
                .map((code) => {
                  const groupKey = `${code} ${userBranch}`;
                  const isSelected = selectedGroup === groupKey;
                  const yearLabel = code === 'FY' ? '1st Year' : code === 'SY' ? '2nd Year' : '3rd Year';
                  return (
                    <button
                      key={groupKey}
                      onClick={() => setSelectedGroup(groupKey)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#0B3B2E] text-white shadow-sm'
                          : 'text-[#5F5B52] dark:text-[#AAA] hover:bg-[#FAF6EE] dark:hover:bg-[#202020]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>🎓</span>
                        <span>{groupKey}</span>
                        <span className="text-[10px] text-[#8C867A]">({yearLabel})</span>
                      </div>
                    </button>
                  );
                })}

              {/* All Branch Students Combined */}
              <button
                onClick={() => setSelectedGroup(`All ${userBranch} Engg`)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedGroup === `All ${userBranch} Engg`
                    ? 'bg-[#0B3B2E] text-white shadow-sm'
                    : 'text-[#5F5B52] dark:text-[#AAA] hover:bg-[#FAF6EE] dark:hover:bg-[#202020]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🏛️</span>
                  <span>All {userBranch} Engg</span>
                </div>
                <span className="text-[10px] text-[#8C867A]">All Years</span>
              </button>

              {/* State-wide MSBTE Lounge */}
              <button
                onClick={() => setSelectedGroup('General MSBTE Lounge')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedGroup === 'General MSBTE Lounge'
                    ? 'bg-[#0B3B2E] text-white shadow-sm'
                    : 'text-[#5F5B52] dark:text-[#AAA] hover:bg-[#FAF6EE] dark:hover:bg-[#202020]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>MSBTE State Lounge</span>
                </div>
                <span className="text-[10px] text-[#8C867A]">All Branches</span>
              </button>
            </div>

            {/* Switch Diploma Branch */}
            <div className="pt-3 border-t border-[#E6DCC6]/60 dark:border-[#262626] space-y-1.5">
              <label className="text-[10px] font-bold text-[#5F5B52] dark:text-[#888] uppercase block px-1">
                Change Branch
              </label>
              <select
                value={userBranch}
                onChange={(e) => {
                  const b = e.target.value as BranchCode;
                  updateProfile({ branch: b });
                  setSelectedGroup(`${userYearCode} ${b}`);
                }}
                className="w-full px-2.5 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-[#FAF6EE] dark:bg-[#1E1E1E] text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37]"
              >
                {BRANCHES.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Safe Community Notice */}
          <div className="bg-[#FAF6EE] dark:bg-[#191919] p-4 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0B3B2E] dark:text-[#D4AF37]">
              <Shield className="w-4 h-4 text-[#1FA971]" />
              <span>Verified MSBTE Circle</span>
            </div>
            <p className="text-[#5F5B52] dark:text-[#AAA] text-[11px] leading-relaxed">
              Posts and notes shared here are verified by fellow polytechnic engineers across Maharashtra.
              Feel free to upload hand-written notes or ask viva questions freely!
            </p>
          </div>
        </div>

        {/* Center 2 Columns: Feed & Post Publisher */}
        <div className="lg:col-span-2 space-y-5">
          {/* Post Creator Box */}
          <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full border-2 border-[#D4AF37] shadow-sm bg-white"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#141414] dark:text-white">
                      {profile.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-bold">
                      {myClassCode}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#5F5B52] block">
                    Posting to: <strong className="text-[#0B3B2E] dark:text-[#D4AF37]">{selectedGroup}</strong>
                  </span>
                </div>
              </div>

              {/* Attach Notes/PDF toggle */}
              <button
                type="button"
                onClick={() => setShowAttachFile(!showAttachFile)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  showAttachFile
                    ? 'bg-[#0B3B2E] text-white'
                    : 'bg-[#FAF6EE] dark:bg-[#222] text-[#0B3B2E] dark:text-[#D4AF37] hover:bg-[#F2ECE0]'
                }`}
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>{showAttachFile ? 'Cancel Attachment' : '+ Share Notes / PDF'}</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder={`Ask a doubt, discuss manual practicals, or share notes with ${selectedGroup} batchmates...`}
                className="w-full p-3.5 rounded-2xl border border-[#E6DCC6] dark:border-[#2E2E2E] bg-[#FAF6EE] dark:bg-[#1D1D1D] text-xs focus:outline-none focus:border-[#0B3B2E] dark:text-white"
                required
              />

              {/* Attach File Drawer */}
              {showAttachFile && (
                <div className="p-4 rounded-2xl bg-[#E7F2EE] dark:bg-[#1A2E26] border border-[#1FA971]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#1FA971]" />
                      Attach Study Document / PDF
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAttachFile(false)}
                      className="text-[#5F5B52] hover:text-black dark:text-[#AAA]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] block mb-1">
                        Document Title / Topic Name
                      </label>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="e.g. Java_Practical_8_Solved.pdf"
                        className="w-full p-2.5 rounded-xl border border-[#B3D6CA] dark:border-[#2A483D] bg-white dark:bg-[#161616] text-xs font-semibold focus:outline-none"
                        required={showAttachFile}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] block mb-1">
                        Document Type
                      </label>
                      <select
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-[#B3D6CA] dark:border-[#2A483D] bg-white dark:bg-[#161616] text-xs font-semibold focus:outline-none"
                      >
                        <option value="notes">📄 Handwritten Notes</option>
                        <option value="manual">🧪 Solved Lab Manual</option>
                        <option value="pdf">📑 Question Paper / Model Answer</option>
                        <option value="doc">💡 Capstone Project Synopsis</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] block mb-1">
                        Google Drive / Direct PDF Download Link
                      </label>
                      <input
                        type="url"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/... or PDF URL"
                        className="w-full p-2.5 rounded-xl border border-[#B3D6CA] dark:border-[#2A483D] bg-white dark:bg-[#161616] text-xs font-mono focus:outline-none"
                      />
                      <span className="text-[10px] text-[#0B3B2E]/70 dark:text-[#999] mt-0.5 block">
                        Tip: You can paste your Google Drive shareable link with &apos;Anyone with the link can view&apos;.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tag Selection & Submit */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {['#Notes', '#SolvedManual', '#VivaPrep', '#Doubt', '#Assignment', '#PYQ'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        selectedTag === tag
                          ? 'bg-[#0B3B2E] text-white shadow-sm'
                          : 'bg-[#FAF6EE] dark:bg-[#222] text-[#5F5B52] dark:text-[#AAA] hover:bg-[#F2ECE0]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Post to {selectedGroup}</span>
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </form>
          </div>

          {/* Active Channel Indicator */}
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="font-bold text-[#141414] dark:text-white flex items-center gap-2">
              <span>Channel:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-black">
                {selectedGroup}
              </span>
              <span className="text-[11px] text-[#5F5B52]">({filteredPosts.length} discussions)</span>
            </span>

            {selectedGroup !== myClassCode && (
              <button
                onClick={() => setSelectedGroup(myClassCode)}
                className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
              >
                ← Back to My Class ({myClassCode})
              </button>
            )}
          </div>

          {/* Feed Posts */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white dark:bg-[#161616] p-8 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6EE] dark:bg-[#202020] flex items-center justify-center text-xl">
                  💬
                </div>
                <h3 className="text-sm font-bold text-[#141414] dark:text-white">
                  No discussions in {selectedGroup} yet!
                </h3>
                <p className="text-xs text-[#5F5B52] dark:text-[#888] max-w-sm mx-auto">
                  Be the first one in your class to ask a question, share practical notes, or discuss viva topics!
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const areCommentsOpen = expandedComments[post.id];
                return (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3 transition-all hover:border-[#0B3B2E]/40"
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-10 h-10 rounded-full border border-[#D4AF37] bg-white shadow-sm"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#141414] dark:text-white">
                              {post.authorName}
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-bold">
                              {post.authorYear
                                ? `${post.authorYear === 1 ? 'FY' : post.authorYear === 2 ? 'SY' : 'TY'} ${post.authorBranch}`
                                : post.authorBranch}
                            </span>
                            <span className="inline-flex items-center text-[#1FA971]" title="Verified MSBTE Student">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <span className="text-[10px] text-[#5F5B52]">
                            {post.authorSemester} • {post.timeAgo}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFF8E6] text-[#B08F26] font-bold border border-[#D4AF37]/30">
                        {post.group}
                      </span>
                    </div>

                    {/* Post Content */}
                    <p className="text-xs sm:text-sm text-[#141414] dark:text-[#E0E0E0] leading-relaxed">
                      {post.content}
                    </p>

                    {/* Attached PDF / Document Card (If attached!) */}
                    {post.attachedFile && (
                      <div className="p-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-[#1C1C1C] border border-[#E6DCC6] dark:border-[#333] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FDECEE] text-[#B3202F] flex items-center justify-center font-bold text-xs shadow-sm">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#141414] dark:text-white block line-clamp-1">
                              {post.attachedFile.name}
                            </span>
                            <span className="text-[10px] text-[#5F5B52] dark:text-[#AAA]">
                              {post.attachedFile.type.toUpperCase()} • {post.attachedFile.size || '2.4 MB'} • Verified Notes
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePreviewPdf(post.attachedFile!, post.authorName)}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#2A2A2A] border border-[#E6DCC6] dark:border-[#444] text-[#0B3B2E] dark:text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 hover:bg-[#FAF6EE] shadow-sm transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <a
                            href={post.attachedFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-semibold text-[#0B3B2E] dark:text-[#D4AF37]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Post Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E6DCC6]/60 dark:border-[#262626] text-xs">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          className={`flex items-center gap-1.5 font-bold transition-colors ${
                            post.isLiked
                              ? 'text-[#B3202F]'
                              : 'text-[#5F5B52] hover:text-[#B3202F]'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${post.isLiked ? 'fill-[#B3202F]' : ''}`}
                          />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          onClick={() =>
                            setExpandedComments((prev) => ({
                              ...prev,
                              [post.id]: !prev[post.id],
                            }))
                          }
                          className="flex items-center gap-1.5 text-[#5F5B52] hover:text-[#0B3B2E] font-bold"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.commentsCount || (post.comments?.length || 0)} Replies</span>
                        </button>

                        <button
                          onClick={() => handleShareToWhatsApp(post)}
                          className="flex items-center gap-1.5 text-[#25D366] hover:text-[#20ba59] font-bold"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </div>

                      <button
                        onClick={() => alert('Post reported to student moderator.')}
                        className="text-[#5F5B52] hover:text-[#B3202F]"
                        title="Report"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Discussion / Reply Thread */}
                    {areCommentsOpen && (
                      <div className="pt-3 border-t border-[#E6DCC6]/40 dark:border-[#262626] space-y-3">
                        {post.comments && post.comments.length > 0 && (
                          <div className="space-y-2.5">
                            {post.comments.map((c) => (
                              <div
                                key={c.id}
                                className="bg-[#FAF6EE] dark:bg-[#1E1E1E] p-3.5 rounded-2xl border border-[#E6DCC6]/60 dark:border-[#333] text-xs space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={c.avatar}
                                      alt={c.authorName}
                                      className="w-5 h-5 rounded-full border border-[#D4AF37]"
                                    />
                                    <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">
                                      {c.authorName}
                                    </span>
                                    {c.authorBranch && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white dark:bg-[#2A2A2A] font-semibold text-[#5F5B52]">
                                        {c.authorYear ? `${c.authorYear === 1 ? 'FY' : c.authorYear === 2 ? 'SY' : 'TY'} ${c.authorBranch}` : c.authorBranch}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-[#5F5B52]">{c.timeAgo}</span>
                                </div>

                                <p className="text-[#141414] dark:text-[#DDD] leading-relaxed pl-7">
                                  {c.content}
                                </p>

                                {c.attachedFile && (
                                  <div className="ml-7 mt-1.5 p-2 rounded-xl bg-white dark:bg-[#161616] border border-[#E6DCC6] flex items-center justify-between text-[11px]">
                                    <span className="font-semibold text-[#0B3B2E] dark:text-[#D4AF37] flex items-center gap-1.5">
                                      <FileText className="w-3.5 h-3.5 text-[#1FA971]" />
                                      {c.attachedFile.name}
                                    </span>
                                    <button
                                      onClick={() => handlePreviewPdf(c.attachedFile!, c.authorName)}
                                      className="text-xs text-[#0B3B2E] font-bold hover:underline"
                                    >
                                      View
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input */}
                        <div className="space-y-2 pt-1">
                          {showCommentFileFor[post.id] && (
                            <div className="p-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#222] border border-[#E6DCC6] grid grid-cols-2 gap-2 text-xs">
                              <input
                                type="text"
                                placeholder="Attached PDF Title..."
                                value={commentFileInputs[post.id]?.name || ''}
                                onChange={(e) =>
                                  setCommentFileInputs((prev) => ({
                                    ...prev,
                                    [post.id]: {
                                      name: e.target.value,
                                      url: prev[post.id]?.url || '',
                                    },
                                  }))
                                }
                                className="p-2 rounded-lg border border-[#E6DCC6] bg-white dark:bg-[#1A1A1A] text-xs"
                              />
                              <input
                                type="url"
                                placeholder="Drive / PDF Link..."
                                value={commentFileInputs[post.id]?.url || ''}
                                onChange={(e) =>
                                  setCommentFileInputs((prev) => ({
                                    ...prev,
                                    [post.id]: {
                                      name: prev[post.id]?.name || '',
                                      url: e.target.value,
                                    },
                                  }))
                                }
                                className="p-2 rounded-lg border border-[#E6DCC6] bg-white dark:bg-[#1A1A1A] text-xs"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <img
                              src={profile.avatar}
                              alt="My Avatar"
                              className="w-7 h-7 rounded-full border border-[#D4AF37] bg-white"
                            />
                            <input
                              type="text"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddComment(post.id);
                              }}
                              placeholder={`Reply to ${post.authorName}...`}
                              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs focus:outline-none focus:border-[#0B3B2E]"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowCommentFileFor((prev) => ({
                                  ...prev,
                                  [post.id]: !prev[post.id],
                                }))
                              }
                              className={`p-2 rounded-xl border border-[#E6DCC6] text-xs transition-colors ${
                                showCommentFileFor[post.id]
                                  ? 'bg-[#0B3B2E] text-white'
                                  : 'bg-[#FAF6EE] text-[#5F5B52] hover:bg-[#F2ECE0]'
                              }`}
                              title="Attach PDF in reply"
                            >
                              <Paperclip className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="px-4 py-2.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white text-xs font-bold shadow-sm"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: WhatsApp Directory & Trending Topics */}
        <div className="space-y-5">
          {/* Official WhatsApp Groups Directory */}
          <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
              <h3 className="text-xs font-bold text-[#141414] dark:text-white uppercase tracking-wider">
                MSBTE WhatsApp Groups
              </h3>
            </div>
            <p className="text-[11px] text-[#5F5B52] dark:text-[#AAA]">
              Direct peer groups for sharing files and fast answers:
            </p>

            <div className="space-y-2">
              {[
                { name: `${userBranch} 1st Year (FY)`, key: `FY ${userBranch}`, members: '1.2K' },
                { name: `${userBranch} 2nd Year (SY)`, key: `SY ${userBranch}`, members: '1.4K', active: true },
                { name: `${userBranch} 3rd Year (TY)`, key: `TY ${userBranch}`, members: '1.6K' },
                { name: 'Maharashtra MSBTE State Lounge', key: 'General MSBTE Lounge', members: '8.5K' },
              ].map((wa) => (
                <a
                  key={wa.key}
                  href={whatsappGroupLinks[wa.key] || 'https://chat.whatsapp.com/invite/MSBTEScholar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#1E1E1E] hover:bg-[#E7F7EE] dark:hover:bg-[#1A2E26] border border-[#E6DCC6]/60 dark:border-[#333] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📱</span>
                    <div>
                      <span className="text-xs font-bold text-[#0B3B2E] dark:text-[#D4AF37] block group-hover:underline">
                        {wa.name}
                      </span>
                      <span className="text-[10px] text-[#5F5B52]">{wa.members} Diploma Students</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#25D366]" />
                </a>
              ))}
            </div>
          </div>

          {/* Trending in User's Branch */}
          <div className="bg-white dark:bg-[#161616] p-5 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3">
            <h3 className="text-xs font-bold text-[#5F5B52] dark:text-[#888] uppercase tracking-wider">
              Trending in {userBranch} Engg
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { tag: `#KScheme${userYearCode}Syllabus`, count: '1.8K discussions' },
                { tag: `#${userBranch}PracticalManualViva`, count: '1.2K discussions' },
                { tag: '#TCSSmartHiring2026', count: '940 discussions' },
                { tag: '#ModelAnswerWinter2025', count: '780 discussions' },
                { tag: '#CapstoneProjectReportFormat', count: '520 discussions' },
              ].map((topic) => (
                <div
                  key={topic.tag}
                  onClick={() => setNewPostText((prev) => `${prev} ${topic.tag}`)}
                  className="p-2.5 rounded-xl hover:bg-[#FAF6EE] dark:hover:bg-[#202020] cursor-pointer transition-colors"
                >
                  <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37] block">
                    {topic.tag}
                  </span>
                  <span className="text-[10px] text-[#5F5B52]">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
