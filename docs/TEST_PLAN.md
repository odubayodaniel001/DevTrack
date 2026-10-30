# DevTrack — Test Plan

## Testing Notes

- Test results are recorded as **Pass**, **Fail**, or **Not Tested**.
- The user reported successful manual browser testing for Batches 1–3 overall.
- All Batch 4 manual verification checks were reported as passed on 2026-10-30.
- A passing batch does not automatically mean every individual test case has been verified.
- No automated browser interaction testing was available during development.
- Results below reflect the evidence currently available.

## Test Results

| ID | Scenario | Expected Result | Status | Evidence / Notes |
|---|---|---|---|---|
| T-01 | Create project with valid name | Project appears and persists | Not Tested | No individual test record |
| T-02 | Create blank/whitespace project | Inline validation; nothing saved | Not Tested | No individual test record |
| T-03 | Create case-insensitive duplicate project | Rejected | Not Tested | No individual test record |
| T-04 | Edit project | Changes persist; task links remain | Not Tested | No individual test record |
| T-05 | Cancel project deletion | Project and tasks remain | Not Tested | No individual test record |
| T-06 | Confirm project deletion with tasks | Correct task count warned; project and tasks removed | Not Tested | No individual test record |
| T-07 | Create task with required fields | Saved with Pending default | Not Tested | No individual test record |
| T-08 | Invalid task title / missing project | Validation blocks save | Not Tested | No individual test record |
| T-09 | Edit task and change project | Changes persist | Not Tested | No individual test record |
| T-10 | Change task status via dropdown | Counts and progress update | Not Tested | No individual test record |
| T-11 | Delete task cancel/confirm | Correct preservation/removal | Not Tested | No individual test record |
| T-12 | Search task title mixed case | Matching results shown | Not Tested | No individual test record |
| T-13 | Combine status and project filters | Intersection of filters shown | Not Tested | No individual test record |
| T-14 | Task due yesterday and incomplete | Overdue indicator appears | Pass | User-reported manual browser testing, 2026-10-30 |
| T-15 | Completed task due yesterday | Not marked overdue | Pass | User-reported manual browser testing, 2026-10-30 |
| T-16 | No tasks in project | Progress shows 0% | Not Tested | No individual test record |
| T-17 | Dashboard all projects vs one project | Counts scope correctly; project total global | Not Tested | No individual test record |
| T-18 | Refresh page | Projects/tasks/theme preference persist | Not Tested | No individual test record |
| T-19 | First visit with device dark preference | Dark theme selected | Pass | User-reported manual browser testing, 2026-10-30 |
| T-20 | Manual theme override | Choice persists after refresh | Pass | User-reported manual browser testing, 2026-10-30 |
| T-21 | Sample data button | Adds only when clicked; protects existing data | Pass | User-reported manual browser testing, 2026-10-30 |
| T-22 | Empty project/task/search result | Useful empty states | Not Tested | No individual test record |
| T-23 | Mobile at 320px and common desktop widths | No horizontal overflow; usable navigation | Pass | User-reported manual browser testing, 2026-10-30 |
| T-24 | Keyboard-only navigation | Controls usable; focus visible; dialog focus sensible | Pass | User-reported manual browser testing, 2026-10-30 |
| T-25 | Reduced motion setting | Nonessential motion reduced | Pass | User-reported manual browser testing, 2026-10-30 |
| T-26 | Corrupted storage payload | Graceful error; no silent overwrite | Not Tested | No individual test record |
| T-27 | Browser storage unavailable | Informative error; app does not crash | Not Tested | No individual test record |
| T-28 | Reload after deletion | Deleted records stay deleted | Not Tested | No individual test record |
| T-29 | Filter by priority and search task description | Combined matching tasks shown without storage changes | Not Tested | No individual test record |
| T-30 | Task due today | Not marked overdue | Pass | User-reported manual browser testing, 2026-10-30 |
| T-31 | Project accent after edit and refresh | Same project ID retains its accent | Not Tested | No individual test record |
| T-32 | Dashboard metrics and project scope | Counts and completion match selected scope; total projects remains global | Pass | User-reported manual browser testing, 2026-10-30 |
| T-33 | Project progress | Empty, partial, and completed projects display correct percentages | Pass | User-reported manual browser testing, 2026-10-30 |
| T-34 | Load sample data on empty app | Example projects/tasks appear only after explicit action | Pass | User-reported manual browser testing, 2026-10-30 |
| T-35 | Load sample data with existing records | Confirmation appears; existing records remain and sample data is added once | Pass | User-reported manual browser testing, 2026-10-30 |

## Technical Checks

| Check | Expected Result | Result |
|---|---|---|
| `node --check script.js` | No JavaScript syntax errors | Passed |
| `git diff --check` | No whitespace errors | Passed during previous verification |

These technical checks must be rerun before final delivery.

## Remaining Verification

The test cases still marked **Not Tested** have no individual result recorded in this document. They should not be considered passed solely because earlier batches were reported as successful.

## Manual Test Record Template

For future tests, record:

- Test ID:
- Date:
- Browser/device:
- Steps performed:
- Actual result:
- Status:
- Screenshot or note: