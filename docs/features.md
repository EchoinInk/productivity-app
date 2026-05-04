# Lumo App — Planned Features by Screen - May 4th, 2026

---

# 🌐 Global System (All Screens)

## Navigation
- Pill-shaped bottom navigation bar
- Active tab:
  - Stronger color
  - Slight scale increase
- Inactive tabs:
  - Reduced opacity (~50–60%)
- Subtle elevation from background

## Floating Action Button (FAB)
- Circular gradient button (+ icon)
- Expands into action menu:
  - Event
  - Task
  - Recipe
  - Meal
  - Transaction
  - Shopping
- Menu:
  - Left-aligned text
  - Smooth spring animation

## Visual System
- Rounded cards
- Soft shadows
- Gradient accents (not full backgrounds)
- Glass + subtle reflection effects
- Consistent spacing system (more vertical rhythm)

## Motion System
- Hero cards → subtle shimmer
- FAB → spring expansion
- Task completion → animated check
- Buttons → press + glow feedback

## Dark Mode
- Full system support using existing color system

---

# 🏠 Home / Today Screen

## Layout
- Increased vertical spacing between sections
- Reduced internal card padding
- Clear hierarchy (hero > content)

## Hero Card (Primary Focus)
- Larger, dominant card
- Progress ring:
  - Dark purple styling
  - Smaller + sharper
- Reduced gradient blur
- Increased text contrast
- CTA:
  - “Continue”
  - “Start next task”
- Subtle glass reflection line

## Overdue Card (Conditional)
- Only appears when needed
- Displays:
  - Count of overdue items
  - Task rows with:
    - Checkbox
    - Task name
    - Due date
- Red accent for urgency
- Divider lines between items

## Grid Cards (Tasks / Meals / Budget / Shopping)
- Tasks = highlighted primary
- Others = slightly muted

## Insight Card
- Icon with soft tinted background
- Subtle glow
- Elevated visual importance

---

# ✅ Tasks Screen

## Structure Order
1. Header (context)
2. Date selector
3. Summary card
4. Overdue section
5. Today tasks
6. Upcoming tasks

## Date System
- Horizontal strip (Mon–Sun)
- Active date:
  - Gradient fill
  - Underline
- Calendar dropdown via chevron
- Timeline for selected day

## Task Interactions
- Checkbox:
  - Gradient fill animation
  - Smooth checkmark draw

## Overdue Section
- Elevated styling:
  - Red glow OR stronger shadow

## Tags
- Soft tinted backgrounds (not loud)

---

# 💰 Budget Screen

## Hero Budget Card (Anchor)
- Gradient: aqua → indigo → magenta
- Displays:
  - Total balance (primary)
  - Remaining (secondary)
  - Progress bar + %
  - Income vs expenses split

## Transactions Section
- Empty state includes:
  - Icon
  - CTA (“Add Transaction”)
  - “View all” option

## Actions
- Add Income → blue/aqua gradient
- Add Expense → pink/purple gradient

## Weekly Overview
- 3-column layout:
  - Income
  - Expenses
  - Remaining
- Semantic colors (green/red/purple)

## Advanced Features
- Spending categories (charts)
- Smart insights:
  - “You spent 20% more than last week”
  - “Top category: Food”

---

# 🍽 Meal Planner Screen

## Header
- Gradient header
- Subtitle: “Plan your meals. Eat healthy. Save time.”

## Date Selector
- Horizontal pill system
- Active day highlighted
- Calendar shortcut

## Meal Cards
- Per-day cards with:
  - Icon
  - Day (primary)
  - Status (secondary)
  - + Add button
- Subtle edge color accents

## Visual Rhythm
- Weekdays → cooler tones
- Weekends → warmer tones

## Features
- Meal types:
  - Breakfast / Lunch / Dinner
- Smart suggestions:
  - Habit-based recommendations
- Swipe actions:
  - Duplicate meal
  - Move meal
- Auto shopping integration

---

# 🛒 Shopping Screen

## Header
- Title: Shopping
- Subtitle: “Everything you need, in one place”

## Smart Summary Card
- Items remaining
- Items from meals
- Estimated total cost

## Shopping List
- Grouped categories:
  - Produce
  - Dairy
  - Protein
- Reduces cognitive load

## Interactions
- Swipe right → complete
- Swipe left → delete/edit
- Tap → edit item

## Visual System
- Completed → faded + strikethrough
- Active → full contrast
- Category headers → tinted

## Features
- Auto-sync with meals
- Budget tracking (live total)
- Smart suggestions
- Store mode (aisle sorting)

---

# 🍳 Recipes Screen

## Header
- Gradient header
- Subtitle:
  “Collect, create and cook delicious meals”

## Search & Filter
- Search by:
  - Recipe
  - Ingredient
  - Cuisine
- Filter system

## Empty State
- Icon + glow
- CTA: “Add Recipe”

## Recipe Cards
- Image-based
- Includes:
  - Time
  - Difficulty
  - Rating
  - Tags

## Sections
- Quick Ideas (horizontal scroll)
- Categories (grid):
  - Breakfast / Lunch / Dinner / Snacks

## Features
- Recipe detail screen:
  - Ingredients
  - Steps
  - Add to meals
  - Add to shopping
- Favorites system
- Full integration with meals + shopping

---

# ➕ Add Task Modal

## Structure

### Header
- Gradient strip
- Title: “Add Task”
- Subtitle: “Stay on track. One step at a time.”

### Sections
1. Task Info
   - Task name (primary input)

2. Schedule
   - Date
   - Recurring

3. Details
   - Category
   - Priority

4. Notes
   - Collapsible

## Inputs
- Card-style inputs
- Icons (calendar, repeat, etc.)
- Better padding + contrast

## CTA
- Full-width gradient button:
  [ ✨ Add Task ]
- Sticky at bottom

## Smart Defaults
- Today’s date prefilled
- Default priority = medium
- Last used category selected

## Quick Actions
- Quick Task
- Today
- High Priority

## Microinteractions
- Input focus glow
- Dropdown animations
- Button press feedback

## Premium Touch
- Subtle glass panel effect

---

# 🔁 Full App Flow

Tasks → Meals → Shopping → Budget → Insights

## System Connections
- Meals → auto-generate shopping list
- Shopping → updates budget
- Recipes → feed into meals
- Tasks → drive daily execution

---

# 🎯 Product Direction Summary

## UX Shift
From:
“Feature-based screens”

To:
“Connected life system”

## Core Principles
- Clarity over density
- Action over display
- System over screens
- Guidance over forms
