
## Apply-mode execution plan

The audit is approved, but this session is still in read-only Plan Mode, so no files can be modified yet. Once write access is available, I will apply the refactor incrementally from P0 → P1 → P2 → P3 without pausing between priority levels.

## Execution rules I will follow

- Apply changes in the exact priority order from the audit.
- Work in small, reviewable steps rather than rewriting the whole app at once.
- Keep routing, imports, Zustand persistence, and existing UI behavior working throughout.
- Preserve current app functionality while improving architecture.
- Use the requested diff-style explanation for each implementation step:
  - `--- before: src/path/File.tsx`
  - `--- after: src/path/File.tsx`
  - `--- new: src/path/File.ts`
  - `--- moved: src/old/File.tsx → src/new/File.tsx`
  - `--- deleted: src/path/File.tsx`
- Validate TypeScript/build health after meaningful groups of changes once command execution is available.

---

## P0 – Critical

### Tasks

1. Fix invalid task date creation from recipes.
2. Add app-level defensive safety for runtime crashes.
3. Correct modal accessibility foundations.
4. Guard unsafe task delete and task form default-date edge cases.

### Implementation plan

#### 1. Fix invalid task date creation from recipes

- Update the recipe workflow so it uses `getToday()` instead of the literal string `"Today"` when creating a task.
- This prevents recipe-created tasks from disappearing from date-based grouping logic.
- Keep behavior the same: using a recipe still adds a meal, shopping items, and a cooking task.

Files involved:
- `src/pages/Recipes.tsx`
- `src/lib/date.ts`

Ideal pattern:
- Date keys must always be ISO-like `YYYY-MM-DD` values produced by shared date utilities.

#### 2. Add app-level ErrorBoundary

- Add an `ErrorBoundary` component.
- Wrap the app shell with it from `main.tsx` or `App.tsx`.
- Show a safe fallback UI instead of a blank screen if runtime rendering fails.

Files involved:
- `src/app/providers/ErrorBoundary.tsx` or `src/components/ErrorBoundary.tsx` initially
- `src/main.tsx`
- `src/App.tsx`

Ideal pattern:
- App-level defensive boundary in `app/providers`.

#### 3. Correct modal accessibility foundations

- Introduce a reusable accessible bottom-sheet/dialog primitive.
- Add:
  - `role="dialog"`
  - `aria-modal="true"`
  - labelled title support
  - Escape key close
  - focus return/focus management where practical
  - overlay click-to-close behavior
- Migrate the most critical existing modals first without changing their visual design:
  - `AddTask`
  - `EditTask`
  - then the other add modals.

Files involved:
- `src/components/modal/AddTask.tsx`
- `src/components/modal/EditTask.tsx`
- `src/components/modal/AddExpense.tsx`
- `src/components/modal/AddMeal.tsx`
- `src/components/modal/AddShoppingItem.tsx`
- `src/components/modal/AddRecipe.tsx`
- `src/components/modal/AddBill.tsx`
- new shared dialog primitive

Ideal pattern:
- Shared accessible dialog/bottom-sheet primitive reused by all feature forms.

#### 4. Guard unsafe task delete and stale default date

- Add a null guard before deleting a selected task.
- Update `AddTask` so its local date field resets when the modal opens or when `defaultDate` changes.
- Preserve existing add/edit/delete/toggle flows.

Files involved:
- `src/pages/Tasks.tsx`
- `src/components/modal/AddTask.tsx`

Ideal pattern:
- Defensive UI handlers and form reset-on-open behavior.

---

## P1 – High

### Tasks

5. Split the monolithic Zustand store into domain slices and object-payload actions.
6. Extract derived selectors for tasks, budget, dashboard progress, and categories.
7. Move feature-specific components into feature folders.
8. Centralize task category metadata.
9. Replace custom checkbox-like buttons with accessible checkbox row primitives.

### Implementation plan

#### 5. Split Zustand store into domain slices

- Keep `useAppStore` as the public compatibility export during the transition.
- Internally split state/actions into slices:
  - tasks
  - budget/expenses
  - meals
  - shopping
  - bills
  - recipes
- Convert actions from positional parameters to object payloads.
- Update consumers gradually.

