# Adaptive System Architecture

This document defines how the app adapts to different user states. This is the emotional, cognitive, and behavioral adaptation layer of the product.

---

## Core Adaptive Principles

The foundational rules governing all adaptive behavior:

- **The system adapts to the user, not the reverse** — The app changes to meet the user's current capacity, never demanding the user change to meet the app.
- **No state change should increase shame or overwhelm** — Every adaptation must make the user feel more capable, not less.
- **Adaptation must reduce cognitive load** — Simpler views, fewer decisions, clearer paths.
- **Adaptation must preserve momentum** — Even in reduced states, forward motion is encouraged and enabled.
- **Adaptation must support low-energy states** — The app remains usable and supportive when the user has minimal capacity.
- **Adaptation must be reversible and non-punitive** — Users can change states freely without penalty or judgment.

---

## Burnout Mode

Activated when the system detects patterns of overwhelm, avoidance, or collapse.

### Triggers
- Multiple missed days in succession
- High volume of overdue tasks
- Manual activation by user
- Explicit "I'm overwhelmed" check-in response
- Significant drop in app usage
- Repeated task deferrals or cancellations

### What Simplifies
- Today view reduced to 1-3 items maximum
- Complex routines collapsed into single steps
- Navigation reduced to essential paths only
- Settings and configuration options hidden
- Advanced features temporarily inaccessible

### What Hides
- Streak counts and progress metrics
- Overdue task lists (accessible but not displayed)
- Notifications and reminders (paused by default)
- Backlogs and "catch up" prompts
- Achievement celebrations and milestone notifications

### What Reduces
- Color intensity and visual stimulation
- Animation and motion
- Text density and information volume
- Decision points and options
- Frequency of any system communication

### What Becomes Prominent
- "One thing" focus view
- Gentle check-in prompts
- "Take a break" and "pause" options
- Simple, soothing visual design
- Supportive, minimal messaging

### How Today Changes
- Default to showing only the single most important item
- Hide all overdue counts and indicators
- Remove any time pressure or scheduling elements
- Offer "just one small thing" as the primary action
- Include visible "I need more space" option

### How Messaging Shifts
- From achievement-focused to presence-focused
- From "do this" to "be here"
- From progress tracking to simple acknowledgment
- From "keep going" to "rest if you need to"
- From celebration of output to validation of state

---

## Light Mode (Low Cognitive Load Mode)

For users who need to reduce mental effort while remaining engaged.

### Reduced Density
- Fewer items per screen (3-5 maximum)
- Increased whitespace and breathing room
- Larger touch targets and simpler layouts
- Reduced visual hierarchy complexity

### Fewer Visible Sections
- Collapse secondary information
- Hide optional features and add-ons
- Show only primary navigation
- Remove footer elements and auxiliary links

### Simplified Today
- Single-column layout only
- No grouping or categorization
- Flat list of items in priority order
- Minimal metadata (hide times, durations, complexity)

### Minimal Decision Points
- Pre-selected defaults for all choices
- Binary options instead of multiple choice
- "Just start" buttons that skip configuration
- Automatic simplification of complex tasks

### Smaller Action Set
- Limit available actions to 2-3 per item
- Hide advanced options behind "more" menu
- Default to the simplest possible path
- Remove edge-case functionality

### Gentle Pacing
- Slower transitions and animations
- Longer timeouts and no auto-dismissals
- No simultaneous prompts or notifications
- Sequential rather than parallel information presentation

---

## Reduced Density Mode

Systematic rules for collapsing and simplifying content presentation.

### Collapse Rules
- Collapse sections when item count exceeds 5
- Auto-collapse completed or inactive items
- Hide detailed views until explicitly expanded
- Group similar items into single summary cards

### Pagination Thresholds
- Maximum 7 items per view before pagination
- Infinite scroll replaced with "load more" button
- Clear progress indication ("Showing 5 of 12")
- Option to "show all" when explicitly requested

### Summary-First Views
- Lead with aggregate status, not individual items
- "3 tasks waiting" instead of listing all 3
- Expandable summaries that reveal detail on demand
- Visual indicators of what lies beneath

### Fewer Simultaneous Tasks
- Never show more than 3 active tasks at once
- Queue additional tasks behind "next" buttons
- Focus on completion before presentation of new items
- Prevent task accumulation in the active view

### Simplified Navigation
- Reduce nav items to 3-4 essential destinations
- Hide secondary or contextual navigation
- Use clear, single-word labels
- Eliminate nested menus and sub-navigation

---

## Low-Energy State

Designed for moments when the user has minimal capacity to engage.

### One-Tap Actions
- Single tap to complete, defer, or skip
- No multi-step processes
- No confirmation dialogs for low-stakes actions
- Smart defaults that require no configuration

