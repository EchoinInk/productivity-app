# Token Documentation

## Overview
Document tokens clearly so developers understand their purpose, values, and recommended usage. Good documentation makes tokens discoverable and reduces ad hoc styling.

## Documentation Structure

### 1. Token Reference File
```markdown
# Design Tokens Reference

## Colors

### Primary Brand Color
- **Token**: `color-primary-{light,base,dark}`
- **Purpose**: Primary brand color for calls-to-action and emphasized elements
- **Values**:
  - Light: `#E6F2FF` (backgrounds, subtle emphasis)
  - Base: `#0066FF` (buttons, links, highlights)
  - Dark: `#0052CC` (hover, active states)
- **Usage**: Button backgrounds, link colors, active states
- **Do's**: Use for primary actions, links, focus states
- **Don'ts**: Use for text body (too bright), use for disabled states

### Status Colors
- **Token**: `color-status-{success,warning,error,info}`
- **Purpose**: Signal system status and user actions
- **Values**:
  - Success: `#10B981` (positive actions, confirmations)
  - Warning: `#F59E0B` (cautions, non-critical alerts)
  - Error: `#EF4444` (errors, destructive actions)
  - Info: `#3B82F6` (information, neutral notifications)
- **Usage**: Status badges, alerts, validation messages, toasts
- **Do's**: Use consistently across all status indicators
- **Don'ts**: Mix different colors for same status type

## Typography

### Font Sizes
- **Token**: `typography-size-{xs,sm,base,lg,xl,2xl,3xl}`
- **Purpose**: Establish consistent text hierarchy
- **Scale**:
  - xs: 12px (captions, labels)
  - sm: 14px (secondary text, metadata)
  - base: 16px (body text, default)
  - lg: 18px (subheadings)
  - xl: 20px (section headings)
  - 2xl: 24px (page headings)
  - 3xl: 32px (hero headings)
- **Usage**: All text elements
- **Do's**: Use appropriate size for content hierarchy
- **Don'ts**: Use arbitrary sizes, mix scales randomly

### Font Weights
- **Token**: `typography-weight-{normal,medium,semibold,bold}`
- **Purpose**: Create emphasis and hierarchy
- **Values**:
  - Normal: 400 (body text)
  - Medium: 500 (labels, secondary headings)
  - Semibold: 600 (section headings)
  - Bold: 700 (emphasis, important text)
- **Usage**: Headings, emphasis, labels
- **Do's**: Use semibold for headings, normal for body
- **Don'ts**: Use bold for body text (hard to read), mix randomly

## Spacing

### Unit Scale
- **Token**: `spacing-unit-{1,2,3,4,6,8,10,12}`
- **Purpose**: Maintain consistent rhythm and alignment
- **Scale** (base unit = 4px):
  - 1: 4px (tight spacing, small gaps)
  - 2: 8px (common gap size)
  - 3: 12px (medium gap)
  - 4: 16px (standard padding)
  - 6: 24px (large gap)
  - 8: 32px (extra-large gap)
  - 10: 40px (hero-level spacing)
  - 12: 48px (page section spacing)
- **Usage**: Padding, margins, gaps in layouts
- **Do's**: Always use tokens for spacing, maintain 4px grid
- **Don'ts**: Use arbitrary values (e.g., 17px, 22px), break the grid

## Shadows

### Elevation Levels
- **Token**: `shadow-elevation-{xs,sm,md,lg}`
- **Purpose**: Create depth and visual hierarchy
- **Elevations**:
  - xs: Subtle lift, hover states
  - sm: Light elevation, small overlays
  - md: Medium elevation, cards, modals
  - lg: Strong elevation, dropdowns, popovers
- **Usage**: Cards, modals, buttons, overlays
- **Do's**: Use for elevation changes, interactive feedback
- **Don'ts**: Layer multiple shadows, use shadow for visual borders

## Border Radii

### Standards
- **Token**: `radius-{control,card,full}`
- **Purpose**: Establish consistent corner treatments
- **Standards**:
  - control: 4-6px (buttons, inputs, small elements)
  - card: 8-12px (cards, panels, larger surfaces)
  - full: 50% (circles, pills, avatars)
- **Usage**: All elements needing rounded corners
- **Do's**: Use appropriate radius for element size
- **Don'ts**: Use arbitrary radii (2px, 10px, 15px), mix standards

## Usage Examples

### Button Component
```jsx
import { tokens } from 'src/theme/tokens';

function Button({ children, variant = 'primary' }) {
  const baseClass = `
    px-${tokens.spacing.unit[4] / 4}
    py-${tokens.spacing.unit[2] / 4}
    rounded-${tokens.radius.control === '4px' ? 'md' : 'lg'}
    font-${tokens.typography.weight.medium === 500 ? 'medium' : 'normal'}
    text-${tokens.typography.size.base === '16px' ? 'base' : 'sm'}
  `;

  return <button className={baseClass}>{children}</button>;
}
```

### Card Component
```jsx
function Card({ children, title }) {
  return (
    <div className="bg-background-elevated rounded-lg shadow-elevation-md p-6">
      {title && (
        <h3 className="text-2xl font-semibold mb-4 text-foreground-default">
          {title}
        </h3>
      )}
      <div className="text-base text-foreground-secondary">
        {children}
      </div>
    </div>
  );
}
```

## Maintenance

### Update Schedule
- Review tokens quarterly or when design changes
- Update documentation when new tokens are added
- Archive deprecated tokens with migration notes
- Track token usage in components

### Documentation Checklist
- [ ] All tokens have clear purpose statements
- [ ] Values are accurate and up-to-date
- [ ] Usage examples are provided
- [ ] Do's and Don'ts are documented
- [ ] Deprecations are noted with migration paths
- [ ] Documentation is accessible to all team members
- [ ] Examples compile and render correctly

## Key Points
- Keep documentation near the token definitions for easy updates
- Provide real component examples for each category
- Include both technical values and design intent
- Document do's and don'ts to guide usage
- Update documentation when tokens change
- Make documentation easily discoverable (wiki, design system site, code comments)