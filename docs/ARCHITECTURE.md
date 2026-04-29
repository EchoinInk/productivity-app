# LifeOS Architecture

## Overview
LifeOS is a React-based task and life management application built with TypeScript, Vite, and Tailwind CSS.

## Core Architecture

### State Management
- **Zustand** for global state management
- Feature-based store organization (tasks, budget, meals, recipes, shopping)
- Selector pattern for stable data access

### Component Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI primitives
│   └── ui/shadcn/     # Shadcn UI components
├── features/
│   ├── tasks/
│   ├── budget/
│   ├── meals/
│   ├── recipes/
│   └── shopping/
└── app/               # Application shell
```

### Feature Organization
Each feature follows the pattern:
```
features/[feature]/
├── api.ts             # Public API exports
├── types.ts           # TypeScript types
├── store/             # Zustand store
├── selectors/        # Data selectors
├── hooks/             # Feature hooks
├── components/        # Feature components
└── pages/             # Feature pages
```

## Key Patterns

### Public API Boundary
- Each feature exports a public `api.ts` file
- Cross-feature imports must go through `api.ts`
- Enforced by ESLint boundaries rules

### Selector Pattern
- All data access goes through selectors
- Action selectors for stable function references
- Computed selectors for derived data

### Component Architecture
- Presentational components in `ui/`
- Feature-specific components in `features/*/components/`
- Container components for data fetching and state management

## Development Workflow

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run test` - Vitest tests
- `npm run verify` - Full verification (type-check + lint + test)

### Code Quality
- ESLint with React Hooks rules
- TypeScript strict mode
- Prettier for code formatting
- Component memoization for performance

## Design System
- Tailwind CSS for styling
- CSS custom properties for tokens
- Consistent spacing and typography
- Gradient system for visual hierarchy
