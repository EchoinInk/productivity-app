---
name: lifeos-design-system
description: Apply strict LifeOS design system rules to enforce iOS-quality UI/UX consistency.
argument-hint: Specify the component, page, or file to analyze or refactor
---

# LifeOS Design System

## Purpose
Enforce consistent, high-quality, iOS-level UI/UX across all components and screens.

This system is strict. If a UI violates these rules, it must be corrected.

---

## Core Rules (Non-Negotiable)

### 1. Spacing
- Use ONLY 8pt spacing system (8, 16, 24, 32…)
- No arbitrary spacing values
- Maintain consistent vertical rhythm across the screen

### 2. Layout Structure
- Every section must be visually contained

Valid containers include:
- Cards (with padding and background)
- Section groups (with spacing + header)
- Div blocks with clear boundaries

- No floating elements in empty space
- Screens must have clear top → middle → bottom structure

### 3. Typography Hierarchy
- Page Title: large, bold
- Section Header: small, semibold
- Body: regular
- Hierarchy must be visually obvious and consistent

### 4. Buttons & Actions
- One clear primary action per screen
- Primary actions must feel grounded (not floating randomly)
- Secondary actions must not compete visually

### 5. Visual Clarity
- Remove unnecessary elements
- Avoid clutter and stacked components
- Every element must serve a clear purpose

---

## Enforcement Behavior

When invoked:

1. Assume the current UI can be improved
2. Analyze against ALL rules
3. Identify violations explicitly
4. Explain why each issue weakens UX
5. Refactor and return improved version

If something violates the system:
→ It must be fixed, not justified

---

## Output Format

Responses must follow this structure:

### Issues
- List specific problems

### Why It’s a Problem
- Brief UX reasoning

### Improved Version
- Provide corrected layout or code

Do NOT return advice without improvements.

---

## Output Style

- Direct and structured
- Concrete improvements only (no vague advice)
- Focus on layout, hierarchy, and clarity

---

## When to Use

- Designing new UI
- Reviewing components
- Refactoring layouts
- Fixing spacing, hierarchy, or structure

---

## Example Usage

/lifeos-design-system Review this screen  
/lifeos-design-system Refactor this component  
/lifeos-design-system Fix layout hierarchy