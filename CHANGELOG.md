# CHANGELOG

All notable architectural changes from the multi-phase refactor are documented
here. The refactor was executed in three phases against an existing mobile
React + TypeScript + Zustand + Tailwind app. No user-facing behaviour changed;
this is a pure architecture pass.

---

## Summary

### What was refactored

- **Store layer** — A single monolithic Zustand store (`useAppStore`) composed
  from six slices was split into **six fully isolated, per-feature stores**,
  each living inside its own feature module. A custom `PersistStorage` adapter
  was introduced so the six stores share one `localStorage` key, preserving
  every byte of existing user data (tasks, expenses, meals, shopping, bills,
  recipes) across the upgrade.
- **Cross-feature workflows** — The recipe-application logic, which previously
  required passing a curated subset of the global store to a free function,
  was rewritten as a proper React hook (`useApplyRecipe`) that composes three
  feature stores. This is now the sanctioned pattern for any cross-feature
  side-effect.
- **UI layer** — The split between `src/shared/ui/*` (presentational
  primitives + shadcn) and `src/components/*` (app components) was
  consolidated. All presentational primitives and the entire shadcn library
  now live under `src/components/ui/`, matching the alias declared in
  `components.json` and aligning with the canonical shadcn project layout.
- **Design tokens** — A new `src/theme/` module exposes a typed TypeScript
  mirror of the CSS-variable design system, plus modular spacing, radius,
  typography, motion, and z-index scales. CSS variables remain the single
  source of truth at runtime; the TS module exists for non-CSS contexts (SVG
  attributes, charts, inline styles, computed values).

### What improved

- **Architecture** — Strict feature isolation. A feature module now fully owns
  its types, store, selectors, components, hooks, and pages. Removing or
  replacing a feature touches a single directory.
- **Scalability** — Adding a new domain no longer means editing a global state
  type, a global slice combinator, and a global persistence partializer.
  Drop a new `src/features/<x>/store/use<X>Store.ts` next to its types and it
  is wired in.
- **Performance** — Per-feature stores narrow the surface that any subscribing
  component can re-render against. Components that previously selected from
  the monolith now subscribe only to their feature's store, eliminating a
  class of unrelated-update re-renders. Selector functions remain pure and
  memoizable per feature.
- **Type safety** — The `AppState` god-type is gone. Each store exports its
  own state interface, so accidental cross-feature coupling becomes a compile
  error, not a runtime accident.
- **Discoverability** — `src/shared/` is now exclusively non-UI utilities and
  hooks. UI primitives live where the shadcn alias points and where engineers
  naturally look for them.

---

## Breaking Changes

### Renamed / deleted store APIs

| Old import | New import |
|---|---|
| `import { useAppStore } from "@/store/useAppStore"` | `import { useTasksStore } from "@/features/tasks/store/useTasksStore"` (and per-feature equivalents) |
| `import type { AppState } from "@/store/useAppStore"` | **Removed.** Each feature exports its own state interface. |
| `import type { Task, ... } from "@/store/useAppStore"` | `import type { Task, ... } from "@/features/tasks/types"` |
| `applyRecipe(recipe, { addMeal, addShoppingItem, addTask })` (free function) | `const applyRecipe = useApplyRecipe(); applyRecipe(recipe)` (hook) |

### Renamed / moved UI imports

Every `@/shared/ui/...` import becomes `@/components/ui/...`:

| Old import | New import |
|---|---|
| `@/shared/ui/Button` | `@/components/ui/Button` |
| `@/shared/ui/Card` | `@/components/ui/Card` |
| `@/shared/ui/BottomSheetDialog` | `@/components/ui/BottomSheetDialog` |
| `@/shared/ui/CheckboxRow` | `@/components/ui/CheckboxRow` |
| `@/shared/ui/EmptyState` | `@/components/ui/EmptyState` |
| `@/shared/ui/FormActions` | `@/components/ui/FormActions` |
| `@/shared/ui/IconButton` | `@/components/ui/IconButton` |
| `@/shared/ui/shadcn/<any>` | `@/components/ui/shadcn/<any>` |

