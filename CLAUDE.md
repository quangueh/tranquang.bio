@AGENTS.md

---

## Behavioral Guidelines (Karpathy + Anti-Slop)

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove imports/variables/functions that YOUR changes made unused.
- Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

### 5. Output Enforcement
**Never truncate. Never use placeholders. Complete every implementation.**
- Ban: `// ...`, `// rest of code`, `TODO`, `...and so on`
- Ban: "Let me know if you want me to continue", "for brevity"
- Ban: Skeleton/partial implementations when full code was requested
- If output is too long, split with `[PAUSED — X of Y complete]` and continue
- Every code block must be copy-paste runnable

---

## Design Taste (Anti-Slop Frontend)

### Default Configuration
```
DESIGN_VARIANCE:  8  (1-10, how much layout deviates from defaults)
MOTION_INTENSITY: 6  (1-10, animation energy)
VISUAL_DENSITY:   4  (1-10, information density)
```

### Architecture Defaults
- React/Next.js with RSC, Tailwind v4, Motion (Framer Motion)
- Fonts: NO Inter/Roboto/Open Sans as defaults. Use: Geist, SF Pro Display, or project-specified fonts
- Icons: Lucide or Phosphor, NOT generic Font Awesome
- Colors: NO AI purple (#7c3aed), NO generic blue gradients. Use muted, intentional palettes

### Hard Design Rules
- **LILA RULE**: No purple as primary accent. AI defaults to purple; fight it.
- **Hero Discipline**: One hero per page. No stacked heroes. No hero + eyebrow + subtitle + CTA overload.
- **Section Repetition Ban**: No two adjacent sections with the same layout pattern.
- **Em-Dash Ban**: Never use `—` (em-dash) in UI copy. Use commas, periods, or newlines.
- **Inter Ban**: Never use Inter as the default body font.
- **Decoration Dot Ban**: No `·` separator dots in navigation or UI chrome.
- **Fake Product Preview Ban**: No mock phone/laptop frames with fake UI screenshots.

### Typography Rules
- Minimum body font size: 16px
- Headings: Use variable font weights, not bold-only
- Line height: 1.5-1.6 for body, 1.1-1.2 for large headings
- Letter spacing: Slightly tighten large headings (-0.02em to -0.03em)

### Motion Rules
- Duration: 200-400ms for UI transitions, 600-1000ms for page transitions
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entries, `ease-in` for exits
- Respect `prefers-reduced-motion` — disable all non-essential animation
- Stagger reveals: 50-100ms delay between items, never more

### Color Palette Defaults
- Background: `#FFFFFF` or `#FAFAFA`, never pure black `#000000` for light mode
- Text: `#1A1A1A` for body, `#666666` for secondary
- Borders: `#E5E5E5` or lighter, never harsh black borders
- Accent: Choose ONE intentional color, use sparingly (10-15% of visual weight)

### Anti-Pattern Checklist (Pre-Flight)
- [ ] No generic gradient backgrounds
- [ ] No card with identical padding on all sides
- [ ] No centered text blocks wider than 65ch
- [ ] No buttons without hover/active/focus states
- [ ] No images without aspect-ratio containers
- [ ] No text over busy images without overlay
- [ ] No fixed pixel widths (use max-width + percentages)
- [ ] No inline styles (use Tailwind classes)
- [ ] No placeholder text (Lorem ipsum, Jane Doe, etc.)
