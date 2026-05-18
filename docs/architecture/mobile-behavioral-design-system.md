# Mobile Behavioral Design System Foundation

**Status:** Behavioral UI Architecture Phase  
**Date:** 2026-05-19  
**Phase:** Mobile Behavioral Design System Foundation

---

## Executive Summary

This document defines the emotional and behavioral UI substrate for Lumo Mobile. Unlike generic design systems, this foundation is purpose-built for behavioral reinforcement, emotional safety, and energy-adaptive interaction. Every surface, motion, and primitive is designed to support calm, fast, forgiving interactions that reduce cognitive load and build positive habits.

---

## PHASE 1: Existing Mobile Primitives Audit

### Current Primitives Analysis

#### Screen.tsx
```typescript
// Current implementation
export function Screen({ children, style, ...props }: any) {
  return <View style={[styles.screen, style]} {...props}>{children}</View>;
}
```

**Evaluation:**
- **Abstraction Quality:** Minimal - thin wrapper around View
- **Composability:** Good - accepts style override
- **Touch Ergonomics:** N/A - container only
- **Accessibility:** Poor - no accessibility props
- **Behavioral Suitability:** Poor - hardcoded background, no energy mode

**Issues:**
- Hardcoded `#F5F5F5` background
- No safe area handling
- No keyboard avoidance
- No energy mode adaptation
- No accessibility props

**Verdict:** **Needs Redesign**

---

#### Button.tsx
```typescript
// Current implementation
export function Button({ title, onPress, style, ...props }: any) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

**Evaluation:**
- **Abstraction Quality:** Poor - hardcoded styles, no variants
- **Composability:** Poor - fixed structure, no slot support
- **Touch Ergonomics:** Poor - 12px padding = ~44pt height (barely minimum)
- **Accessibility:** Poor - no accessibilityLabel, no accessibilityHint
- **Behavioral Suitability:** Poor - no press feedback, no haptic, no energy mode

**Issues:**
- Hardcoded `#007AFF` color (not theme-aware)
- Hardcoded 12px padding (barely meets 44pt minimum)
- No press state feedback (scale, opacity)
- No disabled state
- No loading state
- No haptic feedback
- No energy mode support
- No variant system (primary, secondary, ghost)
- No accessibility props

**Verdict:** **Needs Redesign**

---

#### Text.tsx
```typescript
// Current implementation
export function Text({ children, style, ...props }: any) {
  return <RNText style={style} {...props}>{children}</RNText>;
}
```

**Evaluation:**
- **Abstraction Quality:** Minimal - pure wrapper
- **Composability:** Good - passes through all props
- **Touch Ergonomics:** N/A - display only
- **Accessibility:** Poor - no accessibility props
- **Behavioral Suitability:** Poor - no typography variants, no energy mode

**Issues:**
- No typography variants (display, heading, body, caption)
- No energy mode support (size adjustment)
- No accessibility props
- No color variants
- No weight variants

**Verdict:** **Needs Redesign**

---

#### Stack.tsx
```typescript
// Current implementation
export function Stack({ children, style, ...props }: any) {
  return <View style={[styles.stack, style]} {...props}>{children}</View>;
}
```

**Evaluation:**
- **Abstraction Quality:** Minimal - flexDirection only
- **Composability:** Poor - no spacing, no alignment props
- **Touch Ergonomics:** N/A - layout only
- **Accessibility:** Neutral - passes through props
- **Behavioral Suitability:** Poor - no gap support, no energy mode spacing

**Issues:**
- No spacing/gap prop (requires manual margins)
- No alignment props (justifyContent, alignItems)
- No energy mode spacing adaptation
- No safe area handling
- Very basic, not behavioral

**Verdict:** **Needs Redesign**

---

#### Surface.tsx
```typescript
// Current implementation
export function Surface({ children, style, ...props }: any) {
  return <View style={[styles.surface, style]} {...props}>{children}</View>;
}
```

**Evaluation:**
- **Abstraction Quality:** Poor - hardcoded styles, no variants
- **Composability:** Good - accepts style override
- **Touch Ergonomics:** Neutral - container only
- **Accessibility:** Poor - no accessibility props
- **Behavioral Suitability:** Poor - no elevation, no variants, no energy mode

**Issues:**
- Hardcoded `#FFFFFF` background
- Hardcoded 8px borderRadius
- Hardcoded 16px padding
- No elevation/shadow system
- No variants (card, modal, floating)
- No energy mode support
- No accessibility props

**Verdict:** **Needs Redesign**

---

#### Pressable.tsx
```typescript
// Current implementation
export function Pressable({ children, onPress, style, ...props }: any) {
  return (
    <TouchableOpacity style={style} onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  );
}
```

**Evaluation:**
- **Abstraction Quality:** Minimal - pure wrapper
- **Composability:** Good - passes through all props
- **Touch Ergonomics:** Poor - no hit area expansion
- **Accessibility:** Poor - no accessibility props
- **Behavioral Suitability:** Poor - no press feedback, no haptic

**Issues:**
- No press state feedback (scale, opacity)
- No hit area expansion (minimum 48pt)
- No haptic feedback
- No accessibility props
- No energy mode support
- Just a wrapper, no behavioral value

**Verdict:** **Needs Redesign**

---

#### Row.tsx
```typescript
// Current implementation
export function Row({ children, style, ...props }: any) {
  return <View style={[styles.row, style]} {...props}>{children}</View>;
}
```

**Evaluation:**
- **Abstraction Quality:** Minimal - flexDirection only
- **Composability:** Poor - no spacing, no alignment props
- **Touch Ergonomics:** N/A - layout only
- **Accessibility:** Neutral - passes through props
- **Behavioral Suitability:** Poor - no gap support, no energy mode spacing

**Issues:**
- No spacing/gap prop
- No alignment props
- No energy mode spacing adaptation
- Very basic, not behavioral

