# DevTrack — Design System

## Identity
Text-only wordmark `DevTrack`; tagline optional: *Plan. Build. Track. Deliver.*
Typeface: Inter, with system-ui fallback. External font loading is allowed, but the app must remain usable without it.

## Light tokens
- `--primary: #4F46E5`
- `--background: #F8FAFC`
- `--surface: #FFFFFF`
- `--text: #0F172A`
- `--muted: #64748B`
- `--border: #E2E8F0`

## Dark tokens
- `--primary: #818CF8`
- `--background: #0B1120`
- `--surface: #111827`
- `--text: #F8FAFC`
- `--muted: #94A3B8`
- `--border: #334155`

## Semantic tokens
- Pending: amber `#F59E0B`
- In progress: blue `#3B82F6`
- Completed: green `#10B981`
- Destructive/error: red `#EF4444`
Use legible foreground/background combinations and text labels alongside colors.

## Layout
Desktop sidebar + main panel. Views: Dashboard, Projects, Tasks.
Mobile: compact, accessible navigation; stacked cards and touch-friendly controls.
Suggested spacing scale: 4, 8, 12, 16, 24, 32 px.
Suggested radius: 10–14 px for cards/inputs.
Subtle shadows, short transitions, restrained hover states. Respect `prefers-reduced-motion`.

## Components
Navigation links, theme toggle, metric cards, project cards, progress bars, task rows/cards, search and filter controls, forms, confirmation dialogs, empty states and notifications.

## States
Default, hover, focus, disabled, loading (only if actually necessary), empty, error, success.

## Design acceptance
Readable at 320 px viewport width, no page-level horizontal overflow, visible keyboard focus, and usable light/dark contrast. These are design targets requiring browser verification.
