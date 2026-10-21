'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Users,
  CreditCard,
  Briefcase,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  BarChart3,
  Search,
  Filter,
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

export const DesktopAdminDashboard: React.FC = () => {
  const { studyResources, jobListings, communityPosts, msbteUpdates } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'resources' | 'jobs' | 'moderation'>('overview');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="bg-[#062D24] text-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#062D24] text-[10px] font-black uppercase">
              Restricted Area
            </span>
            <span className="text-xs text-[#F1DFA4]">Administrator & Moderator Workspace</span>
          </div>
          <h1 className="text-2xl font-heading font-black">
            MSBTE Scholar Content Operations & Audit Panel
          </h1>
          <p className="text-xs text-white/80">
            Publish verified curriculum resources, audit student community flags, and verify company recruitment credentials.
          </p>
        </div>

        <div className="flex bg-[#041D17] p-1 rounded-2xl border border-[#0B3B2E]">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'overview'
                ? 'bg-[#0B3B2E] text-[#D4AF37]'
                : 'text-white/70'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveAdminTab('resources')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'resources'
                ? 'bg-[#0B3B2E] text-[#D4AF37]'
                : 'text-white/70'
            }`}
          >
            Study Resources
          </button>
          <button
            onClick={() => setActiveAdminTab('jobs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'jobs'
                ? 'bg-[#0B3B2E] text-[#D4AF37]'
                : 'text-white/70'
            }`}
          >
            Job Verification
          </button>
          <button
            onClick={() => setActiveAdminTab('moderation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'moderation'
                ? 'bg-[#0B3B2E] text-[#D4AF37]'
                : 'text-white/70'
            }`}
          >
            Moderation Flags
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 bg-[#E7F7EE] border border-[#1FA971]/30 rounded-2xl text-xs font-bold text-[#1FA971] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {actionSuccess}
        </div>
      )}

      {/* 4 Stats Cards from Blueprint */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle">
          <div className="flex items-center justify-between text-xs font-bold text-[#5F5B52]">
            <span>Total Registered Students</span>
            <Users className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-black text-[#0B3B2E] dark:text-[#D4AF37] mt-1">1,248</div>
          <span className="text-[10px] text-[#1FA971] font-semibold">+18.4% this month</span>
        </div>

        <div className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle">
          <div className="flex items-center justify-between text-xs font-bold text-[#5F5B52]">
            <span>Total Orders & Access</span>
            <CreditCard className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-black text-[#0B3B2E] dark:text-[#D4AF37] mt-1">262</div>
          <span className="text-[10px] text-[#5F5B52]">₹52,140 verified revenue</span>
        </div>

        <div className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle">
          <div className="flex items-center justify-between text-xs font-bold text-[#5F5B52]">
            <span>Active Verified Jobs</span>
            <Briefcase className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-black text-[#0B3B2E] dark:text-[#D4AF37] mt-1">198</div>
          <span className="text-[10px] text-[#1FA971] font-semibold">100% official links</span>
        </div>

        <div className="bg-white dark:bg-[#161616] p-5 rounded-2xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle">
          <div className="flex items-center justify-between text-xs font-bold text-[#5F5B52]">
            <span>Curated Resources</span>
            <FileText className="w-4 h-4 text-[#0B3B2E] dark:text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-black text-[#0B3B2E] dark:text-[#D4AF37] mt-1">87</div>
          <span className="text-[10px] text-[#D4AF37] font-semibold">K-Scheme complete</span>
        </div>
      </div>

      {/* Main Admin Tab View */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audit Logs */}
          <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-[#141414] dark:text-white uppercase tracking-wider">
              Recent System Audit Log
            </h3>
            <div className="divide-y divide-[#E6DCC6]/60 dark:divide-[#262626] text-xs">
              {[
                { action: 'Resource Published', item: 'DBMS Handwritten Master Notes (Units 1-6)', by: 'Admin (Prof. Kulkarni)', time: '10 mins ago' },
                { action: 'Job Approved', item: 'Tata Consultancy Services - DTE 2026 Batch', by: 'Moderator (Placement Cell)', time: '1 hour ago' },
                { action: 'Payment Verified', item: 'Order #RZP-92184 for Dikshant Shahare (₹199)', by: 'Razorpay Webhook', time: '2 hours ago' },
                { action: 'Circular Synced', item: 'MSBTE Winter 2026 Theory Exam Timetable', by: 'System Bot (msbte.ac.in)', time: '4 hours ago' },
              ].map((log, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37] block">{log.action}</span>
                    <span className="text-[#5F5B52] dark:text-[#AAA]">{log.item}</span>
                  </div>
                  <div className="text-right text-[10px] text-[#5F5B52]">
                    <span className="block font-medium">{log.by}</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Queue */}
          <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-[#141414] dark:text-white uppercase tracking-wider">
              Pending Verification Queue (3 Items)
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Data Structures Using C (313301) Solved Lab Manual', type: 'Study Resource', submittedBy: 'Govt Poly Amravati Topper' },
                { title: 'L&T Heavy Engineering Trainee Apprentice', type: 'Job Alert', submittedBy: 'L&T HR Careers' },
                { title: 'Smart Irrigation IoT Circuit Schematic', type: 'Project File', submittedBy: 'Electrical Final Year Group' },
              ].map((item, i) => (
                <div key={i} className="p-3.5 bg-[#FAF6EE] dark:bg-[#1E1E1E] rounded-2xl border border-[#E6DCC6]/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#0B3B2E] dark:text-[#D4AF37] uppercase">{item.type}</span>
                    <h4 className="font-bold text-[#141414] dark:text-white mt-0.5">{item.title}</h4>
                    <span className="text-[10px] text-[#5F5B52]">By: {item.submittedBy}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(`Approved: ${item.title}`)}
                      className="px-3 py-1 bg-[#1FA971] text-white rounded-lg text-xs font-bold hover:bg-[#188B5D]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(`Rejected: ${item.title}`)}
                      className="px-3 py-1 bg-[#B3202F] text-white rounded-lg text-xs font-bold hover:bg-[#961B27]"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'resources' && (
        <div className="bg-white dark:bg-[#161616] p-6 rounded-3xl border border-[#E6DCC6] dark:border-[#262626] shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#141414] dark:text-white uppercase tracking-wider">
              Published Study Materials Management
            </h3>
            <button
              onClick={() => handleAction('Upload modal opened for new MSBTE PDF')}
              className="px-4 py-2 bg-[#0B3B2E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Upload New PDF Document</span>
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] text-[#5F5B52] font-bold border-b border-[#E6DCC6]">
              <tr>
                <th className="py-2.5 px-4">Title</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DCC6]/60">
              {studyResources.map((res) => (
                <tr key={res.id}>
                  <td className="py-3 px-4 font-bold text-[#141414] dark:text-white">{res.title}</td>
                  <td className="py-3 px-3 text-[#5F5B52]">{res.subjectName}</td>
                  <td className="py-3 px-3">{res.category}</td>
                  <td className="py-3 px-3">
                    <span className="text-[#1FA971] font-bold">✔ Published</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleAction(`Archived ${res.title}`)}
                      className="px-2 py-1 text-xs text-[#B3202F] hover:underline font-bold"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
