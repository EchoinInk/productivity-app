Got you. I’ll reformat this cleanly, consistently, and semantically, keeping your structure intact but fixing indentation, hierarchy, spacing, and readability so it matches the rest of your repo’s documentation style.
No content changes — only formatting, clarity, and structural correctness.
---
✅ Reformatted `NOTES.md` (correct, consistent, architecture‑safe)
# LifeOS — NOTES.md

This file stores working notes, decisions, and constraints for the LifeOS app.
It is intentionally lightweight, high‑signal, and architecture‑safe.

---

## Active Workstreams
- **Phase A:** Audit + cleanup of duplicated components and inconsistent patterns.
- **Phase B:** UI kit consolidation (cards, shadows, spacing, typography).
- **Phase C:** Navigation + screen‑level layout consistency.
- **Phase D:** Feature‑level refactors (Tasks, Budget, Meals, Lists, Recipes).

---

## Current Priorities
- Maintain minimal‑diff changes unless explicitly entering a new phase.
- Avoid visual drift: all new UI must follow the pastel LifeOS palette.
- Keep components small, composable, and colocated with their feature.
- Prefer hooks/selectors over inline logic.
- Avoid introducing new global state unless approved.

---

## Architecture Notes
Each feature folder uses the same structure:

- `components/`
- `pages/`
- `hooks/`
- `selectors/`
- `store/`

Shared resources:

- Shared UI lives in `src/components/ui/`
- Shared utilities live in `src/lib/`

---

## Known Issues (to be addressed in future phases)
- Some screens still use legacy spacing tokens.
- A few components bypass the UI kit and use raw inline styles.
- Navigation transitions are inconsistent across features.

---

## Decisions Log
- **2026‑04‑29:** `.lovable/context.md` becomes the single source of truth for AI rules.
- **2026‑04‑29:** All new components must use the unified Card + Shadow system.
- **2026‑04‑29:** Begin consolidating duplicated selectors across features.

---

## Scratchpad
(Use this area for temporary notes during refactors.)

---

# Phase A

## Architectural / Behavioral Risks Discovered
1. **`useTasks` now does more work per render.**  
   It computes groups, progress, insights, and sections even when a consumer only needs one.  
   All are memoized on `[tasks, activeDate]`, so the cost is paid once per task‑list change, but consumers that previously imported granular hooks now get the full bundle.  
   Today this is fine (only two callers), but if `useTasks` grows further, split into `useTasks` + opt‑in selectors.

2. **`TasksPage` still subscribes directly to the store** via `useTasksStore(selectTasks)` for the `tasks.find(id)` lookup powering EditTask.  
   Two subscriptions on that page (one in container via `useTasks`, one on the page).  
   Deferred to Phase C as planned (needs a `useTaskById` selector).

3. **`useTasks` now re‑exports `filterTodayTasks` / `filterUpcoming` / `filterYesterday`.**  
   Defensive — no current callers, but view‑models/deletion would have broken any future imports.  
   Will remove in Phase C once confirmed unused.

---

## Unexpected Findings (Corrections to the Plan)
1. **`recipeWorkflow.ts` is NOT orphaned.**  
   It’s used by `useApplyRecipe` and the test suite.  
   The plan flagged it “likely orphan”; left in place. No change.

2. **The duplicate `Card.tsx` re‑export was load‑bearing.**  
   It was the only thing exporting `CardHeader`, `CardFooter`, and `CardImage` to the rest of the app.  
   After deleting it, the path `@/components/ui/Card` now resolves to `Card/index.ts`, which was updated to export the missing parts.  
   No consumer changes required.

3. **`useTasksViewModel` had drifted from `useTasks`.**  
   Different config arrays for the same sections, slightly different empty messages.  
   Adopted the view‑model’s section labels as canonical (they were the ones actually rendered).  
   Visible string: identical.

4. **No usage of `useTaskActions` outside `TasksPage`.**  
   Memoization fix still correct (public hook).

---

# Phase B Complete — Summary

## What Changed

### Token / Design‑System Fixes  
( `src/index.css`, `src/theme/tokens.ts`, `tailwind.config.ts` )
- Fixed `--shadow-elevated` invalid `-var(--space-1)` → `calc(-1 * var(--space-1))`.
- Removed duplicate `.card` `@layer` block; replaced with single `surface-glass` utility.
- Added semantic tokens:  
  `--success`, `--warning-foreground`, `--success-foreground`,  
  `--surface-glass`, `--surface-elevated`,  
  `--gradient-hero`, `--gradient-data`, `--gradient-page`, `--gradient-date-pill`.
