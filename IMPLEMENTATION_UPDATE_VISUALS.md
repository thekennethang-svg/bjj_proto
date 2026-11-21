# Implementation Plan: Modernize Origin BJJ — Texture, Motion, and Imagery

**Document:** `IMPLEMENTATION_UPDATE_VISUALS.md`  
**Target Project:** Origin Brazilian Jiu Jitsu Web Prototype (`bjj_proto`)  
**Stack:** React 18, TypeScript, Tailwind CSS v3, Vite  
**Status:** Completed  

---

## 1. Executive Summary & Design Principles

The objective of this modernization is to elevate Origin BJJ from a flat dark-mode landing page to an atmospheric, high-caliber athletic web experience.

### Core Principles
1. **Athletic Restraint:** Motion is slow, grounded, and deliberate (no bouncy springs or playful animations).
2. **Palette Preservation:** Retain the core palette (`bg: #0A0A0A`, `surface: #141414`, `surface-raised: #1A1A1A`, `accent: #E8C547`, `border: #2A2A2A`). Atmosphere is introduced via layer opacity, depth, and texture—not random new accent colors.
3. **Contrast & Readability (WCAG AA):** Every photographic background or texture sits behind high-opacity dark overlays (`rgba(10, 10, 10, 0.85–0.92)`) so white typography and gold accents maintain razor-sharp contrast.
4. **Performance & Lightweight Architecture:** No heavy third-party animation runtimes required; leverage CSS transitions, SVG filters/patterns, and native `IntersectionObserver` to keep page load lightning fast.

---

## 2. Key Decisions & Strategic Options

### Decision 1: Real Photography Sourcing
* **Approach:** Curated, license-free high-resolution photography (Unsplash) depicting authentic Brazilian Jiu-Jitsu: gi fabric textures, belt details, mat sparring, and grip work.
* **Fallback Option:** Photography layers sit in separate styled backdrop containers with dark overlays that can be toggled without breaking layout flow.

### Decision 2: Hero Background Treatment
* **Layer Stack Structure (Bottom to Top):**
  1. Base background (`#0A0A0A`)
  2. Hairline architectural grid pattern with radial falloff (`bg-hairline-grid`)
  3. Low-opacity full-bleed training photo (`opacity-20` with multi-stop dark gradient overlay)
  4. Ambient gold radial glows (`#E8C547` at 4–6% opacity)
  5. Giant "BJJ" typographic watermark (`opacity-[0.03]`)
  6. Foreground Hero content (Headline, CTA, Trust signals strip)

### Decision 3: "No Gradients" Constraint vs. Atmospheric Glows
* **Clarification:** The original "no gradients" guideline prevents flashy multi-color gradients or vibrant tech-style fills. 
* **Implementation:** The atmosphere uses single-color radial falloffs (`rgba(232, 197, 71, 0.055)` into transparent black). This mimics gym spotlighting and physical depth rather than decorative gradient styling.

---

## 3. Architecture & File Impacts

```
bjj_proto/
├── src/
│   ├── index.css                    # Noise filter, hairline grid, hover glow, reduced-motion
│   ├── tailwind.config.js           # Extended surface-raised color (#1A1A1A) & keyframes
│   ├── hooks/
│   │   ├── useScrollProgress.ts     # Window scroll progress calculation (0-100%)
│   │   ├── useIntersectionReveal.ts # IntersectionObserver for scroll fade-and-rise
│   │   └── useCountUp.ts            # Eased counter for stats animation
│   ├── components/
│   │   ├── BackgroundNoise.tsx      # Global subtle 35mm film grain/noise SVG overlay
│   │   ├── AmbientGlow.tsx          # Reusable soft radial light halo positioning
│   │   ├── ScrollProgressBar.tsx    # Fixed top gold scroll indicator line
│   │   ├── TrustSignals.tsx         # Uppercase trust badge strip beneath hero CTA
│   │   ├── SectionHeading.tsx       # Reusable section heading with animated gold underline
│   │   ├── PhotoStripDivider.tsx    # Grayscale/dark photo strip between Programs & Pricing
│   │   ├── Hero.tsx                 # Enhanced headline, grid streaks, photo backdrop, trust strip
│   │   ├── About.tsx                # Interactive stat count-up, image integration in stat block
│   │   ├── Programs.tsx             # Card hover lift, border glow, top accent bar, heading draw-in
│   │   ├── Pricing.tsx              # Elevated card depth, subtle glow, refined borders
│   │   └── FAQ.tsx                  # Heading reveal & smooth accordion interaction
```

---

## 4. Master Progress Checklist

