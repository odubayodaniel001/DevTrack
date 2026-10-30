# DevTrack — Functional Requirements (Approved Baseline)

## Definitions
- Project statuses: `Planning`, `Active`, `On Hold`, `Completed`.
- Task statuses: `Pending`, `In Progress`, `Completed`; default `Pending`.
- Task priorities: `Low`, `Medium`, `High`, `Urgent`.
- A task belongs to exactly one existing project.
- A completed task remains completed even if its due date has passed.
- Project progress = completed tasks / all tasks in project × 100. For zero tasks, display 0%.
- Overall task completion = completed tasks / all tasks × 100. For zero tasks, display 0%.

## Projects
**FR-001 Create project:** Required unique name (case-insensitive after trimming); optional description; status chosen from approved statuses; creation timestamp set automatically. Reject empty or whitespace-only names and duplicates with an inline error. Persist immediately.

**FR-002 View projects:** List project name, description, status, task counts and completion percentage. Project list should support selection to see related tasks.

**FR-003 Edit project:** Edit name, description and status. Apply the same validation as creation, excluding the project's own name from duplicate detection. Existing tasks retain their project association.

**FR-004 Delete project:** Show a confirmation dialog naming the project and counting its associated tasks. Confirm deletes project and its tasks; cancel changes nothing. Update dashboard and storage.

## Tasks
**FR-005 Create task:** Required nonblank title, required existing project; optional description and due date; selected status and priority; default status Pending. Save with stable unique ID and creation timestamp. Reject invalid input.

**FR-006 Edit task:** Update title, description, project, status, priority and optional due date; validate before saving.

**FR-007 Delete task:** Ask for confirmation before permanently deleting; cancel preserves the task.

**FR-008 Change status:** Use a dropdown with Pending, In Progress and Completed. Changes update counts, progress and storage immediately. Users may move statuses in any direction.

**FR-009 Search and filter:** Search task titles (case-insensitive); filter by status and by project. Filters combine. All-projects/all-statuses defaults. Display a useful empty-results state.

**FR-010 Due dates and overdue:** Due dates optional. A task is overdue when its due date is before the user's current local calendar date AND its status is not Completed. Show text and visual overdue indicator. Never change status automatically.

**FR-011 Priority:** Show task priority in a readable text label, not color alone.

## Dashboard and navigation
**FR-012 Views:** Separate Dashboard, Projects, Tasks views within one `index.html`; JS switches views without full-page routing. Sidebar on desktop; usable compact navigation on mobile. Active view clearly indicated.

**FR-013 Summary:** Show total projects, total tasks, Pending, In Progress and Completed counts, plus overall completion percentage. All-projects default; selecting a project filters dashboard task counts/progress to that project while total-projects count remains global. Make filter scope clear in UI.

**FR-014 Project progress:** Show progress bars on project cards, based on task completion. Empty projects show 0%.

## Persistence and preferences
**FR-015 Storage:** Use localStorage to save projects/tasks. Load on startup; preserve after refresh. Handle missing, malformed and unavailable storage gracefully without destroying valid data. Do not overwrite corrupt stored data automatically. Use a versioned storage key.

**FR-016 Theme:** Follow system color preference on first use. User can switch light/dark manually. Persist explicit selection; when no manual selection exists, follow system changes.

**FR-017 Sample data:** Show a user-initiated `Load Sample Data` action. Never auto-populate. If existing projects/tasks are present, request confirmation before adding samples; do not silently overwrite existing data. Generated sample IDs must not conflict with existing IDs.

## Usability and quality
**FR-018 Responsive:** Usable on mobile and desktop; avoid horizontal overflow and inaccessible controls.

**FR-019 Accessibility:** Semantic HTML, associated labels, keyboard-operable controls, visible focus, meaningful dialog focus behavior, sufficient contrast, and reduced-motion consideration.

**FR-020 Empty states and feedback:** Clear states for no projects, no tasks, no filter matches; actionable validation errors; understandable confirmation and storage error messages.

## Out of scope
Cloud sync, multi-user access, authentication, export/import, drag-and-drop Kanban, real-time collaboration.

## Implementation notes (not additional features)
- Use `crypto.randomUUID()` where supported, with a safe fallback for IDs.
- Avoid inserting untrusted task/project text through `innerHTML`; prefer `textContent` or safe DOM APIs.
- Keep storage schema explicit and validation defensive.
- Dates are local calendar dates (`YYYY-MM-DD`) rather than UTC instants for overdue comparisons.

## Batch 3 implementation details
- Tasks use the versioned `devtrack-v1-tasks` localStorage key and reference projects by stable project ID.
- Each task stores `id`, `title`, `description`, `projectId`, `status`, `priority`, `dueDate`, `createdAt` and `updatedAt`.
- Project deletion removes only tasks whose `projectId` matches the deleted project; its confirmation count is calculated from the stored task collection.
- Project accent indicators are deterministically derived from project IDs using the documented curated palette, so they remain stable without changing saved project records.

## Batch 4 implementation details
- Dashboard task counts, overdue count and overall completion are calculated from the same current task collection used by the task list.
- The dashboard project selector scopes task-based metrics, recent tasks and completion while the total-project count remains global.
- Project-card progress is calculated from completed associated tasks and displays `0%` for empty projects.
- Sample data is explicitly user-triggered. It adds a coherent, marked sample set without replacing existing records; a confirmation is required when data already exists and repeat loading is prevented.

## Acceptance testing
Detailed cases and evidence checklist live in `TEST_PLAN.md`.
