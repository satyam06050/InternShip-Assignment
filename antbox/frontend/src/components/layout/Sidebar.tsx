"use client";

import React from "react";
import {
  LayoutDashboard,
  Video,
  Users,
  Calendar,
  BarChart3,
  UserCheck,
  Settings,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";

export type NavTab =
  | "overview"
  | "interviews"
  | "candidates"
  | "schedule"
  | "analytics"
  | "team"
  | "settings";

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isSyncing: boolean;
  onSync: () => void;
  candidateCount: number;
}

const NAV_ITEMS: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "interviews", label: "Interviews", icon: Video, badge: "Live" },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "team", label: "Team", icon: UserCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isSyncing,
  onSync,
  candidateCount,
}) => {
  return (
    <aside className="w-64 bg-[#FFFFFF] border-r border-[#E6E2D8] flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Top Header & Branding */}
      <div>
        <div className="p-6 border-b border-[#F0EDE5]">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7E5281] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              X
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-[#24221F]">AntX</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F4EBF5] text-[#7E5281] uppercase tracking-wider">
                  Exec
                </span>
              </div>
              <p className="text-xs text-[#6E685F] font-serif italic">Interview Intelligence</p>
            </div>
          </div>
        </div>

        {/* Scope Tag */}
        <div className="px-6 py-3 bg-[#F9F8F3] border-b border-[#F0EDE5] flex items-center justify-between text-[11px] font-medium text-[#6E685F]">
          <span>Coverage Scope:</span>
          <div className="flex space-x-1">
            <span className="px-1.5 py-0.5 bg-white border border-[#E6E2D8] rounded text-[#7E5281] font-bold">
              SDE
            </span>
            <span className="px-1.5 py-0.5 bg-white border border-[#E6E2D8] rounded text-[#B45309] font-bold">
              GTM
            </span>
            <span className="px-1.5 py-0.5 bg-white border border-[#E6E2D8] rounded text-[#15803D] font-bold">
              OPN
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#7E5281] text-white shadow-sm"
                    : "text-[#24221F] hover:bg-[#F5F3EC] hover:text-[#7E5281]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-[#6E685F]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.id === "candidates" && candidateCount > 0 && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-[#F4EBF5] text-[#7E5281]"
                    }`}
                  >
                    {candidateCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom API Endpoint Widget */}
      <div className="p-4 border-t border-[#F0EDE5]">
        <div className="p-3 bg-[#F9F8F3] rounded-xl border border-[#E6E2D8] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#24221F]">
              <FileSpreadsheet className="w-4 h-4 text-[#15803D]" />
              <span>Google Sheet API</span>
            </div>
            <button
              onClick={onSync}
              disabled={isSyncing}
              title="Sync with http://127.0.0.1:8000/api/data"
              className="p-1 hover:bg-white rounded-md text-[#6E685F] hover:text-[#7E5281] transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#7E5281]" : ""}`}
              />
            </button>
          </div>

          <div className="space-y-1 text-[11px] text-[#6E685F]">
            <div className="flex items-center space-x-1.5 font-mono text-[10px] text-[#24221F]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate">127.0.0.1:8000/api/data</span>
            </div>
            <p className="text-[10px] text-[#6E685F]">Single source of truth</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
