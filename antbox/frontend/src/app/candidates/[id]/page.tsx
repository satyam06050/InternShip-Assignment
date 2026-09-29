"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CandidateProfile, {
  CandidateProfileData,
} from "@/components/candidates/CandidateProfile";
import { fetchCandidatesFromApi } from "@/lib/api";
import { Candidate } from "@/lib/types";

/** Map the existing Candidate object → CandidateProfileData expected by CandidateProfile.tsx */
function mapCandidateToProfileData(c: Candidate): CandidateProfileData {
  const skillsList = c.skills
    ? c.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return {
    name: c.name,
    role: c.role,
    headline: `${c.role} Candidate · Interviewed at AntX`,
    summary:
      c.notes?.trim() ||
      `${c.role} candidate currently ${c.status.toLowerCase()} in the AntX hiring pipeline.`,
    location: "India",
    institution: "—",
    education: "—",
    email: c.email,
    phone: "—",
    github: c.github || undefined,
    portfolio: c.portfolio || undefined,
    resume: c.resume || undefined,
    stage: c.status,
    skills: skillsList.length > 0 ? skillsList : [c.role],
  };
}

type PageState =
  | { status: "loading" }
  | { status: "found"; profileData: CandidateProfileData }
  | { status: "not_found" }
  | { status: "error"; message: string };

export default function CandidateProfilePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "");

  const [state, setState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    if (!id) {
      setState({ status: "not_found" });
      return;
    }

    fetchCandidatesFromApi().then((result) => {
      if (result.error) {
        setState({ status: "error", message: result.error });
        return;
      }

      const match = result.data.find((c) => c.id === id);
      if (!match) {
        setState({ status: "not_found" });
        return;
      }

      setState({
        status: "found",
        profileData: mapCandidateToProfileData(match),
      });
    });
  }, [id]);

  /* ── Loading ── */
  if (state.status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#e8e0d2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Century Gothic', Arial, sans-serif",
          color: "#6e685f",
          fontSize: 14,
        }}
      >
        Loading candidate profile…
      </div>
    );
  }

  /* ── Not Found ── */
  if (state.status === "not_found") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#e8e0d2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontFamily: "'Century Gothic', Arial, sans-serif",
          color: "#24221f",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 600, margin: 0 }}>
          Candidate not found
        </h1>
        <p style={{ color: "#6e685f", margin: 0 }}>
          No candidate with ID <code>{id}</code> exists in the current pipeline.
        </p>
        <Link
          href="/"
          style={{
            padding: "10px 24px",
            background: "#6f5c7e",
            color: "#fffdf8",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  /* ── API Error ── */
  if (state.status === "error") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#e8e0d2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontFamily: "'Century Gothic', Arial, sans-serif",
          color: "#24221f",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>
          Unable to load candidate
        </h1>
        <p
          style={{
            color: "#6e685f",
            margin: 0,
            maxWidth: 480,
            textAlign: "center",
          }}
        >
          {state.message}
        </p>
        <Link
          href="/"
          style={{
            padding: "10px 24px",
            background: "#6f5c7e",
            color: "#fffdf8",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  /* ── Found ── */
  return <CandidateProfile candidate={state.profileData} />;
}
