# DevTrack

*Plan. Build. Track. Deliver.*

DevTrack is a planned responsive project and task tracker for individual developers and freelancers.

> **Status:** Documentation starter only. The application has **not yet been implemented**.

## Stack
HTML5, CSS3, vanilla JavaScript, browser localStorage. No backend or build tools.

## Planned features
Project and task CRUD, status/priority/due dates, search and filters, dashboard metrics, project progress, theme switcher, and opt-in sample data.

## Windows setup
1. Extract this package into a folder named `DevTrack`.
2. Open the folder in VS Code.
3. Open the integrated terminal (PowerShell).
4. Run `git init`.
5. Run `git add .`.
6. Run `git commit -m "docs: initialize DevTrack project"`. If Git asks for identity, configure `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"` using your actual details, then retry.
7. Read `docs/PLAN.md` and `docs/PROGRESS.md`.
8. Start Codex in this folder and paste `.ai/commands/01-start-session.md` (or use its text as the prompt). Do not approve code generation until its plan is reviewed.

## Running the app
Not available yet. After Batch 1, `index.html` can be opened in a browser; a local development server may be preferable for consistent browser behavior.

## Documentation
See `AGENTS.md` for agent rules; `docs/REQUIREMENTS.md` for functionality; `docs/PLAN.md` for work batches; and `docs/TEST_PLAN.md` for verification.

## Data limitations
Planned localStorage data is local to the browser/storage context. Clearing browser site data may remove it. No cloud sync or export is included in MVP.

## AI workflow
Approve each bounded implementation batch; Codex implements and runs available checks, updates progress and implementation log, then reports evidence and asks permission before the next batch.
