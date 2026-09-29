"use client";

import React, { useEffect } from "react";

export interface CandidateProfileData {
    name: string;
    role: string;
    headline: string;
    summary: string;
    location: string;
    institution: string;
    education: string;
    email: string;
    phone: string;
    github?: string;
    portfolio?: string;
    resume?: string;
    stage?: string;
    skills?: string[];
}

interface CandidateProfileProps {
    candidate: CandidateProfileData;
}

const roleFit = [
    {
        title:
            "Strong written and verbal communication skills with the ability to explain complex processes clearly.",
        detail:
            "The resume highlights technical achievements but does not provide explicit evidence of strong written or verbal communication skills for explaining complex processes.",
        status: "None evident in resume",
    },
    {
        title:
            "Strong interest in fintech infrastructure, banking connectivity, payments, e-invoicing, or business systems.",
        detail:
            "The candidate's profile summary and project experience focus on Agentic AI, Mobile Development, and AI-powered backend systems.",
        status: "None evident",
    },
    {
        title:
            "Detail-oriented and structured approach to handling operational processes and documentation.",
        detail:
            "Demonstrated through architecture refactoring, database optimization, and structured technical work.",
        evidence:
            "Refactored the application into a feature-based modular architecture. Redesigned and optimized the database schema.",
        status: "Demonstrated (Technical)",
    },
    {
        title:
            "Willingness to work directly on operational tickets and troubleshoot real-world issues.",
        detail:
            "Experience in optimizing performance and latency suggests troubleshooting capabilities.",
        evidence:
            "Optimized API caching and state management, reducing screen load time from 3.2s to 1.4s.",
        status: "Implied (Technical troubleshooting)",
    },
    {
        title:
            "Ability to understand ambiguous or technical processes and convert them into structured workflows.",
        detail:
            "System design, refactoring, and implementation of complex technical pipelines demonstrate structured technical thinking.",
        evidence:
            "Feature-based architecture, database optimization, resume parsing and RAG pipeline.",
        status: "Demonstrated (Technical System Design)",
    },
    {
        title:
            "Comfort working with regulatory and compliance-related requirements such as VAT, cross-border payments, and entity-level configurations.",
        detail:
            "There is no mention of experience with regulatory or compliance requirements in the provided resume.",
        status: "None evident",
    },
    {
        title:
            "Strong ownership, problem-solving ability, and willingness to learn in a fast-paced environment.",
        detail:
            "Leading a team, improving performance, building complex systems, and pursuing certifications demonstrate ownership and learning.",
        evidence:
            "Led a 4-member engineering team and implemented performance and RAG improvements.",
        status: "Demonstrated",
    },
    {
        title:
            "Prior exposure to Salesforce, HubSpot, banking APIs, or e-invoicing standards.",
        detail:
            "The resume does not mention prior exposure to these specific platforms, APIs, or standards.",
        status: "None evident",
    },
    {
        title:
            "Create and maintain documentation, how-to guides, SOPs, and knowledge resources.",
        detail:
            "The resume does not explicitly show formal documentation or SOP experience.",
        status: "None evident",
    },
    {
        title:
            "Work on operational tickets and issues related to bank feeds, payments, CRM, and HRM integrations.",
        detail:
            "Experience is primarily focused on software development and AI systems.",
        status: "None evident",
    },
    {
        title:
            "Investigate operational issues to understand edge cases, failure modes, and customer impact.",
        detail:
            "Technical performance optimization demonstrates investigation of failure modes.",
        evidence:
            "API caching, state management, and database query optimization.",
        status: "Implied (Technical Debugging/Optimization)",
    },
    {
        title:
            "Translate technical integration behaviour and processes into clear, structured documentation.",
        detail:
            "No explicit evidence of translating technical processes into documentation for internal teams.",
        status: "None evident",
    },
    {
        title:
            "Keep documentation and SOPs updated as integrations, vendors, and requirements change.",
        detail:
            "No documentation-management experience is mentioned.",
        status: "None evident",
    },
    {
        title:
            "Identify documentation and process gaps through operational tickets, triage, and support trends.",
        detail:
            "No evidence of operational ticket analysis or support-trend analysis.",
        status: "None evident",
    },
    {
        title:
            "Support root-cause investigation of recurring operational issues and convert solutions into reusable SOPs.",
        detail:
            "Technical root-cause investigation is demonstrated, but SOP creation is not.",
        evidence:
            "API performance optimization and database query optimization.",
        status: "Implied (Technical Root Cause Analysis)",
    },
    {
        title:
            "Work closely with Connectivity and ProductOps teams to improve operational processes.",
        detail:
            "Team leadership and engineering collaboration demonstrate transferable collaboration skills.",
        evidence:
            "Led a 4-member engineering team and managed Git workflows, pull requests, and code reviews.",
        status: "Implied (Team Collaboration)",
    },
    {
        title:
            "Willingness to work from the office, align with business needs, and be open to relocation.",
        detail:
            "The provided resume does not establish onsite availability or relocation preferences.",
        evidence: "Previous internships were remote.",
        status: "Not evident / Requires clarification",
    },
];

