export type RoleType = "SDE" | "GTM" | "OPN";

export type CandidateStatus =
  | "Scheduled"
  | "Waiting"
  | "In Interview"
  | "Completed"
  | "No-show";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  status: CandidateStatus;
  scheduled: string; // e.g. "10:00 AM"
  checkIn?: string; // e.g. "10:02 AM"
  checkOut?: string; // e.g. "10:45 AM"
  interviewer: string;
  skills: string;
  github?: string;
  portfolio?: string;
  resume?: string;
  notes?: string;
  experience?: string;
  source?: string;
  rating?: number;
  avatarUrl?: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  role: RoleType;
  interviewer: string;
  interviewerTitle: string;
  status: CandidateStatus;
  scheduledTime: string;
  checkInTime?: string;
  checkOutTime?: string;
  durationMinutes: number;
  elapsedMinutes?: number;
  roomLink?: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  title: string;
  type: "Interviewer" | "Recruiter" | "Hiring Manager";
  rolesCovered: RoleType[];
  availability: "Available" | "In Session" | "Busy" | "Offline";
  interviewsThisWeek: number;
  interviewsTotal: number;
  avgRating: number;
  avatar: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  candidateName: string;
  interviewer: string;
  role: RoleType;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  day: string;       // Mon, Tue, etc. or YYYY-MM-DD
  status: CandidateStatus;
}
