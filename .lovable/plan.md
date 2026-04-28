
# LifeOS — Full Audit & Refactor Plan

## Phase 1 — Audit Findings

### Architecture map

```text
main.tsx
└── ErrorBoundary → QueryProvider → App
    └── BrowserRouter → AppShell (max-w-md frame + BottomNav)
        └── Routes
            ├── /         TodayPage          (today feature)
            ├── /tasks    TasksPage          (tasks feature)
            ├── /budget   BudgetPage         (budget feature)
            ├── /meals    MealPlannerPage    (meals feature)
            ├── /shopping ShoppingListPage   (shopping feature)
            └── /recipes  RecipesPage        (recipes feature)
```

Each feature follows: `pages/`, `components/`, `hooks/`, `selectors/`, `store/` (Zustand + persisted to a shared `app-storage` blob). State is 100% client-side; React Query is wired but not used (`queries/` files are TODO stubs).

### Strengths
- Clean feature-based folder structure.
- Single shared persistence adapter (`createNamespacedStorage`).
- `useTasks` already memoizes derived views from one raw subscription.
- Design tokens centralized in `index.css` + mirrored in `theme/tokens.ts`.
- `safeDate`, `safePercent` shared utilities exist.
- Compound `Card` primitive with `CardBody`, `CardHeader`, `CardFooter`, `CardImage`.

### Critical issues

**A. Two competing Card implementations (bug risk)**
- `src/components/ui/Card.tsx` re-exports `Card, CardHeader, CardBody, CardFooter, CardImage` from `./Card/index`.
- `src/components/ui/Card/Card.tsx` defines `CardBase` and exports `Object.assign(CardBase, { Body, Action })` as compound — but does NOT register `Header`/`Footer`/`Image`. Mixed mental model: some pages do `Card.Body`, some import `CardBody` named.
- Hard-coded `filter: "saturate(1.1) contrast(1.05)"` inline style, plus inline gradient `style={{ background: ... }}` instead of token utility classes.

**B. Token / styling drift**
- `theme/tokens.ts` `gradients.primary` has a typo: `"linear-gradient (135deg, ..."` (space breaks CSS). The CSS file uses a different value than `theme/tokens.ts` (CSS: `220 80% 56%` → `240 70% 62%`; TS: `220 60% 46%` → `240 55% 52%`). **Single source of truth violated.**
- `--accent` HSL drift: `index.css` says `160 60% 45%`; `tokens.ts` says `236 72% 71%`.
- Hard-coded HSL/hex in components: `categoryMetadata` HSL strings, `text-amber-600` in `TaskCategoryCard`, `rgba(255,255,255,0.25)` SVG strokes, `text-[hsl(var(--warning))]`, `bg-card/95`, `divide-border/40`. No semantic tokens for warning/success backgrounds.
- `--shadow-elevated` uses `-var(--space-1)` (invalid CSS — should be `calc(-1 * var(--space-1))`).
- `index.css` defines two `.card` utility classes with different styles (one in two `@layer components` blocks).
- Inline styles still present: `TodayHeroCard` (SVG transform/transition), `Button` (gradient bg), `TodayHeader` (custom shadow), `BudgetPage` (progress bar width), `TaskSection` (progress width), `PageHeader` (gradient bg), `PageShell` (gradient bg), `Card` (gradient + filter).

