import { Candidate, RoleType, CandidateStatus, TeamMember } from "./types";

export interface FetchResult {
  data: Candidate[];
  source: "api";
  message?: string;
  error?: string;
}

export const API_URL = "http://127.0.0.1:8000/api/data";

export async function fetchCandidatesFromApi(): Promise<FetchResult> {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const rawData = await res.json();
    if (!Array.isArray(rawData)) {
      throw new Error("Invalid API response format: expected array");
    }

    const normalized: Candidate[] = rawData.map((item: any, idx: number) => {
      const name = item.Name || item.name || `Candidate ${idx + 1}`;
      const roleStr = (item.Role || item.role || "SDE").toUpperCase();
      const validRole: RoleType = ["SDE", "GTM", "OPN"].includes(roleStr)
        ? (roleStr as RoleType)
        : "SDE";
      const statusStr = item.Status || item.status || "Scheduled";

      return {
        id: `sheet-${idx + 1}`,
        name: name,
        email: item.Email || item.email || "",
        role: validRole,
        status: statusStr as CandidateStatus,
        scheduled: item.Scheduled || item.scheduled || "",
        checkIn: item["Check-in"] || item.checkIn || item.check_in || "",
        checkOut: item["Check-out"] || item.checkOut || item.check_out || "",
        interviewer: item.Interviewer || item.interviewer || "Unassigned",
        skills: item.Skills || item.skills || "",
        github: item.GitHub || item.github || "",
        portfolio: item.Portfolio || item.portfolio || "",
        resume: item.Resume || item.resume || "",
        notes: item.Notes || item.notes || "",
        experience: item.experience || "3.5 yrs",
        source: item.source || "Google Sheet",
        rating: item.rating || 4.8,
      };
    });

    return {
      data: normalized,
      source: "api",
      message: "Successfully fetched live data from http://127.0.0.1:8000/api/data",
    };
  } catch (err: any) {
    console.error("Error fetching from http://127.0.0.1:8000/api/data:", err);
    return {
      data: [],
      source: "api",
      error: err.message || "Failed to fetch from http://127.0.0.1:8000/api/data",
    };
  }
}

// Derive Team Members dynamically from real Candidate data
export function deriveTeamFromCandidates(candidates: Candidate[]): TeamMember[] {
  const map = new Map<string, { roles: Set<RoleType>; count: number; inSession: boolean }>();

  candidates.forEach((c) => {
    if (!c.interviewer || c.interviewer === "Unassigned") return;
    const existing = map.get(c.interviewer) || {
      roles: new Set<RoleType>(),
      count: 0,
      inSession: false,
    };
    existing.roles.add(c.role);
    existing.count += 1;
    if (c.status === "In Interview") existing.inSession = true;
    map.set(c.interviewer, existing);
  });

  const teamList: TeamMember[] = Array.from(map.entries()).map(([name, info], idx) => {
    const rolesArray = Array.from(info.roles);
    return {
      id: `team-${idx + 1}`,
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@antx.com`,
      title: rolesArray.includes("SDE")
        ? "Engineering Interviewer"
        : rolesArray.includes("GTM")
        ? "Growth Lead"
        : "Operations Lead",
      type: "Interviewer",
      rolesCovered: rolesArray,
      availability: info.inSession ? "In Session" : "Available",
      interviewsThisWeek: info.count,
      interviewsTotal: info.count * 3 + 12,
      avgRating: 4.8,
      avatar: `https://images.unsplash.com/photo-${
        1534528741775 + (idx % 5) * 1000
      }?auto=format&fit=crop&q=80&w=150`,
    };
  });

  return teamList;
}
