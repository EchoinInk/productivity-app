# Event System

This document defines the reactive backbone of the adaptive platform. This is how domains communicate, how state changes are observed, and how adaptation is orchestrated.

---

## Purpose

The event system exists to:
- Decouple domains — domains communicate without direct knowledge of each other
- Avoid direct cross-domain mutation — state changes flow through proper channels
- Make state changes observable — the system can react to changes as they occur
- Enable adaptive reactions without tight coupling — Adaptive State Domain responds to events without controlling emitters
- Prevent hidden dependencies and side effects — all communication is explicit
- Support low-complexity, high-clarity orchestration — simple, understandable flows

---

## Event Model

Events are the fundamental unit of communication between domains.

### Event Characteristics
- **Events are immutable facts** — once emitted, they do not change
- **Events describe what happened, not what to do** — facts, not commands
- **Events are domain-agnostic messages** — any domain can emit, any domain can consume
- **Events are timestamped and structured** — contain context but not implementation details
- **Events do not contain UI concerns** — no component names, route paths, or visual state

### Event Type Examples

**User Interaction Events:**
- `user.interaction.started` — user began engaging with a feature
- `user.interaction.completed` — user finished an interaction
- `user.interaction.dropped` — user engagement decreased or stopped

**Task Events:**
- `task.created` — new task added to system
- `task.completed` — task marked as done
- `task.deferred` — task postponed to later
- `task.deleted` — task removed from system

**Routine Events:**
- `routine.started` — user began routine
- `routine.completed` — routine finished
- `routine.skipped` — routine intentionally bypassed
- `routine.paused` — routine temporarily stopped

**Session Events:**
- `session.started` — app opened, new session begins
- `session.ended` — app closed, session concludes
- `session.interrupted` — session ended unexpectedly

**Adaptive State Events:**
- `adaptive-state.updated` — capacity or behavioral state changed
- `adaptive-state.burnout-detected` — patterns indicate overwhelm
- `adaptive-state.recovery-detected` — patterns indicate return from absence

**Momentum Events:**
- `momentum.increased` — engagement pattern shows acceleration
- `momentum.decreased` — engagement pattern shows slowing
- `momentum.stabilized` — engagement pattern consistent

---

## Event Producers

### Producer Rules
- **Domains emit domain events** — each domain emits events about its own state changes
- **Producers do not know who will consume the events** — emission is broadcast, not targeted
- **Producers must not depend on consumer behavior** — emit without expectation of specific reaction

### Producer Permissions
- **UI Layer** can emit interaction events (`user.interaction.*`, `user.action.*`)
- **Tasks Domain** emits task lifecycle events (`task.created`, `task.completed`, etc.)
- **Routines Domain** emits routine lifecycle events (`routine.started`, `routine.completed`, etc.)
- **Adaptive State Domain** emits state-change events (`adaptive-state.updated`, etc.)
- **Session Domain** emits session lifecycle events (`session.started`, `session.ended`)
- **Momentum Domain** emits momentum indicator events (`momentum.increased`, etc.)
- **Notifications Domain** emits notification lifecycle events (`notification.sent`, `notification.dismissed`)

### Producer Constraints
- Producers emit facts about what happened
- Producers do not emit commands ("do this")
- Producers do not know or care who listens

---

## Event Consumers

### Consumer Rules
- **Consumers subscribe to relevant events** — domains listen to events that affect their behavior
- **Consumers react to events but do not mutate other domains directly** — response flows through proper channels
- **Consumers may update their own state** — domains change their own state in response

### Allowed Consumer Reactions
- **Update their own state** — modify internal state based on event
- **Derive new state** — compute derived values from event data
- **Schedule orchestration flows** — trigger multi-step coordinated responses
- **Trigger adaptive adjustments** — respond to behavioral state changes

### Consumer Permissions
- **Adaptive State Domain** consumes behavioral signals (`user.interaction.*`, `task.deferred`, `routine.skipped`, `session.ended`)
- **Momentum Domain** consumes task and routine events (`task.completed`, `routine.completed`, `task.deferred`)
- **Notifications Domain** consumes state and behavioral events (`adaptive-state.updated`, `momentum.*`)
- **Analytics Domain** consumes almost everything, but passively — observes without reacting
- **Orchestration Layer** consumes relevant events to coordinate multi-domain flows

### Consumer Constraints
- Consumers cannot directly mutate other domains' state
- Consumers react through their own domain interfaces only
- Consumers do not know or care who emitted the event

---

## Orchestration Layer

The orchestration layer coordinates complex, multi-domain responses to events.

### Orchestration Responsibilities
- **Listens to events** — subscribes to relevant events across domains
- **Coordinates multi-domain reactions** — triggers appropriate responses in multiple domains
- **Triggers flows** — starts recovery flows, burnout support, momentum boosts, onboarding
- **Never owns canonical data** — orchestrators coordinate; domains own
- **Never bypasses domain boundaries** — works through proper domain interfaces

### Key Principle
**Orchestration is where adaptive behavior is expressed, not where data is stored.**

Orchestrators:
- Detect patterns across multiple events
- Decide when to trigger adaptive responses
- Start flows that involve multiple domains
- Clean up when flows complete

