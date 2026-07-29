# Portfolio Cleanup & Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nettoyer code mort, fixer bugs, consolider CSP, améliorer robustesse EmailJS.

**Architecture:** 6 tâches indépendantes. Chaque tâche = un commit atomique. Aucune dépendance entre tâches. Execution peut être parallèle ou séquentielle.

**Tech Stack:** React 19, TypeScript, Vite, EmailJS

---

## File Structure

```
src/
├── App.tsx                    # Point d'entrée, theme/christmas state
├── components/
│   ├── Header.tsx            # UNUSED - Supprimer
│   ├── Header.css            # UNUSED - Supprimer
│   ├── HeroAnimation.tsx     # UNUSED - Supprimer
│   ├── FloatingParticles.tsx  # UNUSED - Supprimer
│   └── ...
├── index.css                 # ~1400 lignes CSS global
└── index.tsx                 # ReactDOM createRoot

index.html                    # CSP double déclaration
vite.config.ts               # open: true (dev only issue)
.env                          # EmailJS keys (client bundle exposure attendu)
```

---

### Task 1: Supprimer Header.tsx, Header.css, HeroAnimation.tsx, FloatingParticles.tsx

**Files:**
- Delete: `src/components/Header.tsx`
- Delete: `src/components/Header.css`
- Delete: `src/components/HeroAnimation.tsx`
- Delete: `src/components/FloatingParticles.tsx`

- [ ] **Step 1: Vérifier quaucun import existe**

Run: `grep -r "Header\|HeroAnimation\|FloatingParticles" src/ --include="*.tsx" --include="*.ts" --include="*.css"`
Expected: Aucun résultat (sauf CSS globals qui référencent ces classes)

- [ ] **Step 2: Supprimer les fichiers**

```bash
rm src/components/Header.tsx
rm src/components/Header.css
rm src/components/HeroAnimation.tsx
rm src/components/FloatingParticles.tsx
```

- [ ] **Step 3: Nettoyer index.css des classes orphelines**

Supprimer de `src/index.css`:
- `.animation-wrapper` + contenu (lignes 1028-1113)
- `.floating-particles-container` + `.particle` (lignes 922-956)
- `.hero-animation` (lignes 322-325)

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/components/Header.css src/components/HeroAnimation.tsx src/components/FloatingParticles.tsx src/index.css
git commit -m "chore: remove dead code (unused Header, HeroAnimation, FloatingParticles components and CSS)"
```

---

### Task 2: Fixer double CSP dans index.html

**Files:**
- Modify: `index.html:29-30`

- [ ] **Step 1: Lire index.html CSP actuel**

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.emailjs.com; form-action 'self';">
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

- [ ] **Step 2: Fusionner en une seule CSP**

Remplacer les deux meta par:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.emailjs.com https://fonts.googleapis.com https://fonts.gstatic.com; form-action 'self'; upgrade-insecure-requests;">
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: consolidate CSP into single meta tag, add missing connect-src for fonts"
```

---

### Task 3: Corriger vite.config.ts open: true

**Files:**
- Modify: `vite.config.ts:14`

- [ ] **Step 1: Lire vite.config.ts**

```ts
server: {
    port: 3000,
    open: true,
},
```

- [ ] **Step 2: Remplacer open: true par conditionnel**

```ts
server: {
    port: 3000,
    open: process.env.NODE_ENV !== 'production',
},
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "fix: disable auto-open browser in production builds"
```

---

### Task 4: Ajouter validation EmailJS avant envoi

**Files:**
- Modify: `src/components/Contact.tsx:25-38`

- [ ] **Step 1: Lire Contact.tsx actuel (lignes 1-39)**

- [ ] **Step 2: Ajouter guard clause pour keys manquantes**

Remplacer la fonction sendEmail par:

```ts
const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    if (!serviceId || !templateId || !publicKey) {
        setStatusMessage({ type: 'error', text: 'Service de messagerie non configuré. Contactez-moi directement par email.' });
        return;
    }

    const userEmail = (form.current.elements.namedItem('user_email') as HTMLInputElement).value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        setStatusMessage({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
        return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
        .then((result) => {
            console.log(result.text);
            setStatusMessage({ type: 'success', text: 'Message envoyé avec succès !' });
            form.current?.reset();
        }, (error) => {
            console.log(error.text);
            setStatusMessage({ type: 'error', text: `Échec de l'envoi du message. Veuillez réessayer.` });
        });
};
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "fix: add EmailJS config validation before send, provide user-friendly error message"
```

---

### Task 5: Supprimer .env du gitignore si présent, vérifier exposure

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Vérifier si .env est dans .gitignore**

Run: `grep -n "\.env" .gitignore`
Expected: `.env` trouvé ligne ~10

- [ ] **Step 2: Vérifier que .env contient uniquement VITE_ vars**

Le `.env` doit contenir uniquement:
```
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
```

Ces vars sont safe pour le client bundle (prefix VITE_).

- [ ] **Step 3: Si .env contenait des vars non-VITE, les déplacer**

Pas de changement de code nécessaire si vars sont déjà VITE_.
Sinon: créer `.env.example` avec vars factices et déplacer les secrets.

- [ ] **Step 4: Commit (si changement fait)**

```bash
git add .gitignore
git commit -m "chore: ensure VITE_ vars in .env are appropriate for client bundle exposure"
```

---

### Task 6: Ajouter ScrollProgressIndicator check visibility

**Files:**
- Modify: `src/components/ScrollProgressIndicator.tsx` (si existe)
- Modify: `src/index.css` (si styles inline)

- [ ] **Step 1: Localiser ScrollProgressIndicator**

Run: `find src -name "ScrollProgressIndicator*" -type f`
Expected: `src/components/ScrollProgressIndicator.tsx`

- [ ] **Step 2: Vérifier que le component utilise useEffect properly**

Lis le fichier. Si `useEffect` sans cleanup ou avec `window.addEventListener` sans remove, corriger.

- [ ] **Step 3: Vérifier que styles sont dans index.css (lignes 1277-1303)**

Pas de changement si déjà correct.

- [ ] **Step 4: Commit (si changement fait)**

```bash
git add src/components/ScrollProgressIndicator.tsx
git commit -m "fix: ensure ScrollProgressIndicator cleanup is proper"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - Header.tsx supprimé → Task 1 ✅
   - HeroAnimation.tsx supprimé → Task 1 ✅
   - FloatingParticles.tsx supprimé → Task 1 ✅
   - Double CSP fixed → Task 2 ✅
   - open: true fixed → Task 3 ✅
   - EmailJS validation → Task 4 ✅
   - .env exposure check → Task 5 ✅
   - ScrollProgressIndicator cleanup → Task 6 ✅

2. **Placeholder scan:** Aucun TBD/TODO dans le plan. Chaque step show exact code.

3. **Type consistency:** Pas de types définis ici — refactoring CSS/cleanup, pas de nouvelle API.

---

## Execution Choice

**Plan complete and saved to `docs/superpowers/plans/2026-05-04-portfolio-cleanup.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
