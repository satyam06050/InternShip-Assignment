"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, NavTab } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CandidateDrawer } from "@/components/common/CandidateDrawer";
import { ScheduleModal } from "@/components/common/ScheduleModal";
import { AddCandidateModal } from "@/components/common/AddCandidateModal";

import { OverviewView } from "@/components/views/OverviewView";
import { InterviewsView } from "@/components/views/InterviewsView";
import { CandidatesView } from "@/components/views/CandidatesView";
import { ScheduleView } from "@/components/views/ScheduleView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { TeamView } from "@/components/views/TeamView";
import { SettingsView } from "@/components/views/SettingsView";

import { Candidate, TeamMember } from "@/lib/types";
import { fetchCandidatesFromApi, deriveTeamFromCandidates, API_URL } from "@/lib/api";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export default function AntXDashboard() {
  const [activeTab, setActiveTab] = useState<NavTab>("overview");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);

  const [isSyncing, setIsSyncing] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial load: fetch exclusively from http://127.0.0.1:8000/api/data
  useEffect(() => {
    handleSyncData();
  }, []);

  const handleSyncData = async () => {
    setIsSyncing(true);
    setApiError(null);
    const result = await fetchCandidatesFromApi();

    if (result.error) {
      setApiError(result.error);
      setCandidates([]);
      setTeam([]);
      showToast(`API Fetch Error: ${result.error}`);
    } else {
      setCandidates(result.data);
      const derivedTeam = deriveTeamFromCandidates(result.data);
      setTeam(derivedTeam);
      showToast(`Loaded ${result.data.length} candidates from ${API_URL}`);
    }
    setIsSyncing(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpdateCandidate = (updated: Candidate) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    if (selectedCandidate?.id === updated.id) {
      setSelectedCandidate(updated);
    }
    showToast(`Updated stage for ${updated.name}`);
  };

  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates((prev) => [newCand, ...prev]);
    showToast(`Registered ${newCand.name} in pipeline`);
  };

  const liveCount = candidates.filter((c) => c.status === "In Interview").length;

  return (
    <div className="min-h-screen bg-[#F5F3EC] flex text-[#24221F] font-sans antialiased">
      {/* Global Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isSyncing={isSyncing}
        onSync={handleSyncData}
        candidateCount={candidates.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenScheduleModal={() => setIsScheduleOpen(true)}
          onSync={handleSyncData}
          isSyncing={isSyncing}
          liveCount={liveCount}
        />

        {/* Sync Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-40 px-4 py-2.5 bg-[#24221F] text-white rounded-xl text-xs font-semibold shadow-xl border border-[#7E5281]/50 flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
            {apiError ? (
              <AlertCircle className="w-4 h-4 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Connection Warning Banner if API fails */}
        {apiError && (
          <div className="bg-amber-50 border-b border-amber-200 px-8 py-3 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>
                Backend API offline (<code className="font-mono font-bold">{API_URL}</code>). Start the FastAPI server to stream Google Sheet data.
              </span>
            </div>
            <button
              onClick={handleSyncData}
              className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry API</span>
            </button>
          </div>
        )}

        {/* Dynamic Page Views */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewView
              candidates={candidates}
              onSelectCandidate={setSelectedCandidate}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === "interviews" && (
            <InterviewsView
              candidates={candidates}
              onSelectCandidate={setSelectedCandidate}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )}

          {activeTab === "candidates" && (
            <CandidatesView
              candidates={candidates}
              onSelectCandidate={setSelectedCandidate}
              onOpenAddModal={() => setIsAddCandidateOpen(true)}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )}

          {activeTab === "schedule" && (
            <ScheduleView
              candidates={candidates}
              onSelectCandidate={setSelectedCandidate}
              onOpenScheduleModal={() => setIsScheduleOpen(true)}
            />
          )}

          {activeTab === "analytics" && <AnalyticsView candidates={candidates} />}

          {activeTab === "team" && <TeamView team={team} />}

          {activeTab === "settings" && (
            <SettingsView
              isSyncing={isSyncing}
              onSync={handleSyncData}
              candidateCount={candidates.length}
              apiError={apiError}
            />
          )}
        </main>
      </div>

      {/* Global Right Candidate Profile Drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdateCandidate={handleUpdateCandidate}
      />

      {/* Schedule Interview Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={handleAddCandidate}
      />

      {/* Add Candidate Modal */}
      <AddCandidateModal
        isOpen={isAddCandidateOpen}
        onClose={() => setIsAddCandidateOpen(false)}
        onAddCandidate={handleAddCandidate}
      />
    </div>
  );
}
