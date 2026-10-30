# DevTrack — Implementation Plan

**State:** Batches 1–4 implemented; Batch 4 browser verification remains manual.
**Budget:** Limited Codex free-plan prompts. Prefer ~4–5 substantial, reviewable implementation batches, not one prompt per function.

## Batch 0 — Local setup (manual; no Codex required)
- [ ] Create local project from starter package
- [ ] Verify VS Code, Git and browser
- [ ] Initialize Git and commit documentation baseline
- [ ] Confirm documentation matches approved scope

## Batch 1 — UI shell and design
Requirements: FR-012, FR-016, FR-018, FR-019 (visual aspects)
- [x] Semantic HTML shell with three views and navigation
- [x] Light/dark CSS tokens, theme toggle and responsive layout
- [x] Dashboard cards, project/task UI placeholders, dialogs/forms
- [x] User independently verified layout and browser interaction; no automated browser interaction test was run

## Batch 2 — Projects and persistence
Requirements: FR-001–004, FR-015
- [x] Project data model and versioned localStorage helpers
- [x] Create/edit/list/delete projects with a confirmation dialog
- [x] Validate trimmed names and case-insensitive duplicates; deletion reports actual available task count (zero until Batch 3)
- [x] User manually verified persistence, destructive confirmation and browser behavior

## Batch 3 — Tasks and discovery
Requirements: FR-005–011, FR-020
- [x] Create/edit/delete tasks with persisted status dropdown
- [x] Priority, due date, overdue indicator and stable project accents
- [x] Search, project/status/priority filters, clear action and empty states
- [x] User manually verified task workflows, combined filters and persistence

## Batch 4 — Dashboard, sample data, integration
Requirements: FR-013, FR-014, FR-017 and integration
- [x] Summary counts, overdue count and project-scoped metrics
- [x] Project completion progress bars and accessible percentage text
- [x] Opt-in additive sample data with existing-data confirmation
- [ ] Manually verify dashboard, sample data and integration flows in a browser

## Batch 5 — QA and delivery
- [ ] Run full `TEST_PLAN.md` manually
- [ ] Fix critical and major issues
- [ ] Validate responsive behavior and accessibility basics
- [ ] Complete README and screenshot/demo checklist
- [ ] Final Git commit and optional GitHub push

## Batch completion gate
A batch is complete only when changes are reviewed, relevant checks are executed or marked untested, docs updated and user approves moving forward. Do not claim browser tests were performed if not actually performed.