**Verdict:** **Needs Redesign**

---

### Primitive Classification

#### Stable Primitives (Keep as Foundation)
**None** - All current primitives are too minimal for behavioral UX.

#### Primitives Needing Redesign (All of Them)
1. **Screen** - Needs safe area, keyboard avoidance, energy mode
2. **Button** - Needs variants, press feedback, haptics, accessibility
3. **Text** - Needs typography variants, energy mode, accessibility
4. **Stack** - Needs spacing, alignment, energy mode
5. **Surface** - Needs elevation, variants, energy mode
6. **Pressable** - Needs hit area expansion, press feedback, haptics
7. **Row** - Needs spacing, alignment, energy mode

#### Missing Behavioral Primitives (Critical)
1. **FocusCard** - For focused task display
2. **CaptureSheet** - For quick capture bottom sheet
3. **RecoveryBanner** - For overwhelm recovery
4. **MomentumPulse** - For streak/momentum visualization
5. **CalmButton** - For low-energy interactions
6. **EnergyAwareStack** - For energy-adaptive layouts
7. **GentleModal** - For non-intrusive modals
8. **UndoToast** - For undo feedback
9. **SwipeableCard** - For gesture interactions
10. **HapticPressable** - For haptic feedback wrapper
11. **ProgressiveDisclosure** - For cognitive load reduction
12. **CelebrationOverlay** - For milestone celebrations

---

## PHASE 2: Behavioral Surface System

### Surface Hierarchy Philosophy

Surfaces in Lumo Mobile are not just visual containers—they are emotional contexts. Each surface type has a specific behavioral purpose, emotional weight, and interaction energy. The surface system guides users through calm, focused, forgiving interactions.

### Surface Types

#### 1. Focus Surface

**Purpose:** Single-task concentration, eliminate distraction

**Visual Weight:** High
**Contrast:** High (dark text on light surface, clear borders)
**Spacing:** Generous (32pt padding, 24pt gaps)
**Elevation:** 4 (floating above content, subtle shadow)
**Interaction Energy:** Low (slow, deliberate, no urgency)
**Emotional Purpose:** Calm concentration, reduce overwhelm

**Usage:**
- Focus mode task display
- Single-task completion
- Deep work sessions

**Properties:**
```typescript
FocusSurface {
  background: #FFFFFF
  borderRadius: 16
  padding: 32
  elevation: 4
  shadow: subtle, warm
  borderWidth: 1 (optional, for emphasis)
  borderColor: #E0E0E0
}
```

**Energy Mode Adaptation:**
- Padding increases to 40pt
- Border width increases to 2pt
- Shadow becomes more pronounced
- Font sizes +2pt

---

#### 2. Capture Surface

**Purpose:** Quick thought capture, minimal friction

**Visual Weight:** Medium
**Contrast:** Medium (clear input area, but not overwhelming)
**Spacing:** Compact but comfortable (16pt padding, 12pt gaps)
**Elevation:** 6 (prominent, above everything)
**Interaction Energy:** High (fast, responsive, immediate)
**Emotional Purpose:** Encourage capture, reduce hesitation

**Usage:**
- Quick capture sheet
- Voice capture interface
- Thought input

**Properties:**
```typescript
CaptureSurface {
  background: #FFFFFF
  borderRadius: 20 (rounded, friendly)
  padding: 16
  elevation: 6
  shadow: strong, warm
  cornerRadius: top-only (bottom sheet)
}
```

**Energy Mode Adaptation:**
- Padding increases to 20pt
- Border radius increases to 24pt (softer)
- Font sizes +2pt
- Touch targets +8pt

---

#### 3. Calm Surface

**Purpose:** Low-energy interaction, reduce cognitive load

**Visual Weight:** Low
**Contrast:** Low (subtle, not demanding)
**Spacing:** Generous (24pt padding, 20pt gaps)
**Elevation:** 2 (subtle, not floating)
**Interaction Energy:** Very Low (slow, no urgency)
**Emotional Purpose:** Emotional safety, reduce anxiety

**Usage:**
- Settings panels
- Information displays
- Low-energy mode UI

**Properties:**
```typescript
CalmSurface {
  background: #F8F8F8 (softer than white)
  borderRadius: 12
  padding: 24
  elevation: 2
  shadow: minimal, cool
  opacity: 0.95 (slightly transparent)
}
```

**Energy Mode Adaptation:**
- Background becomes #F0F0F0 (higher contrast)
- Padding increases to 32pt
- Font sizes +2pt
- Shadow removed (flatter, calmer)

---

#### 4. Recovery Surface

**Purpose:** Overwhelm recovery, reduce task count

**Visual Weight:** Medium-High
**Contrast:** Medium-High (clear but not alarming)
**Spacing:** Very Generous (40pt padding, 32pt gaps)
**Elevation:** 4 (prominent but not urgent)
**Interaction Energy:** Low (deliberate, no pressure)
**Emotional Purpose:** Reduce anxiety, provide relief

**Usage:**
- Focus mode activation
- Task limiting suggestions
- Archive recommendations

**Properties:**
```typescript
RecoverySurface {
  background: #FAFAFA
  borderRadius: 16
  padding: 40
  elevation: 4
  shadow: soft, warm
  border: 1pt solid #E8E8E8
}
```

**Energy Mode Adaptation:**
- Padding increases to 48pt
- Border width increases to 2pt
- Font sizes +4pt
- Touch targets +12pt

---

#### 5. Momentum Surface

**Purpose:** Celebrate progress, reinforce behavior

**Visual Weight:** High
**Contrast:** High (vibrant, celebratory)
**Spacing:** Compact (12pt padding, 8pt gaps)
**Elevation:** 8 (very prominent, celebration)
**Interaction Energy:** Medium (exciting but not overwhelming)
**Emotional Purpose:** Positive reinforcement, build momentum

