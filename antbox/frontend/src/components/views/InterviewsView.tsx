"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Clock,
  UserCheck,
  Play,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  Filter,
} from "lucide-react";
import { Candidate, CandidateStatus, RoleType } from "@/lib/types";

interface InterviewsViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateCandidate: (updated: Candidate) => void;
}

type FilterTab = "All" | "Live" | "Upcoming" | "Waiting" | "Completed" | "No-show";

const ROLE_BADGES: Record<RoleType, string> = {
  SDE: "bg-[#F4EBF5] text-[#7E5281] border-[#7E5281]/30",
  GTM: "bg-amber-50 text-amber-800 border-amber-200",
  OPN: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export const InterviewsView: React.FC<InterviewsViewProps> = ({
  candidates,
  onSelectCandidate,
  onUpdateCandidate,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [roleFilter, setRoleFilter] = useState<"ALL" | RoleType>("ALL");

  const filteredCandidates = candidates.filter((c) => {
    // Role filter
    if (roleFilter !== "ALL" && c.role !== roleFilter) return false;

    // Tab filter
    if (activeTab === "Live") return c.status === "In Interview";
    if (activeTab === "Upcoming") return c.status === "Scheduled";
    if (activeTab === "Waiting") return c.status === "Waiting";
    if (activeTab === "Completed") return c.status === "Completed";
    if (activeTab === "No-show") return c.status === "No-show";
    return true;
  });

  const handleStatusChange = (c: Candidate, newStatus: CandidateStatus) => {
    onUpdateCandidate({
      ...c,
      status: newStatus,
      checkIn: newStatus === "In Interview" && !c.checkIn ? "10:30 AM" : c.checkIn,
      checkOut: newStatus === "Completed" && !c.checkOut ? "11:15 AM" : c.checkOut,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>Live Operations</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
            Interview Sessions Room
          </h1>
          <p className="text-xs text-[#6E685F] mt-1">
            Manage live interview sessions, timers, and interviewer assignments in real time.
          </p>
        </div>

        {/* Role Filters */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-[#E6E2D8]">
          {(["ALL", "SDE", "GTM", "OPN"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                roleFilter === r
                  ? "bg-[#7E5281] text-white"
                  : "text-[#6E685F] hover:text-[#24221F]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {(["All", "Live", "Upcoming", "Waiting", "Completed", "No-show"] as FilterTab[]).map(
          (tab) => {
            const count =
              tab === "All"
                ? candidates.length
                : tab === "Live"
                ? candidates.filter((c) => c.status === "In Interview").length
                : tab === "Upcoming"
                ? candidates.filter((c) => c.status === "Scheduled").length
                : tab === "Waiting"
                ? candidates.filter((c) => c.status === "Waiting").length
                : tab === "Completed"
                ? candidates.filter((c) => c.status === "Completed").length
                : candidates.filter((c) => c.status === "No-show").length;

            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#24221F] text-white border-[#24221F] shadow-sm"
                    : "bg-white text-[#6E685F] border-[#E6E2D8] hover:border-[#7E5281] hover:text-[#24221F]"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F5F3EC] text-[#6E685F]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          }
        )}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            className="p-6 bg-white border border-[#E6E2D8] hover:border-[#7E5281]/50 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      ROLE_BADGES[c.role]
                    }`}
                  >
                    {c.role}
                  </span>
                  <h3
                    onClick={() => onSelectCandidate(c)}
                    className="text-lg font-bold text-[#24221F] hover:text-[#7E5281] transition-colors cursor-pointer mt-1"
                  >
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#6E685F]">{c.email}</p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                    c.status === "In Interview"
                      ? "bg-purple-100 text-purple-900 border-purple-300"
                      : c.status === "Waiting"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : c.status === "Completed"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                      : c.status === "No-show"
                      ? "bg-rose-100 text-rose-900 border-rose-300"
                      : "bg-blue-100 text-blue-900 border-blue-300"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              {/* Timing */}
              <div className="p-3 bg-[#F5F3EC] rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between text-[#24221F] font-semibold">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#7E5281]" />
                    <span>Scheduled:</span>
                  </span>
                  <span className="font-mono">{c.scheduled}</span>
                </div>
                {c.checkIn && (
                  <div className="flex items-center justify-between text-[11px] text-[#6E685F]">
                    <span>Checked in at:</span>
                    <span className="font-mono text-[#24221F] font-medium">{c.checkIn}</span>
                  </div>
                )}
              </div>

              {/* Interviewer */}
              <div className="flex items-center space-x-2 text-xs text-[#6E685F]">
                <UserCheck className="w-4 h-4 text-[#7E5281]" />
                <span>Interviewer: </span>
                <span className="font-semibold text-[#24221F]">{c.interviewer}</span>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-3 border-t border-[#F0EDE5] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {c.status !== "In Interview" && (
                  <button
                    onClick={() => handleStatusChange(c, "In Interview")}
                    className="py-2 bg-[#7E5281] hover:bg-[#68416B] text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Session</span>
                  </button>
                )}
                {c.status === "In Interview" && (
                  <button
                    onClick={() => handleStatusChange(c, "Completed")}
                    className="py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                )}
                <button
                  onClick={() => onSelectCandidate(c)}
                  className="py-2 bg-[#F5F3EC] hover:bg-[#E6E2D8] text-[#24221F] rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all border border-[#E6E2D8]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Drawer Profile</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#6E685F]">
                <span>Set status:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleStatusChange(c, "Waiting")}
                    className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold hover:opacity-80"
                  >
                    Waiting
                  </button>
                  <button
                    onClick={() => handleStatusChange(c, "No-show")}
                    className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-semibold hover:opacity-80"
                  >
                    No-show
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