### Example Orchestration Triggers
- Recovery flow: triggered by `session.started` after extended absence
- Burnout support: triggered by `adaptive-state.burnout-detected`
- Momentum celebration: triggered by `momentum.increased` after sustained pattern
- Onboarding progression: triggered by `user.interaction.completed` in specific contexts

---

## Event Naming and Structure

### Naming Convention
Events follow the pattern: `domain.action.outcome`

- **Domain** — the domain that owns the event (user, task, routine, adaptive-state, momentum, session)
- **Action** — what occurred (created, completed, started, updated, increased)
- **Outcome** — optional result or state (success, failed, detected)

### Examples
- `task.created` — domain: task, action: created
- `user.interaction.completed` — domain: user, action: interaction.completed
- `adaptive-state.burnout-detected` — domain: adaptive-state, action: burnout-detected
- `momentum.increased` — domain: momentum, action: increased

### Payload Structure
Events carry minimal, explicit, conceptually typed payloads:

```
task.completed:
  - taskId: identifier
  - completedAt: timestamp
  - duration: time spent (optional)

adaptive-state.updated:
  - previousState: capacity level
  - newState: capacity level
  - triggeredBy: event reference
```

### Payload Constraints
- **No UI-specific fields** — no component names, no CSS classes, no visual state
- **No implementation details** — no route names, no function references, no internal IDs
- **Minimal context** — only what consumers need to react appropriately
- **Immutable data** — payload is a snapshot, not a reference

---

## Event Flow Examples

These examples illustrate how events flow through the system conceptually.

### Example: Task Completion Flow

1. **User marks task complete in UI**
2. **UI emits** `user.interaction.completed` (task completion interaction)
3. **Tasks Domain receives interaction, updates state, emits** `task.completed`
4. **Momentum Domain consumes** `task.completed`, updates momentum metrics, emits `momentum.increased`
5. **Adaptive State Domain consumes** `task.completed` and `momentum.increased`, evaluates capacity, emits `adaptive-state.updated`
6. **Notifications Domain consumes** `adaptive-state.updated`, decides to emit `notifications.suggest-micro-win`
7. **Orchestration Layer observes** the completion pattern, decides no further action needed

**Result:** Task completion cascades through domains, each reacting appropriately without tight coupling.

### Example: Burnout Detection Flow

1. **Pattern emerges: user skips routines, defers tasks**
2. **Tasks Domain emits** `task.deferred` (multiple times)
3. **Routines Domain emits** `routine.skipped` (multiple times)
4. **Session Domain observes declining engagement, emits** `user.interaction.dropped`
5. **Adaptive State Domain consumes** these events, detects burnout pattern, emits `adaptive-state.burnout-detected`
6. **Orchestration Layer consumes** `adaptive-state.burnout-detected`, triggers recovery flow:
   - Signals Notifications Domain to reduce frequency
   - Signals UI to reduce density (via adaptive rules, not direct mutation)
   - Schedules gentle check-in for later
7. **Notifications Domain emits** `notifications.frequency-reduced`
8. **Momentum Domain pauses celebration emissions**

**Result:** System detects overwhelm, adapts supportively, reduces demands without user intervention.

### Example: Session Recovery Flow

1. **User opens app after 10 days absence**
2. **Session Domain emits** `session.started`
3. **Adaptive State Domain detects** extended gap, emits `adaptive-state.recovery-detected`
4. **Orchestration Layer consumes** recovery event, triggers re-entry flow:
   - Signals Today view to simplify (via adaptive state, not direct command)
   - Suppresses backlog notifications
   - Prepares gentle welcome messaging
5. **Notifications Domain consumes** recovery event, schedules `notifications.welcome-back`
6. **UI responds to adaptive state** (now in recovery mode), displays simplified view

**Result:** Return from absence handled gently, without overwhelming the user.

---

## Event System Safeguards

Protections to ensure events never cause harm:

- **No domain may directly mutate another domain in response to an event** — reaction flows through proper channels
- **No event may depend on UI structure** — events are UI-agnostic
- **No event may encode emotional tone** — tone applied by Emotional Safety Domain, not embedded in events
- **No event may trigger punitive behavior** — events cannot trigger shame or punishment
- **No event may require user consistency to be valid** — events describe reality; reality is always valid

### Enforcement
- Event handlers reviewed for cross-domain mutation
- Event payloads audited for UI dependencies
- Emotional tone validation applied to event reactions, not event emission
- All event flows tested with low-energy and burnout scenarios

---

## Simplicity Rule

**The event system must remain:**
- **Small** — few event types, clear responsibilities
- **Understandable** — any developer can trace an event flow
- **Observable** — events can be logged, inspected, debugged
- **Debuggable** — when something goes wrong, the cause is clear

### The Test
If an event flow becomes too complex to explain simply, it must be simplified.

### Complexity Warning Signs
- Event chains longer than 5 steps
- Circular event dependencies
- Events that trigger multiple orchestration layers
- Events that require extensive context to understand

When these appear, refactor: break into smaller flows, simplify dependencies, reduce coupling.

---

*This event system ensures the platform remains decoupled, observable, and adaptively responsive without creating complexity.*
