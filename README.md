# 📱 LifeOS — Personal Productivity System

> A mobile-first app to manage tasks, budget, meals, and shopping in one place.

---

## ✨ Overview

LifeOS is a fast, minimal productivity system designed to reduce friction in daily planning.

Instead of switching between multiple apps, LifeOS combines:

- ✅ Tasks  
- 💰 Budget  
- 🍽 Meals  
- 🛒 Shopping  

into a single, clean interface.

---

## 🚀 Features

### ✅ Task Management
- Timeline grouping (Today / Upcoming / Yesterday)
- Per-section progress tracking
- Category tagging
- Completion tracking per date

### 💰 Budget Tracker
- Weekly income + expense tracking
- Remaining budget calculation
- Transaction list

### 🍽 Meal Planner
- Weekly meal planning (Mon–Sun)
- Breakfast / Lunch / Dinner structure

### 🛒 Shopping List
- Groceries + household categories
- Checklist interaction

---

## 🧱 Architecture

This project uses a **domain-driven frontend architecture**:
STORE → SELECTORS → DOMAIN → HOOK → UI
### Principles:
- Domain = all business logic  
- Selectors = thin wrappers  
- Hooks = orchestration only  
- UI = presentational only  

---

## ⚙️ Tech Stack

- React (TypeScript)
- Zustand
- Tailwind CSS
- Framer Motion

---

🔮 Roadmap

🔥 Core

* Recurring task engine (daily / weekly / custom)
* Overdue task handling
* Calendar-based scheduling

⚡ UX

* Swipe actions (complete / delete)
* Haptic feedback + animations
* Inline editing

📊 Insights

* Productivity analytics
* Budget trends
* Smart summaries

🔗 Automation

* Recipes → shopping list
* Tasks → reminders / budgeting
* Smart suggestions

⸻

📖 Philosophy

LifeOS prioritizes:

* Speed over complexity
* Clarity over features
* Real usage over theoretical design

⸻

🧠 Author

Built as a personal productivity system using:

* AI-assisted development
* Manual architecture refinement
* Real-world iteration