### Micro-Wins
- Celebrate tiny actions (opening app, viewing Today)
- Frame small completions as meaningful
- Reduce the definition of "success" to minimal viable action
- Acknowledge effort over outcome

### Reduced Friction
- Skip loading states where possible
- Pre-populate all forms and selections
- Remember and re-suggest recent choices
- Allow completion without typing or complex input

### Fewer Reminders
- Reduce reminder frequency by 50%
- Consolidate multiple reminders into single digests
- Use quieter notification channels
- Default to "gentle" reminder tone

### Slower Pacing
- Longer display times for all messages
- No auto-advancing screens or timed prompts
- Extended session timeouts
- Patient waiting states with reassuring messaging

### Supportive Tone
- Increase warmth and encouragement in copy
- Add explicit permission to do less
- Validate current state without pushing forward
- Emphasize "enough" over "more"

---

## Recovery State

For users returning after absence or disengagement.

### Re-Entry Flow
- Skip the "while you were away" summary by default
- Present clean Today view with no backlog
- Offer optional "catch up" as a choice, not obligation
- Include explicit "fresh start" option

### Simplified Today
- Show only today's items, nothing else
- Hide overdue indicators and counts
- Remove any "days behind" messaging
- Present single, simple focus

### Optional Catch-Up
- Offer to review missed items only if user chooses
- Present catch-up as "if you want to" not "you need to"
- Allow immediate dismissal of all past items
- No default assumption that past tasks still matter

### No Backlog Dump
- Never present accumulated tasks on re-entry
- Never show counts of missed items
- Never use language like "catch up" or "get back on track"
- Never auto-generate makeup work or recovery plans

### Momentum Restart
- Suggest one tiny action to begin
- Frame starting as success, regardless of past
- Offer to rebuild routines gradually, not immediately
- Provide "start here" guidance without pressure

### Emotional Reassurance
- "Welcome back" messaging without reference to absence
- Explicit normalization of breaks and pauses
- Permission to begin again without explanation
- Celebration of return, not interrogation of gap

---

## Onboarding State

For new users or those exploring new features.

### Progressive Disclosure
- Reveal features as they become relevant
- Never present full capability on first launch
- Use contextual education over upfront tutorials
- Allow discovery at the user's own pace

### Minimal Initial Complexity
- Start with one feature only
- Default to the simplest configuration
- Hide advanced options completely
- Present the happy path as the only path initially

### Gradual Feature Introduction
- Introduce new capabilities after initial success
- Time feature reveals based on usage patterns
- Never introduce more than one new concept per session
- Allow users to ignore new features without penalty

### Reassurance-First Tone
- Lead with emotional safety, not functionality
- Normalize learning curves and mistakes
- Emphasize that there's no wrong way to use the app
- Promise support, not demands

### Early Micro-Wins
- Design first interactions for guaranteed success
- Celebrate initial completions immediately
- Build confidence through small, easy victories
- Create positive association before introducing challenge

---

## High-Momentum State

For users who are engaged, capable, and ready for more.

### Expanded Capabilities
- Reveal advanced features and options
- Enable customization and configuration
- Present multiple paths and approaches
- Offer deeper functionality on demand

### Optional Advanced Views
- Allow switching to denser information displays
- Offer detailed analytics and progress views
- Enable complex routine building
- Provide power-user shortcuts and gestures

### Increased Visibility of Progress
- Show streaks, milestones, and trends
- Display completion rates and patterns
- Surface insights and achievements
- Celebrate sustained engagement

### More Proactive Suggestions
- Offer optimizations based on usage patterns
- Suggest new features that might fit
- Propose routine improvements
- Recommend expansions that align with behavior

### Higher Density Allowed
- Permit more items per view
- Allow complex categorization and grouping
- Enable simultaneous task management
- Support advanced planning and scheduling

---

## Adaptive UI Rules

Systematic rules for how the interface transforms across states.

### What Elements Hide or Show
- **Hide in low states:** Streaks, overdue counts, complex navigation, advanced settings, achievement notifications
- **Show in low states:** Single-focus views, "take a break" options, simplified Today, supportive messaging
- **Show in high states:** Full navigation, progress dashboards, advanced features, customization options
- **Always visible:** Core Today items, essential actions, user profile/settings access

### What Collapses
- Secondary navigation collapses to hamburger menu
- Completed or inactive routines collapse to summaries
- Optional features collapse to "more" options
- Detailed information collapses to expandable cards

### What Expands
- Touch targets expand in low-energy states
- Whitespace expands in reduced density mode
- Breathing room between elements increases in burnout mode
- Help text and reassurance expands in recovery state

