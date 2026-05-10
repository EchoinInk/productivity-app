# Domain Boundaries

This document defines the conceptual ownership boundaries of the system. This prevents coupling, state spaghetti, adaptive logic duplication, and future architectural chaos.

---

## Purpose

Domain boundaries exist to:
- Clarify ownership — each domain knows what it controls
- Isolate responsibilities — domains do not overreach
- Prevent cross-domain mutation — state changes flow through proper channels
- Reduce cognitive and architectural drift — boundaries keep the system comprehensible
- Support adaptive behavior without creating complexity — adaptation is centralized, not scattered
- Ensure each domain knows only what it must know — ignorance is a virtue

---

## Domain List

The system conceptually contains the following high-level domains:

- **Adaptive State Domain** — User capacity, burnout, engagement density
- **User State Domain** — Authentication, preferences, profile data
- **Tasks Domain** — Task creation, completion, scheduling, history
- **Routines Domain** — Recurring patterns, habit tracking, streaks
- **Momentum Domain** — Progress indicators, velocity, engagement trends
- **Notifications Domain** — Reminders, alerts, messaging timing and content
- **Navigation Domain** — Routing, history, view state, navigation patterns
- **Session Domain** — Active session state, current context, temporary flags
- **Emotional Safety Domain** — Tone validation, copy governance, emotional safeguards
- **Analytics Domain** — Event tracking, metrics, data collection

These are conceptual domains, not necessarily code modules yet. They represent ownership boundaries that guide implementation.

---

## Domain Ownership

### Adaptive State Domain

**Owns:**
- User capacity state (low, medium, high energy)
- Burnout state detection and flags
- Engagement density levels
- Interaction reduction rules
- State transition logic and thresholds

**Does NOT own:**
- Task data or content
- UI rendering decisions
- Persistence logic or storage
- User authentication or identity

**Responsible for:**
- Detecting when state changes occur
- Providing current state to other domains
- Enforcing state-based adaptation rules
- Preventing state changes that increase harm

**Remains ignorant of:**
- What tasks the user has
- How the UI is implemented
- What features exist or how they work

---

### User State Domain

**Owns:**
- User authentication state
- User preferences and settings
- Profile data and personal information
- Account lifecycle (signup, login, logout)
- Privacy and consent flags

**Does NOT own:**
- Adaptive capacity state
- Task or routine data
- Emotional safety validation
- Analytics data

**Responsible for:**
- Authenticating and identifying users
- Persisting user preferences
- Respecting privacy settings
- Providing identity to other domains

**Remains ignorant of:**
- Current user capacity or burnout
- Task completion status
- Navigation history

---

### Tasks Domain

**Owns:**
- Task creation, editing, deletion
- Task completion status and history
- Task scheduling and due dates
- Task categorization and metadata
- Task relationships and dependencies

**Does NOT own:**
- Adaptive state or how tasks display per state
- Notification timing or content
- Routines or recurring logic
- Emotional tone of task presentation

**Responsible for:**
- Task data integrity
- Task lifecycle management
- Providing task data to other domains
- Respecting adaptive state constraints

**Remains ignorant of:**
- Why a task displays differently (adaptive state)
- When notifications fire
- User's current energy level

---

### Routines Domain

**Owns:**
- Recurring pattern definitions
- Habit tracking data
- Streak calculations and history
- Routine completion status
- Routine pause/resume state

**Does NOT own:**
- How streaks are displayed (visualization)
- Adaptive state interpretation
- Notification scheduling
- Emotional framing of streaks

**Responsible for:**
- Routine data integrity
- Recurrence calculation
- Streak computation (neutral data only)
- Providing routine status to other domains

**Remains ignorant of:**
- Whether streaks are hidden or celebrated
- User's emotional state
- Notification content

---

### Momentum Domain

**Owns:**
- Progress indicators and metrics
- Velocity calculations
- Engagement trend analysis
- Completion rate tracking
- Long-term pattern recognition

**Does NOT own:**
- UI rendering of progress
- Adaptive state determination
- Task or routine data itself
- Emotional tone of progress messaging

**Responsible for:**
- Computing progress metrics
- Identifying momentum shifts
- Providing data for adaptive decisions
- Tracking engagement patterns

**Remains ignorant of:**
- How progress is displayed
- Whether momentum is celebrated or hidden
- Specific task content

---

### Notifications Domain

**Owns:**
- Reminder scheduling and timing
- Notification content and tone
- Delivery channels and methods
- Notification frequency rules
- Quiet hours and pause state

**Does NOT own:**
- Adaptive state determination
- Task or routine data
- UI rendering
- Emotional safety validation

**Responsible for:**
- Sending notifications at appropriate times
- Respecting user preferences for frequency
- Adapting tone based on state (via queries, not ownership)
- Managing notification lifecycle

**Remains ignorant of:**
- Why a notification is triggered (business logic)
- How tasks are structured
- Adaptive state internal logic

---

### Navigation Domain

**Owns:**
- Current route and view state
- Navigation history
- Navigation patterns and flows
- URL or view identifiers
- Transition state

**Does NOT own:**
- Feature logic or data
- Adaptive state interpretation
- Session business logic
- UI component implementation

**Responsible for:**
- Managing navigation state
- Providing navigation history
- Enabling navigation transitions
- Tracking current context

**Remains ignorant of:**
- What data exists on each screen
- User's capacity state
- Why navigation occurred

---

### Session Domain

**Owns:**
- Active session state
- Current context (what the user is doing now)
- Temporary flags and transient state
- Session duration and timing

**Does NOT own:**
- Persistent user data
- Adaptive capacity state
- Task or routine information
- Navigation history

**Responsible for:**
- Tracking current session context
- Managing temporary state
- Providing session boundaries
- Cleaning up on session end

**Remains ignorant of:**
- Long-term user patterns
- Persistent preferences
- Adaptive state changes

---

### Emotional Safety Domain

**Owns:**
- Tone validation rules
- Copy governance and word lists
- Emotional safeguard checks
- Language pattern enforcement
- Microcopy validation

**Does NOT own:**
- Feature logic or data
- UI rendering
- Adaptive state determination
- Notification scheduling

**Responsible for:**
- Validating copy for emotional safety
- Enforcing language guidelines
- Reviewing tone before deployment
- Providing guardrails for other domains

**Remains ignorant of:**
- When features trigger
- How data flows through the system
- User's specific tasks or routines

---

### Analytics Domain

**Owns:**
- Event tracking definitions
- Metrics collection
- Data aggregation rules
- Privacy-compliant tracking

**Does NOT own:**
- Business logic decisions
- Adaptive state
- User-facing features
- Emotional safety validation

**Responsible for:**
- Collecting events accurately
- Respecting privacy settings
- Providing data for improvement
- Never impacting user experience

**Remains ignorant of:**
- How data influences decisions
- Real-time adaptive behavior
- Specific user context

---

## Shared vs Isolated Responsibilities

### Domains That Own State
- **Adaptive State Domain** — capacity, burnout, engagement density
- **User State Domain** — preferences, authentication
- **Tasks Domain** — task data and status
- **Routines Domain** — routine patterns and streaks
- **Navigation Domain** — current route and history

### Domains That Expose Derived State
- **Momentum Domain** — computes from Tasks/Routines, read-only
- **Session Domain** — aggregates from Navigation and time
- **Analytics Domain** — aggregates from events

### Domains That Act as Orchestrators
- **Adaptive State Domain** — coordinates how other domains behave
- **Navigation Domain** — coordinates view transitions
- **Notifications Domain** — coordinates message timing

### Domains That Must Remain Isolated
- **Emotional Safety Domain** — pure validation, no dependencies
- **Analytics Domain** — observes only, never influences

### Domains That Become Shared Infrastructure
- **Event System** (cross-cutting) — enables domain communication
- **Persistence Layer** (cross-cutting) — storage abstraction

### Critical Rules
- **State ownership must be singular** — one domain owns each piece of state
- **Derived state must not mutate source state** — read-only derived values
- **Orchestration must not contain business logic** — coordination only
- **Adaptive logic must not leak into feature domains** — Tasks domain knows nothing about burnout mode

---

## Communication Rules

Domains communicate through explicit, observable channels only.

### Preferred Communication Methods
- **Events** — fire-and-forget signals that something occurred
- **Selectors** — read-only queries for derived state
- **Derived state** — computed values based on source state
- **Orchestration layers** — thin coordination that wires domains together

### Forbidden Patterns
- **Direct cross-domain mutation** — Domain A cannot change Domain B's state
- **Tightly coupled feature logic** — features cannot embed adaptive logic directly
- **Implicit dependencies** — domains must explicitly declare what they need
- **Shared mutable state** — no global state bags that anyone can modify

### The Rule
**Domains communicate through explicit, observable channels only.**

---

## Foundational Domains

The following domains form the platform's infrastructure layer:

- **Adaptive State Domain** — determines how the entire system behaves
- **Event System** — enables decoupled communication
- **Navigation Domain** — manages user context and flow
- **Session Domain** — tracks active engagement

### Requirements for Foundational Domains
- **Must remain stable** — changes require careful consideration
- **Must not depend on feature domains** — foundational domains sit below features
- **Form the backbone of adaptive behavior** — all adaptation flows from these

Feature domains (Tasks, Routines, Notifications) build upon and respond to foundational domains, but foundational domains never depend on features.

---

## Boundary Safeguards

Rules that prevent domain collapse:

- **No domain may own overlapping state** — if two domains seem to need the same state, one owns it and the other queries it
- **No domain may mutate another domain's state** — all state changes flow through the owning domain's interface
- **No domain may depend on UI structure** — domains know nothing about components, screens, or visual hierarchy
- **No domain may contain emotional tone logic unless it owns it** — only Emotional Safety Domain validates tone; others request validation
- **No domain may bypass the event/orchestration layer** — direct domain-to-domain mutation is prohibited

---

## Simplicity Rule

**This document defines clarity, not complexity.**

These boundaries must remain:
- **Lightweight** — not bureaucratic, easy to understand
- **Conceptual** — guiding principles, not rigid code structures
- **Easy to maintain** — simpler to follow than to circumvent

Boundaries exist to make the system more comprehensible, not less. When in doubt, prefer clarity over cleverness.

---

*These domain boundaries ensure the system remains decoupled, adaptive, and emotionally safe as it grows.*
