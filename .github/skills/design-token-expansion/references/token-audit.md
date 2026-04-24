# Token Audit

## Overview
Analyze the current codebase to identify existing tokens, their usage patterns, and gaps where tokens should exist but don't. This audit informs decisions about which tokens to add.

## Token Audit Checklist

### Colors
- [ ] Primary brand colors documented?
- [ ] Secondary accent colors defined?
- [ ] Status colors (success, warning, error, info)?
- [ ] Neutral grayscale tokens for text and backgrounds?
- [ ] Hover/active state variants?
- [ ] Gradient tokens for visual depth?
- [ ] Are ad hoc hex codes used directly in components?

### Typography
- [ ] Font family tokens (e.g., font-sans, font-mono)?
- [ ] Font size scale tokens (e.g., text-xs, text-sm, text-base, text-lg)?
- [ ] Font weight tokens (e.g., font-normal, font-semibold, font-bold)?
- [ ] Line height tokens?
- [ ] Letter spacing tokens?
- [ ] Text style combinations (e.g., heading-1, body-default)?

### Spacing
- [ ] Baseline spacing unit defined (e.g., 4px, 8px)?
- [ ] Spacing scale tokens (e.g., space-1, space-2, space-4)?
- [ ] Padding and margin consistency?
- [ ] Gap tokens for flexbox/grid layouts?

### Shadows
- [ ] Shadow levels (e.g., shadow-sm, shadow-md, shadow-lg)?
- [ ] Elevation consistency?
- [ ] Focus state shadows?

### Borders and Radii
- [ ] Border width tokens?
- [ ] Border radius standards?
- [ ] Border color tokens?

## Audit Report Template

```markdown
# Token Audit Report

## Current Token Coverage
- Colors: 80% (24/30 colors token-based)
- Typography: 60% (6/10 sizes token-based)
- Spacing: 70% (7/10 gaps token-based)
- Shadows: 40% (2/5 elevations token-based)

## Identified Gaps
1. **Hover/Active State Colors** — No dedicated tokens for interactive states
2. **Text Combinations** — Typography scale exists but no predefined text styles
3. **Focus States** — Missing focus-state-specific shadows and outlines
4. **Gradient Variants** — Only primary gradient; need accent and subtle variants

## Recommendations
- Add hover/active state color tokens for all interactive components
- Create text style tokens (h1, h2, body, caption)
- Add focus-ring and focus-shadow tokens
- Expand gradient tokens for depth and visual hierarchy

## Usage Patterns
- Ad hoc colors found in: Button.tsx, Card.tsx, TagBadge.tsx
- Inline spacing in: FormField.tsx, Modal.tsx
- Hardcoded shadows in: Card.tsx, BottomSheet.tsx
```

## Tools for Auditing

### Grep for Ad Hoc Values
```bash
# Find hex colors not using tokens
grep -r "bg-\[#" src/components/ --include="*.tsx"

# Find arbitrary padding/margins
grep -r "p-\[" src/components/ --include="*.tsx"
grep -r "m-\[" src/components/ --include="*.tsx"
```

### Visual Inspection
- Review design mockups against current tokens
- Identify colors, sizes, and spacing used in designs
- Compare with existing token definitions
- Document any design elements not covered by tokens

## Key Points
- Audit quarterly or when design changes significantly.
- Document findings in a shared report.
- Prioritize gaps that affect multiple components.
- Align audit findings with design team input.