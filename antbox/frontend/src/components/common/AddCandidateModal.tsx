"use client";

import React, { useState } from "react";
import { X, UserPlus, Sparkles } from "lucide-react";
import { Candidate, RoleType, CandidateStatus } from "@/lib/types";

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCandidate: (candidate: Candidate) => void;
}

export const AddCandidateModal: React.FC<AddCandidateModalProps> = ({
  isOpen,
  onClose,
  onAddCandidate,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RoleType>("SDE");
  const [interviewer, setInterviewer] = useState("Rahul Mehta");
  const [scheduled, setScheduled] = useState("01:00 PM");
  const [skills, setSkills] = useState("React, TypeScript, System Design");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<CandidateStatus>("Scheduled");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      role,
      status,
      scheduled,
      checkIn: "",
      checkOut: "",
      interviewer,
      skills,
      github: `github.com/${name.toLowerCase().replace(/\s+/g, "")}`,
      portfolio: `${name.toLowerCase().replace(/\s+/g, "")}.dev`,
      resume: `drive.google.com/resume/${name.toLowerCase().replace(/\s+/g, "")}`,
      notes: notes || "Direct entry candidate.",
      experience: "4.0 yrs",
      source: "Manual Entry",
    };

    onAddCandidate(newCandidate);
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#F0EDE5] bg-[#F9F8F3] flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-editorial text-[#24221F]">Add New Candidate</h3>
            <p className="text-xs text-[#6E685F]">Register executive talent into AntX ATS pipeline</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#E6E2D8]/50 text-[#6E685F] hover:text-[#24221F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#24221F] mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sen"
                className="w-full bg-[#F5F3EC] p-2.5 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#24221F] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full bg-[#F5F3EC] p-2.5 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#24221F] mb-1">
              Role (SDE, GTM, OPN Only) *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["SDE", "GTM", "OPN"] as RoleType[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-xl font-bold border transition-all text-xs ${
                    role === r
                      ? "bg-[#7E5281] text-white border-[#7E5281]"
                      : "bg-[#F5F3EC] text-[#24221F] border-[#E6E2D8] hover:border-[#7E5281]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#24221F] mb-1">Interviewer</label>
              <input
                type="text"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                className="w-full bg-[#F5F3EC] p-2.5 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#24221F] mb-1">Scheduled Time</label>
              <input
                type="text"
                value={scheduled}
                onChange={(e) => setScheduled(e.target.value)}
                className="w-full bg-[#F5F3EC] p-2.5 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#24221F] mb-1">Technical Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Next.js, Python, Strategy"
              className="w-full bg-[#F5F3EC] p-2.5 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#24221F] mb-1">Initial Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Background context..."
              className="w-full bg-[#F5F3EC] p-2.5 rounded-xl border border-[#E6E2D8] focus:border-[#7E5281] outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#F0EDE5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white border border-[#E6E2D8] text-[#24221F] hover:bg-[#F5F3EC] rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#7E5281] hover:bg-[#68416B] text-white rounded-xl font-semibold transition-all shadow-sm flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Candidate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