### Component prop changes

- **`RecipesPage`** — no longer reads `addMeal`, `addShoppingItem`, `addTask`
  from a global store. Instead calls `useApplyRecipe()` and invokes the
  returned function with just the recipe. Public surface (props) unchanged.
- **`<TasksPage />`, `<BudgetPage />`, `<MealPlannerPage />`,
  `<ShoppingListPage />`, `<TodayPage />`, `<TodayTasks />`,
  `<TaskProgressCard />`, `<BillsDueCard />`, `<EditTask />`** — internal
  store wiring rewritten; no public prop changes.

### Persistence

- The localStorage key remains `app-storage`. The shape of the persisted blob
  is unchanged (same top-level keys: `tasks`, `weeklyBudget`, `income`,
  `expenses`, `meals`, `shoppingItems`, `bills`, `recipes`). **Existing user
  data is preserved and read back into the new per-feature stores
  transparently.** No migration prompt or data loss.

---

## Architecture Changes

### New folder structure

```
src/
├── app/
│   ├── layout/             # AppShell, PageShell
│   └── providers/          # ErrorBoundary, future providers
├── components/             # App-specific composed components
│   ├── modal/              # AddTask, AddExpense, EditTask, ...
│   └── ui/                 # Presentational primitives + shadcn
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── BottomSheetDialog.tsx
│       ├── CheckboxRow.tsx
│       ├── EmptyState.tsx
│       ├── FormActions.tsx
│       ├── IconButton.tsx
│       └── shadcn/         # Full shadcn library (50+ primitives)
├── features/               # Domain modules — fully self-contained
│   ├── bills/
│   │   ├── store/useBillsStore.ts
│   │   └── types.ts
│   ├── budget/
│   │   ├── pages/BudgetPage.tsx
│   │   ├── selectors/budgetSelectors.ts
│   │   ├── store/useBudgetStore.ts
│   │   └── types.ts
│   ├── meals/
│   │   ├── pages/MealPlannerPage.tsx
│   │   ├── constants/weekdays.ts
│   │   ├── store/useMealsStore.ts
│   │   └── types.ts
│   ├── recipes/
│   │   ├── pages/RecipesPage.tsx
│   │   ├── hooks/useApplyRecipe.ts        # cross-feature orchestrator
│   │   ├── services/recipeWorkflow.ts     # pure logic
│   │   ├── store/useRecipesStore.ts
│   │   └── types.ts
│   ├── shopping/
│   │   ├── pages/ShoppingListPage.tsx
│   │   ├── store/useShoppingStore.ts
│   │   └── types.ts
│   ├── tasks/
│   │   ├── pages/TasksPage.tsx
│   │   ├── components/TaskSection.tsx
│   │   ├── constants/categories.ts
│   │   ├── selectors/taskSelectors.ts
│   │   ├── store/useTasksStore.ts
│   │   └── types.ts
│   └── today/
│       └── pages/TodayPage.tsx
├── pages/                  # Thin re-exports → feature pages (router seam)
├── shared/                 # Truly shared, non-UI
│   ├── hooks/              # use-mobile, use-toast
│   └── lib/                # date, id, number
├── store/
│   └── sharedPersist.ts    # PersistStorage adapter (the only file in /store)
├── theme/
│   ├── index.ts            # Public entry
│   └── tokens.ts           # Typed mirror of CSS-variable design system
├── lib/                    # Tailwind/clsx helpers, theme strings, gradients
└── App.tsx                 # Router only
```

### Feature-based architecture

Every domain follows the same internal layout:

