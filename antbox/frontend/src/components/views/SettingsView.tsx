"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  FileSpreadsheet,
  Shield,
  Bell,
  Palette,
  RefreshCw,
  Lock,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { API_URL } from "@/lib/api";

interface SettingsViewProps {
  isSyncing: boolean;
  onSync: () => void;
  candidateCount: number;
  apiError?: string | null;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isSyncing,
  onSync,
  candidateCount,
  apiError,
}) => {
  const [activeSection, setActiveSection] = useState<
    "general" | "sheets" | "roles" | "notifications" | "permissions" | "appearance"
  >("sheets");

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#E6E2D8] pb-6">
        <div className="flex items-center space-x-2 text-xs text-[#7E5281] font-semibold uppercase tracking-wider">
          <Settings className="w-3.5 h-3.5" />
          <span>API & Platform Config</span>
        </div>
        <h1 className="text-3xl font-bold font-editorial text-[#24221F] mt-1">
          AntX Settings & API Endpoint
        </h1>
        <p className="text-xs text-[#6E685F] mt-1">
          Configured strictly to fetch from: <code className="font-mono text-[#7E5281]">{API_URL}</code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          {[
            { id: "sheets", label: "Google Sheets API", icon: FileSpreadsheet },
            { id: "roles", label: "Roles & Stages", icon: Layers },
            { id: "general", label: "General Settings", icon: Settings },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "permissions", label: "Team Permissions", icon: Shield },
            { id: "appearance", label: "Appearance", icon: Palette },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#7E5281] text-white shadow-2xs"
                    : "bg-white text-[#24221F] border border-[#E6E2D8] hover:border-[#7E5281]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#6E685F]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* SECTION: Google Sheets Sync */}
          {activeSection === "sheets" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 bg-white rounded-2xl border border-[#E6E2D8] space-y-6 shadow-2xs"
            >
              <div className="flex items-center justify-between border-b border-[#F0EDE5] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#24221F]">Primary REST API Endpoint</h3>
                    <p className="text-xs text-[#6E685F]">Google Sheets API Backend Integration</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!apiError ? (
                    <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>API Connected ({candidateCount} rows)</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>API Offline</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Sync Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#F5F3EC] rounded-xl border border-[#E6E2D8] space-y-1">
                  <span className="text-[#6E685F] text-[11px]">Strict API URL</span>
                  <p className="font-mono font-bold text-[#7E5281] break-all">{API_URL}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-1 pt-1">
                    <Lock className="w-3 h-3" />
                    <span>No mock data permitted</span>
                  </p>
                </div>

                <div className="p-4 bg-[#F5F3EC] rounded-xl border border-[#E6E2D8] space-y-1">
                  <span className="text-[#6E685F] text-[11px]">Backend Architecture</span>
                  <p className="font-mono font-bold text-[#24221F]">FastAPI + gspread + Google Auth</p>
                  <p className="text-[10px] text-[#6E685F] pt-1">Single source of truth: Google Sheets</p>
                </div>
              </div>

              {/* Manual Trigger */}
              <div className="pt-4 border-t border-[#F0EDE5] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#24221F]">Manual Refetch</h4>
                  <p className="text-[#6E685F]">Fetch live records from http://127.0.0.1:8000/api/data</p>
                </div>
                <button
                  onClick={onSync}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-[#7E5281] hover:bg-[#68416B] text-white font-semibold rounded-xl transition-all shadow-2xs flex items-center space-x-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>Fetch Now</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SECTION: Roles & Stages */}
          {activeSection === "roles" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 bg-white rounded-2xl border border-[#E6E2D8] space-y-6 shadow-2xs"
            >
              <div>
                <h3 className="text-lg font-bold text-[#24221F]">Strict Executive Roles</h3>
                <p className="text-xs text-[#6E685F]">
                  AntX restricts interview intelligence strictly to SDE, GTM, and OPN tracks.
                </p>
              </div>

              <div className="p-4 bg-[#F9F8F3] rounded-2xl border border-[#E6E2D8] space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white border border-[#7E5281]/30 rounded-xl space-y-1">
                    <span className="font-bold text-[#7E5281]">SDE</span>
                    <p className="text-[11px] text-[#6E685F]">Software Development Engineer</p>
                  </div>
                  <div className="p-3 bg-white border border-amber-300 rounded-xl space-y-1">
                    <span className="font-bold text-amber-800">GTM</span>
                    <p className="text-[11px] text-[#6E685F]">Go-To-Market & Growth</p>
                  </div>
                  <div className="p-3 bg-white border border-emerald-300 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-800">OPN</span>
                    <p className="text-[11px] text-[#6E685F]">Operations & Supply Chain</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
