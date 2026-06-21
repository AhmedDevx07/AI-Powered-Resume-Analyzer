<div align="center">

# 🤖 AI-Powered Resume Analyzer

### An intelligent MERN-stack platform that analyzes, scores, and improves resumes using Google Gemini AI

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-4CAF50?style=for-the-badge&logo=vercel)](https://ai-powered-resume-analyzer-pied.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AhmedDevx07/AI-Powered-Resume-Analyzer)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-AI%20Engine-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

---

## 📌 Overview

**AI-Powered Resume Analyzer** is a full-stack MERN application that helps job seekers improve their resumes through AI-driven analysis. Users can upload a resume (PDF), and the platform — powered by **Google Gemini API** — extracts the content, scores it against ATS (Applicant Tracking System) standards, identifies issues and strengths, rewrites weak bullet points, and tracks improvement over time through a personal dashboard.

This project was built as part of the **Internee.pk Internship Program**, combining secure authentication, AI integration, structured data validation, and a clean, theme-aware UI.

---

## 🚀 Live Demo

🔗 **[https://ai-powered-resume-analyzer-pied.vercel.app/](https://ai-powered-resume-analyzer-pied.vercel.app/)**

---

## ✨ Key Features

### 🔐 Authentication & Security
- Secure register & login with **JWT stored in httpOnly cookies**
- Password hashing using **bcrypt**

### 📄 Resume Upload & Processing
- PDF upload via **Multer** (memory storage), with **5MB limit** and PDF-only validation
- Clean text extraction using **pdf-parse**
- Automatic detection of scanned/image-only PDFs

### 🧠 AI-Powered Analysis (Google Gemini)
- **Structured Parsing** — converts raw resume text into clean JSON (basics, experience, education, skills, projects, certifications) using **structured output + Zod validation**
- **ATS Scoring** — scores resumes 0–100 with a breakdown across keywords, formatting, impact, and clarity
- **Issues & Strengths** — 5 prioritized issues (with severity & fixes) and 5 evidence-based strengths
- **Bullet Rewrites** — 5–10 weak bullet points rewritten to be stronger, quantified, and ATS-friendly, each with a rationale
- **Keyword Analysis** — detects present and missing keywords for the target role

### 📊 Dashboard & Insights
- **Dashboard** — totals, latest resume, score evolution chart, version stack, KPI cards with sparklines, activity feed
- **Insights Page** — average & best scores, score trends, top recurring issues, top missing/present keywords, per-resume performance
- **Versions & History** — flat version list with filters, plus a chronological activity feed

### ⚙️ Reliability & UX
- **Rate Limiting** — per-user AI request limits to prevent abuse
- **Validation** — Zod schema validation across every route
- **Light & Dark Mode** — soft-minimal, fully responsive UI with theme persistence
- **Modern Landing Page** — clean, professional first impression

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Tailwind CSS, Recharts/Charting library |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **AI Engine** | Google Gemini API (structured output) |
| **Validation** | Zod |
| **File Handling** | Multer, pdf-parse |
| **Authentication** | JWT (httpOnly cookies), bcrypt |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```
AI-Powered-Resume-Analyzer/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── public/
├── .gitignore
└── README.md
```

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AhmedDevx07/AI-Powered-Resume-Analyzer.git
cd AI-Powered-Resume-Analyzer
```

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

```bash
npm run dev
```

#### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔄 How It Works

1. **User registers/logs in** securely with JWT-based authentication
2. **Uploads a resume** (PDF, max 5MB)
3. **Text is extracted** from the PDF and validated
4. **Google Gemini AI parses** the resume into structured JSON sections
5. **AI scores the resume** (0–100) and generates issues, strengths & keyword insights
6. **Weak bullet points are rewritten** with stronger, quantified language
7. **Results are displayed** on the dashboard with score history & insights
8. **User can re-upload** to track improvement over time via version history

---

## 🎯 Internship Task Requirements Covered

| Requirement | Status |
|---|---|
| Modern landing page | ✅ Done |
| Secure authentication (JWT + bcrypt) | ✅ Done |
| Resume upload with validation | ✅ Done |
| PDF text extraction | ✅ Done |
| AI-based structured parsing (Gemini) | ✅ Done |
| ATS scoring system | ✅ Done |
| AI issues, strengths & bullet rewrites | ✅ Done |
| Keyword analysis | ✅ Done |
| Dashboard & insights with charts | ✅ Done |
| Version history & activity feed | ✅ Done |
| Rate limiting & request validation | ✅ Done |
| Light/Dark mode | ✅ Done |
| Deployment on Vercel | ✅ Done |

---

## 👨‍💻 Developer

**Muhammad Ahmed** 
- 🌐 Portfolio: [ahmeddevx07.vercel.app](https://ahmeddevx07.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/your-linkedin](https://linkedin.com/in/ahmedevx07)
- 🐙 GitHub: [github.com/AhmedDevx07](https://github.com/AhmedDevx07)

---

## 🏢 Internship

Built as part of the **Internee.pk Internship Program** — Pakistan's leading virtual internship platform.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by [Muhammad Ahmed](https://github.com/AhmedDevx07)

</div>