const experiences = [
    {
        date: "Mar 2025 – Oct 2025",
        company: "Ignito Corporation",
        location: "Remote",
        role: "Flutter Development Intern",
        description:
            "Developed pixel-perfect, responsive Flutter interfaces for 10+ applications using reusable widgets, Clean Architecture, and GetX state management. Optimized API caching and state management, reducing screen load time from 3.2s to 1.4s (56% improvement). Refactored the application into a feature-based modular architecture.",
        proof: [
            "10+ Flutter applications",
            "56% screen-load improvement",
            "Clean Architecture",
            "GetX",
        ],
    },
    {
        date: "Oct 2025 – Dec 2025",
        company: "Appsy Infotech",
        location: "Remote",
        role: "Software Development Intern",
        description:
            "Developed 10+ RESTful APIs using FastAPI and MySQL, redesigned and optimized the database schema, and reduced API latency through query optimization. Led a 4-member engineering team developing Flutter applications and backend services.",
        proof: [
            "10+ RESTful APIs",
            "FastAPI",
            "MySQL",
            "Database optimization",
            "Team of 4",
        ],
    },
];

const systems = [
    {
        number: "SYSTEM 01",
        title: "AI Interview Platform",
        description:
            "Built a voice-based AI mock interview platform with Gemini Flash, Groq, Whisper STT/TTS, and real-time WebSockets. Implemented resume parsing and RAG for adaptive personalized questions.",
        flow: ["Gemini Flash", "Groq", "Whisper STT/TTS"],
    },
    {
        number: "SYSTEM 02",
        title: "KIIT Sync - Timetable Management",
        description:
            "Developed a Flutter application with Supabase Realtime, offline support, dynamic theming, and Python data pipelines for timetable scraping and synchronization.",
        flow: ["Flutter", "Supabase Realtime", "Python"],
    },
];

const capabilities = [
    ["Python", "Backend / data pipelines"],
    ["Dart", "Flutter development"],
    ["JavaScript", "Next.js / React"],
    ["SQL", "Database development"],
    ["Flutter", "Mobile applications"],
    ["FastAPI", "REST APIs"],
    ["Next.js", "Web applications"],
    ["React", "Frontend development"],
    ["LangChain", "LLM applications"],
    ["LLM Applications", "AI systems"],
    ["Agentic AI", "AI agents"],
    ["RAG", "Retrieval pipelines"],
    ["Whisper", "Speech processing"],
    ["Prompt Engineering", "LLM workflows"],
    ["PostgreSQL", "Database"],
    ["MySQL", "Database / APIs"],
    ["Redis", "Caching"],
    ["DynamoDB", "Database"],
    ["Firebase", "Backend services"],
    ["Supabase", "Realtime / backend"],
    ["Git", "Version control"],
    ["Docker", "Containers"],
    ["Kubernetes", "Container orchestration"],
    ["Postman", "API testing"],
    ["Linux", "Development environment"],
    ["Vercel", "Deployment"],
    ["Data Structures & Algorithms", "Problem solving"],
    ["System Design", "Architecture"],
    ["OOP", "Programming"],
    ["DBMS", "Databases"],
    ["Operating Systems", "CS fundamentals"],
    ["Computer Networks", "CS fundamentals"],
];

