# 🏛️ Lumo Architecture

This document defines the canonical architecture for the Lumo application.  
It exists to prevent drift, reduce ambiguity, and ensure the codebase remains stable, scalable, and easy to work in.

Lumo is a Vite + React + TypeScript application deployed on Cloudflare Pages, with future support for Cloudflare Workers and PWA capabilities.

---

## 1. High-Level System Overview

### **Brand vs Product Separation**

The Lumo ecosystem is intentionally split into two independent deployments:

- **echoin.ink** → Brand site (static upload to Cloudflare Pages)
- **lumo.echoin.ink** → Lumo app (this repo, deployed via GitHub → Cloudflare Pages)

This repo contains **only the Lumo application**.  
No brand assets, no marketing pages, no mixed deployments.

### **Deployment Targets**

- **Cloudflare Pages** (GitHub-connected)
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/` (app lives at repo root)

### **Future Integrations**

- Cloudflare Workers for API routes (`api.echoin.ink`)
- PWA support (manifest, service worker)
- Edge caching + KV for user data

---

## 2. Repo Structure

/ ├── src/ # Application source code │ ├── components/ # Reusable UI components │ ├── features/ # Feature-based modules (recommended pattern) │ ├── hooks/ # Reusable logic hooks │ ├── lib/ # Utilities, helpers, shared logic │ ├── pages/ # Route-level components (if using file-based routing) │ ├── state/ # Zustand stores or other state management │ ├── styles/ # Global styles, tokens, Tailwind config extensions │ └── main.tsx # App entry point │ ├── public/ # Static assets copied to build output │ └── icons/ # App icons (future PWA) │ ├── index.html # Vite HTML entry ├── vite.config.ts # Vite configuration ├── package.json ├── tsconfig.json └── README.md

### **Folder Rules**

- **Nothing goes in root except config files.**
- **Brand assets never enter this repo.**
- **All UI lives in `src/components` or `src/features/*/components`.**
- **All logic lives in `src/hooks` or `src/lib`.**
- **All state lives in `src/state`.**
- **No random folders. No “misc”. No “utils2”.**

---

## 3. Architectural Principles

### **1. Feature-Based Organization**

Each feature gets its own folder:

src/features/<feature-name>/ components/ hooks/ state/ utils/ index.ts

This keeps the app scalable and prevents “god folders”.

### **2. Component Boundaries**

- Components must be **pure**, **small**, and **single-responsibility**.
- UI-only components go in `src/components`.
- Feature-specific components stay inside their feature folder.
- No component should import across unrelated features.

### **3. State Management**

- Zustand is the preferred store.
- Each store lives in `src/state` or inside a feature folder.
- Stores must:
  - expose selectors
  - avoid storing derived state
  - avoid storing UI-only state (keep that local)

### **4. Data Flow**

- Data flows **top → down**.
- State flows **via hooks**, not props drilling.
- API calls (future Workers) live in `src/lib/api`.

### **5. Styling**

- Tailwind is the primary styling system.
- Global tokens live in `tailwind.config.ts`.
- No inline style objects unless necessary.
- No random CSS files.

---

## 4. Build & Deployment Architecture

### **Build**

- Vite 6 (or latest stable)
- React + SWC plugin
- TypeScript strict mode recommended

### **Deployment**

- Cloudflare Pages → GitHub integration
- Auto-build on push to `main`
- Output: `dist/`

### **Environment Variables**

- All env vars must be prefixed with `VITE_`
- Stored in Cloudflare Pages → Environment Variables
- Never committed to repo

---

## 5. Error Handling Strategy

### **Global Rules**

- No silent failures
- No `console.log` in production
- Use `console.error` only for unexpected failures
- Wrap async calls in `try/catch`
- Provide user-friendly fallback UI

### **Error Boundaries**

- A global React error boundary will be added in `/src/components/ErrorBoundary.tsx`

---

## 6. Accessibility & UX Principles

- Semantic HTML first
- Keyboard navigability required
- Focus states must be visible
- ARIA only when necessary
- Avoid div soup
- Use headings in logical order

---

## 7. Future-Proofing

### **PWA**

- `manifest.json` in `public/`
- Icons in `public/icons/`
- Service worker via Vite plugin (later)

### **Cloudflare Workers**

- API routes will live in a separate repo or `/api` folder (not yet created)
- Domain: `api.echoin.ink`

### **Design System**

- Tokens in Tailwind config
- Component primitives in `src/components/ui`

---

## 8. Conventions

### **Naming**

- Components: `PascalCase`
- Files: `kebab-case`
- Hooks: `useSomething.ts`
- Zustand stores: `something.store.ts`
- Feature folders: `feature-name`

### **Imports**

- Use absolute imports via `@/` alias
- No deep relative imports like `../../../`

### **Commits**

- Conventional commits recommended:
  - `feat:`
  - `fix:`
  - `refactor:`
  - `chore:`
  - `docs:`

---

## 9. What This Architecture Guarantees

- No folder drift
- No deployment confusion
- No mixed brand/app assets
- Clean separation of concerns
- Predictable scaling
- Easy onboarding (even for future-you)
- Ready for PWA + Workers
- Cloudflare-friendly build pipeline

---

## 10. Change Log

All architectural changes must be documented here.
