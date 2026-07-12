# 🧞 Genie — AI Study Assistant

**Turn any lecture into a study session in seconds.**

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)](#)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=googlegemini&logoColor=white)](#)
[![Status](https://img.shields.io/badge/Status-Active%20Development-orange)](#)

</div>

---

## 📖 Overview

**Genie** is an AI-powered study platform that turns raw notes into ready-to-use study material. Paste your notes or upload a document, and Genie summarizes them, generates a full multiple-choice quiz with instant scoring and AI feedback, builds an exam-focused cheat sheet, or checks your notes for factual accuracy and gaps — all backed by Google Gemini. A built-in AI chat tutor is also available for open-ended questions, explanations, and revision help.

Every workspace you create is automatically saved to MongoDB, so your summaries, quizzes, cheat sheets, verification reports, and chat history are all there when you come back.

---

## ✨ Key Features

- 📝 **AI Notes Summarizer** — condenses long notes into a clear, structured summary
- 📚 **Quiz Generator** — 10 auto-generated MCQs with a full results screen (score, grade, stats, per-question review, and AI performance analysis)
- ⚡ **Cheat Notes** — exam-focused revision sheets with key definitions, comparison tables, mnemonics, and common mistakes
- ✅ **Verify Notes** — checks notes for factual accuracy, missing concepts, and gives a quality score out of 10
- 💬 **AI Study Chatbot** — a persistent-context tutor that explains concepts, quizzes you, and helps you revise
- 🗂️ **Persistent Workspaces** — every result is saved to MongoDB and restorable from the History page
- 🎨 **Modern, Responsive UI** — glassmorphism, smooth animations, and a consistent indigo/purple design system across every page

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router |
| Icons | Lucide React |
| Markdown Rendering | react-markdown, remark-gfm, rehype-highlight, highlight.js |
| Backend | Node.js, Express.js |
| AI | Google Gemini API (`@google/genai`) |
| Database | MongoDB Atlas + Mongoose |
| Architecture | Modular MVC-style (routes → controllers → services) on the backend |

---

## 📁 Folder Structure

```
genie/
├── src/                          # Frontend (React + Vite)
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── landing/               # Hero, Features, HowItWorks, Testimonials, CtaBand
│   │   ├── auth/                  # BrandingPanel, GoogleButton
│   │   ├── workspace/             # Sidebar, Topbar, UploadSection, AiActions, quiz/, chat/
│   │   ├── history/                # HistoryCard
│   │   ├── shared/                 # MarkdownRenderer
│   │   └── ui/                     # Button, Card, Input, Checkbox, Textarea, Eyebrow
│   ├── pages/
│   │   ├── Landing/
│   │   ├── Login/
│   │   ├── Workspace/
│   │   └── History/
│   ├── services/                  # Frontend API clients (summarizeApi, quizApi, chatApi, ...)
│   ├── data/                      # Static content (features, testimonials, workspace actions)
│   ├── lib/                       # Shared utilities
│   └── styles/                    # Global fonts & animations
│
└── backend/
    ├── server.js
    ├── app.js
    ├── config/                    # gemini.js, db.js
    ├── models/                    # Workspace.model.js
    ├── routes/                    # summarize, quiz, analysis, chat, cheatnotes, verify, workspace
    ├── controllers/
    ├── services/                  # Gemini logic per feature
    └── utils/                     # promptTemplates.js
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or later recommended)
- A MongoDB Atlas cluster
- A Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/genie.git
cd genie
```

### 2. Set up the backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` (see [Environment Variables](#-environment-variables) below), then start the server:
```bash
node server.js
```
The backend runs on `http://localhost:5000` by default.

### 3. Set up the frontend
```bash
cd ..
npm install
npm run dev
```
The frontend runs on `http://localhost:5173` by default.

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder with the following:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/genie?retryWrites=true&w=majority

# Server
PORT=5000
```

> ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

---

## 📸 Screenshots

<div align="center">

| Landing Page | AI Workspace |
|---|---|
| <img width="1902" height="991" alt="Screenshot 2026-07-12 124126" src="https://github.com/user-attachments/assets/7c800673-9b2a-425a-a6dd-491723842090" /> | <img width="1901" height="982" alt="Screenshot 2026-07-12 124240" src="https://github.com/user-attachments/assets/9324affe-0220-447e-adcd-39baa5499364" /> |

| Quiz Results | Cheat Notes |
|---|---|
| <img width="1900" height="982" alt="image" src="https://github.com/user-attachments/assets/b9703edd-fa6f-4c31-8c59-4db6c669b79a" />| <img width="1901" height="982" alt="Screenshot 2026-07-12 212502" src="https://github.com/user-attachments/assets/8c10c59b-ce20-42a1-b880-7d693e95e269" />|

</div>

---

## 🚧 Future Improvements

- 🔐 User authentication (schema already designed to support a `userId` field with minimal changes)
- 📄 File upload parsing for PDF/DOCX (currently paste-only)
- 🔍 Search and filtering on the History page
- 📤 Real file export for the Download button (currently UI-only)
- 🌐 Deployment to a live environment

---

## 📄 License


---

<div align="center">

If you found this project useful or interesting, consider giving it a ⭐ — it helps a lot!

Made with 🧠 and a lot of ☕ by the Genie team.

</div>
