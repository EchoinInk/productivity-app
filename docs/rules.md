# LifeOS Engineering Rules

## PURPOSE

This document enforces consistency, prevents regressions, and keeps the app aligned with architecture.md.

If something breaks these rules → it must be refactored.

---

# 🔴 NON-NEGOTIABLE RULES

## 1. DATA MODEL

### MUST use canonical Task:

ts type Task = {   id: string;   label: string;   date: string;   completed: boolean;   priority?: "low" | "medium" | "high";   category?: string;   notes?: string;   recurrence?: string; }; 

---

## 🚫 NEVER USE

- completedDates ❌
- title / subtitle ❌
- mapped UI fields ❌
- duplicate task structures ❌

---

## 2. STATE (ZUSTAND)

### MUST

- use immutable updates
- keep store minimal
- store raw data only

---

### 🚫 NEVER

ts state.tasks.push(...) ❌ state.tasks = mutatedArray ❌ 

---

### ✅ ALWAYS

ts set(state => ({   tasks: [...state.tasks, newTask] })) 

---

## 3. SELECTORS

### MUST

ts useTasksStore(s => s.tasks) 

---

### 🚫 NEVER

ts useTasksStore() ❌ useTasksStore(state => state) ❌ 

---

## 4. COMPONENT RULES

### UI Components (/components/ui)

- presentational ONLY
- no logic
- no hooks

---

### Feature Components

- compose UI
- minimal logic only

---

### 🚫 NEVER

- filter/map tasks inside JSX
- compute values in render

---

## 5. HOOKS

### MUST

- contain logic
- contain derived data
- act as container layer

---

### Example

ts const todayTasks = useMemo(() =>   tasks.filter(t => t.date === today && !t.completed), [tasks]); 

---

## 6. MODALS

### MUST

- use BottomSheet pattern
- have sticky CTA
- respect safe-area

---

### STRUCTURE

Title fields CTA

---

## 7. UI RULES

### Buttons

- ALWAYS <button>
- NEVER clickable <div>

---

### MUST INCLUDE

css active:scale-[0.97] transition 

---

### Icons

- NO background containers
- size: 32–40px
- aligned consistently

---

### Layout

- no nested scroll
- consistent spacing
- minimal wrappers

---

## 8. FILE STRUCTURE

### MUST follow:

bash /features/[feature]/   store.ts   types.ts   hooks/   components/   pages/ 

---

## 9. TESTING

### MUST

- use real Task model
- inline test data

---

### 🚫 NEVER

- mockTasks globals
- completedDates
- UI-based fields

---

## 10. PERFORMANCE

### MUST

- use selectors
- avoid full store subscription
- memoize derived data

---

### 🚫 NEVER

ts useTasksStore() ❌ large component logic ❌ 

---

# 🧠 DEVELOPMENT CHECK

Before writing code:

Ask:

> Does this follow architecture.md AND rules.md?

If not:
→ fix approach before coding

---

# 🚨 RED FLAGS

If you see any of these:

- duplicate logic
- mapping fields like title/subtitle
- multiple task shapes
- logic inside JSX

👉 STOP and refactor

---

# 🎯 GOAL

Keep the system:

- simple
- predictable
- scalable

---

END