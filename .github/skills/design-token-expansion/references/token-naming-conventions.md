# Token Naming Conventions

## Overview
Establish a consistent naming hierarchy for tokens that makes their purpose and category clear. Good naming enables developers to find and use tokens intuitively.

## Naming Structure

```
{category}-{subcategory}-{variant}-{state}

Examples:
- color-primary-base
- color-status-success
- color-neutral-gray-50
- typography-size-lg
- spacing-unit-4
- shadow-elevation-md
- radius-control
```

## Categories

### Color Tokens
```typescript
// Brand colors
color-primary-{variant}:        // Main brand color (light, base, dark)
color-secondary-{variant}:      // Secondary accent
color-accent-{variant}:         // Tertiary accent

// Status colors
color-status-success:           // Positive actions
color-status-warning:           // Caution/warning
color-status-error:             // Errors/destructive
color-status-info:              // Informational

// Semantic colors
color-background-default:       // Primary background
color-background-elevated:      // Cards, modals, overlays
color-foreground-default:       // Primary text
color-foreground-secondary:     // Secondary text
color-border-default:           // Borders

// Opacity variants (if needed)
color-primary-{variant}-{opacity}: // e.g., color-primary-base-50 (50% opacity)
```

### Typography Tokens
```typescript
// Font families
typography-family-sans:         // Primary sans-serif
typography-family-mono:         // Monospace for code

// Font sizes
typography-size-xs:             // 12px
typography-size-sm:             // 14px
typography-size-base:           // 16px
typography-size-lg:             // 18px
typography-size-xl:             // 20px
typography-size-2xl:            // 24px

// Font weights
typography-weight-normal:       // 400
typography-weight-medium:       // 500
typography-weight-semibold:     // 600
typography-weight-bold:         // 700

// Line heights
typography-lineheight-tight:    // 1.2
typography-lineheight-normal:   // 1.5
typography-lineheight-relaxed:  // 1.75
```

### Spacing Tokens
```typescript
// Base unit is typically 4px or 8px
spacing-unit-1:                 // 4px
spacing-unit-2:                 // 8px
spacing-unit-3:                 // 12px
spacing-unit-4:                 // 16px
spacing-unit-6:                 // 24px
spacing-unit-8:                 // 32px

// Or semantic naming
spacing-xs:                      // Extra small gaps
spacing-sm:                      // Small gaps
spacing-md:                      // Medium gaps
spacing-lg:                      // Large gaps
```

### Shadow Tokens
```typescript
// By elevation level
shadow-elevation-xs:             // Subtle elevation
shadow-elevation-sm:             // Light elevation
shadow-elevation-md:             // Medium elevation
shadow-elevation-lg:             // Strong elevation

// Or by component usage
shadow-card:                     // For cards
shadow-modal:                    // For modals
shadow-focus:                    // For focus states
```

### Border and Radii Tokens
```typescript
// Border radii
radius-control:                  // For buttons, inputs (4px-6px)
radius-card:                     // For cards, panels (8px-12px)
radius-full:                     // For pills and avatars (50%)

// Border widths
border-width-thin:               // 1px
border-width-normal:             // 2px
border-width-thick:              // 3px
```

## Naming Rules
1. **Lowercase with hyphens**: Use `color-primary-base`, not `colorPrimaryBase` or `COLOR_PRIMARY_BASE`
2. **Descriptive and specific**: `color-status-error` not `color-bad` or `color-red-dark`
3. **Hierarchy from general to specific**: Category → subcategory → variant → state
4. **No abbreviations** (unless standard in design industry): Use `status-success`, not `stts-succ`
5. **Consistent ordering**: Within variants, order by intensity/value (light → base → dark)

## Real-World Examples

### Before (Inconsistent)
```typescript
const colors = {
  primaryBlue: '#0066FF',
  darkBlue: '#0052CC',
  lightBlue: '#E6F2FF',
  errorRed: '#FF0000',
  warningYellow: '#FFA500',
  shadow1: '0 1px 3px rgba(0,0,0,0.1)',
  shadow2: '0 4px 8px rgba(0,0,0,0.15)',
};
```

### After (Consistent)
```typescript
export const tokens = {
  // Colors
  color: {
    primary: {
      light: '#E6F2FF',
      base: '#0066FF',
      dark: '#0052CC',
    },
    status: {
      error: '#FF0000',
      warning: '#FFA500',
    },
  },
  // Shadows
  shadow: {
    elevation: {
      sm: '0 1px 3px rgba(0,0,0,0.1)',
      md: '0 4px 8px rgba(0,0,0,0.15)',
    },
  },
};
```

## Key Points
- Document naming conventions in a shared reference or design system guide.
- Review naming during token proposals to ensure consistency.
- Use TypeScript for autocomplete and discovery.
- Prefer semantic names over technical ones (e.g., `color-status-success` vs `color-green`).