# Agentic SDLC Workshop

A hands-on workshop where a team of 5 takes a single business requirement
all the way to tested, working code — using AI agents at every step.

---

## What You Will Build

You will be given a feature requirement on the day. Starting from a bare app
with only login and registration working, your team will use AI agents to:

- Write a Business Requirements Document
- Break it into technical Issues
- Design the data model and API
- Build the backend and frontend
- Generate and run end-to-end tests

Everything is built during the workshop. Nothing is pre-built except auth.

---

## Before You Arrive — Prerequisites

### Tools — Install these before the workshop day

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18 or higher | `node --version` |
| Git | Any recent | `git --version` |
| VS Code | Latest | — |

### GitHub Access — Required

| Requirement | Details |
|-------------|---------|
| GitHub Enterprise account | Your organisation's GitHub Enterprise instance |
| GitHub Copilot Enterprise licence | Required to use the Agents tab and coding agent |
| Collaborator access to workshop repo | Your facilitator adds you before the workshop |

> ⚠️ **Confirm with your IT or admin team before the workshop day:**
> Copilot coding agent must be enabled for your account at the
> organisation or enterprise level. Having a Copilot licence alone
> is not sufficient — your admin must explicitly enable coding agent.
> If the **Agents tab** is not visible in your repo on the workshop day,
> contact your IT or admin team — not your facilitator.

---

## Setup — Do This Before the Workshop Starts

### 1. Clone the workshop repo

Your facilitator will share the workshop repo URL before the workshop.

```bash
git clone https://[your-enterprise]/[your-org]/[AppName].git
cd [AppName]
```

### 2. Install dependencies

```bash
# Backend
cd src/backend && npm install

# Frontend — open a new terminal
cd src/frontend && npm install
```

### 3. Set up environment files

```bash
# Backend — no changes needed, defaults work
cp src/backend/.env.example src/backend/.env

# Frontend — your facilitator will tell you the app name
cp src/frontend/.env.example src/frontend/.env
```

Open `src/frontend/.env` and set the app name your facilitator gives you:
```
VITE_APP_NAME="[AppName]"
```

### 4. Set up the database

```bash
cd src/backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Start the app

```bash
# Terminal 1 — backend (port 3001)
cd src/backend && npm run dev

# Terminal 2 — frontend (port 5173)
cd src/frontend && npm run dev
```

### 6. Verify it works

Open http://localhost:5173 in your browser.

Login with:
```
Email:    test@example.com
Password: password123
```

You should see a page that says **"Features coming soon"** after login.
This is correct — the feature is built during the workshop.

---

## After Merging Agent PRs — Run This Every Time

Each time the coding agent raises a PR and you merge it, run these steps
before starting the app. Skipping them causes TypeScript errors or a blank/broken UI.

```bash
cd src/backend

# 1. Install any new packages the agent added to package.json
npm install

# 2. Apply any new database migrations (new tables, columns)
npm run db:migrate

# 3. Regenerate the Prisma client to match the updated schema
npm run db:generate

# 4. Load seed data so the UI shows real records (not a blank page)
npm run db:seed
```

> **Why is this needed?**
> The coding agent adds new npm packages, Prisma models, and seed data as part of
> its implementation. When you pull those changes locally, the Prisma client is
> out of date and the database tables don't exist yet — these four commands bring
> your local environment in sync with what the agent built.

Then start (or restart) the backend:

```bash
npm run dev
```

---

## Your Role

Your facilitator will assign you one of these roles:

| Role | What You Do |
|------|-------------|
| PM | Write requirements, create Issues |
| Architect | Design the system, assign DATABASE work |
| Backend Dev | Build the API, generate unit tests |
| UI Dev | Build the frontend components |
| QA Engineer | Generate and run Playwright tests |

See `workshop/workshop-flow.md` for exactly what your role does during the workshop.

---

## Where Agents Live

All agents are on your GitHub Enterprise instance — not in VS Code.

```
[your-enterprise] → your repo → Agents tab → New session → agent dropdown
```

You will find: `brd-agent`, `user-story-agent`, `design-agent`,
`unit-test-agent`, `playwright-agent`

> If the **Agents tab** is not visible — coding agent is not enabled
> for your account. Contact your IT or admin team, not your facilitator.

---

## Tech Stack

```
Backend   Node.js + Express + Prisma + SQLite
Frontend  React + Vite + TypeScript
Tests     Jest (unit) + Playwright (e2e)
Database  SQLite (local file — no setup needed)
```
