# LifeOS — NOTES.md

This file stores working notes, decisions, and constraints for the LifeOS app.  
It is intentionally lightweight, high-signal, and architecture-safe.

---

## Active Workstreams

- **Phase A:** Audit + cleanup of duplicated components and inconsistent patterns  
- **Phase B:** UI kit consolidation (cards, shadows, spacing, typography)  
- **Phase C:** Navigation + screen-level layout consistency  
- **Phase D:** Feature-level refactors (Tasks, Budget, Meals, Lists, Recipes)

---

## Current Priorities

- Maintain **minimal-diff changes** unless explicitly entering a new phase  
- Avoid **visual drift** — all UI must follow the pastel LifeOS palette  
- Keep components **small, composable, and colocated**  
- Prefer **hooks/selectors over inline logic**  
- Avoid introducing **new global state** unless approved  

---

## Architecture Notes

### Feature Structure

Each feature folder follows:
components/
pages/
hooks/
selectors/
store/

### Shared Resources

- UI → `src/components/ui/`  
- Utilities → `src/lib/`

---

## Known Issues (Future Phases)

- Legacy spacing tokens still exist  
- Some components use inline styles instead of UI kit  
- Navigation transitions are inconsistent  

---

## Decisions Log

- **2026-04-29:** `.lovable/context.md` is the single source of truth for AI rules  
- **2026-04-29:** All new components must use unified **Card + Shadow system**  
- **2026-04-29:** Begin consolidating duplicated selectors  

---

## Scratchpad

_(Temporary notes during refactors)_

---

# Phase A — Findings

## Architectural / Behavioral Risks

- `useTasks` does too much per render  
  - Computes: groups, progress, insights, sections  
  - All memoized on `[tasks, activeDate]`  
  - Cost paid once per task-list change  
  - ⚠️ Future: split into core hook + opt-in selectors  

- `TasksPage` directly subscribed to store  
  - Used `useTasksStore(selectTasks)` for `tasks.find(id)`  
  - Caused **double subscription (container + page)**  
  - Deferred to Phase C (`useTaskById`)  

- `useTasks` re-exported:
  - `filterTodayTasks`
  - `filterUpcoming`
  - `filterYesterday`  
  - Defensive only — no active callers  
  - Remove in Phase C (if confirmed unused)

---

## Unexpected Findings

- `recipeWorkflow.ts` is **NOT orphaned**  
  - Used by `useApplyRecipe` + tests  

- Duplicate `Card.tsx` re-export was **load-bearing**  
  - Provided:
    - `CardHeader`
    - `CardFooter`
    - `CardImage`  
  - After removal → fixed via `Card/index.ts`  

- `useTasksViewModel` drifted from `useTasks`  
  - Different configs + empty messages  
  - View-model labels now **canonical**  

- `useTaskActions` only used in `TasksPage`  
  - Memoization fix confirmed valid  

---

# Phase B — Summary

## Token / Design System Fixes

- Fixed invalid `--shadow-elevated` calc  
- Removed duplicate `.card` layer → replaced with `surface-glass`  

### New Tokens

- `--success`
- `--warning-foreground`
- `--success-foreground`
- `--surface-glass`
- `--surface-elevated`
- `--gradient-hero`
- `--gradient-data`
- `--gradient-page`
- `--gradient-date-pill`

### Improvements

- Replaced raw `rgba()` shadows with HSL  
- Synced `theme/tokens.ts` with CSS  
- Tailwind config extended (gradients + shadows)

---

## New Primitives

- `Surface.tsx` → glass / elevated surfaces  
- `ProgressBar.tsx` → ARIA-correct, encapsulated width  

---

## Inline Style Elimination

- Button → gradient utilities  
- Card → gradient utilities  
- PageHeader → `bg-gradient-date-pill`  
- TodayHeroCard → `currentColor` strokes  
- BudgetPage → `<ProgressBar tone="inverted" />`  
- TaskSection → `<Surface as="section" padding="sm" />`  
- TaskProgress / TaskInsights → unified primitives  

---

## Structural Fixes

- ❌ Deleted `PageShell.tsx`  
- ❌ Removed `<PageShell>` usage  
- ✅ Background now lives in `AppShell` only  

---

## Accessibility

- TodayHeroCard → keyboard + focus ring  
- TaskSection toggle → focus ring  
- ProgressBar → screen-reader correct  

---

# Phase C — Summary

## C1. Stabilize Hook Outputs

- `useTaskActions` memoized  
- All selectors return **stable references**  
- `useBillViews` memoization confirmed  

---

## C2. Single Subscription per Page

- Added `selectTaskById`  
- `TasksPage` now uses:
  - `useTasks()`
  - `useTaskById(id)`  

- ❌ Removed direct store subscriptions  

---

## C3. Action Contracts

Created stable selector patterns for:

- Tasks  
- Bills  
- Budget  
- Meals  
- Recipes  
- Shopping  

---

## C4. Domain Re-exports

- Consolidated: `features/tasks/api.ts`  
- Organized exports:
  - domain  
  - selectors  
  - types  
  - hooks  

- All imports use **public boundary only**

---

# Phase D — Cleanup Complete

## Removed Packages (12)

- React Query  
- Radix UI components  
- framer-motion  
- recharts  
- sonner  
- vaul  
- etc.

---

## Removed Components (23)

- All unused shadcn components  

---

## Removed Assets

- AFLogo folders  

---

## Removed Docs

- Swatches.mdx  

---

## Impact

- Smaller bundle  
- Cleaner structure  
- No functionality lost  

---

# Phase F — Navigation & Flow Consolidation

## F1. Navigation Normalisation

- No custom wrappers  
- All navigation uses `navigate()`  

---

## F2. Header Integration

- All pages use `PageHeader`  
- No inline back buttons  
- Spacing uses tokens  

---

## F3. Scroll Behaviour

- No nested scroll containers  
- Global scroll via `AppShell`  

---

## F4. Page Layout Structure

- Introduced:
  - `Page`
  - `PageBody`  

- Standard layout skeleton established  

---

## F5. Flow Consistency

- All add/edit flows use **modals**  
- No full-page inconsistencies  

---

## F6. Error & Loading Alignment

- Created:
  - `LoadingState`
  - `ErrorState`  

- Ready for inline replacement  

---

## F7. Phase G Flags

- Duplicated data fetching (Budget, Tasks, Shopping)  
- Navigation-dependent side effects (Today)  
- Inconsistent param shapes (Tasks, Recipes)  
- Custom wrappers around Page  
- AppShell/header spacing conflicts  
- No nested navigators  

---
# Phase G — Product Convergence & Momentum Architecture

## Product Direction Shift

Lumo is no longer positioned as:
- generic productivity tooling

Lumo is now evolving toward:
- momentum-focused personal operating system

Primary goals:
- reduce cognitive overload
- reinforce consistency
- increase emotional payoff
- sustain daily momentum
- improve long-term retention

---

## UX Philosophy

### Clarity First

Interfaces should prioritize:
- readability
- hierarchy
- intentional density
- calm focus
- high signal-to-noise ratio

Avoid:
- visual clutter
- excessive decoration
- dashboard chaos
- productivity theater

---

### Momentum Over Metrics

Lumo prioritizes:
- completion
- consistency
- progress
- reinforcement
- forward movement

Avoid:
- vanity statistics
- addictive loops
- artificial gamification
- noisy engagement systems

---

## Dashboard Direction

The Home dashboard is now the:
- primary product surface
- orchestration layer
- momentum hub

### Dashboard Rules

- One dominant focus area
- Compact utility actions
- Dense but readable information
- Mobile-first ergonomics
- Minimal scrolling friction
- Strong visual hierarchy

---

## Design System Enforcement

### Token Rules

Never use:
- raw hex values
- inline color styles
- Tailwind default palette colors
- duplicated spacing logic

Always use:
- semantic tokens
- tokenized spacing
- semantic surfaces
- shared gradients
- centralized elevation system

---

## Surface Philosophy

UI should feel:
- grounded
- precise
- calm
- operational
- intentional

Avoid:
- excessive blur
- soft glassmorphism everywhere
- floating disconnected cards
- decorative gradients

Gradients should:
- reinforce action
- reinforce progress
- highlight focus

Not:
- decorate layout containers

---

## Architectural Enforcement

### Screen Layer Rules

/screens
- orchestration only
- no derived business logic
- no heavy transformations
- no selector composition

### Feature Layer Rules

/features
- owns business logic
- owns selectors
- owns actions
- owns state organization

### UI Layer Rules

/components/ui
- presentational only
- token-driven only
- zero feature awareness

---

## Zustand Rules

Avoid:
- selector-in-store anti-patterns
- oversized subscriptions
- inline derived calculations
- unnecessary array recreation

Prefer:
- selector hooks
- memoized derivation
- stable references
- isolated subscriptions

---

## Performance Constraints

All new work should preserve:
- stable rendering
- memo safety
- predictable subscriptions
- bounded recomputation

Large lists require:
- stable handlers
- memoized rows
- selector isolation

---

## AI Review System Notes

All AI-assisted refactors should validate:
- architecture boundaries
- token enforcement
- render stability
- responsive consistency
- accessibility
- mobile ergonomics
- dark mode integrity

---

## Current Product Focus

Primary investment areas:
- onboarding
- momentum systems
- routines
- insights
- retention
- emotional reinforcement

Secondary:
- advanced integrations
- automation
- ecosystem expansion

---

## Long-Term North Star

Lumo should ultimately feel like:

> a calm, intelligent system that helps users maintain clarity and momentum every day.