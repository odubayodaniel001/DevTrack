# DevTrack — Test Plan

Record each test as Pass / Fail / Not Tested, with date and evidence. No tests have run yet.

| ID | Scenario | Expected |
|---|---|---|
| T-01 | Create project with valid name | Project appears and persists |
| T-02 | Create blank/whitespace project | Inline validation; nothing saved |
| T-03 | Create case-insensitive duplicate project | Rejected |
| T-04 | Edit project | Changes persist; task links remain |
| T-05 | Cancel project deletion | Project and tasks remain |
| T-06 | Confirm project deletion with tasks | Correct task count warned; project and tasks removed |
| T-07 | Create task with required fields | Saved with Pending default |
| T-08 | Invalid task title / missing project | Validation blocks save |
| T-09 | Edit task and change project | Changes persist |
| T-10 | Change task status via dropdown | Counts and progress update |
| T-11 | Delete task cancel/confirm | Correct preservation/removal |
| T-12 | Search task title mixed case | Matching results shown |
| T-13 | Combine status and project filters | Intersection of filters shown |
| T-14 | Task due yesterday and incomplete | Overdue indicator appears |
| T-15 | Completed task due yesterday | Not marked overdue |
| T-16 | No tasks in project | Progress shows 0% |
| T-17 | Dashboard all projects vs one project | Counts scope correctly; project total global |
| T-18 | Refresh page | Projects/tasks/theme preference persist |
| T-19 | First visit with device dark preference | Dark theme selected |
| T-20 | Manual theme override | Choice persists after refresh |
| T-21 | Sample data button | Adds only when clicked; protects existing data |
| T-22 | Empty project/task/search result | Useful empty states |
| T-23 | Mobile at 320px and common desktop widths | No horizontal overflow; usable navigation |
| T-24 | Keyboard-only navigation | Controls usable; focus visible; dialog focus sensible |
| T-25 | Reduced motion setting | Nonessential motion reduced |
| T-26 | Corrupted storage payload | Graceful error; no silent overwrite |
| T-27 | Browser storage unavailable | Informative error; app does not crash |
| T-28 | Reload after deletion | Deleted records stay deleted |

## Manual test record template
- Test ID:
- Date:
- Browser/device:
- Steps performed:
- Actual result:
- Status:
- Screenshot or note:
