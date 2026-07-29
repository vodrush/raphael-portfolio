# Portfolio Final Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix last 2 P2 audit issues — Christmas mode ARIA state + font fallback cleanup.

**Architecture:** 2 tasks, both trivial single-file edits. No dependencies between them.

**Tech Stack:** React, CSS

---

## File Structure

```
src/App.tsx            # Christmas mode button — add aria-pressed
src/index.css         # Font fallback cleanup — remove Montserrat from stack
```

---

### Task 1: Add aria-pressed to Christmas Mode Toggle

**Files:**
- Modify: `src/App.tsx:49`

**Steps:**

1. **Lire App.tsx ligne 49**

```tsx
<button
  onClick={toggleChristmasMode}
  className={`theme-toggle-button !static !m-0 ${isChristmasMode ? 'bg-red-500/20 border-red-500' : ''}`}
  aria-label="Activer le mode Noël"
  title={isChristmasMode ? "Désactiver Noël" : "Activer Noël"}
>
```

2. **Ajouter aria-pressed**

Remplacer par:
```tsx
<button
  onClick={toggleChristmasMode}
  className={`theme-toggle-button !static !m-0 ${isChristmasMode ? 'bg-red-500/20 border-red-500' : ''}`}
  aria-label="Activer le mode Noël"
  aria-pressed={isChristmasMode}
  title={isChristmasMode ? "Désactiver Noël" : "Activer Noël"}
>
```

3. **Commit**

```bash
git add src/App.tsx
git commit -m "fix: add aria-pressed to Christmas mode toggle for screen readers"
```

---

### Task 2: Clean Up Font Fallback Stack

**Files:**
- Modify: `src/index.css:216`

**Steps:**

1. **Lire index.css ligne 216**

```css
  font-family: 'Syne', 'Montserrat', sans-serif;
```

2. **Remplacer Montserrat par system-ui**

```css
  font-family: 'Syne', system-ui, sans-serif;
```

3. **Commit**

```bash
git add src/index.css
git commit -m "design: remove generic Montserrat from font fallback stack"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - aria-pressed → Task 1 ✅
   - font fallback → Task 2 ✅

2. **Placeholder scan:** Aucun. Chaque step show exact code.

3. **Type consistency:** N/A — CSS and JSX changes only.

---

## Execution Choice

**Plan complete and saved to `docs/superpowers/plans/2026-05-04-final-polish.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - fresh subagent per task, review between tasks

**2. Inline Execution** - execute in this session with checkpoints

**Which approach?**
