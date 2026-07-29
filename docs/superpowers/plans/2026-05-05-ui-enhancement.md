# Portfolio UI/UX Enhancement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply design system recommendations — Caveat+Quicksand fonts, blue accent, enhanced hover states.

**Architecture:** 3 tasks, independent. Font changes in index.html+CSS, accent color in CSS tokens, hover enhancements in CSS.

**Tech Stack:** React, CSS, Google Fonts

---

## File Structure

```
index.html              # Font imports (Caveat + Quicksand replacing Syne + DM Sans)
src/index.css           # CSS variables + hover states + font-family tokens
src/components/Projects.tsx  # Optional: add hover scale for card click area
```

---

### Task 1: Update Fonts (Caveat + Quicksand)

**Files:**
- Modify: `index.html:27-30`
- Modify: `src/index.css:19`

**Steps:**

1. **Update font import in index.html**

Replace line 29:
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

With:
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

2. **Update fallback font in index.html line 30**
```html
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap"></noscript>
```

3. **Update font-family in index.css line 19**

Replace:
```css
font-family: 'DM Sans', 'Roboto', sans-serif;
```

With:
```css
font-family: 'Quicksand', 'Roboto', sans-serif;
```

4. **Stage changes**

```bash
git add index.html src/index.css
```

---

### Task 2: Blue Accent Color Token

**Files:**
- Modify: `src/index.css:27-49`

**Steps:**

1. **Add blue accent to CSS variables** — find `--header-color-dark` and add accent below it:

Add after line 30:
```css
  --accent-color: #2563EB;
  --accent-color-hover: #1D4ED8;
```

2. **Update light mode header color** — change line 39:
```css
  --header-color-light: #2563EB;
```

3. **Stage changes**

```bash
git add src/index.css
```

---

### Task 3: Project Card Hover Enhancement

**Files:**
- Modify: `src/index.css:578-582`

**Steps:**

1. **Update project-card hover** — replace `.project-card:hover` block (lines 578-582):

Replace:
```css
.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(179, 174, 219, 0.5);
}
```

With:
```css
.project-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(37, 99, 235, 0.15);
  border-color: var(--accent-color);
}
```

2. **Add light mode hover override** — after line 592-594:

Add:
```css
body.light-mode .project-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 25px 50px rgba(37, 99, 235, 0.12);
}
```

3. **Update tech-tag to use accent color** — find `.tech-tag` (line 628-632) and update:

Replace:
```css
.tech-tag {
  background-color: rgba(179, 174, 219, 0.1);
  color: var(--header-color-dark);
```

With:
```css
.tech-tag {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--accent-color);
```

4. **Stage changes**

```bash
git add src/index.css
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - Font change → Task 1 ✅
   - Blue accent → Task 2 ✅
   - Hover enhancement → Task 3 ✅

2. **Placeholder scan:** Aucun. Chaque step show exact code.

3. **Type consistency:** N/A — CSS changes only.

---

## Execution Choice

**Plan complete and saved to `docs/superpowers/plans/2026-05-05-ui-enhancement.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks

**2. Inline Execution** - Execute tasks in this session with checkpoints

**Which approach?**