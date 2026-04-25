---
name: ui-ux-routing
description: Routes UI/UX-related tasks to the correct skill. Detects intent using keywords for critique, design-system, accessibility, flows, rhythm, and component integrity. Keywords: route, classify, ui, ux, critique, audit, flow, accessibility, design-system, spacing, component.
---

# Functionality
This skill classifies the user’s request and routes it to the correct UI/UX skill. It does not critique, analyze, or evaluate UI itself. Its only job is to interpret intent and select the appropriate specialized skill.

# When to Use
Use this skill whenever:
- The user asks for a UI/UX critique  
- The user asks for an audit but does not specify which type  
- The request contains mixed signals (e.g., “check spacing and flows”)  
- The agent needs to determine which UI/UX skill should handle the task  

# Capabilities
- Detects intent based on keywords and phrasing  
- Maps requests to the correct specialized skill  
- Handles ambiguous or multi‑category requests  
- Ensures tasks are routed to the most relevant skill without overlap  

# Routing Logic
The skill must route based on the following keyword and intent mapping:

### 1. **ui-ux-critic**
Trigger when the request includes:  
critique, audit, review, issues, hierarchy, layout, product-level, general UI/UX  
Use when the request is broad or unspecified.

### 2. **design-system-enforcer**
Trigger when the request includes:  
tokens, spacing scale, radii, typography, color tokens, primitives, consistency, design-system

### 3. **accessibility-auditor**
Trigger when the request includes:  
accessibility, WCAG, contrast, tap targets, semantics, ARIA, motion, inclusive

### 4. **interaction-flow-critic**
Trigger when the request includes:  
flow, interaction, affordance, feedback, friction, gestures, mobile patterns

### 5. **visual-rhythm-analyzer**
Trigger when the request includes:  
spacing, alignment, rhythm, density, balance, layout drift, visual rhythm

### 6. **component-integrity-checker**
Trigger when the request includes:  
component, button, input, card, modal, labeling, iconography, states, micro-UX

# Instructions
1. Parse the user’s request.  
2. Match keywords and intent to the correct skill.  
3. If multiple skills match, choose the most specific one.  
4. If the request is broad or unclear, default to **ui-ux-critic**.  
5. Do not critique or analyze UI.  
6. Output only the name of the skill to invoke.

# Output Format
Return the name of the selected skill as plain text, e.g.:

- `ui-ux-critic`  
- `design-system-enforcer`  
- `accessibility-auditor`  
- `interaction-flow-critic`  
- `visual-rhythm-analyzer`  
- `component-integrity-checker`

# Example
Input: “Check if the spacing and alignment feel consistent.”  
Output: `visual-rhythm-analyzer`