**Usage:**
- Streak displays
- Milestone celebrations
- Progress indicators

**Properties:**
```typescript
MomentumSurface {
  background: #FFFFFF
  borderRadius: 12
  padding: 12
  elevation: 8
  shadow: strong, warm
  accent: #007AFF (subtle accent color)
}
```

**Energy Mode Adaptation:**
- Padding increases to 16pt
- Accent color becomes less saturated
- Animation duration +100ms (slower, calmer)
- Shadow reduced (less excitement)

---

#### 6. Celebration Surface

**Purpose:** Milestone achievement, emotional reward

**Visual Weight:** Very High
**Contrast:** Very High (vibrant, attention-grabbing)
**Spacing:** Variable (dynamic, animated)
**Elevation:** 12 (highest, overlay)
**Interaction Energy:** High (exciting, rewarding)
**Emotional Purpose:** Joy, accomplishment, motivation

**Usage:**
- Milestone completions
- Streak achievements
- First-time captures

**Properties:**
```typescript
CelebrationSurface {
  background: #FFFFFF (or gradient)
  borderRadius: 20
  padding: 24
  elevation: 12
  shadow: very strong, warm
  animation: confetti, scale, fade
}
```

**Energy Mode Adaptation:**
- Padding increases to 32pt
- Animation duration +200ms (much slower)
- Shadow reduced
- Confetti particles reduced or disabled
- Colors less saturated

---

#### 7. Warning Surface

**Purpose:** Gentle alert, no anxiety

**Visual Weight:** Medium-High
**Contrast:** Medium (noticeable but not alarming)
**Spacing:** Standard (16pt padding, 12pt gaps)
**Elevation:** 4 (prominent but not urgent)
**Interaction Energy:** Low (calm, not pressuring)
**Emotional Purpose:** Gentle guidance, not shame

**Usage:**
- Sync errors
- Storage warnings
- Gentle reminders

**Properties:**
```typescript
WarningSurface {
  background: #FFF9F0 (warm yellow tint)
  borderRadius: 12
  padding: 16
  elevation: 4
  shadow: soft, warm
  icon: gentle warning icon
  color: #FF9500 (warm orange, not red)
}
```

**Energy Mode Adaptation:**
- Padding increases to 20pt
- Background becomes #FFF5E6 (higher contrast)
- Font sizes +2pt
- Icon size +4pt

---

#### 8. Disabled / Exhausted Surface

**Purpose:** Non-interactive state, reduce confusion

**Visual Weight:** Low
**Contrast:** Very Low (subtle, not demanding)
**Spacing:** Standard (16pt padding, 12pt gaps)
**Elevation:** 0 (flat, no shadow)
**Interaction Energy:** None (not interactive)
**Emotional Purpose:** Clear state, not frustration

**Usage:**
- Disabled buttons
- Empty states
- Loading states

**Properties:**
```typescript
DisabledSurface {
  background: #F0F0F0
  borderRadius: 8
  padding: 16
  elevation: 0
  shadow: none
  opacity: 0.6
  color: #999999
}
```

**Energy Mode Adaptation:**
- Padding increases to 20pt
- Opacity increases to 0.7 (more visible)
- Font sizes +2pt
- Background becomes #E8E8E8 (higher contrast)

---

### Surface Composition Rules

1. **Nesting:** Max 2 levels deep (Surface → Surface → Content)
2. **Contrast:** Ensure 4.5:1 contrast ratio for text
3. **Spacing:** Use consistent spacing scale (4pt base)
4. **Elevation:** Child surfaces should have higher elevation than parents
5. **Energy Mode:** All surfaces must adapt to energy mode
6. **Accessibility:** All surfaces must support screen readers
7. **Motion:** Surface transitions should follow motion semantics

---

## PHASE 3: Motion Semantics

### Motion Philosophy

Motion in Lumo Mobile is not decorative—it's communicative. Every animation conveys meaning, guides attention, and reinforces behavior. Motion should feel natural, calm, and purposeful. The goal is continuity and forgiveness, not spectacle.

### Motion Types and Meanings

#### 1. Fade (Opacity Change)

**Meaning:** Appearance/Disappearance without spatial change

**Semantic:**
- **Fade In:** New content arriving, non-intrusive
- **Fade Out:** Content leaving, graceful departure
- **Crossfade:** Content replacement, smooth transition

**Usage:**
- Sheet appearance (fade in + slide up)
- Task completion (fade out after scale)
- Loading states (fade in)
- Toast messages (fade in, wait, fade out)

**Duration:** 300ms (standard), 500ms (deliberate)
**Easing:** ease-out (natural arrival)

**Energy Mode:** Duration +100ms, easing more linear

---

#### 2. Spring (Physics-Based Motion)

**Meaning:** Natural, responsive, alive

**Semantic:**
- **Spring In:** Content arriving with energy
- **Spring Out:** Content leaving with energy
- **Spring Scale:** Emphasis, importance

**Usage:**
- Button press (scale down 0.95 → spring back 1.05 → settle 1.0)
- FAB pulse (scale 1.0 → 1.05 → 1.0)
- Task completion (scale down 0.8 → spring up 1.1 → settle 0)
- Celebration (spring scale 1.0 → 1.2 → settle 1.0)

**Duration:** 400ms (spring), 600ms (celebration)
**Easing:** spring(1, 0.5, 0, 1) (natural bounce)
**Damping:** 0.5 (subtle bounce, not oscillating)

**Energy Mode:** Damping increased to 0.7 (less bounce), duration +100ms

---

#### 3. Slide (Spatial Translation)

**Meaning:** Spatial relationship, directional flow

**Semantic:**
- **Slide Up:** Bottom sheet, modal, new content from below
- **Slide Down:** Sheet dismissal, content returning
- **Slide Right:** Forward navigation, new screen
- **Slide Left:** Back navigation, return

