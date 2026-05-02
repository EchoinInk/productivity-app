# 🧩 FEATURE BUILD — MODALS & CORE SCREENS

---

# 🔴 P0 — TASK MODALS (CRITICAL UX)

## Add Task Modal

### Layout Refactor
- [ ] Match app background (remove generic modal look)
- [ ] Remove time field entirely
- [ ] Remove quick date shortcuts (Today / Tomorrow / Weekend)

### New Fields
- [ ] Add priority field:
  - low / medium / high

### Layout Structure (STRICT)

Task name date | recurrence category | priority notes [Add Task]

### UI Rules
- [ ] Date + recurrence inline (flex row)
- [ ] Category + priority inline
- [ ] Full-width CTA button
- [ ] Sticky bottom CTA (mobile safe)

---

## Edit Task Modal

### Layout Refactor
- [ ] Same layout as Add Task
- [ ] Match app styling

### Actions
- [ ] Add DELETE button
- [ ] Place actions inline:

[Delete Task]   [Update Task]

### Remove
- [ ] Time field
- [ ] Quick date shortcuts

---

# 🔴 P0 — TASK DATA MODEL UPDATE

## Add priority to Task type

ts priority?: "low" | "medium" | "high"; 

---

## Store Updates

- [ ] Ensure addTask supports priority
- [ ] Ensure updateTask supports priority
- [ ] Default = "medium"

---

# 🟠 P1 — BUDGET PAGE

## Hero Summary Card

- [ ] Weekly header ("This Week")
- [ ] Remaining budget display
- [ ] % remaining
- [ ] Income total
- [ ] Expenses total
- [ ] Bills due

---

## Spending Overview

- [ ] Circular chart (category breakdown)
- [ ] Color-coded segments

Categories:
- Groceries
- Transport
- Medical
- Entertainment
- Pet
- Others

---

## Recent Transactions

- [ ] List transactions
- [ ] Show:
  - category
  - amount
  - date

---

## Add Transaction Flow

- [ ] Single CTA: "Add Transaction"
- [ ] Modal with tabs:
  - Income
  - Expense
  - Bill

---

# 🟠 P1 — BILL / INCOME / EXPENSE MODALS

## Add Bill

- [ ] Invoice number
- [ ] Vendor (select + create)
- [ ] Issue date
- [ ] Due date
- [ ] Category
- [ ] Amount
- [ ] Description

---

## Add Income

- [ ] Type (WiNZ, Side Hustle, etc.)
- [ ] Date
- [ ] Category (auto = Income)
- [ ] Amount
- [ ] Notes

---

## Add Expense

- [ ] Income source
- [ ] Date
- [ ] Category
- [ ] Amount
- [ ] Description

---

# 🟡 P2 — MEAL PLANNER

## Header

- [ ] Horizontal date selector
- [ ] Selected day highlighted

---

## Daily Meals

- [ ] Breakfast / Lunch / Dinner / Snack
- [ ] Show:
  - name
  - time
  - icon

---

## Recipe Suggestions

- [ ] CTA: Browse Recipes
- [ ] Image support

---

## Add Meal Modal

- [ ] Meal name
- [ ] Meal type
- [ ] Date
- [ ] Save button

---

# 🟡 P2 — SHOPPING LIST

## Auto Generation

- [ ] Generate from meal planner ingredients

---

## Categories

- [ ] Groceries / Household toggle

---

## Items

- [ ] Grouped sections:
  - Vegetables
  - Dairy
  - Pantry

---

## Add Item Modal

- [ ] Name
- [ ] Category
- [ ] Type (Household / Groceries)
- [ ] Quantity

---

# 🟡 P2 — RECIPES SYSTEM

## Recipe List

- [ ] Popular recipes
- [ ] Quick & Easy section
- [ ] Recipe cards

---

## Recipe Card

- [ ] Image
- [ ] Title
- [ ] Time / yields icons
- [ ] Description
- [ ] Ingredients
- [ ] Instructions

---

## Add Recipe Modal

- [ ] Name
- [ ] Description
- [ ] Prep / cook time
- [ ] Category
- [ ] Ingredients list (dynamic)
- [ ] Instructions (steps)

---

## Future

- [ ] External recipe import (optional)
- [ ] "Keep screen awake" mode

---

# 🧠 RULES FOR ALL FEATURES

- [ ] No new abstractions
- [ ] Follow architecture.md strictly
- [ ] Use raw data models
- [ ] UI = presentational only
- [ ] Logic in hooks/selectors only

---

# 🚀 PRIORITY ORDER

1. Task Modals (P0)
2. Task Priority Model
3. Budget Page
4. Transaction Modals
5. Meal Planner
6. Shopping List
7. Recipes

---

END