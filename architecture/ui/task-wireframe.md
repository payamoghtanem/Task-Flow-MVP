# Task Wireframes — Dashboard & Create Task
# Agent: 07 — UI/UX DESIGNER | Standards: coding-standard v1.0 | WCAG 2.1 AA
# Generated: 2026-06-19T13:00:00Z
# Design tokens reference: architecture/ui/design-tokens.yaml
# Stories covered: STORY-004 (Create + View Tasks), STORY-005 (Update Status + Delete)

---

## Screen 3 — Dashboard (/dashboard)

### Layout
Full-height app shell. Responsive: stacked on mobile, sidebar optional on desktop.

```
┌──────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │  [TaskFlow]                              Alex ▾   [Log Out]  │ │  ← Header, color.surface, shadow.sm
│ │                                                              │ │  ← Logout: min 44px, aria-label="Log out"
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  My Tasks                          [+ Add Task]            │  │  ← section header
│  │                                                            │  │  ← Add Task: color.primary button
│  │  ┌──────────────┐ ┌───────────────────────────────────┐   │  │
│  │  │  All    (5)  │ │  Personal  (2)  │  Professional  (3) │  ← Category filter tabs
│  │  └──────────────┘ └───────────────────────────────────┘   │  │  ← role="tablist", aria-selected
│  │                                                            │  │
│  │  ─── TODO (3) ─────────────────────────────────────────   │  │  ← section divider, status label
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  [●] Buy groceries              [PERSONAL] [DAILY]  │  │  ← TaskCard (todo state)
│  │  │       ○ Start   ✓ Done   🗑 Delete                  │  │  ← action row, 44px min-height each
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  [●] Write project proposal    [PROFESSIONAL] [WEEKLY] │  ← TaskCard
│  │  │       ○ Start   ✓ Done   🗑 Delete                  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ─── IN PROGRESS (1) ──────────────────────────────────   │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  [◑] Review Q3 budget          [PROFESSIONAL] [MONTHLY]│  ← TaskCard (in-progress)
│  │  │       ✓ Done   🗑 Delete                             │  │  ← only forward transitions shown
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ─── DONE (1) ──────────────────────────────────────────  │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  [✓] Call dentist              [PERSONAL] [DAILY]   │  │  ← TaskCard (done, muted/strikethrough)
│  │  │       🗑 Delete                                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Empty State (new user, no tasks)
```
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │              📋                                           │  │  ← decorative icon, aria-hidden
│  │      No tasks yet.                                        │  │  ← typography.xl, weight.semibold
│  │      Add your first task to get started.                  │  │  ← typography.base, color.text_muted
│  │                                                           │  │
│  │      [+ Add your first task]                              │  │  ← primary button
│  │                                                           │  │
│  └────────────────────────────────────────────────────────────┘  │
```

### Accessibility Checklist (WCAG 2.1 AA)
- [ ] Category filter tabs: `role="tablist"`, `role="tab"`, `aria-selected`, keyboard arrow navigation
- [ ] Task cards: list structure `<ul>/<li>`, each card a `<article>`
- [ ] Status section headers are `<h2>` elements, not styled divs
- [ ] Action buttons have `aria-label` including task title (e.g., `aria-label="Delete Buy groceries"`)
- [ ] Done tasks have `aria-label` indicating completion state
- [ ] Color is never the only indicator — status icons (●◑✓) + text labels used alongside color

---

## Screen 4 — Create Task Modal

### Trigger
Clicking [+ Add Task] button opens modal. Focus moves to first input.
ESC key closes modal without saving.

```
┌──────────────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← backdrop: rgba(0,0,0,0.4)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░  ┌─────────────────────────────────────────────────────┐ ░░ │
│  ░░  │  Add a new task                              [✕]    │ ░░ │  ← role="dialog", aria-modal="true"
│  ░░  │                                                     │ ░░ │  ← aria-labelledby="modal-title"
│  ░░  │  Task title *                                       │ ░░ │  ← [✕] has aria-label="Close dialog"
│  ░░  │  ┌───────────────────────────────────────────────┐  │ ░░ │
│  ░░  │  │  What do you need to do?                      │  │ ░░ │  ← autofocus on open
│  ░░  │  └───────────────────────────────────────────────┘  │ ░░ │  ← maxlength="100", required
│  ░░  │  0/100 characters                                   │ ░░ │  ← live char count, aria-live="polite"
│  ░░  │                                                     │ ░░ │
│  ░░  │  Category *                                         │ ░░ │
│  ░░  │  ┌──────────────────┐  ┌──────────────────────┐    │ ░░ │
│  ░░  │  │ ○  Personal      │  │ ○  Professional      │    │ ░░ │  ← radio buttons, not select
│  ░░  │  └──────────────────┘  └──────────────────────┘    │ ░░ │  ← color dot: color.personal/professional
│  ░░  │                                                     │ ░░ │  ← role="radiogroup", legend="Category"
│  ░░  │  Time horizon *                                     │ ░░ │
│  ░░  │  ┌─────────┐  ┌──────────┐  ┌───────────┐          │ ░░ │
│  ░░  │  │ ○ Daily │  │ ○ Weekly │  │ ○ Monthly │          │ ░░ │  ← radio buttons
│  ░░  │  └─────────┘  └──────────┘  └───────────┘          │ ░░ │  ← role="radiogroup", legend="Time horizon"
│  ░░  │                                                     │ ░░ │
│  ░░  │  ┌──────────────────┐  ┌──────────────────────┐    │ ░░ │
│  ░░  │  │    Cancel        │  │    Add Task  ▶        │    │ ░░ │  ← Cancel: ghost/outline style
│  ░░  │  └──────────────────┘  └──────────────────────┘    │ ░░ │  ← Add Task: color.primary, disabled until title+category+timeframe filled
│  ░░  └─────────────────────────────────────────────────────┘ ░░ │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────────────────────────────────────────────┘
```

### Error State
```
│  ░░  │  Task title *                                        │ ░░ │
│  ░░  │  ┌────────────────────────────────────────────────┐  │ ░░ │
│  ░░  │  │                                                │  │ ░░ │  ← empty, border error
│  ░░  │  └────────────────────────────────────────────────┘  │ ░░ │
│  ░░  │  ⚠ Task title is required                            │ ░░ │  ← role="alert"
```

### Loading State
```
│  ░░  │  ┌──────────────────┐  ┌──────────────────────┐    │ ░░ │
│  ░░  │  │    Cancel        │  │ [spinner] Adding...   │    │ ░░ │  ← button disabled, aria-busy
│  ░░  │  └──────────────────┘  └──────────────────────┘    │ ░░ │
```

### Accessibility Checklist (WCAG 2.1 AA)
- [ ] `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title
- [ ] Focus trapped within modal while open (focus-trap)
- [ ] ESC closes modal, focus returns to trigger button
- [ ] Character count uses `aria-live="polite"` for screen reader announcements
- [ ] Radio groups use `<fieldset>/<legend>` (not divs)
- [ ] Submit button `disabled` until all required fields are filled
- [ ] Backdrop click closes modal (same as ESC)
- [ ] Modal width: 90vw on mobile, max 520px on desktop

