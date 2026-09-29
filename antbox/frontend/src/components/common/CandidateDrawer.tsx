"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Globe,
  FileText,
  Clock,
  UserCheck,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles,
  Save,
  User,
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { Candidate, CandidateStatus, RoleType } from "@/lib/types";

interface CandidateDrawerProps {
  candidate: Candidate | null;
  onClose: () => void;
  onUpdateCandidate: (updated: Candidate) => void;
}

const ROLE_COLORS: Record<RoleType, { bg: string; text: string; border: string }> = {
  SDE: { bg: "bg-[#F4EBF5]", text: "text-[#7E5281]", border: "border-[#7E5281]/30" },
  GTM: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  OPN: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
};

const STATUS_COLORS: Record<CandidateStatus, { bg: string; text: string }> = {
  "In Interview": { bg: "bg-purple-100 text-purple-900 border-purple-300", text: "text-purple-900" },
  Waiting: { bg: "bg-amber-100 text-amber-900 border-amber-300", text: "text-amber-900" },
  Scheduled: { bg: "bg-blue-100 text-blue-900 border-blue-300", text: "text-blue-900" },
  Completed: { bg: "bg-emerald-100 text-emerald-900 border-emerald-300", text: "text-emerald-900" },
  "No-show": { bg: "bg-rose-100 text-rose-900 border-rose-300", text: "text-rose-900" },
};

export const CandidateDrawer: React.FC<CandidateDrawerProps> = ({
  candidate,
  onClose,
  onUpdateCandidate,
}) => {
  const [notes, setNotes] = useState(candidate?.notes || "");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (candidate) {
      setNotes(candidate.notes || "");
    }
  }, [candidate]);

  if (!candidate) return null;

  const roleStyle = ROLE_COLORS[candidate.role];

  const handleStatusChange = (newStatus: CandidateStatus) => {
    const updated = {
      ...candidate,
      status: newStatus,
      checkIn: newStatus === "In Interview" && !candidate.checkIn ? "10:30 AM" : candidate.checkIn,
      checkOut: newStatus === "Completed" && !candidate.checkOut ? "11:15 AM" : candidate.checkOut,
    };
    onUpdateCandidate(updated);
  };

  const handleSaveNotes = () => {
    onUpdateCandidate({ ...candidate, notes });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />

        {/* Right Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-white border-l border-[#E6E2D8] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#F0EDE5] bg-[#F9F8F3]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}
                    >
                      {candidate.role} Candidate
                    </span>
                    <span className="text-xs text-[#6E685F] font-mono">{candidate.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold font-editorial text-[#24221F] mt-2">
                    {candidate.name}
                  </h2>
                  <p className="text-xs text-[#6E685F] font-medium mt-0.5">{candidate.email}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-[#E6E2D8]/50 text-[#6E685F] hover:text-[#24221F] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Updater */}
              <div className="mt-4 pt-3 border-t border-[#E6E2D8]/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6E685F]">Current Stage:</span>
                <select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(e.target.value as CandidateStatus)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition-all ${
                    STATUS_COLORS[candidate.status].bg
                  }`}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Waiting">Waiting</option>
                  <option value="In Interview">In Interview</option>
                  <option value="Completed">Completed</option>
                  <option value="No-show">No-show</option>
                </select>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Interview Timing Card */}
              <div className="p-4 bg-[#F5F3EC] rounded-2xl border border-[#E6E2D8] space-y-2">
                <div className="flex items-center justify-between text-[#24221F] font-semibold">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#7E5281]" />
                    <span>Scheduled Session</span>
                  </span>
                  <span className="text-xs font-mono font-bold">{candidate.scheduled}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-white p-2 rounded-xl border border-[#E6E2D8]">
                    <span className="text-[#6E685F]">Check-in: </span>
                    <span className="font-semibold text-[#24221F]">
                      {candidate.checkIn || "Not checked in"}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#E6E2D8]">
                    <span className="text-[#6E685F]">Check-out: </span>
                    <span className="font-semibold text-[#24221F]">
                      {candidate.checkOut || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interviewer & Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-[#E6E2D8] rounded-xl space-y-1">
                  <span className="text-[#6E685F] text-[10px] uppercase font-semibold">
                    Assigned Interviewer
                  </span>
                  <p className="font-bold text-[#24221F] text-xs flex items-center space-x-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#7E5281]" />
                    <span>{candidate.interviewer}</span>
                  </p>
                </div>
                <div className="p-3 bg-white border border-[#E6E2D8] rounded-xl space-y-1">
                  <span className="text-[#6E685F] text-[10px] uppercase font-semibold">
                    Experience / Source
                  </span>
                  <p className="font-bold text-[#24221F] text-xs">
                    {candidate.experience || "3.5 yrs"} • {candidate.source || "Direct"}
                  </p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <h4 className="font-semibold text-[#24221F] text-xs">Technical Skills & Competencies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#F5F3EC] border border-[#E6E2D8] rounded-lg font-medium text-[#24221F]"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#24221F] text-xs">Candidate Profiles & Links</h4>
                <div className="flex flex-wrap gap-2 *:flex-1 *:basis-[80px]">
                  {candidate.github && (
                    <a
                      href={`https://${candidate.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white border border-[#E6E2D8] hover:border-[#7E5281] rounded-xl flex items-center justify-center space-x-1.5 text-[#24221F] hover:text-[#7E5281] font-medium transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {candidate.portfolio && (
                    <a
                      href={`https://${candidate.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white border border-[#E6E2D8] hover:border-[#7E5281] rounded-xl flex items-center justify-center space-x-1.5 text-[#24221F] hover:text-[#7E5281] font-medium transition-all"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Portfolio</span>
                    </a>
                  )}
                  {candidate.resume && (
                    <a
                      href={`https://${candidate.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white border border-[#E6E2D8] hover:border-[#7E5281] rounded-xl flex items-center justify-center space-x-1.5 text-[#24221F] hover:text-[#7E5281] font-medium transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </a>
                  )}
                  <Link
                    href={`/candidates/${candidate.id}`}
                    className="p-2.5 bg-white border border-[#E6E2D8] hover:border-[#7E5281] rounded-xl flex items-center justify-center space-x-1.5 text-[#24221F] hover:text-[#7E5281] font-medium transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Profile</span>
                  </Link>
                </div>
              </div>

              {/* Editable Notes Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[#24221F] text-xs">Interviewer Notes</h4>
                  {isSaved && (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Saved!</span>
                    </span>
                  )}
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add evaluation notes..."
                  className="w-full bg-[#F9F8F3] text-[#24221F] text-xs p-3 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none transition-all resize-none"
                />
                <button
                  onClick={handleSaveNotes}
                  className="w-full py-2 bg-[#F5F3EC] hover:bg-[#7E5281] hover:text-white text-[#24221F] rounded-xl font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all border border-[#E6E2D8]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Candidate Notes</span>
                </button>
              </div>
            </div>

            {/* Footer Quick Actions */}
            <div className="p-4 border-t border-[#F0EDE5] bg-[#F9F8F3] flex items-center space-x-3">
              <button
                onClick={() => handleStatusChange("In Interview")}
                className="flex-1 py-2.5 bg-[#7E5281] hover:bg-[#68416B] text-white rounded-xl font-semibold text-xs transition-all shadow-sm"
              >
                Start Interview Now
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-white border border-[#E6E2D8] text-[#24221F] hover:bg-[#F5F3EC] rounded-xl font-semibold text-xs transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