**Usage:**
- Capture sheet (slide up from bottom)
- Archive sheet (slide up from bottom)
- Screen navigation (slide right for forward, left for back)
- Task delete (slide left, fade out)

**Duration:** 300ms (standard), 400ms (modal)
**Easing:** ease-out (fast start, slow end)

**Energy Mode:** Duration +100ms, easing more linear

---

#### 4. Scale (Size Change)

**Meaning:** Emphasis, importance, completion

**Semantic:**
- **Scale Up:** Emphasis, arrival, importance
- **Scale Down:** De-emphasis, departure, completion
- **Scale Pulse:** Attention, importance

**Usage:**
- Task completion (scale down 1.0 → 0.8)
- Celebration (scale up 1.0 → 1.2 → settle 1.0)
- FAB pulse (scale 1.0 → 1.05 → 1.0)
- Button press (scale down 1.0 → 0.95)

**Duration:** 150ms (press), 300ms (emphasis), 500ms (celebration)
**Easing:** ease-out (natural)

**Energy Mode:** Duration +50ms, scale reduced by 20%

---

#### 5. Blur (Visual Focus)

**Meaning:** Background defocus, foreground emphasis

**Semantic:**
- **Blur In:** Background losing focus, foreground arriving
- **Blur Out:** Background regaining focus, foreground leaving

**Usage:**
- Modal overlay (blur background)
- Sheet appearance (blur background)
- Focus mode (blur non-focused content)

**Duration:** 300ms (match content transition)
**Easing:** ease-out (natural)

**Blur Amount:** 10px (subtle), 20px (strong)
**Energy Mode:** Blur reduced to 5px (less visual complexity)

---

#### 6. Delayed Motion (Stagger)

**Meaning:** Sequence, hierarchy, reduce cognitive load

**Semantic:**
- **Stagger In:** Content arriving in sequence
- **Stagger Out:** Content leaving in sequence

**Usage:**
- List items appearing (stagger 50ms per item)
- Task cards loading (stagger 100ms per card)
- Celebration particles (stagger 20ms per particle)

**Stagger Delay:** 50ms (list), 100ms (cards), 20ms (particles)
**Max Items:** 10 (after that, no stagger)

**Energy Mode:** Stagger delay increased to 100ms (slower, calmer)

---

### Motion Durations

```typescript
const motionDuration = {
  instant: 150,   // Instant feedback (tap, press)
  fast: 300,      // Quick transitions (sheet slide)
  normal: 500,    // Standard transitions (screen change)
  slow: 700,      // Deliberate animations (celebration)
  verySlow: 1000, // Very deliberate (major milestones)
};
```

**Usage Guidelines:**
- **150ms:** Micro-interactions, button press, instant feedback
- **300ms:** Sheet transitions, modal appearance, list items
- **500ms:** Screen navigation, task completion
- **700ms:** Celebrations, milestones
- **1000ms:** Major milestones, first-time experiences

**Energy Mode:** All durations +100ms

---

### Interaction Timing

```typescript
const interactionTiming = {
  tap: 150,           // Button press feedback
  longPress: 500,     // Long press activation
  swipe: 300,         // Swipe gesture completion
  scroll: 0,          // Instant (no delay)
  focus: 200,         // Input field focus
  blur: 150,          // Input field blur
};
```

**Usage Guidelines:**
- **Tap:** Immediate feedback (150ms)
- **Long Press:** 500ms before activation (standard)
- **Swipe:** 300ms to complete gesture
- **Scroll:** Instant, no delay
- **Focus:** 200ms for input field focus animation
- **Blur:** 150ms for input field blur animation

**Energy Mode:** All timings +50ms

---

### Interruption Handling

**Principle:** Motion should never block interaction. If interrupted, motion should complete gracefully or cancel immediately.

**Interruption Scenarios:**

1. **User taps during animation:**
   - Cancel animation immediately
   - Jump to end state
   - Execute new action

2. **App background during animation:**
   - Cancel animation
   - Save end state
   - Restore state on foreground

3. **Network error during animation:**
   - Complete animation
   - Show error state
   - Provide recovery action

4. **Reduced motion enabled:**
   - Disable all non-essential animations
   - Keep essential transitions (fade only)
   - Duration = 0 for instant transitions

---

### Reduced Motion Behavior

**When Reduced Motion is Enabled:**

1. **Disable:**
   - Spring animations (replace with linear)
   - Stagger effects (all items appear together)
   - Celebration particles (disable entirely)
   - Blur effects (disable)
   - Scale animations (disable or reduce to 50%)

2. **Keep (Essential):**
   - Fade transitions (300ms → 150ms)
   - Slide transitions (300ms → 150ms)
   - Button press feedback (150ms → 100ms)

3. **Replace:**
   - Spring → Linear easing
   - Stagger → No stagger
   - Scale → Opacity only
   - Blur → Opacity overlay

**Respect System Preference:**
- Always check `AccessibilityInfo.isReduceMotionEnabled`
- Cache the result
- Update on preference change

---

## PHASE 4: Energy-Adaptive UI

### Energy States

Lumo Mobile adapts its UI based on the user's current energy state. This is not just visual—it's behavioral. High energy allows for more density and faster interactions. Low energy requires more space, larger touch targets, and calmer pacing.

#### 1. High Energy State

**Context:** User is alert, focused, ready to engage

**Density:** Normal (standard spacing, standard touch targets)
**Spacing:** Standard (4pt base scale)
**Typography:** Standard (16pt body, 24pt heading)
**Interaction:** Normal speed, full gestures
**Progressive Disclosure:** Standard (show details on demand)
**Visible Responsibility:** Normal (show all tasks)

**Adaptations:**
- No changes from baseline
- Full feature set available
- Standard animation speeds
- Standard touch targets (48pt minimum)

**When Active:**
- Default state
- User has not enabled low energy mode
- User has completed onboarding

