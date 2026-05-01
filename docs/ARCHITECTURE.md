# LifeOS Architecture (Post-Refactor — May 2026)

## Overview

LifeOS is a mobile-first React + TypeScript application for managing daily life systems (tasks, meals, budget, shopping, etc.).

This architecture prioritizes:
- Simplicity over abstraction
- Predictable state flow
- Performance through minimal re-renders
- Clear separation between data, logic, and UI

---

# 🧠 CORE PRINCIPLES

## 1. Single Source of Truth
- Zustand stores are the ONLY source of truth
- No duplicated or derived state in components

---

## 2. Canonical Data Models

### Task Model (CRITICAL)

ts type Task = {   id: string;   label: string;   date: string;   time?: string;   completed: boolean;   category?: string;   notes?: string;   recurrence?: string; }; 

### 🚫 REMOVED (DO NOT USE)
- completedDates ❌
- title ❌
- subtitle ❌
- ANY UI-mapped fields ❌

---

## 3. No View Models

These are permanently removed:

- TaskRowVM ❌
- TaskSection (UI-shaped) ❌
- TaskInsights ❌
- UseTasksResult ❌

👉 Components use raw domain objects only

---

## 4. Containers vs UI

### UI Components
- Located in /components/ui
- PURE (no logic)
- Receive props only

### Feature Components
- Located in /features/*/components
- Compose UI
- Still no business logic

### Containers / Hooks
- Handle:
  - state
  - selectors
  - actions
  - orchestration

---

# 🧩 STATE ARCHITECTURE

## Zustand (Feature-Based)

Each feature owns its state:

/features/tasks/store.ts /features/meals/store.ts /features/budget/store.ts ...

---

## Store Rules

- Immutable updates ONLY
- No mutation
- No derived state inside store
- No UI logic inside store

---

## Example

ts addTask: (taskInput) =>   set((state) => ({     tasks: [       ...state.tasks,       {         id: crypto.randomUUID(),         completed: false,         ...taskInput,       },     ],   })); 

---

# 🔍 SELECTOR PATTERN

## Rules

- Components NEVER read full store
- ALWAYS use selectors

---

## Example

ts const tasks = useTasksStore(s => s.tasks); 

---

## Derived Data = SELECTORS OR HOOKS

ts const todayTasks = useMemo(() =>   tasks.filter(t => t.date === today && !t.completed), [tasks]); 

---

## 🚫 FORBIDDEN

ts useTasksStore() useTasksStore(state => state) // ❌ 

---

# 🧠 useTasks HOOK (SIMPLIFIED CONTRACT)

ts const { tasks, sections, actions } = useTasks(); 

---

## Return Shape

ts {   tasks: Task[],   sections: {     today: Task[],     upcoming: Task[],     completed: Task[]   },   actions: {     addTask,     updateTask,     deleteTask,     toggleTask   } } 

---

## 🚫 REMOVED FROM HOOK

- progress ❌
- insights ❌
- activeDate ❌
- UI transformations ❌

---

# 🧱 FEATURE STRUCTURE

features/[feature]/ ├── store.ts ├── selectors/ ├── hooks/ ├── components/ ├── pages/ ├── types.ts

---

# 🧠 TODAY DASHBOARD ARCHITECTURE

## Sections (FINAL)

1. Hero
2. Quick Actions
3. Insights (derived)
4. Next Actions (merged Up Next + Activity)

---

## Next Actions Logic

Priority:

1. Unlogged meal
2. Incomplete task
3. Fallback CTA

---

## Example Selector

ts const nextTask = tasks.find(t => !t.completed); 

---

# 🎯 UI SYSTEM RULES

## Buttons
- Always <button>
- Never clickable <div>
- Must include:
  - active:scale-[0.97]
  - transition

---

## Icons
- No background containers
- Size: 32–40px
- Always aligned and consistent

---

## Spacing
- Use consistent spacing scale
- Avoid nested layouts

---

# 🧠 MODAL SYSTEM

- BottomSheet pattern
- Scrollable content
- Sticky CTA
- Safe-area padding

---

# 🧪 TESTING RULES

## Test Data

ts const task: Task = {   id: "1",   label: "Test",   date: "2026-01-01",   completed: false, }; 

---

## 🚫 FORBIDDEN IN TESTS

- completedDates ❌
- UI-based fields ❌
- old abstractions ❌

---

## Testing Philosophy

- Test behavior, not implementation
- Test state changes, not structure

---

# 🚀 PERFORMANCE RULES

## Must Follow

- Use selectors
- Avoid full store subscription
- Memoize derived data
- Avoid unnecessary re-renders

---

## Anti-patterns

ts useTasksStore() // ❌ large component logic // ❌ derived logic in JSX // ❌ 

---

# 🔥 HARD RULES (NON-NEGOTIABLE)

1. No legacy fields (completedDates, title, subtitle)
2. No view models
3. No derived logic in components
4. No store mutation
5. No abstraction for the sake of abstraction
6. Prefer clarity over cleverness

---

# 🧠 MENTAL MODEL

> Store = truth  
> Selectors = thinking  
> Components = rendering  

---

# 📦 FUTURE WORK (NEXT PHASE)

- Performance optimization pass
- Bundle splitting
- Memoization audit
- Animation polish

---

# ✅ SUCCESS STATE

The app is considered "correct" when:

- TypeScript = 0 errors
- No legacy fields exist
- UI reacts instantly to state
- No duplicated logic
- Clear data flow from store → UI

---

END