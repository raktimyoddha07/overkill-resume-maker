# Overkill Resume Maker

A professional, local-first Next.js web application designed to help you construct ATS-friendly, pixel-perfect resumes using raw HTML and CSS. The editor enforces strict A4 dimensions (794px × 1123px) and compiles layouts directly into clean PDF documents using an embedded headless browser.

---

## Key Features

- **🚀 Two-Pane Live Workspace**: Real-time rendering split-screen interface built on Shadcn UI.
- **🎨 Premium Theme Engine**: A unified OKLCH-based theme toggle supporting responsive light and dark themes.
- **💻 VS Code-Style Editors**: HTML and CSS editors powered by CodeMirror, featuring:
  - Smart tab indentation (`indentWithTab`).
  - Active line highlighting & bold line numbers.
  - Fade-in folding gutters (arrows hover-visible) identical to VS Code.
- **📁 Customizable Local Assets**: Upload images (PNG, JPG, SVG, WebP, etc.) to use directly inside your resume. The storage path is fully configurable using the `.env` file (`UPLOADS_DIR`).
- **🤖 Built-in AI Guide**: Dedicated prompt library (`/ai-guide`) to copy-paste rules and constraints directly into any LLM (Claude, ChatGPT, Gemini) for error-free resume code generation.
- **📖 Local Rulebook**: Reference sheet (`/rulebook`) of allowed HTML tags, styling guidelines, and ATS recommendations.
- **📄 Selected PDF Export**: High-fidelity PDF downloads powered by Puppeteer that preserve hyperlinks and native text nodes for ATS scanners.

---

## Getting Started

### 1. Requirements

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (for state saving/autosaves)

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/raktimyoddha07/overkill-resume-maker.git
cd overkill-resume-maker
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (based on `.env.example`):

```env
# PostgreSQL connection string for Prisma
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resume_maker"

# Local uploads folder path (absolute or relative)
UPLOADS_DIR="uploads"
```

Apply migrations and generate the database client:

```bash
npx prisma migrate dev --name init
```

### 4. Running the Development Server

Start the application locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to use the AI Prompt Guide

1. Open the **AI Guide** page from the editor navbar.
2. Click **Copy Prompt** for your preferred prompt (Quick Start, Technical, or Refine).
3. Paste the prompt into your AI model (e.g. Claude) and append your personal resume information.
4. Paste the generated HTML into the HTML editor and the CSS into the CSS editor.
5. Click **▶ Compile** and download your print-ready PDF!
