# LifeOS Architecture

## Core Philosophy

- Simplicity > abstraction
- One source of truth
- Predictable state
- Mobile-first UX

---

# 🧠 DATA MODEL

## Task (canonical)

ts type Task = { id: string; label: string; date: string; completed: boolean; priority?: "low" | "medium" | "high"; category?: string; notes?: string; recurrence?: string; };

🚫 NEVER USE:

- completedDates
- title/subtitle
- view models

---

# 🧩 STATE

Zustand per feature:

bash /features/tasks/store.ts /features/budget/store.ts /features/meals/store.ts

Rules:

- immutable updates only
- no derived state
- no UI logic

---

# 🔍 SELECTORS

ONLY access state via selectors:

ts const tasks = useTasksStore(s => s.tasks);

---

# 🧠 HOOK CONTRACT

ts const { tasks, sections, actions } = useTasks();

sections:

ts { today: Task[] upcoming: Task[] completed: Task[] }

---

# 🧱 STRUCTURE

bash /src /components/ui /features /tasks /budget /meals /shopping /recipes /screens /shared

---

# 🎯 UI RULES

- buttons only (no clickable divs)
- no icon backgrounds
- consistent spacing
- no nested scroll

---

# 🧠 MENTAL MODEL

Store → Selectors → UI
