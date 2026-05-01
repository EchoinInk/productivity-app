# Architecture

## Philosophy
- Clarity over abstraction
- Single source of truth
- Mobile-first UX
- Predictable state

---

## Core Data Model

ts type Task = {   id: string;   label: string;   date: string;   completed: boolean;   priority?: "low" | "medium" | "high";   category?: string;   notes?: string;   recurrence?: string; }; 

---

## State Management

- Zustand per feature
- No derived state in store
- Immutable updates only

---

## Data Flow

Store → Selectors → Hooks → UI

---

## Structure

/features/[feature]   store.ts   types.ts   hooks/   components/   pages/

---

## UI Principles

- No logic in UI
- No mapping models
- Direct use of domain objects