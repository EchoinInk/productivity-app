# LifeOS — AGENTS.md

## Purpose
Define the global behavior, standards, and decision-making principles for all AI agents working on the LifeOS app.

This file ensures consistency across UI, code, and product experience.

---

## Product Philosophy

LifeOS is a minimal, structured, premium productivity app.

Core principles:
- Simplicity over complexity  
- Clarity over feature density  
- Structure over visual noise  
- Quality over quantity  

Every screen must feel:
- Intentional  
- Balanced  
- Easy to understand at a glance  

---

## Design Standards (Global)

All UI must follow the LifeOS Design System.

Key expectations:
- Strict 8pt spacing system  
- Clear visual hierarchy  
- No floating or unanchored elements  
- Container-based layout structure  
- Minimal, purposeful UI  

If a design violates these:
→ It must be corrected

---

## UI/UX Philosophy

### 1. Reduce Cognitive Load
- Avoid overwhelming the user  
- Show only what is necessary  
- Group related information  

### 2. Visual Hierarchy First
- Users should understand the screen in 2–3 seconds  
- Strong distinction between title, sections, and content  

### 3. Structured Layouts
- No "floating emptiness"  
- Every section must feel anchored  

### 4. Intentional Empty States
- Empty ≠ blank  
- Must feel designed and guided  

---

## Engineering Standards

### Code Quality
- Clean, readable, maintainable code  
- No unnecessary complexity  
- Prefer clarity over cleverness  

### Component Architecture
- Small, focused components  
- Reusable where appropriate  
- Avoid deeply nested JSX  
- Prefer composition over monoliths  

### File Structure
- Logical separation of concerns  
- Components, pages, and layouts clearly defined  

---

## Frontend (React + Tailwind)

### Rules
- Use consistent spacing scale (8pt system)  
- Avoid arbitrary values  
- Keep class usage clean and intentional  

### Layout
- Use containers and spacing for structure  
- Avoid absolute positioning unless necessary  

### Styling
- Prioritize layout before visual polish  
- Avoid over-styling or excessive decoration  

---

## Decision Framework

When making any change:

1. Does this improve clarity?  
2. Does this reduce cognitive load?  
3. Does this follow the design system?  
4. Is this the simplest possible solution?  

If not:
→ Rework it

---

## Agent Behavior

All agents must:

- Be direct and practical  
- Avoid generic advice  
- Provide actionable improvements  
- Prefer refactoring over patching  
- Fix issues, not just point them out  

---

## UI Review Standard

When reviewing UI:

1. Identify structural issues first  
2. Check spacing consistency  
3. Validate hierarchy  
4. Evaluate action clarity  
5. Suggest improved version (preferably with code)  

---

## What to Avoid

- Over-engineering  
- Inconsistent spacing  
- Weak hierarchy  
- Floating UI elements  
- Multiple competing actions  
- Unnecessary features  

---

## Output Expectations

Responses should be:
- Structured  
- Clear  
- Concise but actionable  

Always prioritize:
→ Improvements over explanations  

---

## System Hierarchy

1. AGENTS.md (this file) → global behavior  
2. Design System Skill → rules  
3. Instructions files → enforcement  

All must align.

---

## Final Principle

LifeOS should feel like:
→ A calm, structured, premium tool

Not:
→ A cluttered productivity dashboard