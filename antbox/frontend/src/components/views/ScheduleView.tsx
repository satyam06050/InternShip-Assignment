"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { Candidate, RoleType } from "@/lib/types";

interface ScheduleViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenScheduleModal: () => void;
}

type ViewType = "Day" | "Week" | "Month";

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
];

const DAYS = ["Monday (Today)", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ROLE_ACCENT: Record<RoleType, { bg: string; text: string; border: string }> = {
  SDE: { bg: "bg-[#F4EBF5]", text: "text-[#7E5281]", border: "border-[#7E5281]" },
  GTM: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-500" },
  OPN: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-500" },
};

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  candidates,
  onSelectCandidate,
  onOpenScheduleModal,
}) => {
  const [viewType, setViewType] = useState<ViewType>("Day");

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendar Ops</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
            Interview Schedule Matrix
          </h1>
          <p className="text-xs text-[#6E685F] mt-1">
            Visual calendar view of all SDE, GTM, and OPN executive interview slots.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Switcher */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-[#E6E2D8]">
            {(["Day", "Week", "Month"] as ViewType[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewType(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewType === v
                    ? "bg-[#7E5281] text-white shadow-2xs"
                    : "text-[#6E685F] hover:text-[#24221F]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenScheduleModal}
            className="px-4 py-2.5 bg-[#7E5281] hover:bg-[#68416B] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Slot</span>
          </button>
        </div>
      </div>

      {/* Date Navigation Toolbar */}
      <div className="p-4 bg-white border border-[#E6E2D8] rounded-2xl flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-[#F5F3EC] rounded-xl text-[#6E685F] border border-[#E6E2D8]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-[#24221F]">Monday, Sep 28, 2026</span>
          <button className="p-1.5 hover:bg-[#F5F3EC] rounded-xl text-[#6E685F] border border-[#E6E2D8]">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 bg-[#F5F3EC] text-[#7E5281] text-xs font-semibold rounded-xl border border-[#E6E2D8]">
            Today
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#7E5281]" />
            <span className="text-[#6E685F]">SDE</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[#6E685F]">GTM</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-[#6E685F]">OPN</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid (Day / Week View) */}
      <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-2xs">
        {viewType === "Month" ? (
          <div className="p-12 text-center text-xs text-[#6E685F]">
            Monthly overview grid active. Switch to Day or Week for high-resolution timetable.
          </div>
        ) : (
          <div className="divide-y divide-[#F0EDE5]">
            {TIME_SLOTS.map((slot) => {
              const matchedCandidates = candidates.filter(
                (c) => c.scheduled.toLowerCase() === slot.toLowerCase()
              );

              return (
                <div key={slot} className="flex min-h-[72px]">
                  {/* Time Label */}
                  <div className="w-28 p-4 bg-[#F9F8F3] border-r border-[#E6E2D8] flex items-center justify-center text-xs font-mono font-bold text-[#6E685F]">
                    {slot}
                  </div>

                  {/* Slot Cards Area */}
                  <div className="flex-1 p-3 flex flex-wrap gap-3 items-center">
                    {matchedCandidates.length === 0 ? (
                      <span className="text-[11px] text-[#6E685F]/50 italic pl-2">Available</span>
                    ) : (
                      matchedCandidates.map((c) => {
                        const style = ROLE_ACCENT[c.role];
                        return (
                          <motion.div
                            key={c.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => onSelectCandidate(c)}
                            className={`p-3 rounded-xl border-l-4 ${style.border} ${style.bg} border border-[#E6E2D8] shadow-2xs cursor-pointer flex items-center space-x-4 transition-all max-w-md w-full`}
                          >
                            <div className="space-y-0.5 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-[#24221F]">{c.name}</span>
                                <span className={`text-[10px] font-bold ${style.text}`}>
                                  {c.role}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#6E685F] flex items-center space-x-1">
                                <UserCheck className="w-3 h-3 text-[#7E5281]" />
                                <span>Interviewer: {c.interviewer}</span>
                              </p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#24221F] border border-[#E6E2D8]">
                              {c.status}
                            </span>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
