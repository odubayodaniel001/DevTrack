# DevTrack — Codex Operating Contract

## Mission
Build the approved single-user DevTrack MVP efficiently, with a limited Codex prompt budget.

## Read first
Read `docs/PROJECT_BRIEF.md`, `docs/REQUIREMENTS.md`, `docs/DESIGN_SYSTEM.md`, `docs/PLAN.md`, `docs/PROGRESS.md`, and relevant `docs/DECISIONS.md` entries. Do not repeatedly read long logs unless necessary.

## Non-negotiable
- Stack: `index.html`, `style.css`, `script.js`; vanilla HTML/CSS/JS, no framework/backend/build step.
- Separate Dashboard, Projects and Tasks views in the same HTML document, controlled by JS.
- Do not invent product behavior; identify ambiguity before implementation.
- Ask for approval **before each implementation batch**. After approval, finish all work within that batch without unnecessary intermediate questions.
- Do not add dependencies, analytics, network services, or unrelated features.
- Use semantic HTML, keyboard-operable controls, accessible labels and visible focus styles.
- Do not claim tests passed unless actually executed; distinguish static checks, manual checks and untested items.
- Never overwrite existing user data without confirmation.
- Keep code easy for a beginner to explain; use descriptive functions and concise comments.
- Never silently alter requirements or decisions.

## Prompt-budget protocol
- Read documentation once at session start; use `PROGRESS.md` for subsequent context.
- Group related work into bounded batches; avoid one prompt per tiny function.
- For each approved batch: implement, run available checks, fix obvious issues, update plan/progress/log, then provide one concise report.
- Ask only blocking questions; collect them together.
- Avoid full-file rewrites for cosmetic changes.
- Include changed files, completed requirement IDs, test evidence, known issues and next batch in reports.

## Source-of-truth order
1. Approved `docs/REQUIREMENTS.md`
2. `docs/DECISIONS.md` (latest approved decision)
3. `docs/DESIGN_SYSTEM.md`
4. `docs/PLAN.md`
5. `docs/PROGRESS.md`

If sources conflict, stop and report the conflict rather than guessing.