const workingStyle = [
    {
        title: "Detail-oriented",
        description:
            "Focuses on maintainability, scalability, database structure, and technical correctness.",
    },
    {
        title: "Problem-solver",
        description:
            "Optimizes APIs, application performance, databases, and AI pipelines.",
    },
    {
        title: "Proactive / Takes Ownership",
        description:
            "Led a 4-member engineering team and managed Git workflows, pull requests, and code reviews.",
    },
    {
        title: "Eager to learn / Adaptable",
        description:
            "Works across AI, mobile development, backend systems, cloud, and modern web technologies.",
    },
    {
        title: "Structured approach to technical tasks",
        description:
            "Uses modular architecture and structured engineering workflows to improve maintainability.",
    },
];

export default function CandidateProfile({
    candidate,
}: CandidateProfileProps) {
    useEffect(() => {
        const progress = document.getElementById("candidate-progress");
        const nav = document.getElementById("candidate-nav");

        const updateScroll = () => {
            if (progress) {
                const max =
                    document.documentElement.scrollHeight - window.innerHeight;

                progress.style.width =
                    `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
            }

            nav?.classList.toggle("scrolled", window.scrollY > 30);
        };

        window.addEventListener("scroll", updateScroll, { passive: true });
        updateScroll();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.14 },
        );

        document
            .querySelectorAll(".candidate-profile .reveal")
            .forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener("scroll", updateScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="candidate-profile">
            <style jsx global>{`
        .candidate-profile {
          --bg: #e8e0d2;
          --surface: #f3ede3;
          --surface-2: #ddd3c4;
          --ink: #24221f;
          --muted: #6e685f;
          --lav: #8d7a9f;
          --lav-dark: #6f5c7e;
          --olive: #68705d;
          --line: rgba(36, 34, 31, 0.13);
          --white: #fffdf8;

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family:
            "Century Gothic",
            "CenturyGothic",
            "AppleGothic",
            Arial,
            sans-serif;
          line-height: 1.55;
          overflow-x: hidden;
        }

        .candidate-profile *,
        .candidate-profile *::before,
        .candidate-profile *::after {
          box-sizing: border-box;
        }

        .candidate-profile html {
          scroll-behavior: smooth;
        }

        .candidate-profile a {
          color: inherit;
          text-decoration: none;
        }

        .candidate-profile .container {
          width: min(1180px, 90vw);
          margin: auto;
        }

        .candidate-profile .progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          width: 0;
          background: var(--lav-dark);
          z-index: 1000;
        }

        .candidate-profile .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .candidate-profile .reveal.visible {
          opacity: 1;
          transform: none;
        }

        .candidate-profile [data-delay="1"] {
          transition-delay: 0.08s;
        }

        .candidate-profile [data-delay="2"] {
          transition-delay: 0.16s;
        }

        .candidate-profile [data-delay="3"] {
          transition-delay: 0.24s;
        }

        .candidate-profile [data-delay="4"] {
          transition-delay: 0.32s;
        }

        .candidate-profile .hover-lift {
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s,
            border-color 0.35s;
        }

        .candidate-profile .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 55px rgba(60, 50, 40, 0.11);
          border-color: rgba(36, 34, 31, 0.25);
        }

        /* NAV */

        .candidate-profile .candidate-nav {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          z-index: 50;
          height: 72px;
          background: rgba(232, 224, 210, 0.82);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
          transition: 0.35s;
        }

        .candidate-profile .candidate-nav.scrolled {
          border-color: var(--line);
          background: rgba(232, 224, 210, 0.94);
        }

        .candidate-profile .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .candidate-profile .brand {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .candidate-profile .brand span {
          color: var(--lav-dark);
        }

        .candidate-profile .nav-links {
          display: flex;
          gap: 28px;
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.03em;
        }

        .candidate-profile .nav-links a {
          position: relative;
          padding: 7px 0;
        }

        .candidate-profile .nav-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 1px;
          width: 0;
          height: 1px;
          background: var(--ink);
          transition: 0.3s;
        }

        .candidate-profile .nav-links a:hover::after {
          width: 100%;
        }

        /* HERO */

        .candidate-profile .hero {
          padding: 145px 0 90px;
          min-height: 92vh;
          display: flex;
          align-items: center;
        }

        .candidate-profile .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 72px;
          align-items: center;
        }

        .candidate-profile .kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--olive);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .candidate-profile .kicker i {
          width: 25px;
          height: 1px;
          background: var(--olive);
          display: block;
        }

        .candidate-profile h1 {
          font-size: clamp(60px, 8.4vw, 104px);
          line-height: 0.91;
          letter-spacing: -0.075em;
          font-weight: 600;
          margin: 20px 0 26px;
        }

        .candidate-profile .hero-sub {
          font-size: 20px;
          line-height: 1.45;
          max-width: 670px;
          margin: 0 0 18px;
        }

        .candidate-profile .hero-note {
          font-size: 14px;
          color: var(--muted);
          max-width: 610px;
        }

        .candidate-profile .hero-meta {
          display: flex;
          gap: 28px;
          margin-top: 35px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
        }

        .candidate-profile .meta strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
        }

        .candidate-profile .meta span {
          display: block;
          color: var(--muted);
          font-size: 11px;
          margin-top: 3px;
        }

        /* IDENTITY */

        .candidate-profile .identity {
          position: relative;
        }

        .candidate-profile .photo {
          aspect-ratio: 1 / 1.08;
          background: var(--surface-2);
          border-radius: 32px;
          border: 1px solid var(--line);
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          overflow: hidden;
          position: relative;
        }

        .candidate-profile .photo::before {
          content: "";
          position: absolute;
          width: 72%;
          height: 72%;
          border-radius: 50%;
          background: var(--lav);
          opacity: 0.18;
          right: -16%;
          top: -10%;
        }

        .candidate-profile .photo::after {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(36, 34, 31, 0.11);
          border-radius: 25px;
        }

        .candidate-profile .photo-label {
          position: relative;
          z-index: 2;
          margin: 28px;
          color: var(--muted);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .candidate-profile .role-card {
          position: absolute;
          left: -45px;
          bottom: 54px;
          width: 250px;
          padding: 18px 20px;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 18px;
          box-shadow: 0 20px 55px rgba(60, 50, 40, 0.13);
        }

        .candidate-profile .role-card .small {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--olive);
        }

        .candidate-profile .role-card h3 {
          font-size: 18px;
          line-height: 1.2;
          margin: 8px 0 5px;
          font-weight: 600;
        }

        .candidate-profile .role-card p {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }

        .candidate-profile .identity-caption {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 15px;
          font-size: 11px;
          color: var(--muted);
          flex-wrap: wrap;
        }

        .candidate-profile .identity-caption strong {
          color: var(--ink);
          font-weight: 600;
        }

        /* SECTIONS */

        .candidate-profile section {
          padding: 110px 0;
        }

        .candidate-profile .section-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 70px;
        }

        .candidate-profile .section-label {
          position: sticky;
          top: 105px;
          align-self: start;
        }

        .candidate-profile .section-no {
          font-size: 11px;
          color: var(--lav-dark);
          letter-spacing: 0.12em;
          font-weight: 700;
        }

        .candidate-profile .section-label h2 {
          font-size: 31px;
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 600;
          margin: 11px 0;
        }

        .candidate-profile .section-label p {
          font-size: 12px;
          color: var(--muted);
          max-width: 220px;
        }

        /* ROLE FIT */

        .candidate-profile .fit-intro {
          font-size: 21px;
          line-height: 1.48;
          margin: 0 0 30px;
          max-width: 760px;
        }

        .candidate-profile .fit-list {
          border-top: 1px solid var(--line);
        }

        .candidate-profile .fit-row {
          display: grid;
          grid-template-columns: 32px 1fr auto;
          gap: 17px;
          align-items: center;
          padding: 21px 0;
          border-bottom: 1px solid var(--line);
        }

        .candidate-profile .fit-num {
          font-size: 10px;
          color: var(--lav-dark);
          font-weight: 700;
        }

        .candidate-profile .fit-title {
          font-size: 15px;
          font-weight: 600;
        }

        .candidate-profile .fit-detail {
          font-size: 12px;
          color: var(--muted);
          margin-top: 4px;
        }

        .candidate-profile .fit-status {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--olive);
          white-space: nowrap;
        }

        /* EXPERIENCE */

        .candidate-profile .experience {
          display: grid;
          gap: 16px;
        }

        .candidate-profile .exp-card {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 35px;
          padding: 27px;
          border: 1px solid var(--line);
          border-radius: 22px;
          background: rgba(243, 237, 227, 0.55);
        }

        .candidate-profile .exp-date {
          font-size: 10px;
          color: var(--olive);
          font-weight: 700;
          line-height: 1.5;
        }

        .candidate-profile .exp-company {
          font-size: 12px;
          color: var(--muted);
          margin-top: 7px;
        }

        .candidate-profile .exp-card h3 {
          font-size: 21px;
          line-height: 1.15;
          margin: 0 0 10px;
          font-weight: 600;
        }

        .candidate-profile .exp-card p {
          font-size: 13px;
          color: #514c45;
          margin: 0;
          max-width: 690px;
        }

        .candidate-profile .exp-proof {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 15px;
        }

        .candidate-profile .exp-proof span {
          font-size: 9px;
          padding: 6px 9px;
          background: var(--surface-2);
          border-radius: 999px;
          color: #514c45;
        }

        /* SYSTEMS */

        .candidate-profile .systems {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .candidate-profile .system {
          min-height: 315px;
          padding: 30px;
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--surface);
          position: relative;
          overflow: hidden;
        }

        .candidate-profile .system::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1px solid rgba(111, 92, 126, 0.14);
          right: -70px;
          top: -70px;
        }

        .candidate-profile .system-number {
          font-size: 10px;
          color: var(--lav-dark);
          font-weight: 700;
        }

        .candidate-profile .system h3 {
          font-size: 29px;
          letter-spacing: -0.045em;
          font-weight: 600;
          margin: 36px 0 12px;
        }

        .candidate-profile .system p {
          font-size: 13px;
          color: var(--muted);
          max-width: 460px;
        }

        .candidate-profile .system-flow {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 25px;
          font-size: 9px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          flex-wrap: wrap;
        }

        .candidate-profile .system-flow b {
          font-weight: 600;
          color: var(--ink);
        }

        .candidate-profile .system-flow i {
          width: 18px;
          height: 1px;
          background: var(--lav);
          display: block;
        }

        /* CAPABILITIES */

        .candidate-profile .capability-band {
          background: var(--ink);
          color: var(--white);
          padding: 80px 0;
        }

        .candidate-profile .capability-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 65px;
          align-items: center;
        }

        .candidate-profile .capability-band .section-no {
          color: #b5a4c1;
        }

        .candidate-profile .capability-band h2 {
          font-size: 44px;
          line-height: 1.05;
          letter-spacing: -0.055em;
          font-weight: 600;
          margin: 12px 0;
        }

        .candidate-profile .capability-band p {
          color: #c8c2b9;
          font-size: 14px;
          max-width: 520px;
        }

        .candidate-profile .cap-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .candidate-profile .cap {
          padding: 18px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 13px;
        }

        .candidate-profile .cap small {
          display: block;
          color: #afa8a0;
          font-size: 9px;
          margin-top: 4px;
        }

        /* WORKING STYLE */

        .candidate-profile .style-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .candidate-profile .style-card {
          padding: 25px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: rgba(243, 237, 227, 0.55);
        }

        .candidate-profile .style-card span {
          font-size: 10px;
          color: var(--lav-dark);
          font-weight: 700;
        }

        .candidate-profile .style-card h3 {
          font-size: 17px;
          margin: 25px 0 8px;
          font-weight: 600;
        }

        .candidate-profile .style-card p {
          font-size: 12px;
          color: var(--muted);
          margin: 0;
        }

        /* CLOSING */

        .candidate-profile .closing {
          padding: 130px 0 160px;
          text-align: center;
        }

        .candidate-profile .closing .kicker {
          justify-content: center;
        }

        .candidate-profile .closing h2 {
          font-size: clamp(42px, 6vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.065em;
          font-weight: 600;
          max-width: 800px;
          margin: 22px auto;
        }

        .candidate-profile .closing p {
          max-width: 590px;
          margin: auto;
          color: var(--muted);
          font-size: 14px;
        }

        /* MOBILE */

        @media (max-width: 900px) {
          .candidate-profile .hero-grid,
          .candidate-profile .section-grid,
          .candidate-profile .capability-grid {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .candidate-profile .hero {
            padding-top: 120px;
          }

          .candidate-profile .role-card {
            left: 18px;
            bottom: 25px;
          }

          .candidate-profile .section-label {
            position: static;
          }

          .candidate-profile .systems {
            grid-template-columns: 1fr;
          }

          .candidate-profile .style-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 620px) {
          .candidate-profile .nav-links {
            display: none;
          }

          .candidate-profile .hero {
            padding-bottom: 65px;
          }

          .candidate-profile h1 {
            font-size: 62px;
          }

          .candidate-profile .hero-sub {
            font-size: 17px;
          }

          .candidate-profile .hero-meta {
            gap: 18px;
          }

          .candidate-profile .exp-card {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .candidate-profile .fit-row {
            grid-template-columns: 25px 1fr;
          }

          .candidate-profile .fit-status {
            grid-column: 2;
          }

          .candidate-profile .style-grid,
          .candidate-profile .cap-list {
            grid-template-columns: 1fr;
          }

          .candidate-profile section {
            padding: 78px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .candidate-profile .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

            <div
                id="candidate-progress"
                className="progress"
            />

            {/* NAV */}
            <nav id="candidate-nav" className="candidate-nav">
                <div className="container nav-inner">
                    <div className="brand">
                        {candidate.name}
                        <span> / </span>
                        {candidate.role}
                    </div>

                    <div className="nav-links">
                        <a href="#fit">Role fit</a>
                        <a href="#experience">Experience</a>
                        <a href="#systems">Systems</a>
                        <a href="#capabilities">Capabilities</a>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="hero">
                <div className="container hero-grid">
                    <div className="hero-copy reveal">
                        <div className="kicker">
                            <i />
                            {candidate.role}
                        </div>

                        <h1>{candidate.name}</h1>

                        <p className="hero-sub">{candidate.headline}</p>

                        <p className="hero-note">{candidate.summary}</p>

                        <div className="hero-meta">
                            {(candidate.skills?.length
                                ? candidate.skills
                                : ["Python", "Dart", "JavaScript"]
                            )
                                .slice(0, 3)
                                .map((skill) => (
                                    <div className="meta" key={skill}>
                                        <strong>{skill}</strong>
                                        <span>candidate profile</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="identity reveal" data-delay="2">
                        <div className="photo">
                            <div className="photo-label">Candidate profile</div>
                        </div>

                        <div className="role-card hover-lift">
                            <div className="small">Role focus</div>
                            <h3>{candidate.role}</h3>
                            <p>{candidate.summary}</p>
                        </div>

                        <div className="identity-caption">
                            <strong>
                                {candidate.location} · {candidate.institution}
                            </strong>

                            <span>{candidate.education}</span>

                            <span>
                                {candidate.email}
                                {candidate.phone && ` · ${candidate.phone}`}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* ROLE FIT */}
            <section id="fit">
                <div className="container section-grid">
                    <aside className="section-label reveal">
                        <div className="section-no">01 / ROLE FIT</div>

                        <h2>Built for the work behind the integration.</h2>

                        <p>
                            The strongest overlaps between the candidate&apos;s documented
                            experience and the role.
                        </p>
                    </aside>

                    <div>
                        <p className="fit-intro reveal">
                            The role needs someone who can understand what moved between
                            systems, investigate when it did not, verify the underlying data,
                            and communicate the finding clearly.
                        </p>

                        <div className="fit-list">
                            {roleFit.map((item, index) => (
                                <div
                                    className="fit-row reveal"
                                    data-delay={String((index % 4) + 1)}
                                    key={item.title}
                                >
                                    <div className="fit-num">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div>
                                        <div className="fit-title">{item.title}</div>

                                        <div className="fit-detail">{item.detail}</div>

                                        {item.evidence && (
                                            <div className="fit-detail">{item.evidence}</div>
                                        )}
                                    </div>

                                    <div className="fit-status">{item.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience">
                <div className="container section-grid">
                    <aside className="section-label reveal">
                        <div className="section-no">02 / EXPERIENCE</div>

                        <h2>Production exposure, not just coursework.</h2>

                        <p>
                            Experience selected around the engineering capabilities relevant
                            to the role.
                        </p>
                    </aside>

                    <div className="experience">
                        {experiences.map((experience) => (
                            <article
                                className="exp-card hover-lift reveal"
                                key={`${experience.company}-${experience.role}`}
                            >
                                <div>
                                    <div className="exp-date">{experience.date}</div>

                                    <div className="exp-company">
                                        {experience.company}
                                        <br />
                                        {experience.location}
                                    </div>
                                </div>

                                <div>
                                    <h3>{experience.role}</h3>

                                    <p>{experience.description}</p>

                                    <div className="exp-proof">
                                        {experience.proof.map((item) => (
                                            <span key={item}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* SYSTEMS */}
            <section id="systems">
                <div className="container section-grid">
                    <aside className="section-label reveal">
                        <div className="section-no">03 / SYSTEMS</div>

                        <h2>Integration thinking in practice.</h2>

                        <p>
                            Projects that demonstrate APIs, workflows and data moving between
                            systems.
                        </p>
                    </aside>

                    <div className="systems">
                        {systems.map((system) => (
                            <article
                                className="system hover-lift reveal"
                                key={system.title}
                            >
                                <div className="system-number">{system.number}</div>

                                <h3>{system.title}</h3>

                                <p>{system.description}</p>

                                <div className="system-flow">
                                    {system.flow.map((item, index) => (
                                        <React.Fragment key={item}>
                                            {index > 0 && <i />}
                                            <b>{item}</b>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="capability-band" id="capabilities">
                <div className="container capability-grid">
                    <div className="reveal">
                        <div className="section-no">04 / CAPABILITIES</div>

                        <h2>
                            Understand the system.
                            <br />
                            Find the break.
                            <br />
                            Verify the fix.
                        </h2>

                        <p>
                            The transferable strength is having the technical foundation to
                            learn a new system, investigate its behaviour and work
                            methodically through an issue.
                        </p>
                    </div>

                    <div className="cap-list reveal" data-delay="2">
                        {capabilities.map(([name, description]) => (
                            <div className="cap" key={name}>
                                {name}
                                <small>{description}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WORKING STYLE */}
            <section>
                <div className="container section-grid">
                    <aside className="section-label reveal">
                        <div className="section-no">05 / WORKING STYLE</div>

                        <h2>How the candidate works.</h2>

                        <p>Soft skills grounded in documented engineering experience.</p>
                    </aside>

                    <div className="style-grid">
                        {workingStyle.map((item, index) => (
                            <article
                                className="style-card hover-lift reveal"
                                data-delay={String((index % 4) + 1)}
                                key={item.title}
                            >
                                <span>{String(index + 1).padStart(2, "0")}</span>

                                <h3>{item.title}</h3>

                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLOSING */}
            <section className="closing">
                <div className="container reveal">
                    <div className="kicker">
                        <i />
                        {candidate.stage || "CANDIDATE PROFILE"}
                        <i />
                    </div>

                    <h2>{candidate.name}.</h2>

                    <p>{candidate.summary}</p>
                </div>
            </section>
        </div>
    );
}