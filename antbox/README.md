# 🐜 AntX — Hiring Day Operations Dashboard

> A real-time, full-stack hiring dashboard that streams candidate data live from **Google Sheets** and presents it through a modern, interactive **Next.js** interface — purpose-built for managing interviews on hiring day.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [System Architecture & Flow](#-system-architecture--flow)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Data Model](#-data-model)

---

## 🧭 Overview

**AntX** is a hiring operations dashboard built for fast-paced interview days. It provides recruiters and hiring managers with a bird's-eye view of all candidates — their status, interview stages, scheduled slots, and team assignments — all sourced directly from a live Google Sheet.

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14 (App Router), TypeScript |
| Styling    | Tailwind CSS, Lucide Icons          |
| Backend    | FastAPI (Python)                    |
| Data Source| Google Sheets API (via `gspread`)   |
| Auth       | Google Service Account (OAuth2)     |
| Hosting    | Local dev (extendable to Vercel/Railway) |

---

## 🔄 System Architecture & Flow

```mermaid
flowchart TD
    A[👤 Recruiter / HR User] -->|Opens browser| B[Next.js Frontend\nlocalhost:3000]

    B -->|On mount / Sync button| C[fetchCandidatesFromApi\nGET /api/data]

    C -->|HTTP Request| D[FastAPI Backend\nlocalhost:8000]

    D -->|Authenticates via| E[Google Service Account\nOAuth2 Credentials]
    E -->|Authorized client| F[gspread Client]
    F -->|Reads Sheet| G[(Google Sheet\nCandidate Data)]

    G -->|Raw rows returned| F
    F -->|List of dicts| D
    D -->|JSON array| C

    C -->|Normalized Candidate objects| B

    B --> H{Active Tab}

    H -->|overview| I[📊 Overview View\nStats & Live Feeds]
    H -->|interviews| J[🎙 Interviews View\nLive Sessions & Status]
    H -->|candidates| K[👥 Candidates View\nSearchable Pipeline]
    H -->|schedule| L[📅 Schedule View\nTime-slot Calendar]
    H -->|analytics| M[📈 Analytics View\nCharts & Metrics]
    H -->|team| N[🤝 Team View\nInterviewer Cards]
    H -->|settings| O[⚙️ Settings View\nSync & Config]

    K -->|Click candidate| P[🪟 Candidate Drawer\nProfile + Actions]
    J -->|Click candidate| P

    B -->|Add Candidate button| Q[➕ Add Candidate Modal]
    B -->|Schedule button| R[📆 Schedule Interview Modal]

    Q -->|Adds locally| B
    R -->|Adds locally| B

    style A fill:#7E5281,color:#fff
    style D fill:#1a1a2e,color:#fff
    style G fill:#0f9d58,color:#fff
    style B fill:#24221F,color:#fff
```

---

## 📁 Project Structure

```
antbox/
├── backend/                        # FastAPI Python backend
│   ├── main.py                     # App entry point, CORS middleware
│   ├── requirements.txt            # Python dependencies
│   ├── .env                        # Google API credentials (not committed)
│   └── app/
│       ├── config.py               # Loads env vars for Google credentials
│       ├── sheets.py               # gspread auth + sheet data fetcher
│       └── routes/
│           └── data.py             # GET /api/data route
│
├── frontend/                       # Next.js TypeScript frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Main dashboard (root page)
│   │   │   ├── layout.tsx          # App shell & metadata
│   │   │   └── globals.css         # Global styles
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   │   │   └── Header.tsx      # Top bar with search & sync
│   │   │   ├── common/
│   │   │   │   ├── CandidateDrawer.tsx   # Right-side profile panel
│   │   │   │   ├── ScheduleModal.tsx     # Schedule interview modal
│   │   │   │   └── AddCandidateModal.tsx # Add new candidate modal
│   │   │   └── views/
│   │   │       ├── OverviewView.tsx      # Dashboard stats & live feed
│   │   │       ├── InterviewsView.tsx    # Active interview sessions
│   │   │       ├── CandidatesView.tsx    # Full candidate pipeline
│   │   │       ├── ScheduleView.tsx      # Time-slot schedule calendar
│   │   │       ├── AnalyticsView.tsx     # Charts & metrics
│   │   │       ├── TeamView.tsx          # Interviewer cards
│   │   │       └── SettingsView.tsx      # Sync controls & API config
│   │   └── lib/
│   │       ├── api.ts              # API fetch logic & data normalization
│   │       ├── types.ts            # TypeScript interfaces & enums
│   │       └── mockData.ts         # Fallback mock data
│   ├── .env                        # NEXT_PUBLIC_API_URL
│   └── package.json
│
├── credentials/                    # Google service account JSON (not committed)
├── data.md                         # Sample candidate data (JSON)
├── test.py                         # Quick API test script
└── README.md                       # You are here
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **Live Google Sheets Sync** | Fetches real-time candidate data from a Google Sheet via a service account |
| **Overview Dashboard** | At-a-glance stats — total candidates, in-interview count, completions, role breakdown |
| **Interview Tracker** | Monitor active sessions with check-in / check-out times and status transitions |
| **Candidate Pipeline** | Searchable, filterable list of all candidates with profile drawer |
| **Schedule View** | Visual time-slot calendar for the hiring day |
| **Analytics** | Role distribution charts, funnel metrics, and performance stats |
| **Team Management** | Auto-derived interviewer cards with availability and session count |
| **Add / Schedule Modals** | Register new candidates or schedule interview slots on-the-fly |
| **Sync Toast & Error Banners** | Real-time feedback when API is offline or syncing |

---

## 🚀 Getting Started

### Prerequisites

- **Python** ≥ 3.10
- **Node.js** ≥ 18
- A **Google Cloud Project** with:
  - Google Sheets API enabled
  - A Service Account with credentials JSON downloaded
  - The target Google Sheet shared with the service account email

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. (Optional) Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure your .env file (see Environment Variables section)

# 5. Start the FastAPI dev server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be live at: **http://127.0.0.1:8000**

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Configure your .env file (see Environment Variables section)

# 4. Start the Next.js dev server
npm run dev
```

The dashboard will be live at: **http://localhost:3000**

---

## 🔐 Environment Variables

### `backend/.env`

```env
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id
```

### `frontend/.env`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 📡 API Reference

### `GET /`
Health check endpoint.

**Response:**
```json
{ "message": "AntX Hiring API is running" }
```

---

### `GET /api/data`
Fetches all candidate records from the configured Google Sheet.

**Response:** `200 OK` — Array of candidate objects

```json
[
  {
    "Name": "Aarav Sharma",
    "Email": "aarav.sharma@example.com",
    "Role": "SDE",
    "Status": "In Interview",
    "Scheduled": "10:00 AM",
    "Check-in": "10:02 AM",
    "Check-out": "",
    "Interviewer": "Rahul Mehta",
    "Skills": "React, Next.js, TypeScript, Node.js",
    "GitHub": "github.com/aarav-demo",
    "Portfolio": "aarav.dev",
    "Resume": "drive.google.com/resume/aarav",
    "Notes": "Strong frontend fundamentals"
  }
]
```

---

## 🗂 Data Model

### Candidate Statuses

| Status | Meaning |
|---|---|
| `Scheduled` | Interview booked, not yet arrived |
| `Waiting` | Candidate checked in, waiting for interviewer |
| `In Interview` | Currently in an active session |
| `Completed` | Interview finished |
| `No-show` | Candidate did not appear |

### Role Types

| Code | Role |
|---|---|
| `SDE` | Software Development Engineer |
| `GTM` | Go-To-Market / Growth |
| `OPN` | Operations |

---

## 📋 Google Sheet Schema

The sheet should have the following column headers (row 1):

| Column | Description |
|---|---|
| `Name` | Candidate full name |
| `Email` | Contact email |
| `Role` | SDE / GTM / OPN |
| `Status` | Current interview status |
| `Scheduled` | Scheduled time (e.g. `10:00 AM`) |
| `Check-in` | Actual check-in time |
| `Check-out` | Actual check-out time |
| `Interviewer` | Assigned interviewer name |
| `Skills` | Comma-separated skill list |
| `GitHub` | GitHub profile URL |
| `Portfolio` | Portfolio URL |
| `Resume` | Resume link |
| `Notes` | Interviewer notes |

---

<p align="center">Built with ❤️ for AntX Internship Assignment</p>
