# CHANGELOG

All notable changes to this project are documented here.

This changelog follows a **phase-based release structure**, separating:
- Architecture phases (foundation)
- Product phases (user-facing behavior)

---

# 🚀 v0.2.0 — Product Foundation Release

> Transition from architecture → fully functional product UX

---

## Phase I — Data Integrity & UX System Completion

### Summary

- Fixed critical data inconsistencies
- Completed core UX flows
- Established unified input + action system

### Key Outcomes

- ✅ Fully working task system
- ✅ Reliable Today dashboard
- ✅ Unified modal/input system
- ✅ Action-driven UX

---

### Critical Fixes

#### Date Handling Bug

- Replaced UTC (`toISOString`) with local date logic
- Fixed Today + Up Next inconsistencies

**Impact**
- Correct task visibility
- Reliable date-based selectors

---

#### Task Creation Flow

- Uses `crypto.randomUUID()`
- Immutable updates enforced
- Default `completed: false`

**Result**
- Instant UI updates
- Stable persistence

---

#### Store Reactivity

- Standardized selector usage:

```ts
useTasksStore(selector)
```

- Removed stale patterns
- Guaranteed real-time updates

---

### UX Improvements

#### Today Page

New structure:

1. Hero  
2. Up Next  
3. Quick Actions  
4. Insights  

Removed:
- Recent Activity

---

#### Up Next

- Real data driven
- Shows first incomplete task
- Handles empty states

---

#### Quick Actions

- All actions open modals
- Improved tap targets
- Simplified visuals

---

### Modal System

Unified structure:

```
Task name
Date | Recurrence
Category | Priority
Notes
CTA
```

#### Improvements

- Removed time field
- Added priority
- Sticky CTA
- Safe-area handling

---

### Visual Consistency

- Removed heavy shadows
- Standardized spacing (`px-4`, `space-y-4`)
- Unified inputs
- Consistent CTA styling

---

### UX Direction Changes

Removed:
- Recent Activity

Shift toward:
- Task completion feedback loops
- Action-first UX

---

### Known Gaps

**P0**
- Selector centralization

**P1**
- Task grouping (Today / Yesterday / Earlier)
- Up Next intelligence

**P2**
- Accessibility pass
- Performance optimization
- Micro-interactions

---

### Outcome

From:
> Architecture complete but UX inconsistent

To:
> Functional, reliable, product-grade UX foundation

---

# 🏗 v0.1.0 — Architecture Refactor

> Internal system redesign (no user-facing changes)

---

## Summary

- Feature-based architecture
- Per-feature Zustand stores
- UI system consolidation
- Design tokens introduced

---

## Highlights

### Store Architecture

- Monolithic store → per-feature stores
- Shared persistence layer
- Removed AppState god-type

---

### UI System

- Consolidated under `/components/ui`
- Aligned with shadcn structure

---

### Design System

- Introduced typed tokens
- CSS variables remain source of truth

---

### Performance

- Reduced unnecessary re-renders
- Scoped subscriptions per feature

---

### Type Safety

- Removed global types
- Enforced feature isolation

---

## Verification

- TypeScript: 0 errors
- Build: clean
- Tests: passing

---

# 📌 Release Notes

## v0.2.0

- First fully usable version of the app
- Core UX flows complete
- Stable task + dashboard system

## v0.1.0

- Internal architecture overhaul
- No user-facing changes

---

# 🔜 Next Release Focus

- Smart task prioritization
- Improved task grouping
- Accessibility compliance
- Performance optimization
