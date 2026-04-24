# Adding New Tokens

## Overview
Safely add new tokens to the central token file without breaking existing code. Follow a structured process to ensure tokens are well-documented and discoverable.

## Token File Structure

### Current Token File Location
```
src/theme/tokens.ts
```

### Token Organization Pattern
```typescript
// src/theme/tokens.ts
export const tokens = {
  color: {
    primary: { /* colors */ },
    secondary: { /* colors */ },
    status: { /* colors */ },
    neutral: { /* colors */ },
  },
  typography: {
    family: { /* fonts */ },
    size: { /* sizes */ },
    weight: { /* weights */ },
    lineheight: { /* line heights */ },
  },
  spacing: {
    unit: { /* spacing values */ },
  },
  shadow: {
    elevation: { /* shadows */ },
  },
  radius: {
    /* border radii */ 
  },
} as const;

// Export token values for CSS/Tailwind
export type TokenValue = typeof tokens[keyof typeof tokens];
```

## Adding a New Color Token

### Step 1: Define in Token File
```typescript
// src/theme/tokens.ts
export const tokens = {
  color: {
    primary: {
      light: '#E6F2FF',
      base: '#0066FF',      // existing
      dark: '#0052CC',      // existing
      lighter: '#F0F8FF',   // NEW: For subtle backgrounds
    },
    // ... other colors
  },
};
```

### Step 2: Export as CSS Variable (if using Tailwind)
```typescript
// tailwind.config.ts
export default {
  theme: {
    colors: {
      primary: {
        lighter: 'var(--color-primary-lighter)',
        light: 'var(--color-primary-light)',
        base: 'var(--color-primary-base)',
        dark: 'var(--color-primary-dark)',
      },
    },
  },
};
```

### Step 3: Update CSS Variables (if applicable)
```css
/* src/index.css */
:root {
  --color-primary-lighter: #F0F8FF;
  --color-primary-light: #E6F2FF;
  --color-primary-base: #0066FF;
  --color-primary-dark: #0052CC;
}
```

### Step 4: Use in Components
```jsx
// Before (ad hoc)
<div className="bg-[#F0F8FF]">

// After (with token)
<div className="bg-primary-lighter">
```

## Adding a New Typography Token

### Step 1: Define Font Size
```typescript
// src/theme/tokens.ts
export const tokens = {
  typography: {
    size: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',     // existing
      '3xl': '32px',     // NEW: For large headings
    },
  },
};
```

### Step 2: Create Text Style Combination (Optional)
```typescript
// src/theme/tokens.ts
export const textStyles = {
  heading1: {
    fontSize: tokens.typography.size['3xl'],
    fontWeight: tokens.typography.weight.bold,
    lineHeight: tokens.typography.lineheight.tight,
  },
  heading2: {
    fontSize: tokens.typography.size['2xl'],
    fontWeight: tokens.typography.weight.semibold,
    lineHeight: tokens.typography.lineheight.normal,
  },
} as const;
```

### Step 3: Use in Components
```jsx
<h1 className="text-3xl font-bold leading-tight">
  {/* or use computed className */}
</h1>
```

## Adding a New Spacing Token

### Step 1: Define Spacing Unit
```typescript
// src/theme/tokens.ts
export const tokens = {
  spacing: {
    unit: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      6: '24px',
      8: '32px',
      10: '40px',  // NEW: For large gaps
      12: '48px',  // NEW: For extra-large gaps
    },
  },
};
```

### Step 2: Update Tailwind Config
```typescript
// tailwind.config.ts
export default {
  theme: {
    spacing: {
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      // ... etc
      10: 'var(--space-10)',
      12: 'var(--space-12)',
    },
  },
};
```

## Checklist for Adding Tokens

- [ ] Token name follows naming conventions
- [ ] Token doesn't duplicate existing tokens
- [ ] Token is added to central token file (`src/theme/tokens.ts`)
- [ ] CSS variables or Tailwind config updated (if applicable)
- [ ] TypeScript compilation succeeds
- [ ] Documentation updated (see [Token Documentation](./token-documentation.md))
- [ ] At least 2 components can benefit from this token
- [ ] Design approval obtained (for new colors/sizes)

## Key Points
- Add tokens in logical groupings (by category and subcategory)
- Ensure new tokens are exported for external use
- Test in at least one component before considering it complete
- Update TypeScript types to include new token values
- Document the token's purpose and recommended usage.