```
features/<domain>/
├── pages/        # Route screens (composition only, no business logic)
├── components/   # Feature-specific composed components
├── store/        # use<Domain>Store.ts — Zustand store for this feature
├── selectors/    # Pure selectors operating on store state
├── hooks/        # Feature hooks (incl. cross-feature orchestrators)
├── services/     # Pure domain logic (no React, no Zustand)
├── constants/    # Static configuration, enums, lookup tables
└── types.ts      # Public types and Create*Input shapes
```

Features only depend on:
- Their own internal modules
- `@/shared/*` (truly shared utilities)
- `@/components/ui/*` (presentational primitives)
- `@/theme/*` (design tokens)
- Other features **only** via that feature's public store hook (and only
  inside an orchestrator hook in `features/<self>/hooks/`)

### Store modularization

**Before**

```
src/store/
├── rootStore.ts            # create<AppState>()(persist(...))
├── useAppStore.ts          # Re-exports rootStore + cross-feature types
├── persistence.ts          # STORE_VERSION, migrate, partialize for AppState
└── slices/
    ├── tasksSlice.ts       # StateCreator<AppState, [], [], TasksSlice>
    ├── budgetSlice.ts
    ├── mealsSlice.ts
    ├── shoppingSlice.ts
    ├── billsSlice.ts
    └── recipesSlice.ts
```

All six slices were composed into one giant `AppState` in `rootStore.ts`.
Every component selected from this monolith.

**After**

```
src/store/
└── sharedPersist.ts        # createNamespacedStorage<T>(keys)

src/features/<domain>/store/use<Domain>Store.ts
```

Each store:
- Calls `create<State>()(persist(...))` independently
- Defines its own `partialize` and (where needed) `migrate`
- Uses `createNamespacedStorage(["key1", "key2"])` from `sharedPersist.ts`,
  which transparently reads/writes only the named keys inside the shared
  `app-storage` localStorage blob

The `AppState` type is **deleted**. There is no longer any place where two
unrelated features are typed together.

---

## File Movements

### Phase 1 — Store split

| Old path | New path |
|---|---|
| `src/store/slices/tasksSlice.ts` | `src/features/tasks/store/useTasksStore.ts` (rewritten as standalone store) |
| `src/store/slices/budgetSlice.ts` | `src/features/budget/store/useBudgetStore.ts` (rewritten) |
| `src/store/slices/mealsSlice.ts` | `src/features/meals/store/useMealsStore.ts` (rewritten) |
| `src/store/slices/shoppingSlice.ts` | `src/features/shopping/store/useShoppingStore.ts` (rewritten) |
| `src/store/slices/billsSlice.ts` | `src/features/bills/store/useBillsStore.ts` (rewritten) |
| `src/store/slices/recipesSlice.ts` | `src/features/recipes/store/useRecipesStore.ts` (rewritten) |
| `src/store/persistence.ts` | `src/store/sharedPersist.ts` (rewritten as `PersistStorage` adapter) |

### Phase 2 — UI consolidation

| Old path | New path |
|---|---|
| `src/shared/ui/Button.tsx` | `src/components/ui/Button.tsx` |
| `src/shared/ui/Card.tsx` | `src/components/ui/Card.tsx` |
| `src/shared/ui/BottomSheetDialog.tsx` | `src/components/ui/BottomSheetDialog.tsx` |
| `src/shared/ui/CheckboxRow.tsx` | `src/components/ui/CheckboxRow.tsx` |
| `src/shared/ui/EmptyState.tsx` | `src/components/ui/EmptyState.tsx` |
| `src/shared/ui/FormActions.tsx` | `src/components/ui/FormActions.tsx` |
| `src/shared/ui/IconButton.tsx` | `src/components/ui/IconButton.tsx` |
| `src/shared/ui/shadcn/*` (50+ files) | `src/components/ui/shadcn/*` |

`src/shared/ui/` directory removed entirely.

---

## New Files Added

