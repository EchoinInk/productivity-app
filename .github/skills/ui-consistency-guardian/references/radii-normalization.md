# Radii Normalization Pattern

## Overview
Normalize border radii to the project standard to ensure visual consistency. Use `rounded-md` for controls (buttons, inputs) and `rounded-lg` for cards and panels.

## Before
```jsx
<div className="rounded-2xl">Card content</div>
<button className="rounded-full">Action</button>
<input className="rounded-none" />
```

## After
```jsx
<div className="rounded-lg">Card content</div>
<button className="rounded-md">Action</button>
<input className="rounded-md" />
```

## Standards
- **rounded-md**: Default for controls (buttons, inputs, badges)
- **rounded-lg**: Cards, panels, larger surfaces
- **rounded-xl**: Reserved for special/prominent containers
- **rounded-full**: Only for circular avatars or badges

## Key Points
- Avoid arbitrary radii like `rounded-2xl`, `rounded-3xl`, `rounded-none`.
- Ensure radii work with the overall spacing and typography system.
- Check responsive behavior if using dynamic radii.
- Review design specs if uncertain about which radius to use.