Files involved:
- `src/store/useAppStore.ts`
- new `src/store/rootStore.ts`
- new `src/store/slices/tasksSlice.ts`
- new `src/store/slices/budgetSlice.ts`
- new `src/store/slices/mealsSlice.ts`
- new `src/store/slices/shoppingSlice.ts`
- new `src/store/slices/billsSlice.ts`
- new `src/store/slices/recipesSlice.ts`

Ideal pattern:
- Zustand slice pattern with typed payload actions.

#### 6. Extract derived selectors

- Move filtering/grouping/calculation logic out of render bodies.
- Add task selectors for:
  - today tasks
  - upcoming tasks
  - yesterday tasks
  - completed status by date
  - sorted task timeline sections
- Add budget selectors for totals and safe percentages.
- Add dashboard selectors for progress summaries.

Files involved:
- `src/pages/Tasks.tsx`
- `src/components/TodayTasks.tsx`
- `src/components/TaskProgressCard.tsx`
- `src/pages/Budget.tsx`
- new `src/features/tasks/selectors/taskSelectors.ts`
- new `src/features/budget/selectors/budgetSelectors.ts`
- new shared number utility

Ideal pattern:
- Pure selectors + thin UI components.

#### 7. Move feature-specific components into feature folders

- Create feature-first folders.
- Move page and domain-owned components into their owning feature.
- Keep shared UI primitives in shared UI.

Initial target structure:
```text
src/
  app/
  shared/
  store/
  features/
    today/
    tasks/
    budget/
    meals/
    shopping/
    recipes/
    bills/
```

Files involved:
- `src/pages/Dashboard.tsx`
- `src/pages/Tasks.tsx`
- `src/pages/Budget.tsx`
- `src/pages/MealPlanner.tsx`
- `src/pages/ShoppingList.tsx`
- `src/pages/Recipes.tsx`
- dashboard widgets
- modal form components

Ideal pattern:
- Feature-first structure with shared primitives separated from domain components.

#### 8. Centralize task category metadata

- Move category names, styles, and any related task category constants into one module.
- Update task forms, task list items, and dashboard task summaries to consume the same metadata.
- Keep category colors consistent across the app.

Files involved:
- `src/lib/categoryStyles.ts`
- `src/components/modal/AddTask.tsx`
- `src/components/modal/EditTask.tsx`
- `src/components/ListItem.tsx`
- `src/components/TodayTasks.tsx`
- new `src/features/tasks/constants/categories.ts`

Ideal pattern:
- Single category metadata source of truth.

#### 9. Replace checkbox-like buttons with accessible checkbox rows

- Extract a shared checkbox row/control.
- Use semantic checkbox behavior:
  - native checkbox or accessible role
  - `aria-checked` when appropriate
  - keyboard toggling
  - visible focus styles
- Apply to task rows and shopping list rows.

Files involved:
- `src/components/ListItem.tsx`
- `src/pages/ShoppingList.tsx`
- possible `src/components/TaskItem.tsx` if still retained
- new `src/shared/ui/CheckboxRow.tsx`

Ideal pattern:
- Accessible shared checkbox primitive.

---

## P2 – Medium

### Tasks

10. Consolidate card, button, modal, and form UI primitives.
11. Create a shared page shell and remove duplicate page padding/layout wrappers.
12. Rename domain/page concepts for clarity.
13. Add versioned Zustand persistence and migration support.
14. Improve performance with memoized selectors and one-pass summaries.
15. Strengthen TypeScript and linting gradually.

### Implementation plan

#### 10. Consolidate UI primitives

- Create shared primitives:
  - `Button`
  - `Card`
  - `IconButton`
  - `BottomSheetDialog`
  - `FormActions`
  - `EmptyState`
  - `ListRow`
- Gradually replace `AppCard`, `ActionButton`, and `AddButton` wrappers or make them compatibility exports.

Files involved:
- `src/components/AppCard.tsx`
- `src/components/ActionButton.tsx`
- `src/components/AddButton.tsx`
- modal files
- new `src/shared/ui/*`

Ideal pattern:
- Shared UI primitives with consistent variants.

#### 11. Create PageShell layout

- Move common page spacing/layout into a shared shell.
- Remove duplicate `p-4`, `pb-24`, `max-w-lg`, and similar wrappers from individual pages.
- Keep mobile-first width behavior consistent.

Files involved:
- `src/App.tsx`
- all page files under `src/pages` or new `features/*/pages`
- new `src/app/layout/PageShell.tsx`
- new `src/app/layout/AppShell.tsx`

