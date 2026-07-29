# Portfolio Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all P1 and P2 audit findings — focus indicators, theme colors, backdrop-filter performance, font distinctiveness.

**Architecture:** 4 tasks, each independent. CSS changes isolated to `src/index.css`. Font changes in `index.html`. No component logic changes needed.

**Tech Stack:** CSS, React, Google Fonts

---

## File Structure

```
src/index.css           # ~1360 lignes — focus styles, theme tokens, backdrop-filter
index.html             # Google Fonts imports
```

---

### Task 1: Add Focus Indicators (WCAG 2.4.11)

**Files:**
- Modify: `src/index.css`

**Steps:**

1. **Ajouter focus-visible base styles après `.theme-icon.hidden` (après ligne 109)**

```css
/* --- Focus Indicators (WCAG 2.4.11) --- */
*:focus-visible {
  outline: 2px solid var(--header-color-dark);
  outline-offset: 3px;
}

body.light-mode *:focus-visible {
  outline-color: var(--header-color-light);
}

/* Remove outline on elements that handle it specially */
.theme-toggle-button:focus-visible,
.scroll-to-top button:focus-visible,
.cta-button:focus-visible,
.skill-item:focus-visible,
.project-card:focus-visible,
.learning-item:focus-visible {
  outline: none;
}
```

2. **Ajouter `:focus-visible` sur `.cta-button` (remplacer hover existant)**

Ajouter après la règle `.cta-button:hover {` (autour ligne 489):

```css
.cta-button:focus-visible {
  background-color: var(--header-color-dark);
  color: var(--background-color-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  outline: 2px solid var(--header-color-dark);
  outline-offset: 3px;
}
```

3. **Ajouter `:focus-visible` sur `.skill-item`**

Après `.skill-item:hover` (autour ligne 417):

```css
.skill-item:focus-visible {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(179, 174, 219, 0.5);
  outline: 2px solid var(--header-color-dark);
  outline-offset: 3px;
}
```

4. **Ajouter `:focus-visible` sur `.project-card`**

Après `.project-card:hover` (autour ligne 534):

```css
.project-card:focus-visible {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(179, 174, 219, 0.5);
  outline: 2px solid var(--header-color-dark);
  outline-offset: 3px;
}
```

5. **Ajouter `:focus-visible` sur `.learning-item`**

Après `.learning-item:hover` (autour ligne 661):

```css
.learning-item:focus-visible {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(179, 174, 219, 0.5);
  outline: 2px solid var(--header-color-dark);
  outline-offset: 3px;
}
```

6. **Ajouter `:focus-visible` sur theme toggle buttons**

Après `.theme-toggle-button:hover` (autour ligne 83):

```css
.theme-toggle-button:focus-visible {
  outline: 2px solid var(--header-color-dark);
  outline-offset: 3px;
}
```

7. **Commit**

```bash
git add src/index.css
git commit -m "fix: add WCAG 2.4.11 focus indicators to all interactive elements"
```

---

### Task 2: Move Hard-coded Status Colors to CSS Variables

**Files:**
- Modify: `src/index.css`

**Steps:**

1. **Ajouter les variables de couleur dans `:root` (après ligne 44)**

```css
  --border-color-light: #DEE2E6;
  /* Status colors */
  --color-success: #28a745;
  --color-error: #dc3545;
}
```

2. **Remplacer `#28a745` par la variable (ligne 880)**

```css
.status-message.success {
  color: var(--color-success);
```

3. **Remplacer `#dc3545` par la variable (ligne 885)**

```css
.status-message.error {
  color: var(--color-error);
```

4. **Vérifier que les couleurs respectent le contraste en light mode**

Ajouter après la règle `.status-message.error` (autour ligne 885):

```css
body.light-mode .status-message.success {
  color: #198754;
}

body.light-mode .status-message.error {
  color: #dc3545;
}
```

Les valeurs ajustées (#198754 plus foncé que #28a745) passent le contraste 4.5:1 sur fond clair.

5. **Commit**

```bash
git add src/index.css
git commit -m "fix: move status colors to CSS variables, fix light mode contrast"
```

---

### Task 3: Reduce Backdrop-Filter Usage (Performance)

**Files:**
- Modify: `src/index.css`

**Steps:**

1. **Supprimer backdrop-filter de `.skill-item` (lignes 400-401)**

Remplacer:
```css
.skill-item {
  background: rgba(42, 38, 60, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
```
Par:
```css
.skill-item {
  background: rgba(42, 38, 60, 0.3);
```

2. **Supprimer backdrop-filter de `.contact-email` (lignes 795-798)**

Remplacer:
```css
.contact-email {
  background: rgba(42, 38, 60, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
```
Par:
```css
.contact-email {
  background: rgba(42, 38, 60, 0.3);
```

3. **Supprimer backdrop-filter de `.scroll-to-top button` (lignes 1227-1229)**

Remplacer:
```css
.scroll-to-top button {
  background: rgba(42, 38, 60, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
```
Par:
```css
.scroll-to-top button {
  background: rgba(42, 38, 60, 0.7);
```

4. **Supprimer backdrop-filter de `.footer` (lignes 943-944)**

Remplacer:
```css
.footer {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```
Supprimer les deux lignes.

5. **Supprimer `-webkit-backdrop-filter` only de `.skill-item` (ligne 401)**
(supprimer uniquement `-webkit-backdrop-filter` ligne 401)

6. **Supprimer `-webkit-backdrop-filter` only de `.contact-email` (ligne 797)**
(supprimer uniquement `-webkit-backdrop-filter` ligne 797)

7. **Supprimer `-webkit-backdrop-filter` only de `.scroll-to-top button` (ligne 1229)**
(supprimer uniquement `-webkit-backdrop-filter` ligne 1229)

8. **Commit**

```bash
git add src/index.css
git commit -m "perf: reduce backdrop-filter usage to essential elements only"
```

---

### Task 4: Upgrade Font Stack for Distinctiveness

**Files:**
- Modify: `index.html` (lignes 27-28)
- Modify: `src/index.css` (ligne 187)

**Steps:**

1. **Lire index.html lignes 27-28**

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Lato:wght@400&family=Montserrat:wght@700&family=Poppins:wght@700&family=Roboto:wght@400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400&family=Montserrat:wght@700&family=Poppins:wght@700&family=Roboto:wght@400&display=swap"></noscript>
```

2. **Remplacer par fontes distinctive**

Remplacer par:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400&display=swap"></noscript>
```

3. **Mettre à jour font-family dans index.css**

Remplacer `fontFamily` dans `tailwind.config.js`:
```js
fontFamily: {
  sans: ['DM Sans', 'Roboto', 'sans-serif'],
  heading: ['Syne', 'Montserrat', 'sans-serif'],
  mono: ['DM Mono', 'monospace'],
}
```

Et dans `index.css` ligne 19:
```css
font-family: 'DM Sans', 'Roboto', sans-serif;
```

Et ligne 187:
```css
font-family: 'Syne', 'Montserrat', sans-serif;
```

4. **Commit**

```bash
git add index.html tailwind.config.js src/index.css
git commit -m "design: upgrade font stack to Syne + DM Sans for distinctive aesthetic"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - Focus indicators → Task 1 ✅
   - Status colors → Task 2 ✅
   - Backdrop-filter perf → Task 3 ✅
   - Font distinctiveness → Task 4 ✅

2. **Placeholder scan:** Aucun TBD/TODO. Chaque step show exact CSS.

3. **Type consistency:** Pas de types — CSS only.

---

## Execution Choice

**Plan complete and saved to `docs/superpowers/plans/2026-05-04-audit-fixes.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
