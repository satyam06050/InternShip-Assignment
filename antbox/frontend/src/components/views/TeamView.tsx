"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Star, Calendar, Mail, Shield, CheckCircle2, Video } from "lucide-react";
import { TeamMember, RoleType } from "@/lib/types";

interface TeamViewProps {
  team: TeamMember[];
}

const ROLE_BADGES: Record<RoleType, string> = {
  SDE: "bg-[#F4EBF5] text-[#7E5281] border-[#7E5281]/30",
  GTM: "bg-amber-50 text-amber-800 border-amber-200",
  OPN: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export const TeamView: React.FC<TeamViewProps> = ({ team }) => {
  const [typeFilter, setTypeFilter] = useState<"ALL" | "Interviewer" | "Recruiter" | "Hiring Manager">("ALL");

  const filteredTeam = team.filter((member) => {
    if (typeFilter !== "ALL" && member.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Hiring Team Operations</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
            Executive Interviewers & Recruiters
          </h1>
          <p className="text-xs text-[#6E685F] mt-1">
            Manage interviewer capacity, SDE/GTM/OPN coverage, and active weekly workload.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-[#E6E2D8]">
          {(["ALL", "Interviewer", "Recruiter", "Hiring Manager"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                typeFilter === t
                  ? "bg-[#7E5281] text-white"
                  : "text-[#6E685F] hover:text-[#24221F]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeam.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -3 }}
            className="p-6 bg-white border border-[#E6E2D8] hover:border-[#7E5281]/50 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between transition-all"
          >
            <div className="space-y-4">
              {/* Member Header */}
              <div className="flex items-start space-x-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#7E5281]/30 shadow-2xs"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#24221F]">{member.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        member.availability === "In Session"
                          ? "bg-purple-100 text-purple-900 border border-purple-300"
                          : member.availability === "Available"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {member.availability}
                    </span>
                  </div>
                  <p className="text-xs text-[#7E5281] font-semibold">{member.title}</p>
                  <p className="text-[11px] text-[#6E685F] flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-[#6E685F]" />
                    <span>{member.email}</span>
                  </p>
                </div>
              </div>

              {/* Coverage Badges */}
              <div className="space-y-1.5 pt-2 border-t border-[#F0EDE5]">
                <span className="text-[10px] text-[#6E685F] uppercase font-semibold">
                  Coverage Scope
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.rolesCovered.map((role) => (
                    <span
                      key={role}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ROLE_BADGES[role]}`}
                    >
                      {role} Certified
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-[#F5F3EC] p-3 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#6E685F] block">This Week</span>
                  <span className="font-bold font-mono text-[#24221F]">
                    {member.interviewsThisWeek}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6E685F] block">Total</span>
                  <span className="font-bold font-mono text-[#24221F]">{member.interviewsTotal}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6E685F] block">Rating</span>
                  <span className="font-bold font-mono text-[#7E5281] flex items-center justify-center space-x-0.5">
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                    <span>{member.avgRating}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-[#F0EDE5] flex items-center space-x-2">
              <button className="flex-1 py-2 bg-[#7E5281] hover:bg-[#68416B] text-white rounded-xl text-xs font-semibold transition-all">
                Assign Candidate
              </button>
              <button className="p-2 bg-[#F5F3EC] hover:bg-[#E6E2D8] text-[#24221F] rounded-xl text-xs font-semibold transition-all border border-[#E6E2D8]">
                <Calendar className="w-4 h-4 text-[#6E685F]" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
