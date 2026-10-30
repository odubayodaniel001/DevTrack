# DevTrack

*Plan. Build. Track. Deliver.*

DevTrack is a responsive project and task tracker designed for individual developers and freelancers.

> **Status:** Batches 1–4 are implemented and manually tested. Final QA and delivery documentation are in progress.

## Stack

HTML5, CSS3, vanilla JavaScript, and browser localStorage. No backend or build tools are required.

## Features

- Create, edit, and delete projects and tasks.
- Track project and task statuses.
- Set task priorities and due dates.
- Identify overdue tasks without automatically changing their status.
- Search tasks and filter by relevant criteria.
- View dashboard metrics and project progress.
- Filter dashboard metrics by project.
- Switch between light and dark themes.
- Load sample data explicitly without replacing existing records.
- Persist projects, tasks, and theme preferences in browser storage.
- Use a responsive interface designed for desktop and mobile screens.

## Windows Setup

1. Open the project folder in VS Code.
2. Review `docs/PROJECT_BRIEF.md` for the project overview.
3. Review `docs/REQUIREMENTS.md` for functional requirements.
4. Review `docs/PLAN.md` and `docs/PROGRESS.md` for implementation details and current progress.

## Running the App

Open `index.html` in a modern web browser. A local development server may provide more consistent browser behavior.

## Documentation

- `AGENTS.md` — instructions for AI-assisted development.
- `docs/PROJECT_BRIEF.md` — project overview.
- `docs/REQUIREMENTS.md` — functional requirements.
- `docs/PLAN.md` — implementation batches.
- `docs/PROGRESS.md` — completed work and outstanding tasks.
- `docs/TEST_PLAN.md` — manual and technical verification checklist.
- `docs/DECISIONS.md` — recorded project decisions.
- `docs/DESIGN_SYSTEM.md` — visual design guidelines.
- `docs/IMPLEMENTATION_LOG.md` — implementation history.

## Data Limitations

Data is stored locally in the browser using `localStorage`. Clearing browser site data may remove saved projects, tasks, and preferences. The MVP does not include cloud synchronization or data export.

Sample data is added only when the user explicitly requests it. Existing records are preserved.

## AI-Assisted Development Workflow

Work in small, reviewable batches. Verify changes using available checks and manual browser testing. Update project documentation to reflect actual progress and test results. Review changes before committing them to Git.