---

#### 2. Low Energy State

**Context:** User is tired, overwhelmed, or needs calm

**Density:** Reduced (larger spacing, larger touch targets)
**Spacing:** +25% (4pt → 5pt base scale)
**Typography:** +2pt (16pt → 18pt body, 24pt → 26pt heading)
**Interaction:** Slower speed, simplified gestures
**Progressive Disclosure:** Aggressive (hide details by default)
**Visible Responsibility:** Reduced (show fewer tasks)

**Adaptations:**

**Spacing:**
- All spacing values +25%
- Padding: 16pt → 20pt, 24pt → 30pt, 32pt → 40pt
- Gaps: 8pt → 10pt, 12pt → 15pt, 16pt → 20pt

**Typography:**
- All font sizes +2pt
- Line height +4pt
- Font weight +100 (for contrast)

**Touch Targets:**
- All touch targets +8pt
- Minimum: 48pt → 56pt
- FAB: 56pt → 64pt
- Buttons: 48pt height → 56pt height

**Interaction:**
- Animation durations +100ms
- Gesture sensitivity reduced (require more deliberate swipe)
- Long press duration: 500ms → 600ms
- Haptic feedback reduced (fewer haptics)

**Visual:**
- Colors less saturated (calmer)
- Shadows reduced (flatter, calmer)
- Borders increased (more definition)
- Opacity increased (more visible)

**Progressive Disclosure:**
- Hide task timestamps by default
- Hide task metadata by default
- Show only essential actions
- Collapse secondary information

**Visible Responsibility:**
- Show max 5 tasks (instead of 10)
- Enable focus mode by default
- Hide archive by default
- Hide settings deep options

**When Active:**
- User enables "Low Energy Mode" in settings
- User has not captured in 7 days (suggest enable)
- User has >10 tasks (suggest enable)

---

#### 3. Overwhelmed State

**Context:** User has too many tasks, feeling overwhelmed

**Density:** Very Reduced (large spacing, very large touch targets)
**Spacing:** +50% (4pt → 6pt base scale)
**Typography:** +4pt (16pt → 20pt body, 24pt → 28pt heading)
**Interaction:** Very slow, minimal gestures
**Progressive Disclosure:** Very Aggressive (hide almost everything)
**Visible Responsibility:** Minimal (show 3 tasks max)

**Adaptations:**

**Spacing:**
- All spacing values +50%
- Padding: 16pt → 24pt, 24pt → 36pt, 32pt → 48pt
- Gaps: 8pt → 12pt, 12pt → 18pt, 16pt → 24pt

**Typography:**
- All font sizes +4pt
- Line height +6pt
- Font weight +200 (high contrast)

**Touch Targets:**
- All touch targets +12pt
- Minimum: 48pt → 60pt
- FAB: 56pt → 68pt
- Buttons: 48pt height → 60pt height

**Interaction:**
- Animation durations +200ms
- Disable swipe gestures (tap only)
- Disable long press
- Haptic feedback disabled

**Visual:**
- Colors very desaturated (very calm)
- Shadows removed (completely flat)
- Borders increased (high definition)
- Opacity increased (very visible)

**Progressive Disclosure:**
- Hide all task metadata
- Show only task titles
- Hide all secondary actions
- Show only primary action (complete)

**Visible Responsibility:**
- Show max 3 tasks (focus mode)
- Hide archive completely
- Hide settings completely
- Show only "Complete" action

**When Active:**
- User has >15 tasks
- User enables "Focus Mode"
- User has not completed a task in 3 days

---

#### 4. Recovery State

**Context:** User is returning after overwhelm, rebuilding momentum

**Density:** Reduced → Normal (gradual increase)
**Spacing:** +25% → 0% (gradual return to normal)
**Typography:** +2pt → 0pt (gradual return to normal)
**Interaction:** Slow → Normal (gradual speed increase)
**Progressive Disclosure:** Aggressive → Standard (gradual reveal)
**Visible Responsibility:** Reduced → Normal (gradual increase)

**Adaptations:**

**Gradual Recovery (over 3 sessions):**

**Session 1:**
- Same as Overwhelmed State
- Show recovery banner: "Welcome back. Take your time."
- Show 3 tasks max
- Celebrate first completion (major celebration)

**Session 2:**
- Same as Low Energy State
- Show 5 tasks max
- Celebrate second completion
- Suggest increasing task limit

**Session 3:**
- Return to High Energy State (normal)
- Show all tasks
- Normal celebration
- Show recovery complete message

**When Active:**
- User returns after >7 days absence
- User exits focus mode after >3 days
- User completes first task after >3 days

---

#### 5. Focused Execution State

**Context:** User is in deep work, completing tasks

