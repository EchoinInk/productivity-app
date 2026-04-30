## Goal

Refine the TodayPage redesign based on feedback. Keep the existing `TodayHeroCard` (don't replace with `DailyProgressCard`), tweak its bottom section, simplify quick-action tile layout, and add an "Up Next" list that respects task completion state.

## Layout

```text
┌───────────────────────────────────────┐
│ ☰   Hi, Alex 👋               🔔   │
│     Let's make today amazing          │
├───────────────────────────────────────┤
│ TodayHeroCard                         │
│   ◯72%   Today's Tasks                │
│          3 of 5 completed             │
│          You're making progress ✨    │
│  ─────────────────────────────────    │
│   [ 3 tasks left ]   (or [Add task])  │
├───────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐    │
│ │ Tasks      🗒│  │ Meals      🍱│    │
│ │ 3          → │  │ 2          → │    │
│ │ To do        │  │ Planned      │    │
│ └──────────────┘  └──────────────┘    │
│ ┌──────────────┐  ┌──────────────┐    │
│ │ Budget     💰│  │ Shopping   🧺│    │
│ │ $320       → │  │ 6          → │    │
│ │ Left this wk │  │ Items        │    │
│ └──────────────┘  └──────────────┘    │
├───────────────────────────────────────┤
│ Up Next                  View all     │
│ ◯ Team stand-up          [Work]       │
│   10:00 AM                            │
│ ◯ Dinner with family     [Personal]   │
│   7:00 PM                             │
└───────────────────────────────────────┘
                                    (+) FAB
```

## Changes

### 1. `src/components/layout/Header.tsx` — top-bar variant

- Left-align greeting: `Hi, Alex 👋` bold, muted subtitle `Let's make today amazing` directly underneath.
- Keep menu (left) and bell w/ red dot (right). Remove date pill from TodayPage.

### 2. `src/features/today/components/TodayHeroCard/TodayHeroCard.view.tsx` — keep, update bottom

- TOP gradient block stays (ring + "Today's Tasks" + `progressText` + `motivation + icon`).
- BOTTOM neutral block: **remove the "Tasks by category" heading, View all button, and the categories list entirely.**
- Replace with a single centered area:
  - When `total > 0`: pill chip showing `{remaining} tasks left` (white pill, primary text, rounded-full). When `remaining === 0`, show `All done 🎉` chip.
  - When `total === 0`: a primary CTA button `+ Add a task` that calls `onAddTask`.
- Keep `onCategoryClick` prop available but unused on this page (no removal needed; the view will just stop rendering categories). Simpler: drop categories rendering and the related props from the view; container can keep passing them harmlessly or we trim.

### 3. `src/features/today/hooks/useTodayHeroCard.ts`

- Drop `visibleCategories` derivation (no longer used).
- Add `remaining` to the returned model so the view can render the chip.

### 4. `src/features/today/components/TodayHeroCard/TodayHeroCard.container.tsx`

- Remove `categories`, `onViewAll`, `onCategoryClick` from required props (keep `onAddTask`).
- View model no longer includes categories.

### 5. `src/features/today/components/TodayQuickActionsGrid.tsx`

- Restructure each `SummaryCard` so the icon sits **to the right of the text column**, vertically centered, not inline with the title row:
  - Card is a flex row: left column (text, flex-1) + right column (icon, shrink-0).
  - Left column stacks: `title` (muted small) → `value` (large heading) → `subtitle` (muted small).
  - Right column: existing illustration image (current icons kept), centered vertically, ~44–48px.
  - Add a small `ChevronRight` in the bottom-right of the card (subtle, muted).
- Keep current pastel `background` colors and current illustration assets.

### 6. New `src/features/today/components/UpNextList.tsx`

- Section header: `Up Next` (heading) + `View all` link → `/tasks`.
- Source: `useTasks().sections.find(s => s.type === "today").tasks`.
- Filter to `tasks.filter(t => !t.isCompleted)`, sort by `time` ascending (no time → last), take first 3.
- Each row: tap-circle (left) + title/time stacked + category chip (right, colored via `getCategoryMetadata`).
- Tapping the circle calls `actions.toggleTask(id, today)`. Because the list filters out completed tasks, the row disappears from Up Next immediately, but the task remains in the store with `completedDates` updated, so it shows as completed on `/tasks`.
- Empty state: "Nothing scheduled — enjoy your day 🎉".

### 7. `src/features/today/pages/TodayPage.tsx`

- Remove `<TodaySummaryRow />` and date-pill props on `<Header />`.
- Pass only `percentage`, `total`, `completed`, `onAddTask` to `<TodayHeroCard />` (no `categories`, no `onViewAll`).
- Render `<TodayQuickActionsGrid />` then `<UpNextList tasks={...} onToggle={actions.toggleTask} today={selectedDateString} />`.

## Files

- Edit: `src/components/layout/Header.tsx`
- Edit: `src/features/today/pages/TodayPage.tsx`
- Edit: `src/features/today/components/TodayHeroCard/TodayHeroCard.view.tsx`
- Edit: `src/features/today/components/TodayHeroCard/TodayHeroCard.container.tsx`
- Edit: `src/features/today/hooks/useTodayHeroCard.ts`
- Edit: `src/features/today/components/TodayQuickActionsGrid.tsx`
- New: `src/features/today/components/UpNextList.tsx`
- Edit: `src/features/today/index.ts` (export `UpNextList`)

## Out of scope

- Wiring real meals/shopping counts (still placeholders).
- Notifications panel behavior on bell click.
- Removing/refactoring `TodaySummaryRow` files (left in place, just unused on TodayPage).