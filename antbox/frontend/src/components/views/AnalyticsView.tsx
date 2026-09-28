"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Sparkles } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";
import { Candidate, RoleType } from "@/lib/types";

interface AnalyticsViewProps {
  candidates: Candidate[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ candidates }) => {
  // Compute Role Distribution dynamically from live candidates
  const sdeCount = candidates.filter((c) => c.role === "SDE").length;
  const gtmCount = candidates.filter((c) => c.role === "GTM").length;
  const opnCount = candidates.filter((c) => c.role === "OPN").length;

  const roleDistribution = [
    { name: "SDE", value: sdeCount || 1, color: "#7E5281" },
    { name: "GTM", value: gtmCount || 1, color: "#D97706" },
    { name: "OPN", value: opnCount || 1, color: "#059669" },
  ];

  // Compute Stage Funnel dynamically from live candidates
  const scheduledCount = candidates.filter((c) => c.status === "Scheduled").length;
  const waitingCount = candidates.filter((c) => c.status === "Waiting").length;
  const inInterviewCount = candidates.filter((c) => c.status === "In Interview").length;
  const completedCount = candidates.filter((c) => c.status === "Completed").length;

  const funnelData = [
    { stage: "Total Tracked", count: candidates.length },
    { stage: "Scheduled", count: scheduledCount },
    { stage: "Waiting Lobby", count: waitingCount },
    { stage: "In Interview", count: inInterviewCount },
    { stage: "Completed", count: completedCount },
  ];

  // Compute Interviewer Workload dynamically
  const workloadMap = new Map<string, number>();
  candidates.forEach((c) => {
    if (c.interviewer && c.interviewer !== "Unassigned") {
      workloadMap.set(c.interviewer, (workloadMap.get(c.interviewer) || 0) + 1);
    }
  });

  const workloadData = Array.from(workloadMap.entries()).map(([interviewer, count]) => ({
    interviewer,
    interviews: count,
  }));

  // Conversion data by role
  const conversionData = (["SDE", "GTM", "OPN"] as RoleType[]).map((r) => {
    const roleCandidates = candidates.filter((c) => c.role === r);
    const completed = roleCandidates.filter((c) => c.status === "Completed").length;
    const total = roleCandidates.length || 1;
    return {
      role: r,
      total,
      completed,
      completionRate: Math.round((completed / total) * 100),
    };
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Live Analytics</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
            Interview Telemetry (Live Sheet Data)
          </h1>
          <p className="text-xs text-[#6E685F] mt-1">
            Calculated in real-time from API endpoint: <code className="font-mono text-[#7E5281]">http://127.0.0.1:8000/api/data</code>
          </p>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E6E2D8] space-y-1 shadow-2xs">
          <span className="text-xs text-[#6E685F] font-semibold">Total Candidates Streamed</span>
          <div className="text-2xl font-bold text-[#24221F] font-mono">{candidates.length}</div>
          <p className="text-[11px] text-[#7E5281] font-medium">Live from Google Sheets</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E6E2D8] space-y-1 shadow-2xs">
          <span className="text-xs text-[#6E685F] font-semibold">Completed Interviews</span>
          <div className="text-2xl font-bold text-[#24221F] font-mono">{completedCount}</div>
          <p className="text-[11px] text-emerald-600 font-medium">Concluded rounds</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E6E2D8] space-y-1 shadow-2xs">
          <span className="text-xs text-[#6E685F] font-semibold">In Interview (Active)</span>
          <div className="text-2xl font-bold text-[#24221F] font-mono">{inInterviewCount}</div>
          <p className="text-[11px] text-purple-700 font-medium">Live sessions running</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E6E2D8] space-y-1 shadow-2xs">
          <span className="text-xs text-[#6E685F] font-semibold">Active Interviewers</span>
          <div className="text-2xl font-bold text-[#24221F] font-mono">{workloadData.length}</div>
          <p className="text-[11px] text-[#6E685F]">Assigned in sheet</p>
        </div>
      </div>

      {/* Grid of Live Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Stage Funnel */}
        <div className="p-6 bg-white rounded-2xl border border-[#E6E2D8] space-y-4 shadow-2xs">
          <h3 className="text-base font-bold font-editorial text-[#24221F]">
            1. Pipeline Stage Breakdown
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE5" />
                <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#6E685F" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6E685F" }} />
                <Tooltip />
                <Bar dataKey="count" fill="#7E5281" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. SDE / GTM / OPN Distribution */}
        <div className="p-6 bg-white rounded-2xl border border-[#E6E2D8] space-y-4 shadow-2xs">
          <h3 className="text-base font-bold font-editorial text-[#24221F]">
            2. Live Role Breakdown (SDE, GTM, OPN)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Conversion by Role */}
        <div className="p-6 bg-white rounded-2xl border border-[#E6E2D8] space-y-4 shadow-2xs">
          <h3 className="text-base font-bold font-editorial text-[#24221F]">
            3. Candidates vs Completed by Role
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE5" />
                <XAxis dataKey="role" tick={{ fontSize: 11, fill: "#6E685F" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6E685F" }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="total" name="Total Candidates" fill="#7E5281" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Interviewer Workload */}
        <div className="p-6 bg-white rounded-2xl border border-[#E6E2D8] space-y-4 shadow-2xs">
          <h3 className="text-base font-bold font-editorial text-[#24221F]">
            4. Live Interviewer Workload
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE5" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#6E685F" }} />
                <YAxis dataKey="interviewer" type="category" tick={{ fontSize: 11, fill: "#6E685F" }} width={100} />
                <Tooltip />
                <Bar dataKey="interviews" name="Sessions Assigned" fill="#D97706" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