Ideal pattern:
- App shell owns layout; pages own content.

#### 12. Rename domain/page concepts

- Rename `Dashboard` concept to `TodayPage` to match navigation.
- Improve date naming over time:
  - `date` → `dateKey` where the value is an ISO date key
  - `day` → `weekday` where the value is a weekday label
  - `Bill.date` → `dueDate` if representing a due date
- Keep compatibility where needed during migration.

Files involved:
- `src/pages/Dashboard.tsx`
- `src/App.tsx`
- store types and consumers

Ideal pattern:
- Domain names match meaning and UI labels.

#### 13. Add versioned Zustand persistence

- Add persistence `version`.
- Add `migrate` function.
- Add `partialize` if useful to avoid persisting transient state.
- Preserve existing `app-storage` data as much as possible.

Files involved:
- `src/store/useAppStore.ts`
- new `src/store/persistence.ts`

Ideal pattern:
- Versioned persisted store with migrations.

#### 14. Improve performance with memoized selectors

- Use memoized selectors/hooks for:
  - task timeline groups
  - today task summaries
  - budget totals
  - progress values
- Replace nested repeated filtering with one-pass reductions.

Files involved:
- `src/components/TodayTasks.tsx`
- `src/components/TaskProgressCard.tsx`
- `src/pages/Tasks.tsx`
- selector files

Ideal pattern:
- One-pass pure selectors, minimal render-time work.

#### 15. Strengthen TypeScript and linting gradually

- Remove obvious `any` usage in task pages and modals.
- Prefer domain types and typed payloads.
- Tighten linting only after the architecture moves are stable, avoiding a large unrelated ruleset change.

Files involved:
- `src/pages/Tasks.tsx`
- modal files
- store files
- `eslint.config.js`
- `tsconfig.*`

Ideal pattern:
- Strong typed domain boundaries without blocking incremental refactor.

---

## P3 – Low

### Tasks

16. Remove unused scaffold/dead files.
17. Standardize asset folders and icon formats.
18. Reduce noisy comments and replace with intent-focused documentation only where needed.
19. Add meaningful tests for selectors, store actions, and core workflows.
20. Prune or quarantine unused shadcn primitives.

### Implementation plan

#### 16. Remove unused scaffold/dead files

- Delete files confirmed unused after the move.
- Candidates:
  - `src/pages/Index.tsx`
  - `src/App.css`
  - `src/components/TaskItem.tsx`
  - `src/components/NavLink.tsx`
- Keep anything still imported.

Ideal pattern:
- No unused scaffold files in production source.

#### 17. Standardize asset folders and icons

- Organize assets into:
```text
src/assets/
  brand/
  navigation/
  categories/
```
- Update imports accordingly.
- Avoid duplicate nav icons in multiple formats unless required.

Ideal pattern:
- Assets grouped by purpose.

#### 18. Reduce noisy comments

- Remove comments that document previous fixes rather than current intent.
- Keep comments only for non-obvious domain behavior.

Files involved:
- `src/store/useAppStore.ts`
- task/date-related files
- modal files
- page files

Ideal pattern:
- Self-documenting code with minimal intent comments.

#### 19. Add tests

- Add tests for:
  - task grouping selectors
  - date utilities
  - safe percentage utility
  - store slice actions
  - recipe workflow task date creation
- Replace placeholder example test with meaningful coverage.

Files involved:
- `src/test/example.test.ts`
- new selector/store tests near features or under `src/test`

Ideal pattern:
- Pure logic tests for selectors/services.

#### 20. Prune or quarantine unused shadcn primitives

- Move generated shadcn components under `src/shared/ui/shadcn`.
- Optionally remove unused primitives only after verifying imports.
- Keep app-specific primitives separate from generated primitives.

Files involved:
- `src/components/ui/*`
- new `src/shared/ui/shadcn/*`

Ideal pattern:
- Clear separation between app UI and generated/vendor-style UI primitives.

---

## Final completion output once implementation is allowed

After all P0 → P1 → P2 → P3 tasks are implemented, I will provide:

- Summary of all architectural changes.
- Confirmation that routing, imports, persistence, and UI behavior were preserved.
- Any remaining cleanup opportunities.
- Confirmation that Apply Mode is complete.
