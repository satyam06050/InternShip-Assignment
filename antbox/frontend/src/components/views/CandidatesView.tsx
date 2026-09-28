"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Globe,
  FileText,
  Plus,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { Candidate, RoleType, CandidateStatus } from "@/lib/types";

interface CandidatesViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenAddModal: () => void;
  onUpdateCandidate: (updated: Candidate) => void;
}

const ROLE_BADGES: Record<RoleType, string> = {
  SDE: "bg-[#F4EBF5] text-[#7E5281] border-[#7E5281]/30",
  GTM: "bg-amber-50 text-amber-800 border-amber-200",
  OPN: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  candidates,
  onSelectCandidate,
  onOpenAddModal,
  onUpdateCandidate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | RoleType>("ALL");
  const [stageFilter, setStageFilter] = useState<"ALL" | CandidateStatus>("ALL");

  const filteredCandidates = candidates.filter((c) => {
    // Search match
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.skills.toLowerCase().includes(query) ||
      c.interviewer.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // Role filter
    if (roleFilter !== "ALL" && c.role !== roleFilter) return false;

    // Stage filter
    if (stageFilter !== "ALL" && c.status !== stageFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>ATS Candidate Database</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
            Executive Talent Pipeline
          </h1>
          <p className="text-xs text-[#6E685F] mt-1">
            Browse, filter, and evaluate candidates exclusively across SDE, GTM, and OPN roles.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2.5 bg-[#7E5281] hover:bg-[#68416B] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Candidate</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-white border border-[#E6E2D8] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#6E685F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, skills, interviewer..."
            className="w-full bg-[#F5F3EC] text-[#24221F] text-xs font-medium pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-[#7E5281] outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          {/* Role pills */}
          <div className="flex items-center space-x-1 bg-[#F5F3EC] p-1 rounded-xl border border-[#E6E2D8]">
            {(["ALL", "SDE", "GTM", "OPN"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  roleFilter === r
                    ? "bg-[#7E5281] text-white"
                    : "text-[#6E685F] hover:text-[#24221F]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Stage Dropdown */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as any)}
            className="bg-[#F5F3EC] text-[#24221F] text-xs font-semibold px-3 py-2 rounded-xl border border-[#E6E2D8] outline-none cursor-pointer"
          >
            <option value="ALL">All Stages</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Waiting">Waiting</option>
            <option value="In Interview">In Interview</option>
            <option value="Completed">Completed</option>
            <option value="No-show">No-show</option>
          </select>
        </div>
      </div>

      {/* Candidate Database Table */}
      <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F9F8F3] border-b border-[#E6E2D8] text-[#6E685F] font-semibold">
                <th className="p-4 pl-6">Candidate</th>
                <th className="p-4">Role</th>
                <th className="p-4">Experience / Source</th>
                <th className="p-4">Key Skills</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Interviewer</th>
                <th className="p-4">Links</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE5]">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#6E685F]">
                    No candidates found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCandidate(c)}
                    className="hover:bg-[#F5F3EC]/70 transition-colors cursor-pointer group"
                  >
                    {/* Candidate Name & Email */}
                    <td className="p-4 pl-6">
                      <div className="font-bold text-[#24221F] group-hover:text-[#7E5281] transition-colors text-sm">
                        {c.name}
                      </div>
                      <div className="text-[#6E685F] text-[11px]">{c.email}</div>
                    </td>

                    {/* Role */}
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded border ${
                          ROLE_BADGES[c.role]
                        }`}
                      >
                        {c.role}
                      </span>
                    </td>

                    {/* Experience */}
                    <td className="p-4 text-[#24221F]">
                      <div className="font-medium">{c.experience || "3.5 yrs"}</div>
                      <div className="text-[11px] text-[#6E685F]">{c.source || "Direct"}</div>
                    </td>

                    {/* Skills */}
                    <td className="p-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {c.skills
                          .split(",")
                          .slice(0, 3)
                          .map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-[#F5F3EC] border border-[#E6E2D8] rounded text-[10px] text-[#24221F]"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </td>

                    {/* Stage */}
                    <td className="p-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
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
                    </td>

                    {/* Interviewer */}
                    <td className="p-4 font-medium text-[#24221F]">{c.interviewer}</td>

                    {/* Links */}
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center space-x-2 text-[#6E685F]">
                        {c.github && (
                          <a
                            href={`https://${c.github}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#7E5281] transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {c.portfolio && (
                          <a
                            href={`https://${c.portfolio}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#7E5281] transition-colors"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {c.resume && (
                          <a
                            href={`https://${c.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#7E5281] transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => onSelectCandidate(c)}
                        className="px-3 py-1.5 bg-[#F5F3EC] hover:bg-[#7E5281] hover:text-white text-[#24221F] rounded-xl font-semibold transition-all border border-[#E6E2D8]"
                      >
                        View Drawer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
