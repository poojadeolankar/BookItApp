# Workshop Flow

Follow the section for your role. Each role has clear steps and handoff points.
When you finish your steps — wait for the next role to complete theirs before continuing.

---

## The Pipeline

```
PM → brd-agent → user-story-agent → plan-agent → Issues + Plan ready
                                                        ↓
Architect → design-agent → assign DATABASE Issues to Copilot
                                                        ↓
Backend Dev → assign BACKEND Issues to Copilot → unit-test-agent
                                                        ↓
UI Dev → assign FRONTEND Issues to Copilot
                                                        ↓
QA → playwright-agent → run tests
```

---

## How Agents Work

1. Go to your repo on your GitHub Enterprise instance → click the **Agents tab**
2. Click **New session**
3. Click the agent dropdown → select the agent you want
4. Type your instruction and press Enter
5. The agent works autonomously and raises a **Pull Request**
6. You review the PR and merge it — or add a comment asking for changes

> You do not write code. You review what the agent produces and decide if it is good enough.

---

## How to Review a Pull Request

1. Go to the **Pull Requests tab** on GitHub
2. Open the PR raised by the agent
3. Click **Files changed** to see what was produced
4. Check the items listed in your role's review checklist below
5. If satisfied → click **Merge pull request**
6. If not → scroll to the bottom → leave a comment describing what needs changing
   → the agent will update and push again

---

## 🟦 PM — Product Manager

You go first. No one can start until you finish.

### Step 1 — Create the BRD

Go to the **Agents tab** → New session → select **brd-agent** and type:
```
Create a BRD from Issue #1  -- Note issue number could be different in your case. Enter appropriate number
```

Wait for the agent to raise a PR with `docs/requirements/BRD.md`

**Review — check these things:**
- The feature described in Issue #1 is fully captured
- There is a numbered list of Functional Requirements (FR-001, FR-002 etc.)
- Out of scope items are explicitly listed
- Nothing important from Issue #1 is missing

**Merge when satisfied.**

---

### Step 2 — Create User Stories

Go to the **Agents tab** → New session → select **user-story-agent** and type:
```
Create user stories from the BRD
```

Wait for the agent to raise a PR with files in the `issues/` folder.

**Review — check these things:**
- File names use the correct domain language (e.g. `database-room-catalogue.md` not `database-items.md`)
- Every issue file has an `## Assignment Order` section at the top
- The DATABASE issue has a `## Seed Data` section
- The FRONTEND issue lists `data-testid` values for every interactive element
- The PLAYWRIGHT issue references the same `data-testid` values as the FRONTEND issue

**Merge when satisfied.**

> After you merge, GitHub Actions automatically creates the Issues with labels.
> Check the **Issues tab** — you should see all issues appear within 1-2 minutes.

**Hand off to next step** — do not hand off to Architect yet.

---

### Step 3 — Create Sprint Plan

Go to the **Agents tab** → New session → select **plan-agent** and type:
```
Create a sprint plan from the BRD and Issues
```

Wait for the agent to raise a PR with `docs/requirements/plan.md`

**Review — check these things:**
- Every Issue file in the `issues/` folder appears in the sprint table
- Sprint 1 = primary slice only (not all issues at once)
- DATABASE steps come before BACKEND, which come before FRONTEND — within every sprint
- Every BRD Functional Requirement (FR-001 etc.) appears in the Traceability table
- The Risk Register has at least 3 risks with mitigations

**Merge when satisfied.**

**Hand off to Architect** — tell them Issues and plan are ready.

---

## 🟨 Architect

Wait for PM to merge both PRs and confirm Issues are visible in the Issues tab.

### Step 1 — Create Design Document

Go to the **Agents tab** → New session → select **design-agent** and type:
```
Create the design document and schema from the BRD and Issues
```

Wait for PR with `docs/design/design-doc.md` and updated `src/backend/prisma/schema.prisma`

**Review — check these things:**
- Every model mentioned in the DATABASE Issue exists in `schema.prisma`
- Relations between models look correct (foreign keys, one-to-many etc.)
- The `data-testid` values in the design doc match the FRONTEND Issue exactly
- The pre-built `User` model is unchanged

**Merge when satisfied.**

---

### Step 2 — Assign DATABASE Issues to Copilot

Open the **Issues tab**. Find the issue labelled `database` with the lowest Assignment Order step.

Open it → read the `## Assignment Order` section → it tells you exactly when to assign it.

Assign it to Copilot:
```
Issues tab → open [DATABASE] Issue → Assignees → select Copilot
```

> If Copilot does not appear as an assignee option — coding agent is not
> enabled for your account. Contact your IT or admin team.

Wait for PR with updated schema, migration files, and seed data.

**Optional — use review-agent to check the PR automatically:**
```
Agents tab → New session → review-agent → "Review the PR for Issue #N"
```
The review-agent will post a structured pass/fail checklist as a PR review comment.

**If reviewing manually, check these things:**
- Migration runs without errors (check the PR description)
- `seed.ts` has at least 3 realistic sample records for domain tables
- The pre-built `User` model and test user seed are unchanged
- No frontend or backend route files were modified
- All categorical fields (status, type) use Prisma `enum` — not `String`

