# DevTrack — Implementation Plan

**State:** Planning approved; no application features implemented.
**Budget:** Limited Codex free-plan prompts. Prefer ~4–5 substantial, reviewable implementation batches, not one prompt per function.

## Batch 0 — Local setup (manual; no Codex required)
- [ ] Create local project from starter package
- [ ] Verify VS Code, Git and browser
- [ ] Initialize Git and commit documentation baseline
- [ ] Confirm documentation matches approved scope

## Batch 1 — UI shell and design
Requirements: FR-012, FR-016, FR-018, FR-019 (visual aspects)
- [ ] Semantic HTML shell with three views and navigation
- [ ] Light/dark CSS tokens, theme toggle and responsive layout
- [ ] Dashboard cards, project/task UI placeholders, dialogs/forms
- [ ] Verify layout and keyboard navigation manually

## Batch 2 — Projects and persistence
Requirements: FR-001–004, FR-015
- [ ] Project data model and localStorage helpers
- [ ] Create/edit/list/delete projects
- [ ] Validate names, duplicates and cascade deletion
- [ ] Verify persistence and destructive confirmations

## Batch 3 — Tasks and discovery
Requirements: FR-005–011, FR-020
- [ ] Create/edit/delete tasks and status dropdown
- [ ] Priority, due date and overdue indicator
- [ ] Search, status filter, project filter, empty states
- [ ] Verify combined filters, editing and persistence

## Batch 4 — Dashboard, sample data, integration
Requirements: FR-013, FR-014, FR-017 and integration
- [ ] Summary counts and project-scoped metrics
- [ ] Project completion progress bars
- [ ] Opt-in sample data with existing-data protection
- [ ] End-to-end interactions, theme persistence and storage errors

## Batch 5 — QA and delivery
- [ ] Run full `TEST_PLAN.md` manually
- [ ] Fix critical and major issues
- [ ] Validate responsive behavior and accessibility basics
- [ ] Complete README and screenshot/demo checklist
- [ ] Final Git commit and optional GitHub push

## Batch completion gate
A batch is complete only when changes are reviewed, relevant checks are executed or marked untested, docs updated and user approves moving forward. Do not claim browser tests were performed if not actually performed.