| File | Purpose |
|---|---|
| `src/store/sharedPersist.ts` | Exposes `createNamespacedStorage<T>(keys)`, a Zustand `PersistStorage` adapter that reads/writes a namespaced subset of a single shared localStorage key. Lets per-feature stores persist independently while preserving the existing `app-storage` blob. |
| `src/features/tasks/store/useTasksStore.ts` | Tasks Zustand store: `tasks`, `addTask`, `toggleTask`, `updateTask`, `deleteTask`. Includes a v1 migration that backfills `completedDates: []` on legacy task records. |
| `src/features/budget/store/useBudgetStore.ts` | Budget Zustand store: `weeklyBudget`, `income`, `expenses`, `addExpense`, `setIncome`. |
| `src/features/meals/store/useMealsStore.ts` | Meals Zustand store: `meals`, `addMeal`. |
| `src/features/shopping/store/useShoppingStore.ts` | Shopping Zustand store: `shoppingItems`, `addShoppingItem`, `toggleShoppingItem`. |
| `src/features/bills/store/useBillsStore.ts` | Bills Zustand store: `bills`, `addBill`. |
| `src/features/recipes/store/useRecipesStore.ts` | Recipes Zustand store: `recipes`, `addRecipe`. |
| `src/theme/tokens.ts` | Typed TS mirror of all CSS variables: `colors`, `gradients`, `shadows`, plus modular `spacing`, `radius`, `fontFamily`, `fontWeight`, `fontSize`, `motion`, `zIndex` scales. Exports `hsl(token, alpha?)` and `cssVar(token, alpha?)` helpers. |
| `src/theme/index.ts` | Public theme entrypoint. Re-exports tokens and provides `tokens` as the default export. |

---

## Deleted / Removed

| File | Reason |
|---|---|
| `src/store/rootStore.ts` | The monolithic `useAppStore` it created is replaced by six per-feature stores. |
| `src/store/useAppStore.ts` | Was a re-export shim around `rootStore`. No longer meaningful. |
| `src/store/persistence.ts` | `STORE_VERSION` / `migrate` / `partialize` were `AppState`-shaped; each store now owns these concerns. Replaced by `sharedPersist.ts`. |
| `src/store/slices/tasksSlice.ts` | Logic moved into `useTasksStore`. |
| `src/store/slices/budgetSlice.ts` | Logic moved into `useBudgetStore`. |
| `src/store/slices/mealsSlice.ts` | Logic moved into `useMealsStore`. |
| `src/store/slices/shoppingSlice.ts` | Logic moved into `useShoppingStore`. |
| `src/store/slices/billsSlice.ts` | Logic moved into `useBillsStore`. |
| `src/store/slices/recipesSlice.ts` | Logic moved into `useRecipesStore`. |
| `src/store/slices/` (directory) | Empty after slice removal. |
| `src/shared/ui/` (directory) | Contents moved to `src/components/ui/`; directory removed to prevent fragmentation of the UI layer. |

---

## Refactored Components & Hooks

### `useApplyRecipe` (`src/features/recipes/hooks/useApplyRecipe.ts`)

**Before** — Free function importing the global store's `getState` type:

```ts
export const applyRecipe = (recipe, actions: Pick<Store, "addMeal" | "addShoppingItem" | "addTask">) => {
  const workflow = buildRecipeWorkflow(recipe);
  actions.addMeal(workflow.meal);
  workflow.shoppingItems.forEach((i) => actions.addShoppingItem(i));
  actions.addTask(workflow.task);
};
```

**After** — A real React hook that internally subscribes to the three
feature stores it orchestrates. Returns a stable callback:

```ts
export const useApplyRecipe = () => {
  const addMeal = useMealsStore((s) => s.addMeal);
  const addShoppingItem = useShoppingStore((s) => s.addShoppingItem);
  const addTask = useTasksStore((s) => s.addTask);
  return useCallback((recipe) => { /* orchestrate */ }, [addMeal, addShoppingItem, addTask]);
};
```

**Why:** Removes the leaky abstraction of asking the caller to thread store
actions in. Establishes the canonical pattern for cross-feature side-effects:
*"orchestrator hook lives in the feature that owns the workflow."*

