'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CommunityPost, BranchCode, DiplomaYear, AttachedDocument } from '@/data/types';
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Send,
  PlusCircle,
  Sparkles,
  Filter,
  CheckCircle2,
  Flag,
  FileText,
  Eye,
  Download,
  Paperclip,
  GraduationCap,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { FilterChips } from '@/components/common/FilterChips';

export const MobileCommunityScreen: React.FC = () => {
  const {
    communityPosts,
    toggleLikePost,
    addCommunityPost,
    addPostComment,
    profile,
    openModal,
  } = useApp();

  const userBranch: BranchCode = profile.branch || 'CO';
  const userYear: DiplomaYear = (profile.year || Math.ceil(profile.semester / 2) || 2) as DiplomaYear;
  const userYearCode = userYear === 1 ? 'FY' : userYear === 2 ? 'SY' : 'TY';
  const userYearName = userYear === 1 ? '1st Year (FY)' : userYear === 2 ? '2nd Year (SY)' : '3rd Year (TY)';
  const myClassCode = `${userYearCode} ${userBranch}`;

  const [selectedGroup, setSelectedGroup] = useState<string>(myClassCode);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>('');
  const [newGroup, setNewGroup] = useState<string>(myClassCode);
  const [newFileName, setNewFileName] = useState<string>('');
  const [newFileUrl, setNewFileUrl] = useState<string>('');
  const [newFileType, setNewFileType] = useState<'notes' | 'manual' | 'pdf' | 'doc'>('notes');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'post-01': true,
  });

  const groups = [
    myClassCode,
    `All ${userBranch}`,
    'General MSBTE Lounge',
    'All Discussions',
  ];

  const filteredPosts = useMemo(() => {
    return communityPosts.filter((post) => {
      if (selectedGroup === 'All Discussions') return true;
      if (selectedGroup === 'General MSBTE Lounge') {
        return post.group === 'General MSBTE Lounge' || post.targetBranch === 'ALL';
      }
      if (selectedGroup === `All ${userBranch}`) {
        return post.targetBranch === userBranch || post.authorBranch === userBranch;
      }
      return (
        post.group === selectedGroup ||
        (post.targetBranch === userBranch &&
          (post.targetYear === userYear || post.authorYear === userYear))
      );
    });
  }, [communityPosts, selectedGroup, userBranch, userYear]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    let attachedFile: AttachedDocument | undefined = undefined;
    if (newFileName.trim()) {
      attachedFile = {
        name: newFileName.trim().endsWith('.pdf') ? newFileName.trim() : `${newFileName.trim()}.pdf`,
        url: newFileUrl.trim() || 'https://msbtesolutions.com/sample.pdf',
        type: newFileType,
        size: '2.4 MB',
      };
    }

    addCommunityPost({
      content: newContent,
      group: newGroup,
      targetBranch: userBranch,
      targetYear: userYear,
      tags: [`#${userYearCode}${userBranch}`, '#MSBTEDiploma', '#StudyCircle'],
      attachedFile,
    });

    setNewContent('');
    setNewFileName('');
    setNewFileUrl('');
    setShowCreateModal(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addPostComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

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

  const handleShareToWhatsApp = (post: CommunityPost) => {
    const shareText = `*MSBTE Scholar (${post.group})*\n\n*${post.authorName}*: "${post.content}"\n${
      post.attachedFile ? `\n📎 Notes Attached: ${post.attachedFile.name}` : ''
    }\n\nJoin our class circle on MSBTE Scholar!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="flex-1 pb-24 overflow-y-auto bg-[#FAF6EE] dark:bg-[#0C0C0C] select-none">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-[#E6DCC6] dark:border-[#262626] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-heading font-black text-[#0B3B2E] dark:text-[#FAF6EE]">
                {myClassCode} Community
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7F2EE] text-[#0B3B2E] font-bold">
                {userYearName}
              </span>
            </div>
            <p className="text-[11px] text-[#5F5B52] dark:text-[#A09A8F]">
              Chat & share notes with {userBranch} diploma classmates
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="p-2 rounded-xl bg-[#0B3B2E] text-white hover:bg-[#062D24] shadow-sm flex items-center gap-1.5 text-xs font-bold"
          >
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Post</span>
          </button>
        </div>

        {/* WhatsApp Group Quick Link Banner */}
        <a
          href="https://chat.whatsapp.com/invite/MSBTEScholarCommunity"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-[#062D24] dark:text-[#4ADE80] font-bold"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">📱</span>
            <span>Join Official {myClassCode} WhatsApp Group</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#25D366]" />
        </a>

        {/* Channels Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {groups.map((g) => {
            const isSelected = selectedGroup === g;
            return (
              <button
                key={g}
                onClick={() => setSelectedGroup(g)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all ${
                  isSelected
                    ? 'bg-[#0B3B2E] text-white shadow-sm'
                    : 'bg-[#FAF6EE] dark:bg-[#1E1E1E] text-[#5F5B52] dark:text-[#AAA]'
                }`}
              >
                {g === myClassCode ? `⭐ ${g} (My Class)` : g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="p-4 space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-6 text-center bg-white dark:bg-[#161616] rounded-2xl border border-[#E6DCC6] text-xs text-[#5F5B52]">
            No discussions found for {selectedGroup}. Tap &apos;+ Post&apos; to start one!
          </div>
        ) : (
          filteredPosts.map((post) => {
            const areCommentsOpen = expandedComments[post.id];
            return (
              <div
                key={post.id}
                className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-3"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-9 h-9 rounded-full border border-[#D4AF37] bg-white"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#141414] dark:text-white">
                          {post.authorName}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E7F2EE] text-[#0B3B2E] font-semibold">
                          {post.authorBranch}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#5F5B52]">
                        {post.authorSemester} • {post.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF8E6] text-[#B08F26] font-bold border border-[#D4AF37]/30">
                    {post.group}
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs text-[#141414] dark:text-[#E0E0E0] leading-relaxed">
                  {post.content}
                </p>

                {/* Attached Document (If available) */}
                {post.attachedFile && (
                  <div className="p-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#1E1E1E] border border-[#E6DCC6] dark:border-[#333] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#B3202F] flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#141414] dark:text-white block truncate">
                          {post.attachedFile.name}
                        </span>
                        <span className="text-[10px] text-[#5F5B52]">
                          {post.attachedFile.size || '2.4 MB'} • Verified Notes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handlePreviewPdf(post.attachedFile!, post.authorName)}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#2A2A2A] text-[#0B3B2E] dark:text-[#D4AF37] font-bold text-[11px] border border-[#E6DCC6]"
                      >
                        Preview
                      </button>
                      <a
                        href={post.attachedFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-lg bg-[#0B3B2E] text-white"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold text-[#0B3B2E] dark:text-[#D4AF37]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E6DCC6]/60 dark:border-[#262626] text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1 font-semibold transition-colors ${
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
                      className="flex items-center gap-1 text-[#5F5B52] hover:text-[#0B3B2E] font-semibold"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount || (post.comments?.length || 0)}</span>
                    </button>

                    <button
                      onClick={() => handleShareToWhatsApp(post)}
                      className="flex items-center gap-1 text-[#25D366] font-semibold"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={() => alert('Post reported for review.')}
                    className="text-[#5F5B52] hover:text-[#B3202F]"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Comments Thread */}
                {areCommentsOpen && (
                  <div className="pt-2 border-t border-[#E6DCC6]/40 dark:border-[#222] space-y-2">
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-1.5">
                        {post.comments.map((c) => (
                          <div
                            key={c.id}
                            className="bg-[#FAF6EE] dark:bg-[#1E1E1E] p-2.5 rounded-xl border border-[#E6DCC6]/60 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">
                                {c.authorName}
                              </span>
                              <span className="text-[10px] text-[#5F5B52]">{c.timeAgo}</span>
                            </div>
                            <p className="text-[#141414] dark:text-[#DDD]">{c.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-1">
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
                        placeholder="Write a reply..."
                        className="flex-1 px-3 py-2 rounded-xl border border-[#E6DCC6] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-xs focus:outline-none focus:border-[#0B3B2E]"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3 py-2 rounded-xl bg-[#0B3B2E] text-white text-xs font-bold"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create Post Dialog Overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] dark:bg-[#141414] border border-[#E6DCC6] dark:border-[#2C2C2C] rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6DCC6] pb-3">
              <h3 className="font-bold text-sm text-[#0B3B2E] dark:text-white">
                Post to {myClassCode} Community
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-xs text-[#5F5B52] hover:text-[#141414]"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#5F5B52] block mb-1">
                  Target Channel:
                </label>
                <select
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DCC6] bg-white dark:bg-[#1A1A1A] text-xs font-semibold focus:outline-none"
                >
                  <option value={myClassCode}>{myClassCode} (My Class)</option>
                  <option value={`All ${userBranch}`}>All {userBranch} Engineering</option>
                  <option value="General MSBTE Lounge">General MSBTE Lounge</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5F5B52] block mb-1">
                  Discussion Content:
                </label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={`Ask a doubt or discuss practicals with ${myClassCode} classmates...`}
                  className="w-full p-3 rounded-xl border border-[#E6DCC6] bg-white dark:bg-[#1A1A1A] text-xs focus:outline-none focus:border-[#0B3B2E]"
                  required
                />
              </div>

              {/* Attach PDF */}
              <div className="p-3 rounded-xl bg-white dark:bg-[#1E1E1E] border border-[#E6DCC6] space-y-2">
                <span className="text-[11px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] block">
                  + Attach Study Notes / PDF (Optional)
                </span>
                <input
                  type="text"
                  placeholder="Notes Title (e.g. Java_Unit3_Notes.pdf)"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#E6DCC6] text-xs"
                />
                <input
                  type="url"
                  placeholder="Drive / PDF Link (https://...)"
                  value={newFileUrl}
                  onChange={(e) => setNewFileUrl(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#E6DCC6] text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0B3B2E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Publish to Class</span>
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
