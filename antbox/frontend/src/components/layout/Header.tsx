"use client";

import React from "react";
import { Search, Bell, Plus, RefreshCw, Calendar as CalendarIcon, Sparkles } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenScheduleModal: () => void;
  onSync: () => void;
  isSyncing: boolean;
  liveCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenScheduleModal,
  onSync,
  isSyncing,
  liveCount,
}) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E6E2D8] px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-[#6E685F] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search candidates, interviewers, roles..."
          className="w-full bg-[#F5F3EC] text-[#24221F] text-xs font-medium pl-9 pr-12 py-2 rounded-xl border border-transparent focus:border-[#7E5281] focus:bg-white outline-none transition-all placeholder:text-[#6E685F]"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-[#6E685F] bg-white border border-[#E6E2D8] rounded shadow-2xs pointer-events-none">
          ⌘K
        </kbd>
      </div>

      {/* Right Actions & Status */}
      <div className="flex items-center space-x-5">
        {/* Live Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#F4EBF5] border border-[#7E5281]/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7E5281] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7E5281]"></span>
          </span>
          <span className="text-xs font-semibold text-[#7E5281]">
            {liveCount} Live Now
          </span>
        </div>

        {/* Date Display */}
        <div className="hidden md:flex items-center space-x-1.5 text-xs text-[#6E685F] font-medium">
          <CalendarIcon className="w-3.5 h-3.5 text-[#6E685F]" />
          <span>{currentDate}</span>
        </div>

        {/* Sync Button */}
        <button
          onClick={onSync}
          disabled={isSyncing}
          className="p-2 rounded-xl border border-[#E6E2D8] hover:bg-[#F5F3EC] text-[#24221F] hover:text-[#7E5281] transition-all text-xs font-medium flex items-center space-x-1"
          title="Refresh Data from Google Sheet"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#7E5281]" : ""}`} />
          <span className="hidden sm:inline">Sync</span>
        </button>

        {/* Schedule Action Button */}
        <button
          onClick={onOpenScheduleModal}
          className="px-3.5 py-2 bg-[#7E5281] hover:bg-[#68416B] text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm active:scale-98"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Interview</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl border border-[#E6E2D8] hover:bg-[#F5F3EC] text-[#6E685F] hover:text-[#24221F] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7E5281] rounded-full border border-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l border-[#E6E2D8] pl-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Sarah Jenkins"
            className="w-8 h-8 rounded-full object-cover border border-[#7E5281]"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-[#24221F]">Sarah Jenkins</p>
            <p className="text-[10px] text-[#6E685F]">Head of Talent</p>
          </div>
        </div>
      </div>
    </header>
  );
};