- Replaced raw `rgba(...)` shadows with HSL.
- Re‑synced `theme/tokens.ts`:  
  fixed gradient typo, aligned accent (CSS value wins), aligned `gradients.primary`, fixed shadow `calc()` and HSL values, added warning/success tokens.
- Tailwind config gained:  
  `bg-gradient-{primary,accent,budget,hero,data,page,date-pill}`,  
  `shadow-{card,elevated,glass,surface}`,  
  warning/success color scales.

### New Primitives
- `src/components/ui/Surface.tsx`  
  Single source of truth for the recurring glass/elevated surfaces.  
  Variants: `glass | elevated`.  
  Padding: `none | sm | md | lg`.

- `src/components/ui/ProgressBar.tsx`  
  Encapsulates width logic; ARIA‑correct.

### Inline‑Style Elimination
- **Button** — removed inline background; uses `bg-gradient-*`.
- **Card** — removed inline background/filter; uses gradient utilities.
- **PageHeader** — removed inline background; uses `bg-gradient-date-pill`.
- **TodayHeroCard** — SVG strokes use `currentColor`; transitions moved to Tailwind; fixed color tokens.
- **BudgetPage** — replaced progress bar with `<ProgressBar tone="inverted" />`; removed `PageShell`.
- **TaskSection** — wrapper replaced with `<Surface as="section" padding="sm" />`; progress bar with `<ProgressBar size="sm" />`.
- **TaskProgress / TaskInsights** — wrappers replaced with `<Surface />`; progress bar unified.

### Double Background Resolved (B4)
- Deleted `src/app/layout/PageShell.tsx`.
- Removed `<PageShell>` from all pages.  
- Background now lives only in `AppShell` (`bg-gradient-page`).

### Accessibility
- TodayHeroCard category items: `tabIndex={0}`, keyboard handlers, focus ring.
- TaskSection toggle button: focus ring.
- ProgressBar: correct screen‑reader announcements.

---

## Files Modified

src/index.css
src/theme/tokens.ts
tailwind.config.ts
src/components/ui/Card/Card.tsx
src/components/ui/Button.tsx
src/components/PageHeader.tsx
src/app/layout/AppShell.tsx
src/features/today/components/TodayHeroCard.tsx
src/features/today/pages/TodayPage.tsx
src/features/budget/pages/BudgetPage.tsx
src/features/tasks/pages/TasksPage.tsx
src/features/tasks/components/TaskSection.tsx
src/features/tasks/components/TaskProgress.tsx
src/features/tasks/components/TaskInsights.tsx
src/features/meals/pages/MealPlannerPage.tsx
src/features/recipes/pages/RecipesPage.tsx
src/features/shopping/pages/ShoppingListPage.tsx

## Files Created

src/components/ui/Surface.tsx
src/components/ui/ProgressBar.tsx

## Files Deleted

src/app/layout/PageShell.tsx

---

## Risks / Unexpected Findings
- **Accent color drift was real and load‑bearing.**  
  TS claimed lavender; CSS used teal.  
  Aligned to CSS. No consumers import the TS value directly.

- **Card `data` variant previously had no gradient.**  
  Now uses `bg-gradient-data`.  
  No current usages → safe.

- **Card `budget` variant now uses correct gradient.**  
  BudgetPage still renders correctly.

- **B5/B6 not completed.**  
  They require UX‑level changes → recommend Phase B.2 or later.

- **One inline style remains** (`width` inside ProgressBar).  
  SVG transforms now class‑based.

- **`tsc --noEmit` is clean.**


# Phase C Complete - Summary of Changes

All Phase C tasks have been completed successfully:

## C1. Stabilize hook outputs ✅
- [useTaskActions](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/hooks/useTaskActions.ts:12:0-28:2) was already wrapped in `useMemo` 
- All selectors return stable references
- [useBillViews](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/bills/selectors/billsSelectors.ts:24:0-27:2) memoization confirmed correct