---

## Component: TaskCard

### States

**TODO:**
```
┌──────────────────────────────────────────────────────────────┐
│  [●] Buy groceries                  ┌──────────┐ ┌────────┐  │
│                                     │ PERSONAL │ │ DAILY  │  │  ← category badge: color.personal
│  ○ Start     ✓ Mark Done    🗑       └──────────┘ └────────┘  │  ← timeframe badge: neutral
└──────────────────────────────────────────────────────────────┘
```
Color of ● : `color.status_todo` (#6b7280)

**IN_PROGRESS:**
```
┌──────────────────────────────────────────────────────────────┐
│  [◑] Review Q3 budget            ┌──────────────┐ ┌────────┐ │
│                                  │ PROFESSIONAL │ │MONTHLY │ │
│  ✓ Mark Done    🗑                └──────────────┘ └────────┘ │
└──────────────────────────────────────────────────────────────┘
```
Color of ◑ : `color.status_in_progress` (#f59e0b)
Left border: 3px solid `color.status_in_progress`

**DONE:**
```
┌──────────────────────────────────────────────────────────────┐
│  [✓] ~~Call dentist~~            ┌──────────┐ ┌────────┐     │
│                                  │ PERSONAL │ │ DAILY  │     │  ← strikethrough title
│  🗑 Delete                        └──────────┘ └────────┘     │  ← muted text color
└──────────────────────────────────────────────────────────────┘
```
Color of ✓ : `color.status_done` (#10b981)
Background: subtle `color.status_done_bg` (#d1fae5)

### Delete Confirmation (inline, not modal)
```
┌──────────────────────────────────────────────────────────────┐
│  Delete "Buy groceries"?                                      │
│  This cannot be undone.                                       │
│                          [Cancel]  [Yes, delete]             │
└──────────────────────────────────────────────────────────────┘
```
- Appears inline below the task card (not a modal — reduces cognitive load)
- Dismiss on Escape or Cancel
- "Yes, delete" has `aria-label="Confirm delete Buy groceries"`

### Action Buttons (aria-labels including task title)
```js
// Button aria-labels must include task title for screen reader context
<button aria-label={`Start task: ${task.title}`}>Start</button>
<button aria-label={`Mark done: ${task.title}`}>Done</button>
<button aria-label={`Delete task: ${task.title}`}>🗑</button>
```

---

## Responsive Behaviour

| Breakpoint | Layout |
|------------|--------|
| 320–639px (mobile) | Single column, full-width cards, modal is bottom sheet |
| 640–1023px (tablet) | Single column, max-width 720px centered |
| 1024px+ (desktop) | Two columns: 280px sidebar (future) + main content area |

---

## User Flow: Create Task (Happy Path)
```
Dashboard → click "+ Add Task"
  → Modal opens, focus on title input
  → Type title → select Category → select Time Horizon
  → Click "Add Task" (button enabled)
  → Loading state (spinner)
  → Task appears in TODO section without page reload
  → Modal closes, focus returns to "+ Add Task" button
  → Success: task count updates
```

## User Flow: Delete Task (Happy Path)
```
TaskCard → click 🗑 icon
  → Inline confirmation appears
  → Click "Yes, delete"
  → Loading state
  → Task removed from list without page reload
  → Focus moves to next task card (or empty state if last)
```

---

*Task Wireframes produced by Agent 07 (UI/UX DESIGNER) | WCAG 2.1 AA | design-tokens.yaml v1.0 | 2026-06-19T13:00:00Z*
