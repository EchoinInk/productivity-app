# LifeOS Architecture

## Overview
LifeOS is a React-based task and life management application built with TypeScript, Vite, and Tailwind CSS.

## Core Architecture

### State Management
- **Zustand** for global state management
- Feature-based store organization (tasks, budget, meals, recipes, shopping, bills)
- Selector pattern for stable data access
- Hook rule compliance: all store access uses named selectors from selector files

### Component Structure
```
src/
├── app/
│   ├── layout/        # AppShell, PageShell
│   ├── pages/         # NotFound
│   └── providers/     # ErrorBoundary
├── components/
│   ├── modal/         # Feature modals (AddTask, AddExpense, etc.)
│   ├── ui/            # Reusable UI primitives + shadcn
│   │   └── shadcn/    # Shadcn UI components
│   ├── ActionButton.tsx
│   ├── BottomNav.tsx
│   ├── Header.tsx     # Unified header (title mode + date pill mode)
│   ├── Page.tsx       # Page wrapper
│   └── TabBar.tsx
├── features/
│   ├── bills/
│   │   ├── pages/
│   │   ├── selectors/
│   │   ├── store/
│   │   └── types.ts
│   ├── budget/
│   │   ├── pages/
│   │   ├── selectors/
│   │   ├── store/
│   │   └── types.ts
│   ├── meals/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── selectors/
│   │   ├── store/
│   │   └── types.ts
│   ├── recipes/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── selectors/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   ├── shopping/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── selectors/
│   │   ├── store/
│   │   └── types.ts
│   ├── tasks/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── containers/
│   │   ├── domain/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── selectors/
│   │   ├── store/
│   │   └── types.ts
│   └── today/
│       ├── components/
│       └── pages/
├── shared/
│   ├── hooks/         # use-mobile, use-toast
│   └── lib/           # date, id, number
├── store/
│   └── sharedPersist.ts
├── theme/
│   ├── index.ts
│   └── tokens.ts
└── lib/               # Tailwind/clsx helpers
```

### Feature Organization
Each feature follows the pattern:
```
features/[feature]/
├── api.ts             # Public API exports (if applicable)
├── types.ts           # TypeScript types
├── store/             # Zustand store
├── selectors/        # Data selectors (named selectors only)
├── hooks/             # Feature hooks
├── components/        # Feature components
├── containers/        # Container components (if applicable)
├── domain/            # Pure domain logic (if applicable)
├── services/          # Pure services (if applicable)
├── constants/         # Static configuration (if applicable)
└── pages/             # Feature pages
```

## Key Patterns

### Hook Rule Compliance
- All store access must use named selectors from selector files
- Inline selectors like `useStore((s) => s.action)` are prohibited
- Action selectors provide stable function references across renders
- Example: `useTasksStore(selectAddTask)` instead of `useTasksStore((s) => s.addTask)`

### Public API Boundary
- Each feature exports a public `api.ts` file (where applicable)
- Cross-feature imports must go through `api.ts` or public hooks
- Enforced by ESLint boundaries rules

### Selector Pattern
- All data access goes through named selectors
- Action selectors for stable function references
- Computed selectors for derived data
- Selectors defined in `selectors/` directory

### Component Architecture
- Presentational components in `components/ui/`
- Feature-specific components in `features/*/components/`
- Container components for data fetching and state management
- Unified Header component supports both title mode and date pill mode

### Layout Architecture
- AppShell provides consistent mobile-first layout wrapper
- Page component provides consistent spacing (`space-y-4`)
- All pages use Header + AppShell pattern for visual consistency

## Development Workflow

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run test` - Vitest tests
- `npm run type-check` - TypeScript type checking
- `npm run verify` - Full verification (type-check + lint + test)

### Code Quality
- ESLint with React Hooks rules
- TypeScript strict mode
- Component memoization for performance
- Hook rule compliance enforced via code review

## Design System
- Tailwind CSS for styling
- CSS custom properties for tokens
- Consistent spacing (space-0 through space-8)
- Consistent typography via UIText components
- Gradient system for visual hierarchy
- Shadow tokens for depth

## Accessibility
- All interactive elements have aria-labels
- Buttons have proper roles
- Focus-visible states for keyboard navigation
- Screen reader support for navigation
- Proper focus order maintained