**Density:** Normal (standard spacing)
**Spacing:** Standard (4pt base scale)
**Typography:** Standard (16pt body, 24pt heading)
**Interaction:** Fast, precise gestures
**Progressive Disclosure:** Minimal (show what's needed)
**Visible Responsibility:** Single (show one task at a time)

**Adaptations:**

**Spacing:**
- Standard spacing (no change)

**Typography:**
- Standard typography (no change)

**Touch Targets:**
- Standard touch targets (no change)

**Interaction:**
- Animation durations -50ms (faster)
- Gesture sensitivity increased (faster swipe)
- Haptic feedback on every completion

**Visual:**
- Focus surface for current task
- Blur all other tasks
- Hide all non-essential UI
- Show only "Complete" action

**Progressive Disclosure:**
- Show only current task
- Hide task list
- Hide FAB
- Hide settings
- Show "Next Task" button after completion

**Visible Responsibility:**
- Show 1 task at a time
- Hide all other tasks
- Show task counter (1 of 3)
- Show progress bar

**When Active:**
- User enables "Focus Mode"
- User taps "Focus" on a task
- User has 3+ tasks (suggest focus mode)

---

### Energy State Transitions

**Transitions should be gradual, not jarring.**

**High → Low Energy:**
- Fade out current UI (300ms)
- Apply low energy adaptations (instant)
- Fade in low energy UI (300ms)
- Show "Low energy mode enabled" toast (5000ms)

**Low → High Energy:**
- Fade out low energy UI (300ms)
- Apply high energy adaptations (instant)
- Fade in high energy UI (300ms)
- Show "Low energy mode disabled" toast (5000ms)

**High → Overwhelmed:**
- Fade out current UI (300ms)
- Apply overwhelmed adaptations (instant)
- Fade in overwhelmed UI (300ms)
- Show recovery banner (persistent until dismissed)

**Overwhelmed → Recovery:**
- No transition (same as overwhelmed initially)
- Show recovery banner
- Gradual recovery over 3 sessions

**Recovery → High:**
- Session 3: Fade out recovery UI (300ms)
- Apply high energy adaptations (instant)
- Fade in high energy UI (300ms)
- Show "Welcome back!" celebration (700ms)

**High → Focused:**
- Blur non-focused content (300ms)
- Scale focused task to 1.1 (300ms)
- Hide non-essential UI (fade out, 300ms)
- Show focus surface (slide up, 300ms)

**Focused → High:**
- Show non-essential UI (fade in, 300ms)
- Unblur content (300ms)
- Scale focused task to 1.0 (300ms)
- Hide focus surface (slide down, 300ms)

---

## PHASE 5: Missing Behavioral Primitives

### Primitive Specifications

#### 1. FocusCard

**Purpose:** Display a single task in focused execution mode

**Interaction Role:**
- Display current task
- Show completion action
- Show next task preview

**Emotional Role:**
- Reduce overwhelm
- Encourage completion
- Provide calm concentration

**Composition Rules:**
- Must use FocusSurface
- Must be center-screen
- Must have large touch targets
- Must support swipe-to-complete

**Props:**
```typescript
interface FocusCardProps {
  task: Task;
  onComplete: () => void;
  onNext?: () => void;
  energyState: EnergyState;
}
```

**Behavior:**
- Auto-scale on mount (scale 0.9 → 1.0, 300ms)
- Scale down on complete (scale 1.0 → 0.8, 300ms)
- Fade out on complete (opacity 1 → 0, 300ms)
- Haptic on complete
- Confetti on complete (if milestone)

**Energy Mode:**
- Low energy: +2pt font sizes, +8pt touch targets
- Overwhelmed: +4pt font sizes, +12pt touch targets, swipe disabled

---

#### 2. CaptureSheet

**Purpose:** Quick thought capture bottom sheet

**Interaction Role:**
- Accept text input
- Auto-save on blur
- Dismiss on tap outside

**Emotional Role:**
- Reduce capture friction
- Encourage quick thoughts
- No pressure to complete

**Composition Rules:**
- Must use CaptureSurface
- Must slide from bottom
- Must be thumb-zone accessible
- Must auto-focus input

**Props:**
```typescript
interface CaptureSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (text: string) => void;
  energyState: EnergyState;
  draft?: string;
}
```

**Behavior:**
- Slide up on visible (300ms)
- Auto-focus input on mount
- Auto-save draft on blur
- Auto-submit on enter
- Dismiss on tap outside
- Haptic on submit

**Energy Mode:**
- Low energy: +2pt font sizes, +8pt touch targets, slower slide
- Overwhelmed: +4pt font sizes, +12pt touch targets, very slow slide

---

#### 3. RecoveryBanner

**Purpose:** Guide user back from overwhelm

**Interaction Role:**
- Show recovery message
- Suggest focus mode
- Provide recovery action

**Emotional Role:**
- Reduce anxiety
- Provide hope
- Gentle guidance

**Composition Rules:**
- Must use RecoverySurface
- Must be dismissible
- Must be non-blocking
- Must show gentle message

**Props:**
```typescript
interface RecoveryBannerProps {
  visible: boolean;
  onDismiss: () => void;
  onAction?: () => void;
  message: string;
  actionLabel?: string;
  energyState: EnergyState;
}
```

**Behavior:**
- Fade in on visible (500ms, slow)
- Slide down from top (300ms)
- Dismissible with swipe down
- Dismissible with tap
- Haptic on action

**Energy Mode:**
- Low energy: +2pt font sizes, longer duration
- Overwhelmed: +4pt font sizes, very long duration, no swipe

---

#### 4. MomentumPulse

**Purpose:** Visualize streak/momentum

**Interaction Role:**
- Show current streak
- Celebrate milestones
- Motivate continued capture

**Emotional Role:**
- Positive reinforcement
- Build momentum
- Celebrate progress

**Composition Rules:**
- Must use MomentumSurface
- Must be non-intrusive
- Must be celebratory
- Must not be demanding

**Props:**
```typescript
interface MomentumPulseProps {
  streak: number;
  onMilestone?: (milestone: number) => void;
  energyState: EnergyState;
}
```

**Behavior:**
- Pulse animation (scale 1.0 → 1.05 → 1.0, 1000ms loop)
- Scale up on milestone (scale 1.0 → 1.2 → settle 1.0, 500ms)
- Confetti on milestone
- Haptic on milestone
- Fade in on mount (300ms)

**Energy Mode:**
- Low energy: Pulse disabled, scale reduced, confetti reduced
- Overwhelmed: Hidden entirely

---

#### 5. CalmButton

**Purpose:** Low-energy primary action button

**Interaction Role:**
- Execute primary action
- Provide press feedback
- Support loading state

**Emotional Role:**
- Reduce anxiety
- Provide clear action
- No pressure

**Composition Rules:**
- Must use CalmSurface
- Must have large touch target
- Must have press feedback
- Must support haptic

**Props:**
```typescript
interface CalmButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  energyState: EnergyState;
}
```

**Behavior:**
- Scale down on press (scale 1.0 → 0.95, 150ms)
- Spring back on release (spring to 1.05 → settle 1.0, 300ms)
- Haptic on press
- Disable when loading
- Show spinner when loading

**Energy Mode:**
- Low energy: +8pt touch targets, +2pt font sizes, slower spring
- Overwhelmed: +12pt touch targets, +4pt font sizes, no spring

---

#### 6. EnergyAwareStack

**Purpose:** Layout container that adapts to energy state

**Interaction Role:**
- Layout children
- Adapt spacing
- Adapt visibility

**Emotional Role:**
- Reduce cognitive load
- Provide calm layout
- Adapt to energy

**Composition Rules:**
- Must adapt spacing to energy state
- Must support progressive disclosure
- Must be accessible

**Props:**
```typescript
interface EnergyAwareStackProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  energyState: EnergyState;
  progressiveDisclosure?: boolean;
}
```

**Behavior:**
- Adapt spacing based on energy state
- Stagger children in (50ms per child)
- Hide secondary children in low energy
- Hide most children in overwhelmed
- Fade in on mount (300ms)

**Energy Mode:**
- Low energy: Spacing +25%, hide secondary children
- Overwhelmed: Spacing +50%, hide all but primary children

---

#### 7. GentleModal

**Purpose:** Non-intrusive modal for non-critical interactions

**Interaction Role:**
- Show modal content
- Support dismissal
- Support action

**Emotional Role:**
- Non-blocking
- Gentle guidance
- No anxiety

**Composition Rules:**
- Must use CalmSurface
- Must be dismissible
- Must have blur background
- Must be accessible

**Props:**
```typescript
interface GentleModalProps {
  visible: boolean;
  onDismiss: () => void;
  onAction?: () => void;
  title?: string;
  children: React.ReactNode;
  energyState: EnergyState;
}
```

**Behavior:**
- Fade in background blur (300ms)
- Scale up modal (scale 0.9 → 1.0, 300ms)
- Dismissible with tap outside
- Dismissible with swipe down
- Haptic on action
- Haptic on dismiss

**Energy Mode:**
- Low energy: Slower scale, larger touch targets
- Overwhelmed: Very slow scale, very large touch targets, no swipe

---

#### 8. UndoToast

**Purpose:** Provide undo feedback after destructive action

**Interaction Role:**
- Show undo option
- Auto-dismiss after timeout
- Support undo action

**Emotional Role:**
- Forgiving UX
- Reduce anxiety
- No shame

**Composition Rules:**
- Must use CalmSurface
- Must auto-dismiss
- Must have undo action
- Must be non-blocking

**Props:**
```typescript
interface UndoToastProps {
  visible: boolean;
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  energyState: EnergyState;
}
```

**Behavior:**
- Slide up from bottom (300ms)
- Auto-dismiss after 5000ms
- Dismissible with tap
- Dismissible with swipe down
- Haptic on undo
- Haptic on dismiss

**Energy Mode:**
- Low energy: +8pt touch targets, +2pt font sizes, longer duration (7000ms)
- Overwhelmed: +12pt touch targets, +4pt font sizes, very long duration (10000ms)

---

#### 9. SwipeableCard

**Purpose:** Task card with swipe gestures

**Interaction Role:**
- Display task
- Support swipe-to-complete
- Support swipe-to-archive
- Support long-press

**Emotional Role:**
- Fast interaction
- Clear feedback
- No anxiety

**Composition Rules:**
- Must use Surface
- Must support gestures
- Must have haptic feedback
- Must be accessible

**Props:**
```typescript
interface SwipeableCardProps {
  task: Task;
  onComplete: () => void;
  onArchive: () => void;
  energyState: EnergyState;
}
```

**Behavior:**
- Follow finger on swipe
- Snap to completion on threshold (80% width)
- Snap back on insufficient swipe
- Haptic on complete threshold
- Haptic on archive threshold
- Scale down on complete (scale 1.0 → 0.8, 300ms)
- Fade out on complete (opacity 1 → 0, 300ms)

**Energy Mode:**
- Low energy: Swipe threshold increased (90% width), haptic reduced
- Overwhelmed: Swipe disabled entirely, tap-only

---

#### 10. HapticPressable

**Purpose:** Pressable wrapper with haptic feedback

**Interaction Role:**
- Wrap any pressable
- Provide haptic feedback
- Provide press feedback

**Emotional Role:**
- Tactile confirmation
- Reduce uncertainty
- Feel responsive

**Composition Rules:**
- Must wrap any pressable
- Must provide haptic
- Must provide press feedback
- Must respect energy mode

**Props:**
```typescript
interface HapticPressableProps {
  onPress: () => void;
  children: React.ReactNode;
  hapticType?: 'light' | 'medium' | 'heavy';
  energyState: EnergyState;
}
```

**Behavior:**
- Scale down on press (scale 1.0 → 0.95, 150ms)
- Spring back on release (300ms)
- Haptic on press
- Haptic type based on prop
- No haptic in overwhelmed state

**Energy Mode:**
- Low energy: Haptic reduced to light only
- Overwhelmed: Haptic disabled entirely

---

#### 11. ProgressiveDisclosure

**Purpose:** Reduce cognitive load by hiding details

**Interaction Role:**
- Show summary by default
- Show details on demand
- Hide details on blur

**Emotional Role:**
- Reduce overwhelm
- Progressive complexity
- Calm initial state

**Composition Rules:**
- Must hide details by default
- Must show on tap
- Must hide on tap outside
- Must be accessible

**Props:**
```typescript
interface ProgressiveDisclosureProps {
  summary: React.ReactNode;
  details: React.ReactNode;
  energyState: EnergyState;
}
```

**Behavior:**
- Show summary by default
- Show details on tap (fade in, 300ms)
- Hide details on tap outside (fade out, 300ms)
- Animate height change (300ms)
- Haptic on expand

**Energy Mode:**
- Low energy: Slower animation (500ms), larger touch target
- Overwhelmed: Details hidden entirely, no expansion

---

#### 12. CelebrationOverlay

**Purpose:** Celebrate milestones and achievements

**Interaction Role:**
- Show celebration animation
- Show milestone message
- Dismiss on tap

**Emotional Role:**
- Joy
- Accomplishment
- Motivation

**Composition Rules:**
- Must use CelebrationSurface
- Must have confetti
- Must be dismissible
- Must be accessible

**Props:**
```typescript
interface CelebrationOverlayProps {
  visible: boolean;
  milestone: number;
  message: string;
  onDismiss: () => void;
  energyState: EnergyState;
}
```

**Behavior:**
- Fade in overlay (500ms)
- Scale up message (scale 0.9 → 1.0, 500ms)
- Confetti explosion (particle system)
- Haptic on appear
- Dismissible with tap
- Auto-dismiss after 3000ms

**Energy Mode:**
- Low energy: Slower animation (700ms), fewer particles, reduced haptic
- Overwhelmed: Hidden entirely (no celebration)

---

## Recommended Implementation Order

### Sprint 1: Foundation Primitives (Week 1-2)

**Goal:** Basic behavioral infrastructure

1. **Design Token System** (2 days)
   - Spacing tokens
   - Typography tokens
   - Color tokens
   - Energy mode tokens

2. **Redesign Existing Primitives** (3 days)
   - Screen (safe area, keyboard avoidance)
   - Button (variants, press feedback, haptics)
   - Text (variants, energy mode)
   - Stack (spacing, alignment)
   - Surface (elevation, variants)
   - Pressable (hit area, press feedback)
   - Row (spacing, alignment)

3. **Motion System** (2 days)
   - Motion durations
   - Easing curves
   - Reduced motion support
   - Interruption handling

### Sprint 2: Behavioral Primitives (Week 3)

**Goal:** Core behavioral interactions

4. **SwipeableCard** (2 days)
   - Gesture system
   - Swipe thresholds
   - Haptic feedback

5. **CaptureSheet** (2 days)
   - Bottom sheet
   - Auto-focus
   - Draft persistence

6. **UndoToast** (1 day)
   - Auto-dismiss
   - Undo action
   - Energy mode adaptation

7. **HapticPressable** (1 day)
   - Haptic wrapper
   - Press feedback
   - Energy mode respect

### Sprint 3: Energy-Adaptive UI (Week 4)

**Goal:** Adaptive behavior system

8. **EnergyAwareStack** (2 days)
   - Energy mode spacing
   - Progressive disclosure
   - Stagger animations

9. **CalmButton** (2 days)
   - Energy mode adaptation
   - Loading state
   - Large touch targets

10. **Energy State System** (1 day)
    - State detection
    - State transitions
    - Persistence

11. **GentleModal** (2 days)
    - Non-intrusive modal
    - Blur background
    - Energy mode adaptation

### Sprint 4: Advanced Behavioral Primitives (Week 5)

**Goal:** Delightful interactions

12. **FocusCard** (2 days)
    - Focus surface
    - Single task display
    - Completion celebration

13. **MomentumPulse** (2 days)
    - Streak visualization
    - Milestone celebration
    - Confetti system

14. **ProgressiveDisclosure** (1 day)
    - Hide details
    - Show on demand
    - Energy mode adaptation

15. **CelebrationOverlay** (2 days)
    - Celebration animation
    - Confetti particles
    - Milestone system

### Sprint 5: Recovery & Polish (Week 6)

**Goal:** Complete behavioral system

16. **RecoveryBanner** (2 days)
    - Recovery surface
    - Gentle messaging
    - Recovery actions

17. **Surface System Integration** (2 days)
    - All surfaces use tokens
    - Energy mode adaptation
    - Motion integration

18. **Accessibility Audit** (1 day)
    - Screen reader testing
    - Touch target audit
    - Reduced motion testing

19. **Performance Optimization** (1 day)
    - Animation optimization
    - Lazy loading
    - Memory profiling

---

## Success Metrics

### Behavioral Metrics

- **Capture Time:** Average time from app open to capture < 3s
- **Completion Time:** Average time from task tap to complete < 1s
- **Undo Rate:** % of actions undone (target: < 10%)
- **Energy Mode Adoption:** % of users who enable energy mode
- **Focus Mode Usage:** % of sessions in focus mode
- **Recovery Rate:** % of overwhelmed users who return

### Technical Metrics

- **Animation FPS:** 60fps on all animations
- **Touch Response Time:** < 50ms from tap to visual feedback
- **Energy Mode Transition Time:** < 600ms to switch modes
- **Primitive Reusability:** % of screens using behavioral primitives
- **Accessibility Score:** 100% on accessibility audit

---

## Architecture Principles Summary

1. **Behavioral First:** Every primitive serves a behavioral goal
2. **Energy Adaptive:** All primitives adapt to energy state
3. **Forgiving:** Undo everywhere, no irreversible actions
4. **Calm:** Low cognitive load, predictable, no surprises
5. **Fast:** Instant feedback, no waiting, optimistic updates
6. **Emotionally Safe:** No anxiety, no shame, no pressure
7. **Accessible:** 48pt touch targets, screen reader support, reduced motion
8. **Motion Semantic:** Every animation has meaning, not decoration

---

## Next Steps

1. **Review this document** with design and engineering team
2. **Approve behavioral design system** before implementation
3. **Begin Sprint 1** with design token system
4. **Weekly reviews** to assess behavioral metrics
5. **User testing** after Sprint 2 to validate behavioral assumptions
6. **Iterate** based on user feedback and behavioral data

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-19  
**Author:** Cascade Architecture System  
**Status:** Ready for Review
