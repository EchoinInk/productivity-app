## Scope
Apply the three confirmed changes to the Today page header area, plus integrate the 3D clipboard illustration into the Task Progress hero card. No architectural changes.

## Changes

### 1. Add 3D clipboard asset
- Copy `user-uploads://3d_clipboard.png` → `src/assets/3d-clipboard.png`
- Import as ES6 module in `TaskProgressCard.tsx`

### 2. `src/components/TodayHeader.tsx` — restructure
Replace the current centered "Today" title + date pill layout with:
- **Top row (3 columns)**: hamburger icon (left) · greeting block (center) · notification bell (right)
  - Greeting: `UIText.HeadingL` "Hi, Alex" (hardcoded)
  - Subtitle: `UIText.Meta` "Let's get things done"
- **Below**: existing date pill (chevron · date · chevron) — unchanged structure, just moved to sit beneath the greeting row
- Use `lucide-react` icons (`Menu`, `Bell`) consistent with existing icon usage
- Buttons are visual-only (no onClick wiring) to preserve current behavior

### 3. `src/features/tasks/components/TaskProgressCard.tsx` — add illustration
- Import the 3D clipboard image
- Add it as a decorative `<img>` positioned to the right of the existing progress ring + text content
- Layout: progress ring (left) · text block (center) · clipboard image (right, ~64–80px, `aria-hidden`)
- Keep all existing props, ring math, and text untouched

## Out of scope (per prior clarifications)
- No user profile wiring — "Alex" is hardcoded
- No category icon tiles, donut rings on money card, or brand bill icons
- No "Start a Task" pill button
- No changes to `MoneyLeftCard`, `BillsDueCard`, `TaskCategoryCard`

## Files touched
- **New**: `src/assets/3d-clipboard.png` (copied from upload)
- **Edit**: `src/components/TodayHeader.tsx`
- **Edit**: `src/features/tasks/components/TaskProgressCard.tsx`

## Verification
- `tsc --noEmit` clean
- Visual check on 390px viewport