### Phase 1: Setup, Texture & Lighting
- [x] **1.1 Global Background Noise**
  - [x] Create `src/components/BackgroundNoise.tsx` (SVG feTurbulence filter or noise canvas overlay)
  - [x] Mount `BackgroundNoise` in `App.tsx` with fixed positioning and `pointer-events-none`
- [x] **1.2 Hairline Grid Pattern**
  - [x] Add CSS utility or SVG pattern for subtle architectural grid in `src/index.css`
  - [x] Integrate grid background layer inside `Hero.tsx`
- [x] **1.3 Ambient Radial Glow Elements**
  - [x] Create `src/components/AmbientGlow.tsx` or tailwind utility for soft accent halos
  - [x] Position ambient glow behind Hero center/CTA
  - [x] Position ambient glow behind About stats card
  - [x] Position ambient glow behind Pricing card

### Phase 2: Photography & Overlays
- [x] **2.1 Photo Asset Sourcing**
  - [x] Curate license-free BJJ photo for Hero backdrop (training/mat atmosphere)
  - [x] Curate license-free photo for About section stat block (gi fabric/belt detail)
  - [x] Curate license-free photo strip for Programs-Pricing transition
- [x] **2.2 Hero Background Photo Layer**
  - [x] Embed photo layer in `Hero.tsx` with low opacity (`opacity-20` to `opacity-25`)
  - [x] Apply dark gradient/solid overlay to maintain WCAG AA text contrast
- [x] **2.3 About Section Image Integration**
  - [x] Add visual image container to `About.tsx` alongside or behind the stats block
- [x] **2.4 Section Divider Photo Strip**
  - [x] Create `src/components/PhotoStripDivider.tsx`
  - [x] Insert divider between `<Programs />` and `<Pricing />` in `App.tsx`

### Phase 3: Motion, Rhythm & Micro-Interactions
- [x] **3.1 Scroll Progress Indicator**
  - [x] Create `src/hooks/useScrollProgress.ts`
  - [x] Create `src/components/ScrollProgressBar.tsx`
  - [x] Mount progress bar at top of viewport in `Navbar.tsx` or `App.tsx`
- [x] **3.2 Section Content Fade-and-Rise**
  - [x] Create `src/hooks/useIntersectionReveal.ts` or reusable `RevealOnScroll` component
  - [x] Apply reveal animation to Hero elements
  - [x] Apply reveal animation to About text and stat block
  - [x] Apply staggered reveal to Program cards
  - [x] Apply reveal to Pricing container and FAQ items
- [x] **3.3 Animated Stat Numbers**
  - [x] Create `src/hooks/useCountUp.ts`
  - [x] Connect count-up animation to `18+` and `400+` in `About.tsx`
- [x] **3.4 Card Lift & Border Glow Effects**
  - [x] Update Program card hover styles (`hover:-translate-y-1.5 hover:border-accent/60`)
  - [x] Update Pricing card hover styles with subtle gold halo
- [x] **3.5 Section Heading Underline Animation**
  - [x] Add animated expanding gold rule beneath headings (`About`, `Programs`, `Pricing`, `FAQ`)

### Phase 4: Hero Section Strengthening
- [x] **4.1 Headline Scale & Layout**
  - [x] Increase headline typography size and adjust break points in `Hero.tsx`
- [x] **4.2 Trust Signal Strip**
  - [x] Build clean uppercase trust signal component beneath CTA
  - [x] Include: `3RD DEGREE BLACK BELT · HANLEY, STOKE ON TRENT · ADULTS ALL LEVELS`
- [x] **4.3 Watermark & Backdrop Depth Alignment**
  - [x] Balance "BJJ" watermark z-index, photo layer, hairline grid, and text readability

### Phase 5: Card & Section Polish
- [x] **5.1 Surface Tone Hierarchy Extension**
  - [x] Extend `tailwind.config.js` with `surface-raised: '#1A1A1A'`
- [x] **5.2 Card Border & Padding Treatment**
  - [x] Refine Program cards to top accent bar + subtle borders + generous padding
  - [x] Refine Pricing card container depth and spacing
- [x] **5.3 Mobile Responsiveness Check**
  - [x] Verify touch states, spacing, and scroll performance on mobile viewport

### Phase 6: Validation & Cleanup
- [x] **6.1 Reduced Motion Accessibility**
  - [x] Verify animations safely downgrade when `prefers-reduced-motion` is enabled
- [x] **6.2 Contrast & Readability Verification**
  - [x] Check text contrast across all photo-backed sections against WCAG AA standards
- [x] **6.3 Code Quality & Build Verification**
  - [x] Run `npm run typecheck` (zero TypeScript errors)
  - [x] Run `npm run build` (clean Vite bundle output)
  - [x] Run `npm run lint` (clean ESLint pass)
