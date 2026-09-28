"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowUpRight,
  UserCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Candidate, RoleType } from "@/lib/types";

interface OverviewViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onNavigateToTab: (tab: any) => void;
}

const ROLE_BADGES: Record<RoleType, string> = {
  SDE: "bg-[#F4EBF5] text-[#7E5281] border-[#7E5281]/30",
  GTM: "bg-amber-50 text-amber-800 border-amber-200",
  OPN: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  candidates,
  onSelectCandidate,
  onNavigateToTab,
}) => {
  const totalCount = candidates.length;
  const liveCandidates = candidates.filter((c) => c.status === "In Interview");
  const waitingCandidates = candidates.filter((c) => c.status === "Waiting");
  const completedCandidates = candidates.filter((c) => c.status === "Completed");
  const scheduledToday = candidates.filter((c) => c.status === "Scheduled");

  const kpis = [
    {
      title: "Total Candidates",
      value: totalCount,
      subtext: "Across active pipeline",
      icon: Users,
      color: "text-[#7E5281]",
      bg: "bg-[#F4EBF5]",
    },
    {
      title: "Interviews Today",
      value: candidates.length,
      subtext: "Scheduled for Sep 28",
      icon: Calendar,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: "Live Now",
      value: liveCandidates.length,
      subtext: "Sessions currently active",
      icon: Video,
      color: "text-purple-700",
      bg: "bg-purple-50",
      highlight: true,
    },
    {
      title: "Waiting in Lobby",
      value: waitingCandidates.length,
      subtext: "Ready for interviewer check-in",
      icon: Clock,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: "Completed Today",
      value: completedCandidates.length,
      subtext: "Concluded interviews",
      icon: CheckCircle2,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Command Center</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
            Interview Intelligence Overview
          </h1>
          <p className="text-xs text-[#6E685F] mt-1">
            Real-time telemetry for high-stakes SDE, GTM, and OPN hiring rounds.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateToTab("interviews")}
            className="px-4 py-2 bg-[#7E5281] hover:bg-[#68416B] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
          >
            <span>View Live Sessions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-5 rounded-2xl bg-white border border-[#E6E2D8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2 relative overflow-hidden hover:border-[#7E5281]/40 transition-all ${
                kpi.highlight ? "ring-2 ring-[#7E5281]/20" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6E685F]">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-[#24221F] font-mono tracking-tight">
                {kpi.value}
              </div>
              <p className="text-[11px] text-[#6E685F]">{kpi.subtext}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Live Active Interviews Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7E5281] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7E5281]"></span>
            </span>
            <h2 className="text-xl font-bold font-editorial text-[#24221F]">
              Live Active Interview Sessions
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab("interviews")}
            className="text-xs font-semibold text-[#7E5281] hover:underline"
          >
            View All ({liveCandidates.length}) →
          </button>
        </div>

        {liveCandidates.length === 0 ? (
          <div className="p-8 bg-white border border-[#E6E2D8] rounded-2xl text-center text-xs text-[#6E685F]">
            No live interviews in progress right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveCandidates.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -2 }}
                className="p-6 bg-white border border-[#7E5281]/30 rounded-2xl shadow-sm space-y-4 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          ROLE_BADGES[c.role]
                        }`}
                      >
                        {c.role}
                      </span>
                      <span className="text-xs font-mono text-purple-700 font-bold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                        <span>Live • 24m elapsed</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#24221F]">{c.name}</h3>
                    <p className="text-xs text-[#6E685F]">{c.email}</p>
                  </div>
                  <button
                    onClick={() => onSelectCandidate(c)}
                    className="px-3 py-1.5 bg-[#F5F3EC] hover:bg-[#7E5281] hover:text-white rounded-xl text-xs font-semibold text-[#24221F] transition-colors"
                  >
                    Drawer Profile
                  </button>
                </div>

                {/* Progress bar (0 - 45 mins) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#6E685F]">
                    <span>Progress (24m / 45m)</span>
                    <span className="font-mono text-[#7E5281]">53%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F5F3EC] rounded-full overflow-hidden border border-[#E6E2D8]">
                    <div className="h-full bg-[#7E5281] rounded-full w-[53%] transition-all duration-500" />
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F0EDE5] text-xs">
                  <div className="flex items-center space-x-2 text-[#6E685F]">
                    <UserCheck className="w-3.5 h-3.5 text-[#7E5281]" />
                    <span>Interviewer: </span>
                    <span className="font-semibold text-[#24221F]">{c.interviewer}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectCandidate(c)}
                      className="px-3 py-1.5 bg-[#7E5281] text-white rounded-xl font-semibold text-xs flex items-center space-x-1 hover:bg-[#68416B] transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Join Room</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Today's Schedule Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-editorial text-[#24221F]">
            Today's Interview Schedule
          </h2>
          <span className="text-xs text-[#6E685F] font-mono">
            {candidates.length} Total Sessions Scheduled
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-2xs">
          <div className="divide-y divide-[#F0EDE5]">
            {candidates.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCandidate(c)}
                className="p-4 hover:bg-[#F5F3EC]/70 transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 text-xs font-mono font-bold text-[#7E5281] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{c.scheduled}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#24221F] group-hover:text-[#7E5281] transition-colors">
                        {c.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          ROLE_BADGES[c.role]
                        }`}
                      >
                        {c.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E685F] mt-0.5">
                      Interviewer: <span className="font-medium text-[#24221F]">{c.interviewer}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-xl ${
                      c.status === "In Interview"
                        ? "bg-purple-100 text-purple-900 border border-purple-300"
                        : c.status === "Waiting"
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : c.status === "Completed"
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-blue-100 text-blue-900 border border-blue-300"
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-xs font-semibold text-[#7E5281] group-hover:translate-x-1 transition-transform">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
