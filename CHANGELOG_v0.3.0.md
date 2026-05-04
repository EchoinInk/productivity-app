# CHANGELOG

All notable changes to this project are documented here.

---

## 🚀 v0.3.0 — Architecture Hardening, Performance Stabilization & Design System Overhaul

Release Date: 2026-05-05

---

### 🔧 Design System Overhaul & Token Enforcement

Completed full implementation and enforcement of the Lumo design token system.

- Centralized tokens (`/src/theme/tokens.ts`)
- Full semantic + brand color system
- Light/dark mode support
- Tailwind token integration
- Removed all raw color values
- Introduced `colorMapper`
- Standardized UI components

✅ Result:
- Single source of truth
- Fully consistent UI
- Dark mode ready

---

### ⚡ Performance Stabilization

- Restored `useMemo` in hot paths
- Eliminated selector-in-store anti-pattern
- Stabilized list handlers (`useCallback`)
- Reduced unnecessary re-renders

✅ Result:
- Predictable rendering
- No wasted recomputation

---

### 🧠 State & Selector Architecture

- Enforced selector-driven architecture
- Removed data logic from UI layer
- Standardized selector signatures `(data, context)`

---

### 🧱 Store Cleanup

- Removed entire activity system
- Eliminated side effects across stores
- Improved immutability patterns

---

### 🧹 Codebase Cleanup

- Deleted dead components
- Removed unused imports
- Eliminated duplicated logic

---

### 🧪 TypeScript Stability

- Fixed all TS errors
- Improved config compatibility
- Resolved import issues (`clsx` etc.)

---

### 📱 UI & Layout Fixes

- Fixed navbar layout
- Refactored modal system
- Improved mobile behavior

---

### 🔒 Architecture Enforcement

- Strict separation of layers enforced
- Guard comments added
- Prevented design + data drift

---

## 🎯 Outcome

From:
> Functional but inconsistent system

To:
> Stable, scalable, production-ready architecture

---

## 🔜 Next (v0.4.0)

- Tasks Page UX redesign
- Motion system
- PWA support
- ESLint + architectural rules
