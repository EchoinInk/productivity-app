# Token Replacement Pattern

## Overview
Replace ad hoc, hardcoded colors, gradients, and shadows with tokens from `src/theme/tokens.ts`. This ensures consistency across the design system and makes theme updates centralized.

## Before
```jsx
<div className="bg-[#4A90E2] rounded-3xl shadow-lg">
  Content
</div>
```

## After
```jsx
<div className="bg-gradient-primary rounded-lg shadow-card">
  Content
</div>
```

## Key Points
- Use tokens from `src/theme/tokens.ts` instead of arbitrary hex codes.
- Replace arbitrary shadow names (`shadow-lg`) with semantic tokens (`shadow-card`).
- Ensure radii align with the system standard (see [Radii Normalization](./radii-normalization.md)).
- Test theme changes to ensure the token applies correctly.