**C. Dead / orphan code**
- `src/features/tasks/components/TaskCategoryCard.tsx` — not imported anywhere.
- `src/features/tasks/components/TaskInsights.tsx` and `TaskProgress.tsx` — used only by `TasksPage` but visually duplicate what's in `TodayHeroCard`.
- `src/features/tasks/hooks/useTaskGroups.ts`, `useTaskInsights.ts`, `useTaskProgress.ts` — superseded by unified `useTasks` (they're "shims" but no one imports them outside themselves).
- `src/features/tasks/hooks/useTasksData.ts`, `src/features/budget/hooks/useBudgetData.ts` — created as "future-proof" wrappers but no consumer; pure speculation.
- `src/features/tasks/services/taskService.ts`, `src/features/budget/services/budgetService.ts` — stub interfaces that throw. Speculative.
- `src/features/*/queries/*Queries.ts` — all comment-only template files (today, tasks, budget, bills, meals, recipes, shopping).
- `src/lib/date.ts`, `src/lib/categoryStyles.ts`, `src/shared/lib/taskFormat.ts` — pure re-export shims with zero callers.
- `src/lib/color.ts` — color utilities, no callers.
- `src/components/ui/Card/CardImage.tsx`, `CardAction.tsx` — exported but unused.
- `src/features/recipes/services/recipeWorkflow.ts` — check usage (likely orphan).
- Two date helpers: `@/shared/lib/date` and `@/lib/date` (re-export); two task-domain entry points: `@/features/tasks/api` and `@/features/tasks/domain` and `@/features/tasks/selectors`.
- `useTasksViewModel` and `useTasks` overlap (both compute groups/progress from raw tasks), causing duplicate `useMemo` work on TasksPage.

**D. Architecture / data-flow inconsistencies**
- `TasksPage` reads `tasks` directly from store AND uses `useTaskActions` AND `useTasksViewModel` AND `useTasks` (via children) — four code paths for the same data, three subscriptions.
- `TodayPage` calls both `useTasks` AND `useBudgetSummary` AND `useBillViews` AND `useBudgetStore((s) => s.addExpense)` — fine, but `addExpense` should come from a hook for parity with the proposed data layer.
- `TaskListContainer` calls `useTasks()` for `actions`+`activeDate` AND `useTasksViewModel()` for sections — two subscriptions to same store, duplicate derivation.
- `useTaskActions` returns a NEW object every render (no `useMemo`) — props identity churn for memoized children.
- `lucide-react` is pinned to `^1.8.0` (very old API). Likely runtime risk; the project uses modern named imports (`ClipboardPlus`, `PiggyBank`, `ChevronRight`, `Bell`, `Menu`, `ChevronLeft`, `ChevronDown`, `Plus`) which exist only in modern versions. Either it works because lockfile resolves higher, or it's broken — needs alignment.

**E. UI / UX inconsistencies**
- `TodayPage` and `TasksPage` use different headers (`TodayHeader` vs `PageHeader`) and different background patterns. `PageShell` paints its own page gradient via inline style, but `AppShell` already applies a `bg-gradient-to-br` — double background.
- `TasksPage` still renders `TaskProgress` + `TaskInsights` + a wrapping glass div + `TaskListContainer` inside another glass div — three nested glass surfaces.
- `TaskRowUI` is unstyled (raw `<div>` + `<input type=checkbox>`) — broken visual design vs the rest of the app.
- Multiple "glass" surface recipes copy-pasted: `bg-white/60 backdrop-blur-md border border-white/40` appears in `TaskInsights`, `TaskProgress`, `TaskListContainer`, `TasksPage`, `TaskSection`. Should be a single primitive (`<Surface>` or `Card variant="glass"`).
- Bottom-nav uses absolute positioning inside a `flex` column — `pb-28` is a magic number to compensate.

**F. Accessibility**
- `TodayHeroCard` category items use `<li role="button">` + `onClick` — not keyboard-focusable, no `tabIndex`, no Enter/Space handler.
- `TaskRowUI` `<div onClick>` wrapping a checkbox — clicking the row toggles BOTH select and toggle (event bubbling); checkbox has no label.
- `BottomNav` `<img alt="">` icons are decorative — fine, but no `aria-current` on active link.
- `TodaySummaryRow` icon button has aria-label; OK. But `TodayHeader` notification dot conveys state with color only.
- `EmptyState`, `FormField`, `FormActions`, `BottomSheetDialog` need verification (not yet read).
- No focus-visible styles on most interactive `<button>` elements (only on the `Button` primitive).
- Contrast: `text-white/85`, `text-white/90` on the gradient hero may fail WCAG AA depending on stops.

**G. Performance**
- Most issues already fixed. Remaining:
  - `useTaskActions` returns a fresh object → consumers' `useMemo` dependencies churn.
  - `TaskListContainer` subscribes twice to tasks store.
  - `Card` recomputes `gradientStyle` object every render.
  - SVG strokes in `TodayHeroCard` use raw rgba (not memoized issue, just token issue).
  - `useBillViews` allocates new array on every store update; fine for current size.

**H. Bundle / dependencies**
- React Query installed and provided but unused → +30KB gzipped overhead. Either start using it or remove provider.
- `framer-motion`, `embla-carousel-react`, `recharts`, `cmdk`, `vaul`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `next-themes`, `sonner` — none appear to be used in app code (only by shadcn primitives, most of which are also unused). Need an unused-dep sweep.
- All of `src/components/ui/shadcn/*` is shipped; only a few (skeleton, toast/toaster, button) are referenced. Tree-shaking handles JS, but their dependent Radix packages stay in `package.json`.

**I. DX**
- ESLint config has only one rule (no-restricted-imports for UI). No `react-hooks`, `react-refresh`, or `@typescript-eslint/recommended` rules enabled despite plugins installed.
- No Prettier config.
- `tsconfig.app.json` strictness unknown — needs verification (likely permissive given `_unusedParam` patterns in services).
- No CI script for `lint + type-check + test`.
- `.lovable/plan.md`, `Swatches.mdx`, `CHANGELOG.md` exist but no contributor README sections describing the architecture.

---

## Phase 2 — Refactor Plan

Each phase is independently shippable. No phase rewrites the app.

### Phase A — Architecture cleanup (low risk, high signal)

**A1. Delete dead/speculative code** (no behavior change)
- `src/features/tasks/components/TaskCategoryCard.tsx`
- `src/features/tasks/hooks/useTaskGroups.ts`
- `src/features/tasks/hooks/useTaskInsights.ts`
- `src/features/tasks/hooks/useTaskProgress.ts`
- `src/features/tasks/hooks/useTasksData.ts`
- `src/features/budget/hooks/useBudgetData.ts`
- `src/features/tasks/services/taskService.ts`
- `src/features/budget/services/budgetService.ts`
- `src/features/{today,tasks,budget,bills,meals,recipes,shopping}/queries/*.ts`
- `src/lib/date.ts`, `src/lib/categoryStyles.ts`, `src/lib/color.ts`
- `src/shared/lib/taskFormat.ts`
- `src/components/ui/Card/CardImage.tsx`, `CardAction.tsx`
- Update `src/features/tasks/hooks/index.ts` to export only `useTasks` + `useTaskActions`.

**A2. Consolidate task derivation**
- Delete `src/features/tasks/view-models/useTasksViewModel.ts`. Move its `TaskGroupVM` shape and `mapToTaskRowVM` into `useTasks` as an optional `sections` field, OR keep the VM but build it from `useTasks` output (no second store subscription).
- Update `TaskListContainer` to consume one hook only.

**A3. Memoize action hook**
- Wrap `useTaskActions` return in `useMemo` so identity is stable.

**A4. Unify Card module**
- Delete the duplicate `src/components/ui/Card.tsx` re-export shim. Keep `src/components/ui/Card/index.ts` as the single entry.
- Make the compound `Card` properly attach `Header`, `Footer`, and remove `Action`/`Image` (now deleted). Pages already use the named imports, so no consumer changes are needed.
- Move the `gradientStyle` computation outside the component (or into `useMemo`).

**A5. Remove unused React Query provider**
- Delete `src/app/providers/QueryProvider.tsx`, `src/app/providers/queryClient.ts`, and unmount from `main.tsx`.
- Remove `@tanstack/react-query` from `package.json`. (Re-add when an actual remote source ships.)
- Net bundle savings: ~30KB gz.

### Phase B — UI / Design-system alignment

**B1. Fix design tokens (single source of truth)**
- File: `src/index.css`
  - Fix `--shadow-elevated` `calc()` bug.
  - Remove duplicate `.card` utility (keep one definition).
  - Add semantic tokens: `--success`, `--warning-foreground`, `--surface-glass`, `--surface-elevated`, `--gradient-hero` matching the `brandGradients.primary` stops.
- File: `src/theme/tokens.ts`
  - Fix `linear-gradient ` typo.
  - Re-sync `colors.accent` and `gradients.primary` with `index.css`.
  - Add a comment block: "If you change values here, also change `src/index.css`. CI lint TODO."

**B2. Replace inline styles with utilities/tokens**
- `Button.tsx` → expose variants via a `bg-gradient-*` Tailwind utility added in `tailwind.config.ts` (`backgroundImage: { 'btn-primary': 'var(--gradient-primary)', ... }`). Drops inline `style`.
- `PageShell.tsx` → use `bg-page` utility (add via tailwind config). Or remove `PageShell` entirely (see B4).
- `PageHeader.tsx` → use `bg-pill` utility or a `<Pill>` primitive.
- `TodayHeroCard.tsx` → keep SVG inline transforms (necessary for SVG), but replace `rgba(255,255,255,0.25)` with `currentColor` opacity utility, and replace inline `style={{ width: 6.5rem }}` with `w-[104px] h-[104px]`.
- `TaskSection.tsx`, `BudgetPage.tsx` progress bars → reusable `<ProgressBar value={…} />` primitive (no inline `style`).
- `TaskCategoryCard` `text-amber-600` → `text-[hsl(var(--warning))]` or new `text-warning` utility.

**B3. Surface primitive**
- Create `src/components/ui/Surface.tsx` for the recurring `bg-white/60 backdrop-blur-md border border-white/40` recipe used by `TaskSection`, `TasksPage` wrapper, `TaskInsights`, `TaskProgress`. Migrate those callers.

**B4. Resolve double background**
- Decide: `AppShell` paints page background OR `PageShell` does, not both. Recommendation: drop `PageShell` (it duplicates what `AppShell` already does) and let pages just be content. Single layer = predictable.

**B5. Header consistency**
- `PageHeader` and `TodayHeader` diverge sharply. Either merge into one (`<PageHeader title left right />`) or keep both but document the rule: `TodayHeader` for the dashboard, `PageHeader` for everything else. Recommendation: merge.

**B6. Tasks page hierarchy**
- Apply the same "one hero + one secondary" rule as Today: `TasksPage` should be `PageHeader` → `TodayHeroCard` (or a `TaskHeroCard` variant) → list. Drop the now-redundant `TaskInsights` + `TaskProgress` cards (or move them under a "View details" toggle).
- Re-style `TaskRowUI` so it actually matches the design language (rounded row, padding, label, time meta, semantic checkbox). Currently it's prototype HTML.

### Phase C — Logic / data-flow

**C1. Stabilize hook outputs**
- `useTaskActions` → `useMemo`.
- `useBillViews` already memoized; verify all selectors return stable refs when input is unchanged.

**C2. Single subscription per page**
- `TasksPage` should use only `useTasks()` (no direct `selectTasks` call). The "find by id" lookup for `EditTask` should live inside `useTasks` or be moved to a dedicated `useTaskById(id)` selector.

**C3. Action contracts**
- Standardize: every store exposes actions as individual `selectFoo` selectors (already true for tasks). Add the same pattern to `bills`, `budget`, `meals`, `recipes`, `shopping`. Pages should never reach into the store with inline `(s) => s.addExpense` — always through a selector. This makes future remote-mutation swaps a single-file change.

**C4. Domain re-exports**
- Collapse `features/tasks/api.ts` (currently `export * from domain + selectors`) into a documented public boundary. Add a one-liner README in `features/tasks/` explaining: "Always import from `@/features/tasks/api`. Don't reach into `domain/`, `selectors/`, or `store/` from outside the feature." Add ESLint `no-restricted-imports` rule to enforce.

### Phase D — Cleanup

**D1. Remove unused dependencies**
- Audit `package.json` against actual imports. Likely-removable (subject to verification): `@tanstack/react-query`, `framer-motion`, `embla-carousel-react`, `recharts`, `cmdk`, `vaul`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `next-themes`, `sonner`, plus the matching `@radix-ui/react-*` packages whose shadcn wrappers aren't imported.
- Trim `src/components/ui/shadcn/` to only the files actually imported (currently only a handful: `skeleton`, possibly `button`, `toast`/`toaster`, `dialog`).

**D2. Asset & util pruning**
- Verify every file in `src/assets/` is referenced; remove orphans.
- Delete `Swatches.mdx` if it's stale; otherwise move under `docs/`.

### Phase E — DX

**E1. ESLint hardening**
- Extend `eslint.config.js` to include:
  - `@typescript-eslint/recommended-type-checked` (or at minimum `recommended`)
  - `react-hooks/recommended`
  - `react-refresh/only-export-components`
  - `eslint-plugin-boundaries` rules for feature isolation (`features/X` cannot import from `features/Y`; UI cannot import from features — already partially enforced).
  - `no-restricted-imports` for `@/lib/date`, `@/lib/categoryStyles`, `@/lib/color`, `@/shared/lib/taskFormat` (after deletion these become hard-fail if anything is left behind).

**E2. TypeScript strict**
- Set `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true` in `tsconfig.app.json` if not already on.

**E3. Prettier**
- Add `.prettierrc` (printWidth 100, single quotes off to match current code, trailing comma all). Run once across `src/`.

**E4. CI script**
- Add `package.json` script `verify`: `tsc --noEmit && eslint . && vitest run`.

**E5. Architectural docs**
- Add `docs/ARCHITECTURE.md` describing: feature module layout, data flow (UI → hook → selector → store), styling layers (token → Tailwind utility → primitive → page), and the "no inline styles" / "no hardcoded colors" rules.

---

## Phase Sequencing & Diff Size

| Phase | Files touched | Risk | Reversible |
|-------|---------------|------|------------|
| A — Arch cleanup | ~25 deletions, 4 edits | low | yes (git) |
| B — Tokens & UI | ~12 edits, 1 new primitive | low-medium | yes |
| C — Logic | ~6 edits | low | yes |
| D — Deps & dead UI | `package.json`, ~30 deletions | medium (build) | yes |
| E — DX | config files only | none | yes |

Run order: **A → B → C → D → E**. Each phase ends with `tsc --noEmit` + `vitest run` + manual smoke (TodayPage, TasksPage, BudgetPage, modals).

---

## What I will NOT do (out of scope this round)
- Add a backend / Lovable Cloud (no requirement surfaced).
- Restyle the visual brand (colors, gradients) — only fix drift and inconsistency.
- Introduce React Query usage (will remove the unused provider; re-add when a real API exists).
- Migrate from Zustand to Redux/Jotai/etc.

---

## Approval gate

Reply with **"begin build"** to start Phase A.

If you'd like to reorder, scope down, or expand any phase (for example: keep React Query for a planned API, or skip Phase D dependency removal), tell me which and I'll revise the plan before any code changes.
