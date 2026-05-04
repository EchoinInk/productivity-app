# CHANGELOG

All notable changes to this project are documented here.

---

## [Unreleased] — Architecture Hardening, Performance Stabilization & Design System Overhaul

---

### 🔧 Design System Overhaul & Token Enforcement

#### 🚀 Summary

Completed full implementation and enforcement of the Lumo design token system.  
Establishes a single source of truth for all visual styling and eliminates inconsistencies.

---

#### 🔴 P0 — Core System Implementation

**Design Tokens**
- Introduced centralized token system in `/src/theme/tokens.ts`
- Added:
  - Brand colors (sky, indigo, violet, magenta, coral, lime)
  - Surface tokens (light + dark mode)
  - Text tokens (primary, secondary, muted, onPrimary)
  - Border tokens
  - Semantic tokens (success, error, warning, info)
  - Gradients (primary, signature, soft, accent, action)
  - Spacing, radius, shadows, opacity

**Dark Mode Support**
- Added full light/dark token structure
- Prepared for `darkMode: "class"`

---

#### 🟠 P1 — System Enforcement

**Token Usage Enforcement**
- Removed:
  - Raw hex values
  - rgb/rgba values
  - Inline color styles
- Replaced with Tailwind classes mapped to tokens

**Semantic Standardization**
- Replaced:
  - green → success
  - red → error
  - yellow → warning
  - blue → info

**Surface & Typography Consistency**
- Standardized:
  - `bg-background`, `bg-surface`, `bg-surface-elevated`
  - `text-primary`, `text-secondary`, `text-muted`, `text-on-primary`
  - `border-default`

---

#### 🟡 P2 — Architecture Hardening

**Data Layer Cleanup**
- Removed UI classes from:
  - `constants/`
  - `utils/`
  - `types/`
- Replaced with semantic values only

**Shared Color Mapping**
- Added `/src/shared/lib/colorMapper.ts`
- Centralized semantic → Tailwind mapping
- Removed duplicated helper logic

---

#### 🎨 UI Component Updates

Updated components:
- Button
- Surface
- Text
- ProgressBar
- Modals (Task, Meal, Expense, Shopping)
- Cards (Hero, UpNext, Insights)
- Navigation (AppShell)

Replaced:
- `text-white` → `text-on-primary`
- `bg-card` → `bg-surface`
- `border-*` → `border-default`

---

#### ⚙️ Tailwind Integration

- Mapped tokens into Tailwind config
- Added:
  - `text-on-primary`
  - Semantic color utilities
  - Gradient utilities
- Added safelist for dynamic classes:
  - `bg-*`, `text-*`, `border-*`

---

#### 🧹 Cleanup

- Removed:
  - Legacy color classes
  - Tailwind default palette usage
  - Inline style overrides
- Eliminated duplicated styling logic

---

#### ✅ Result

- Single source of truth for styling
- Fully consistent UI
- Dark mode ready
- No style drift possible
- Scalable foundation

---

## Previous Sections

(See earlier changelog entries for architecture + performance updates)