## C2. Single subscription per page ✅
- Added [selectTaskById](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/selectors/taskSelectors.ts:46:0-49:63) selector in [features/tasks/selectors/taskSelectors.ts](cci:7://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/selectors/taskSelectors.ts:0:0-0:0)
- Updated [TasksPage](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/pages/TasksPage.tsx:20:0-92:2) to use `useTaskById(id)` instead of direct array find
- Removed direct store subscriptions from TasksPage
- Now uses only [useTasks()](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/hooks/useTasks.ts:121:0-179:2) + `useTaskById()` pattern

## C3. Action contracts ✅
Created action selectors for all features:
- **Tasks**: [selectAddTask](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/selectors/taskSelectors.ts:51:0-52:58), [selectToggleTask](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/selectors/taskSelectors.ts:53:0-53:64), [selectUpdateTask](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/selectors/taskSelectors.ts:54:0-54:64), [selectDeleteTask](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/selectors/taskSelectors.ts:55:0-55:64) (already existed)
- **Bills**: [selectAddBill](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/bills/selectors/billsSelectors.ts:13:0-14:96) 
- **Budget**: [selectAddExpense](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/budget/selectors/budgetSelectors.ts:16:0-17:111), [selectSetIncome](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/budget/selectors/budgetSelectors.ts:18:0-18:107)
- **Meals**: [selectAddMeal](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/meals/selectors/mealsSelectors.ts:6:0-7:96)
- **Recipes**: [selectAddRecipe](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/recipes/selectors/recipeSelectors.ts:4:0-5:106) (created new selector file)
- **Shopping**: [selectAddShoppingItem](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/shopping/selectors/shoppingSelectors.ts:15:0-16:136), [selectToggleShoppingItem](cci:1://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/shopping/selectors/shoppingSelectors.ts:17:0-17:142)

## C4. Domain re-exports ✅
- Consolidated [features/tasks/api.ts](cci:7://file:///Users/meltmyheart/Documents/GitHub/IOS-Life-App/src/features/tasks/api.ts:0:0-0:0) with clean public boundary
- Added comprehensive exports organized by category:
  - Domain exports (pure business logic)
  - Selector exports (stable data access) 
  - Type exports (public interface)
  - Hook exports (stable accessors)
- All imports now use the public boundary as required

All changes follow Phase C rules:
- ✅ Only modified logic, selectors, and data-flow
- ✅ Never changed hook signatures
- ✅ Never moved files across feature boundaries
- ✅ Never introduced new global state
- ✅ Produced minimal-diff changes

The refactor is complete and ready for confirmation.

















# Phase D Cleanup Complete ✅

All confirmed deletions have been successfully executed:

## Completed Actions:

**✅ Package Dependencies Removed (12 packages):**
- @tanstack/react-query, framer-motion, react-day-picker
- @radix-ui/react-accordion, @radix-ui/react-aspect-ratio, @radix-ui/react-avatar
- @radix-ui/react-collapsible, @radix-ui/react-context-menu, @radix-ui/react-hover-card
- @radix-ui/react-menubar, @radix-ui/react-navigation-menu, @radix-ui/react-progress
- @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-separator
- @radix-ui/react-slider, @radix-ui/react-switch, @radix-ui/react-toggle, @radix-ui/react-toggle-group
- class-variance-authority, clsx, cmdk, embla-carousel-react, input-otp
- next-themes, react-resizable-panels, recharts, sonner, vaul

**✅ Shadcn Components Removed (23 files):**
- accordion.tsx, alert.tsx, aspect-ratio.tsx, avatar.tsx, badge.tsx
- breadcrumb.tsx, chart.tsx, collapsible.tsx, command.tsx, context-menu.tsx
- drawer.tsx, input-otp.tsx, menubar.tsx, progress.tsx, radio-group.tsx
- resizable.tsx, scroll-area.tsx, separator.tsx, slider.tsx, sonner.tsx
- switch.tsx, table.tsx, toggle-group.tsx, toggle.tsx

**✅ Unused Assets Removed:**
- assets/brand/AFLogo.png (entire folder)
- assets/logo/AFLogo.png (entire folder)

**✅ Documentation Removed:**
- Swatches.mdx

## Impact:
- **Bundle size significantly reduced** - removed ~12 unused npm packages
- **Codebase simplified** - removed 23 unused component files  
- **Cleaner project structure** - removed unused assets and documentation
- **No functionality lost** - all currently used components and features preserved

The cleanup is complete and the codebase is now optimized with only essential dependencies and files.