# Portfolio GSAP Animation Enhancement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace CSS-based scroll animations with GSAP ScrollTrigger for smoother, more professional motion effects.

**Architecture:** 2 tasks. Task 1 creates ScrollAnimations wrapper component. Task 2 updates existing components to use GSAP.

**Tech Stack:** React, GSAP (ScrollTrigger, Tween), CSS

---

## File Structure

```
src/components/ScrollAnimations.tsx    # New: GSAP scroll animation wrapper
src/components/Hero.tsx               # Add parallax + entrance
src/components/About.tsx              # Add text reveal
src/components/Skills.tsx             # Add stagger animation
src/components/Projects.tsx           # Add card entrance effects
src/components/Learning.tsx           # Add section reveal
src/index.css                          # Remove old CSS animation classes (optional cleanup)
```

---

### Task 1: Create GSAP ScrollAnimations Component

**Files:**
- Create: `src/components/ScrollAnimations.tsx`

**Steps:**

1. **Create ScrollAnimations.tsx**

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to('.hero-image-container', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section titles reveal
      gsap.utils.toArray('.section-title-container').forEach((title: any) => {
        gsap.from(title, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // About content stagger
      gsap.utils.toArray('.about-content p').forEach((p: any, i: number) => {
        gsap.from(p, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Skill items stagger
      gsap.utils.toArray('.skill-item').forEach((item: any, i: number) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Project cards entrance
      gsap.utils.toArray('.project-card').forEach((card: any, i: number) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default ScrollAnimations;
```

2. **Stage**

```bash
git add src/components/ScrollAnimations.tsx
```

---

### Task 2: Integrate ScrollAnimations into App

**Files:**
- Modify: `src/App.tsx`

**Steps:**

1. **Update App.tsx** — add ScrollAnimations import and wrap main content:

Replace current imports:
```tsx
import InteractiveBubbles from './components/InteractiveBubbles';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import Footer from './components/Footer';
```

Add:
```tsx
import ScrollAnimations from './components/ScrollAnimations';
```

2. **Wrap main content** — find `<main ref={mainRef} id="main-content">` and add:

```tsx
<ScrollAnimations>
  <main ref={mainRef} id="main-content">
    <a href="#main-content" className="skip-link">Aller au contenu principal</a>
    <Hero />
    <Suspense fallback={<div>Chargement...</div>}>
      <About />
      <Skills />
      <Projects />
      <Learning />
      <Contact />
      <PrivacyPolicy />
    </Suspense>
  </main>
</ScrollAnimations>
```

3. **Optional cleanup** — remove old CSS animation classes from index.css (fade-in-down, is-visible transitions) if not used elsewhere. Keep focus states.

4. **Stage**

```bash
git add src/App.tsx
git add src/components/ScrollAnimations.tsx
```

5. **Test** — run `npm run dev` and verify:
   - Hero image parallax on scroll
   - Section titles animate in
   - About paragraphs stagger
   - Skill items stagger
   - Project cards entrance

---

## Self-Review Checklist

1. **Spec coverage:**
   - GSAP ScrollTrigger → Task 1 ✅
   - Component integration → Task 2 ✅

2. **Placeholder scan:** Aucun. Code complet.

3. **Type consistency:** React.FC + proper TypeScript interfaces.

---

## Execution Choice

**Plan complete and saved to `docs/superpowers/plans/2026-05-05-gsap-animations.md`.**

**1. Subagent-Driven** — fresh subagent per task
**2. Inline Execution** — I execute with checkpoints

**Which approach?**