### Page components

`TasksPage`, `BudgetPage`, `MealPlannerPage`, `ShoppingListPage`,
`RecipesPage`, `TodayPage` — switched from `useAppStore` selectors to the
relevant per-feature store hooks. Public props unchanged.

### Display components

- `TodayTasks` — now subscribes to `useTasksStore` directly. Re-renders only
  when tasks change (not when budget or shopping changes).
- `TaskProgressCard` — same.
- `BillsDueCard` — switched to `useBillsStore`.
- `EditTask` — type-only import path updated from `@/store/useAppStore` to
  `@/features/tasks/types` (the actual source of `Task`, `TaskCategory`,
  `TaskRecurrence`).

### Import rewrites at scale

- **41 imports** of `@/shared/ui/...` rewritten to `@/components/ui/...`
  across `src/app/`, `src/components/`, `src/components/modal/`,
  `src/shared/hooks/use-toast.ts`, and shadcn primitives' internal
  cross-references.
- **All** `useAppStore` imports (13 call sites across 11 files) replaced with
  per-feature store imports.

---

## Store Changes

### Old structure

- One global `useAppStore`, typed as `TasksSlice & BudgetSlice & MealsSlice &
  ShoppingSlice & BillsSlice & RecipesSlice`.
- Single `persist({ name: "app-storage", version, migrate, partialize })`.
- Cross-feature coupling was the default: any component could grab any
  feature's actions from the same hook.

### New structure

- Six independent stores, each created with `create<State>()(persist(...))`.
- Each store provides its own `partialize` listing the persisted keys it
  owns.
- All six stores persist into the same shared key (`app-storage`) via
  `createNamespacedStorage(keys)`. This adapter reads the existing blob,
  returns only the requested slice on `getItem`, and merges only the owned
  keys back on `setItem`.
- Cross-feature coupling now requires writing an orchestrator hook inside
  the owning feature, which makes the dependency explicit and discoverable.

### Logic redistribution

| Concern | Before | After |
|---|---|---|
| Task CRUD | `tasksSlice.ts` | `useTasksStore.ts` (same logic, owned by feature) |
| Task migration (`completedDates: []`) | global `migrateStore` in `persistence.ts` | per-store `migrate` inside `useTasksStore` |
| Persisted-key allowlist | global `partializeStore` | per-store `partialize` |
| Cross-feature recipe workflow | free function + caller threads store actions | `useApplyRecipe` hook composes three stores |
| Persistence wiring | one `persist(...)` over `AppState` | six `persist(...)` calls + one shared adapter |

---

## Design System Changes

### `src/theme/tokens.ts`

A typed mirror of the design system, intended for use **outside** of CSS
contexts (Tailwind classes remain the preferred path for JSX styling).

Exports:

- `colors: Record<ColorToken, string>` — HSL triplet strings keyed by
  semantic name (`primary`, `cardForeground`, `mutedForeground`, ...).
  Mirrors every `--*` color variable defined in `src/index.css`.
- `hsl(token, alpha?)` — wraps a token in `hsl(...)` for SVG/`style=` use.
- `cssVar(token, alpha?)` — emits `hsl(var(--token))` so the value
  participates in runtime theming/dark-mode swaps.
- `gradients` — typed `linear-gradient(...)` strings matching
  `--gradient-primary`, `--gradient-accent`, `--gradient-budget`.
- `shadows` — `--shadow-card`, `--shadow-elevated`.
- `spacing` — Tailwind-aligned 4px scale (`0`, `px`, `0.5`–`24`).
- `radius` — derived from `--radius: 0.75rem`, plus `xl`, `2xl`, `full`.
- `fontFamily`, `fontWeight`, `fontSize` — Montserrat-based type scale with
  `{ size, lineHeight }` pairs.
- `motion` — durations (`fast`/`base`/`slow`) and easing curves
  (`standard`/`decelerate`/`accelerate`).
