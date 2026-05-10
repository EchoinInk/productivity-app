# 🏛️ Lumo Architecture

This document defines the canonical architecture for the Lumo application.  
It exists to prevent drift, reduce ambiguity, and ensure the codebase remains stable, scalable, and easy to work in.

Lumo is a **Vite + React + TypeScript** application deployed on **Cloudflare Pages**, with future support for Cloudflare Workers and PWA capabilities.

---

## 1. High-Level System Overview

### Brand vs Product Separation

The Lumo ecosystem is intentionally split into two independent deployments:

- **echoin.ink** → Brand site (static upload to Cloudflare Pages)
- **lumo.echoin.ink** → Lumo app (this repo, deployed via GitHub → Cloudflare Pages)

This repo contains **only the Lumo application**:
- No brand assets
- No marketing pages
- No mixed deployments

---

### Deployment Targets

- Platform: Cloudflare Pages (GitHub-connected)
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`

---

### Future Integrations

- Cloudflare Workers for API routes (`api.echoin.ink`)
- Progressive Web App (manifest, service worker)
- Edge caching + KV for user data

---

## 2. Repository Structure

```bash
src/
├── app/                # App shell, layout, providers
├── components/
│   ├── ui/             # Design system primitives (Button, Surface, Text)
│   └── shared/         # Reusable cross-feature components
├── features/           # Feature-based modules (source of truth)
│   └── <feature-name>/
│       ├── components/
│       ├── containers/
│       ├── hooks/
│       ├── selectors/
│       ├── store/
│       ├── types.ts
│       └── api.ts      # Public API surface
├── shared/
│   ├── hooks/          # Cross-feature hooks
│   └── lib/            # Utilities (date, formatting, etc.)
├── theme/
│   ├── tokens.ts       # Design system tokens
│   └── index.ts
├── main.tsx

public/
├── icons/              # PWA icons (future)

index.html
vite.config.ts
package.json
tsconfig.json
README.md
```

---

### Folder Rules

- Nothing goes in root except config files
- Brand assets never enter this repo
- UI primitives live in `src/components/ui`
- Feature logic stays inside `src/features/*`
- Shared utilities go in `src/shared`
- No random folders (`misc`, `utils2`, etc.)

---

## 3. Architectural Principles

### 1. Feature-Based Organization

Each feature is self-contained:

```bash
features/<feature-name>/
├── components/
├── containers/
├── hooks/
├── selectors/
├── store/
├── types.ts
└── api.ts
```

This ensures scalability and avoids global coupling.

---

### 2. Component Boundaries

- Components must be **pure**, **small**, and **single-responsibility**
- UI primitives live in `/components/ui`
- Feature components stay inside their feature
- No cross-feature imports outside public APIs

---

### 3. State Management

- Zustand is used per feature
- Stores live inside `features/*/store`
- No monolithic global store
- Shared/global state only when absolutely necessary (`src/shared`)

Stores must:
- Expose selectors
- Avoid storing derived state
- Avoid storing UI-only state

---

### 4. Data Flow

- Data flows **top → down**
- State accessed via hooks/selectors (no prop drilling)
- API logic lives in `src/shared/lib` (future Workers integration)

---

### 5. Styling

- Tailwind is the primary styling system
- No inline styles unless absolutely necessary
- No random CSS files

---

## 4. Design System Rules

The design system is a **first-class architectural layer**.

### Core Rules

- All colors must come from `/src/theme/tokens.ts`
- Tailwind must extend tokens (no default colors like `blue-500`)
- UI primitives live in `/components/ui`
- No feature may define its own colors or tokens
- No raw hex values in components

---

### Design Flow

```text
tokens → tailwind.config → UI components → features
```

---

### Gradient Rules

Gradients are used **only** for:
- Primary CTA
- Progress indicators

Never use gradients for layout backgrounds or containers.

---

## 5. Build & Deployment Architecture

### Build

- Vite (latest stable)
- React + SWC
- TypeScript (strict mode)

---

### Deployment

- Cloudflare Pages (GitHub integration)
- Auto-build on push to `main`
- Output directory: `dist/`

---

### Environment Variables

- Must be prefixed with `VITE_`
- Stored in Cloudflare Pages
- Never committed to the repo

---

## 6. Error Handling Strategy

### Global Rules

- No silent failures
- No `console.log` in production
- Use `console.error` only for unexpected failures
- All async logic must use `try/catch`
- Always provide user-friendly fallback UI

---

### Error Boundaries

- Global error boundary:
  - `/src/app/providers/ErrorBoundary.tsx`

---

## 7. Accessibility & UX Principles

- Semantic HTML first
- Keyboard navigation required
- Focus states must be visible
- Avoid unnecessary ARIA usage
- Maintain logical heading structure
- Avoid "div soup"

---

## 8. Future-Proofing

### Progressive Web App (PWA)

- `manifest.json` → `/public`
- Icons → `/public/icons`
- Service worker (via Vite plugin — future)

---

### Cloudflare Workers

- API routes via separate repo or `/api`
- Domain: `api.echoin.ink`

---

### Edge Strategy

- Cache-first reads
- KV / Durable Objects for user data (future)

---

## 9. Conventions

### Naming

- Components → `PascalCase`
- Files → `kebab-case`
- Hooks → `useSomething.ts`
- Stores → `feature.store.ts`
- Features → `feature-name`

---

### Imports

- Always use absolute imports via `@/`
- No deep relative imports (`../../../`)

---

### Commits

Use conventional commits:

- `feat:`
- `fix:`
- `refactor:`
- `chore:`
- `docs:`

---

## 10. What This Architecture Guarantees

- No folder drift
- No design inconsistency
- No mixed brand/app assets
- Clean separation of concerns
- Predictable scaling
- Easy onboarding
- Ready for PWA + Workers
- Cloudflare-optimized deployment

---

## 11. Change Log

All architectural changes must be documented here.