**Merge → then assign the next DATABASE Issue (if any) following Assignment Order.**

**Hand off to Backend Dev** once all DATABASE Issues are merged.

---

## 🟥 Backend Dev

Wait for Architect to confirm all DATABASE Issues are merged.

### Step 1 — Assign BACKEND Issues to Copilot

Open the **Issues tab**. Find the issue labelled `backend` with the lowest Assignment Order step.

Open it → read the `## Assignment Order` section → it tells you exactly when to assign it.

Assign it to Copilot:
```
Issues tab → open [BACKEND] Issue → Assignees → select Copilot
```

> If Copilot does not appear as an assignee option — coding agent is not
> enabled for your account. Contact your IT or admin team.

Wait for PR with new files in `src/backend/routes/` and `src/backend/controllers/`

**Optional — use review-agent to check the PR automatically:**
```
Agents tab → New session → review-agent → "Review the PR for Issue #N"
```
The review-agent will post a structured pass/fail checklist as a PR review comment.

**If reviewing manually, check these things:**
- All endpoints listed in the Issue are implemented
- Every protected endpoint uses the auth middleware
- Business rules are enforced (e.g. double booking check, capacity limit)
- No frontend files were modified
- Response shapes match what the Issue specifies
- No `any` types used in TypeScript

**Merge → then assign the next BACKEND Issue (if any) following Assignment Order.**

---

### Step 2 — Generate Unit Tests

Once all BACKEND Issues are merged, go to the **Agents tab** → New session → select **unit-test-agent** and type:
```
Generate Jest unit tests from the [BACKEND] Issue
```

Wait for PR with test files in `src/backend/__tests__/`

**Review — check these things:**
- Every endpoint has at least a happy path test and an auth test
- No production code files were modified — test files only

**Merge when satisfied.**

**Hand off to UI Dev.**

---

## 🟩 UI Dev

Wait for Backend Dev to confirm all BACKEND Issues are merged.

### Step 1 — Assign FRONTEND Issues to Copilot

Open the **Issues tab**. Find the issue labelled `frontend` with the lowest Assignment Order step.

Open it → read the `## Assignment Order` section → it tells you exactly when to assign it.

Assign it to Copilot:
```
Issues tab → open [FRONTEND] Issue → Assignees → select Copilot
```

> If Copilot does not appear as an assignee option — coding agent is not
> enabled for your account. Contact your IT or admin team.

Wait for PR with new pages and components in `src/frontend/src/`

**Optional — use review-agent to check the PR automatically:**
```
Agents tab → New session → review-agent → "Review the PR for Issue #N"
```
The review-agent will post a structured pass/fail checklist as a PR review comment.

**If reviewing manually, check these things:**
- The HomePage no longer shows "Features coming soon"
- Every `data-testid` value listed in the Issue is present on the correct element
- The UI calls the correct API endpoints (check the Issue for endpoint paths)
- No backend files were modified
- No `any` types used in TypeScript

**Merge → then assign the next FRONTEND Issue (if any) following Assignment Order.**

**Hand off to QA Engineer.**

---

## 🟪 QA Engineer

Wait for UI Dev to confirm all FRONTEND Issues are merged.

### Step 1 — Generate Playwright Tests

Go to the **Agents tab** → New session → select **playwright-agent** and type:
```
Generate Playwright tests from the [PLAYWRIGHT] Issue
```

Wait for PR with test files in `e2e/`

**Review — check these things:**
- All selectors use `data-testid` — no CSS class selectors or text content selectors
- The full user journey from the PLAYWRIGHT Issue is covered
- Login is handled in `beforeEach` — not repeated inside every test
- The PR description notes any missing `data-testid` values

**Merge when satisfied.**

---

### Step 2 — Run the Tests

Make sure both servers are running:

```bash
# Terminal 1
cd src/backend && npm run dev

# Terminal 2
cd src/frontend && npm run dev
```

Run Playwright:
```bash
npx playwright test --ui
```

**All green = done ✅**

---

## Troubleshooting

**Agent not in the dropdown**
- Refresh the page and try again
- If still missing — coding agent may not be enabled for your account
- Contact your IT or admin team — this is not a repo setting

**Copilot not available as assignee on an Issue**
- Coding agent is not enabled for your account
- Contact your IT or admin team — not your facilitator

**PR raised but looks wrong**
- Scroll to the bottom of the PR
- Leave a comment describing what needs fixing
- The agent will update and push again — do not close the PR

**Issues not created after PM merges**
- Check the **Actions tab** for a failed workflow run
- Tell your facilitator — this is a setup issue not your fault

**Frontend shows a blank page**
- The DATABASE seed data may be missing
- Tell your facilitator

**Playwright test fails with "element not found"**
- A `data-testid` is missing from a component
- Open the component file, add the missing attribute, re-run the tests

**App shows wrong name in the browser tab**
- Check `src/frontend/.env` has `VITE_APP_NAME` set correctly
- Restart the frontend dev server after editing `.env`

**Login does not work**
```
Email:    test@example.com
Password: password123
```
- If still failing — run `cd src/backend && npx prisma db seed`