- `zIndex` — semantic z-index scale (`base`, `dropdown`, `sticky`,
  `overlay`, `modal`, `toast`).
- Aggregate `tokens` constant + `Tokens` type for ergonomic consumption.

### Source-of-truth contract

CSS variables in `src/index.css` remain authoritative at runtime. The TS
module is a typed mirror — drift between the two is treated as a bug. The
file's header explicitly documents this contract and the rules for usage.

### UI standardization

- All shadcn primitives now live in the canonical `@/components/ui/shadcn`
  location, matching `components.json`'s declared aliases. The previous
  layout (`@/shared/ui/shadcn`) was inconsistent with shadcn-CLI defaults
  and required a non-default alias.
- Project-owned UI primitives sit alongside shadcn under
  `@/components/ui/*`, so a single import root covers all presentational
  building blocks.

---

## Verification

After each phase, the project was type-checked end-to-end with:

```bash
npx tsc -p tsconfig.app.json --noEmit
```

All three phases completed with **zero TypeScript errors**.

---

## Follow-Up Work

These items were intentionally left out of this refactor and are good
candidates for future passes:

1. **Selectors as hooks.** `getTaskTimelineGroups`, `getTaskProgress`,
   `getTodayCategorySummaries`, and `getBudgetSummary` are currently called
   inside `useMemo` inside components. Wrap each as a `useTasksSelector` /
   `useBudgetSelector` hook to centralize memoization and remove the
   `useMemo` boilerplate from page components.
2. **Loading / error states.** The current app is local-first with no async
   I/O, so `loading`/`error` states are absent by design. When network or
   persistence-async work is added, every list (`TasksPage`, `BudgetPage`
   transactions, `ShoppingListPage`, `RecipesPage`, `MealPlannerPage`)
   should adopt a triplet of `loading` / `empty` / `error` UI. The
   `EmptyState` primitive already exists; matching `LoadingState` and
   `ErrorState` primitives should be added under `@/components/ui/`.
3. **`/lib/theme.ts` and `/lib/gradients.ts` consolidation.** Two ad-hoc
   theme helpers live under `src/lib/`. They predate `src/theme/tokens.ts`
   and should be folded into the theme module (or deleted if redundant).
4. **`src/components` further split.** `src/components/*` mixes app-level
   composed components (`BillsDueCard`, `TodayTasks`, `TaskProgressCard`)
   with truly generic primitives (`AppCard`, `ListItem`, `ActionButton`,
   `AddButton`, `BottomNav`, `TabBar`, `PageHeader`, `TodayHeader`). A
   future pass should:
   - Move generic primitives into `@/components/ui/`.
   - Move app-composed components into the feature that owns them
     (`BillsDueCard` → `features/bills/components/`, `TodayTasks` and
     `TaskProgressCard` → `features/today/components/`, etc.).
5. **Modal location.** `src/components/modal/*` (AddTask, AddBill,
   AddExpense, ...) are feature-scoped. They should move to each feature's
   `components/` directory (e.g. `features/tasks/components/AddTask.tsx`),
   leaving `src/components/` for cross-feature pieces only.
6. **Pages re-export shim.** `src/pages/*.tsx` are one-line re-exports of
   feature pages, kept to avoid disturbing routing. Once the router is
   updated to import directly from `@/features/<x>/pages/...`, the
   `src/pages/` directory can be removed.
7. **Token-driven Tailwind config.** `tailwind.config.ts` currently reads
   from CSS variables. A future pass could have `tailwind.config.ts` import
   directly from `@/theme/tokens` for spacing/radius/typography, making the
   TS module the single source of truth and reducing CSS↔TS drift risk.
8. **Tests.** Per-feature stores are now individually unit-testable. Add
   Vitest coverage per store (`useTasksStore.test.ts`, etc.) and per
   selector. The existing `src/test/example.test.ts` is the only test in
   the repo today.
