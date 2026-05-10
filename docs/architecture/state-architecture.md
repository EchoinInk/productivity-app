# State Architecture

This document defines how state is organized, owned, derived, and orchestrated across the system. This is the nervous system of the adaptive platform.

---

## Purpose

State architecture exists to:
- Prevent state duplication — one source of truth for each fact
- Clarify ownership — every piece of state belongs to exactly one domain
- Separate behavioral state from UI state — adaptive logic independent of presentation
- Support adaptive behavior without complexity — centralized, predictable adaptation
- Ensure predictable, observable state transitions — changes flow through defined channels
- Avoid cross-domain mutation — domains cannot directly modify each other's state

---

## State Categories

### Source State (owned, canonical)
The single source of truth for each piece of data. Source state is:
- Owned by exactly one domain
- The canonical representation of truth
- Directly mutated only by its owning domain
- The foundation from which all derived state flows

Examples: task data, user preferences, routine definitions, authentication status

### Derived State (computed, read-only)
State computed from source state. Derived state is:
- Pure computation with no side effects
- Read-only — never mutated directly
- Recalculated when source state changes
- The safest place for complex adaptive logic

Examples: task completion rate, current adaptive capacity, filtered task lists, momentum indicators

### Behavioral State (adaptive, capacity, burnout)
State that determines how the system behaves toward the user. Behavioral state is:
- Owned by the Adaptive State Domain
- Informs other domains without controlling them
- Based on patterns, not single events
- Designed to support, not judge

Examples: capacity level (low/medium/high), burnout indicators, engagement density, recovery markers

### Session State (ephemeral, runtime)
State that exists only during the current session. Session state is:
- Never persisted across app restarts
- Temporary by design
- Scoped to current user context
- Cleaned up on session end

Examples: current view focus, active flow step, temporary filters, session timing

### UI State (local, view-specific)
State specific to presentation layer. UI state is:
- Owned by UI components or local stores
- Never contains business logic
- Independent of behavioral state
- Discardable without data loss

Examples: scroll position, expanded/collapsed sections, input focus, modal visibility

### Orchestration State (transient, flow-level)
State that coordinates multi-step or multi-domain flows. Orchestration state is:
- Temporary by design
- Exists only for the duration of a flow
- Coordinates without owning data
- Cleaned up when flow completes or exits

Examples: onboarding step, recovery flow stage, multi-step creation wizard, ephemeral nudge state

---

## State Ownership Rules

- **Each piece of state has exactly one owner** — no shared ownership, no co-ownership
- **Ownership belongs to a domain, not a component** — domains own state; components display it
- **Derived state must not mutate source state** — computation flows one direction only
- **UI state must not contain business logic** — UI displays state, it does not define behavior
- **Adaptive state must not depend on UI structure** — behavioral logic is independent of presentation
- **Session state must not persist across app restarts** — ephemeral by definition

---

## Behavioral State Layer

The adaptive behavioral state layer determines how the system responds to the user's current capacity.

### What It Tracks
- **Capacity state** — low, medium, high energy indicators
- **Burnout indicators** — patterns of avoidance, missed days, deferred tasks
- **Engagement density** — how much the user is interacting with the app
- **Low-energy markers** — signals the user needs reduced demands
- **Recovery markers** — indicators of return after absence
- **Momentum indicators** — patterns of sustained engagement or disengagement

### How It Operates
- Informs other domains through selectors and signals
- Never directly mutates other domain's state
- Exposes read-only derived values: "current capacity is low"
- Other domains query and respond, but behavioral state does not command

### Key Principle
Behavioral state is observational, not imperative. It describes; it does not demand.

---

## Derived State Rules

- **Derived state is pure** — same inputs always produce same outputs
- **Derived state is read-only** — never mutated, only computed
- **Derived state has no side effects** — computation does not trigger actions
- **Derived state cannot depend on UI state** — derived from source state only
- **Derived state cannot depend on navigation** — path-independent computation

### Why Derived State Is Safe
Derived state is the safest place for adaptive logic because:
- It cannot create circular dependencies
- It cannot accidentally modify source data
- It is predictable and testable
- It is independent of presentation layer

---

## Transient vs Persistent State

### What Must Persist (stored permanently)
- Tasks and task history
- Routines and streak data
- User preferences and settings
- Authentication credentials
- Long-term patterns and analytics

### What Must Not Persist (ephemeral only)
- Session state and current context
- Active flow steps
- Temporary filters and sorts
- UI expansion/collapse states
- Ephemeral notifications

### What Should Be Recomputed on Launch (behavioral state)
- Adaptive capacity — recalculate from recent patterns
- Burnout indicators — fresh analysis of current state
- Momentum metrics — compute from persistent data
- Engagement density — measure from recent usage

### What Should Be Cached but Not Stored (derived summaries)
- Analytics summaries — cache for performance, recompute if stale
- Filtered views — cache in memory, rebuild on change
- Computed statistics — cache until source state changes

---

## Orchestration State

Orchestration state coordinates complex flows across multiple domains without owning domain data.

### What It Handles
- **Flow-level state** — where the user is in a multi-step process (onboarding step 3 of 5)
- **Temporary adaptive adjustments** — session-specific reduction rules
- **Multi-step interactions** — creation wizards, setup flows
- **Ephemeral nudges** — one-time prompts that should not repeat

### Key Principle
**Orchestration state coordinates domains but does not own data.**

Orchestrators:
- Know which step is current
- Do not know what data the step contains
- Trigger domain actions through events
- Do not mutate domain state directly
- Clean up completely when flow ends

---

## State Isolation Rules

Boundaries that prevent state chaos:

- **No domain may mutate another domain's state** — mutation flows through owner only
- **No domain may depend on UI state** — domains are UI-agnostic
- **No domain may depend on navigation structure** — navigation is independent layer
- **No domain may bypass the event system** — all communication through defined channels
- **No domain may store emotional tone unless it owns it** — only Emotional Safety Domain owns tone validation

---

## State Transition Rules

Rules governing how state changes occur:

- **Transitions must be gentle** — no jarring, abrupt changes
- **Transitions must be observable** — system can detect when state changes
- **Transitions must be reversible** — users can undo or return to previous state
- **Transitions must not create emotional spikes** — no alarming state changes
- **Transitions must not create cognitive residue** — no lingering confusion or unfinished mental models

### Application to Adaptive State
When capacity state changes:
- The change is gradual, not sudden
- The change is visible to the system for response
- The user can return to previous capacity if needed
- The change does not alarm or shame
- The change leaves no confusing artifacts

---

## Safeguards

Protections to ensure state never harms:

- **No adaptive state should punish the user** — state changes are supportive, never punitive
- **No state transition should increase overwhelm** — transitions simplify, never complicate
- **No state should trap the user** — every state has an exit
- **No state should require consistency the user cannot maintain** — design for inconsistency
- **No state should imply moral judgment** — states are descriptive, never evaluative

### Enforcement
- All state changes reviewed for emotional impact
- State transitions tested with low-energy scenarios
- State ownership audited regularly
- Adaptive state changes require explicit validation

---

*This state architecture ensures the platform remains predictable, adaptive, and emotionally safe as it evolves.*
