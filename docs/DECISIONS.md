# DevTrack — Decision Register

All entries below are approved by the user unless marked `Proposed`.

| ID | Decision | Rationale |
|---|---|---|
| DEC-001 | Vanilla HTML/CSS/JS; three main source files | Beginner-explainable, low setup and prompt cost |
| DEC-002 | Browser localStorage; no backend | Simple offline-capable data persistence in same browser |
| DEC-003 | Three in-page views: Dashboard, Projects, Tasks | Organized UX without router/framework |
| DEC-004 | Target individual developers and freelancers | Clear initial audience |
| DEC-005 | Unique project names, case-insensitive | Avoid ambiguous project labels |
| DEC-006 | Project statuses: Planning, Active, On Hold, Completed | Explicit lifecycle |
| DEC-007 | Task statuses: Pending, In Progress, Completed | Simple progress tracking |
| DEC-008 | Priorities: Low, Medium, High, Urgent | Flexible urgency labeling |
| DEC-009 | Due dates optional; overdue is visual only | Avoid unexpected automatic state changes |
| DEC-010 | Project deletion confirms task count and cascades | Clear destructive consequence |
| DEC-011 | Initial theme follows system; manual choice persists | User control with sensible default |
| DEC-012 | Sample data only on explicit click | Avoid unexpected data |
| DEC-013 | Dashboard defaults to all tasks; optional project filter | Overview plus focus |
| DEC-014 | Codex asks approval before each bounded implementation batch | Preserve user control and conserve limited prompts |
| DEC-015 | Inter; text-only wordmark; modern, restrained visual style | Clean developer productivity identity |
| DEC-016 | No fixed delivery deadline | Quality-first staged implementation |
| DEC-017 | No JSON backup/export in MVP | Scope control |
| DEC-018 | Derive project accent colors deterministically from project IDs | Keeps project identification stable without adding a user-managed color setting or migrating saved projects |
| DEC-019 | Sample data appends after confirmation when data exists | Protects user records while preserving an easy way to explore the application |

## Trade-offs
- localStorage is browser-specific, not synced or backed up; clearing site data can remove work.
- One JS file simplifies setup but requires internal organization as features grow.
- Codex quota cannot be guaranteed; reduce calls through clear, bounded prompts.

## Change procedure
Add a dated new decision with rationale, update requirements/design/plan, and request approval before implementation. Never erase historical decisions.
