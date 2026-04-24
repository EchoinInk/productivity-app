---
description: Enforce strict LifeOS Design System rules for React UI components to achieve consistent, iOS-quality UI/UX.
name: LifeOS UI Components
applyTo: "src/components/**/*.tsx"
---

# LifeOS UI Components Instructions

Always apply the LifeOS Design System.

This is NOT optional.

---

## When to Apply

- Creating new components  
- Modifying existing components  
- Refactoring layout, spacing, or structure  
- Reviewing UI quality  

---

## Non-Negotiable Rules

### Spacing
- Use ONLY 8pt system (8, 16, 24, 32…)
- No arbitrary spacing values

### Layout
- All content must be visually contained (cards, groups, sections)
- No floating or unanchored elements

### Typography
- Page Title: bold, large  
- Section Header: semibold, small  
- Maintain clear hierarchy at all times  

### Buttons & Actions
- One clear primary action per component/screen
- Primary actions must feel grounded
- No random floating buttons

### Visual Clarity
- Remove unnecessary elements  
- Avoid clutter  
- Every element must have a purpose  

---

## Implementation Guidelines

### Typography Classes
- Page Title: `text-2xl font-bold text-foreground`
- Section Header: `text-lg font-semibold text-foreground`
- Body Text: `text-sm text-foreground`
- Meta Text: `text-xs text-muted-foreground`

### Spacing Classes
- Use Tailwind spacing utilities: `p-2` (8px), `p-4` (16px), `m-6` (24px), `space-y-4` (16px gaps)
- Avoid non-8pt values like `p-3`, `m-5`

### Layout Classes
- Use `card` class for contained sections: `className="card"`
- Use `space-y-*` for vertical spacing between elements
- Use `flex` or `grid` for layouts, avoid absolute positioning

### Colors
- Use theme colors: `text-foreground`, `bg-card`, `border-border`
- Avoid hard-coded colors; use Tailwind classes or theme tokens

---

## Violation Handling

If any rule is violated:

1. Identify the issue clearly  
2. Explain why it weakens UX  
3. Refactor the component  
4. Return improved, fully compliant code  

Do NOT suggest fixes without applying them.

---

## Priority Order

1. Layout structure  
2. Spacing system  
3. Typography hierarchy  
4. Actions & buttons  
5. Visual polish  

Structural issues must be fixed before styling.

---

## Enforcement Standard

If the component does not meet these rules:
→ It must be corrected, not justified