### What Changes Visually
- Color palette softens in low states (pastels, neutrals)
- Typography increases in size and spacing in low states
- Animation and motion reduces in low states
- Visual hierarchy flattens in low states

### What Becomes Primary or Secondary
- **Primary in low states:** Single focus item, essential actions, support options
- **Secondary in low states:** Progress tracking, streaks, achievements, advanced features
- **Primary in high states:** Full task list, progress views, optimization suggestions
- **Secondary in high states:** Simplified views, beginner guidance

### How Navigation Adapts
- **Low states:** 2-3 essential destinations only, persistent bottom nav, no sub-menus
- **Medium states:** 4-5 primary destinations, some contextual navigation
- **High states:** Full navigation capability, nested menus, shortcuts, quick actions

---

## Adaptive Behavioral Rules

How app behavior changes based on user state.

### How Loops Change Per State
- **Low states:** Loops are shorter, simpler, with fewer steps and immediate exits
- **Medium states:** Standard loops with normal complexity and decision points
- **High states:** Loops can be longer, more complex, with optional branches and advanced paths

### How Reminders Adjust
- **Low states:** Frequency reduced 50-75%, tone softened, consolidated digests preferred
- **Medium states:** Standard reminder frequency based on user preferences
- **High states:** Reminders can be more proactive, suggesting optimizations and expansions

### How Streaks Behave
- **Low states:** Streaks hidden completely; no tracking visible; no pressure to maintain
- **Medium states:** Streaks visible but framed gently; pauses normalized
- **High states:** Streaks visible and celebrated; milestones acknowledged
- **All states:** Streak resets are framed as "pauses" never "failures"

### How Nudges Shift Tone
- **Low states:** Nudges are permission-giving, gentle, optional — "You could..." or "When you're ready..."
- **Medium states:** Nudges are encouraging, invitational — "Want to try..." or "There's..."
- **High states:** Nudges are proactive, optimizing — "You might enjoy..." or "Consider..."
- **Never:** Commanding, demanding, or guilt-inducing nudges

### How the App Prevents Burnout
- Monitor for overwhelm indicators (missed days, deferrals, low engagement)
- Proactively suggest state reduction before user explicitly requests
- Offer "preventive" light mode during high-stress periods
- Normalize breaks and pauses in all messaging
- Never use escalating pressure tactics (increasing reminder frequency, stronger language)
- Always provide visible exit paths from any demanding state

---

## State Transitions

How the system moves between adaptive states.

### How the System Detects State Changes
- **Behavioral signals:** Task completion rates, deferral frequency, session duration, time between opens
- **Explicit signals:** User-activated modes, check-in responses, settings changes
- **Pattern recognition:** Sustained changes over time (not single-day anomalies)
- **Composite scoring:** Multiple factors weighted to determine state, not single indicators

### How Transitions Occur Gently
- No abrupt screen changes or jarring visual shifts
- Gradual fade between state presentations over 1-2 sessions
- Preview of upcoming changes with opt-in confirmation
- Reversible transitions (easy to undo if premature)

### How to Avoid Abrupt Shifts
- Require sustained pattern before state change (minimum 3-7 days)
- Use thresholds rather than binary triggers
- Provide "edge mode" that blends characteristics of adjacent states
- Allow manual override of automatic transitions

### How to Maintain Emotional Safety
- Frame all state changes as supportive, never punitive
- Explain why the change is happening (if automatic)
- Offer immediate opt-out and return to previous state
- Never use language that implies regression or failure
- Validate the user's choice regardless of state direction (whether simplifying or expanding)

---

## Safeguards

Protections to ensure adaptive behavior never harms the user.

### No State Should Punish the User
- No state reduces functionality as penalty
- No state creates shame or judgment
- No state removes access to essential features permanently
- No state implies the user is "bad" or "failing"

### No Adaptation Should Increase Overwhelm
- Simplification must be genuine, not superficial
- Reduced states must actually reduce cognitive load
- Information hiding must be helpful, not anxiety-inducing
- All adaptations tested for emotional safety

### No Mode Should Trap the User
- Every state has visible exit path
- Users can manually change states at any time
- No state requires "completion" to exit
- No state creates dependency or learned helplessness

### User Can Always Return to Baseline
- "Reset to default" option available in all states
- Previous preferences remembered and restorable
- No irreversible changes made during adaptations
- User control is always primary over system automation

### System Must Avoid Moral Framing
- Never label states as "good" or "bad"
- Never frame low-energy states as failures
- Never celebrate only high-productivity states
- Treat all states as valid, normal, and necessary parts of human experience
- Use neutral, descriptive language for all states

---

*These adaptive rules ensure the app meets users where they are, supporting them through all states of energy, capacity, and engagement.*
