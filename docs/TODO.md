# LifeOS — System TODO (Post-Refactor)

## 🎯 CURRENT STATE
- Architecture refactor complete ✅
- Task model unified (completed: boolean) ✅
- Zustand stores working correctly ✅
- Today dashboard wired to real data ✅

---

# 🔴 P0 — CRITICAL (MUST BE CLEAN)

## 1. Final Type Safety Check
- [ ] TypeScript = 0 errors
- [ ] No completedDates anywhere
- [ ] No title / subtitle
- [ ] No TaskRowVM or legacy types

---

## 2. Hook Consistency
- [ ] useTasks() used WITHOUT params
- [ ] No .find() on sections
- [ ] All components use:
  ts   useTasksStore(s => s.tasks)   

---

## 3. Store Integrity
- [ ] No mutations in Zustand
- [ ] All updates immutable
- [ ] No derived state inside store

---

# 🟠 P1 — UX + PRODUCT CLEANUP

## 4. Today Page Structure

Replace:

- [ ] Remove separate "Up Next"
- [ ] Remove weak "Recent Activity"

Add:

- [ ] Create Next Actions section
  - [ ] Log meal
  - [ ] Complete task
  - [ ] Add task CTA

---

## 5. Quick Actions

- [ ] All buttons trigger real actions
- [ ] No static UI
- [ ] Remove icon backgrounds
- [ ] Increase icon size (32–40px)

---

## 6. Modal UX

- [ ] BottomSheet scrolls correctly
- [ ] CTA always visible (sticky)
- [ ] Safe area padding applied
- [ ] No content hidden behind nav

---

# 🟡 P2 — UI CONSISTENCY

## 7. Buttons

- [ ] All clickable elements = <button>
- [ ] Add:
  - active:scale-[0.97]
  - transition
  - hover:opacity-90

---

## 8. Spacing + Layout

- [ ] Consistent vertical rhythm
- [ ] Remove unnecessary wrappers
- [ ] Avoid nested scroll areas

---

## 9. Icons

- [ ] No background containers
- [ ] Consistent size across app
- [ ] Proper alignment (no drifting)

---

# 🧠 P3 — STATE + LOGIC IMPROVEMENTS

## 10. Extract Selectors

- [ ] useTodayTasks
- [ ] useTaskSummary
- [ ] useNextAction

---

## 11. Remove Logic From Components

- [ ] No calculations inside JSX
- [ ] No inline filtering
- [ ] Move all derived logic to hooks/selectors

---

# ⚡ P4 — PERFORMANCE (NEXT BIG STEP)

## 12. Prevent Re-renders

- [ ] Use shallow selectors where needed
- [ ] Avoid full store subscriptions
- [ ] Memoize derived data

---

## 13. Code Splitting

- [ ] Lazy load:
  - modals
  - heavy pages

---

## 14. Image Optimization

- [ ] Ensure correct sizes
- [ ] Avoid oversized assets
- [ ] Improve LCP image loading

---

## 15. Bundle Optimization

- [ ] Remove unused code
- [ ] Reduce vendor chunk size
- [ ] Audit dependencies

---

# 🧪 P5 — TESTING

## 16. Fix Test Structure

- [ ] No legacy mocks
- [ ] Use real Task model
- [ ] Inline test data (no shared mockTasks)

---

## 17. Behavioral Tests

- [ ] AddTask adds task
- [ ] toggleTask updates UI
- [ ] Today dashboard reacts to state

---

# 🧹 P6 — CLEANUP

## 18. Remove Dead Code

- [ ] Unused imports
- [ ] Unused variables
- [ ] Old domain helpers

---

## 19. Remove Old Abstractions

- [ ] TaskInsights (if not rebuilt)
- [ ] TaskProgress (if redundant)
- [ ] Any leftover view models

---

# 🚀 FINAL STATE (GOAL)

The app is complete when:

- [ ] TypeScript = 0 errors
- [ ] No legacy fields exist
- [ ] UI fully reactive
- [ ] No duplicated logic
- [ ] Mobile performance ≥ 95
- [ ] UX feels consistent and intentional

---

# 🧠 DEVELOPMENT RULE

Before adding ANY feature:

Ask:

> “Does this follow architecture.md?”

If not → refactor first.

---

END