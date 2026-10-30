# DevTrack — Design System

## Identity
Text-only wordmark `DevTrack`; tagline optional: *Plan. Build. Track. Deliver.*
Typeface: Inter, with system-ui fallback. External font loading is allowed, but the app must remain usable without it.

## Light tokens — Deep Ocean
- `--primary: #087EA4`
- `--background: #F4F9FC`
- `--surface: #FFFFFF`
- `--text: #102A43`
- `--muted: #627D98`
- `--border: #D9E6EF`
- `--surface-muted: #DDF4FC`

## Dark tokens — Deep Ocean
- `--primary: #38BDF8`
- `--background: #071521`
- `--surface: #0D1B2A`
- `--text: #E6F4FF`
- `--muted: #9BB3C8`
- `--border: #203749`
- `--surface-muted: #123B56`

## Semantic tokens
- Pending: amber `#F59E0B`
- In progress: blue `#3B82F6`
- Completed: green `#10B981`
- Destructive/error: red `#EF4444`
Use legible foreground/background combinations and text labels alongside colors.

## Task and project indicators
- Task status badges use amber for Pending, blue for In Progress and green for Completed.
- Priority badges retain text labels and use neutral gray for Low, blue for Medium, orange for High and red for Urgent.
- An incomplete task due before the current local calendar date uses a red overdue label. Completed tasks are never shown as overdue.
- Project identity uses a small accent dot and optional project-card border selected deterministically from a restrained ocean-blue, teal, sea-green and blue-gray palette using the project ID. Project accents never replace status, priority or overdue indicators.

## Layout
Desktop sidebar + main panel. Views: Dashboard, Projects, Tasks.
Mobile: compact, accessible navigation; stacked cards and touch-friendly controls.
Suggested spacing scale: 4, 8, 12, 16, 24, 32 px.
Suggested radius: 10–14 px for cards/inputs.
Subtle shadows, short transitions, restrained hover states. Respect `prefers-reduced-motion`.

## Components
Navigation links, theme toggle, metric cards, project cards, progress bars, task rows/cards, search and filter controls, forms, confirmation dialogs, empty states and notifications.

Primary actions, links and progress bars use the ocean primary token. The active navigation item uses `--surface-muted`, primary text and a slim primary indicator. Keep headings in the text token rather than applying blue to ordinary content. Buttons, controls and dialogs must retain clear hover, disabled and focus states in both themes.

## States
Default, hover, focus, disabled, loading (only if actually necessary), empty, error, success.

## Design acceptance
Readable at 320 px viewport width, no page-level horizontal overflow, visible keyboard focus, and usable light/dark contrast. These are design targets requiring browser verification.
