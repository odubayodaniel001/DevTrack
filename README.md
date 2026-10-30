# DevTrack

*Plan. Build. Track. Deliver.*

DevTrack is a responsive project and task tracker for individual developers and freelancers.

> **Status:** Batches 1–4 are implemented. Final QA and delivery work remain.

## Stack
HTML5, CSS3, vanilla JavaScript, browser localStorage. No backend or build tools.

## Features
Project and task CRUD, status/priority/due dates, search and filters, project-scoped dashboard metrics, project progress, theme switcher, and opt-in sample data.

## Windows setup
1. Open the folder in VS Code.
2. Read `docs/PLAN.md` and `docs/PROGRESS.md` before continuing development.
3. Use Git to review and commit the completed work when ready.

## Running the app
Open `index.html` in a modern browser. A local development server may be preferable for consistent browser behavior.

## Documentation
See `AGENTS.md` for agent rules; `docs/REQUIREMENTS.md` for functionality; `docs/PLAN.md` for work batches; and `docs/TEST_PLAN.md` for verification.

## Data limitations
localStorage data is local to the browser/storage context. Clearing browser site data may remove it. No cloud sync or export is included in MVP. Sample data is added only after an explicit action and never replaces existing records.

## AI workflow
Approve each bounded implementation batch; Codex implements and runs available checks, updates progress and implementation log, then reports evidence and asks permission before the next batch.
