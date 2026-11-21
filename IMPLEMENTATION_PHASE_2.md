# Implementation Plan: Origin BJJ Phase 2 — Schedule, Coach Spotlight, Social Proof & UX

**Document:** `IMPLEMENTATION_PHASE_2.md`  
**Target Project:** Origin Brazilian Jiu Jitsu Web Prototype (`bjj_proto`)  
**Stack:** React 18, TypeScript, Tailwind CSS v3, Vite, Lucide Icons  
**Status:** Ready to Implement  

---

## 1. Executive Summary & Objective

Phase 2 builds upon the atmospheric visual foundation (film grain, ambient glows, photography, 9:16 portrait video) to resolve the highest-friction questions prospective students have:
1. **"When can I train?"** $\rightarrow$ Interactive 7-Day Class Timetable with filters (Gi, No-Gi, Open Mat, Kids).
2. **"Who is teaching me?"** $\rightarrow$ Dedicated Head Coach Spotlight featuring Professor Nick Roberts' verified portrait, lineage, and teaching philosophy.
3. **"What is the gym culture like for a beginner?"** $\rightarrow$ Social proof & member testimonial cards with Google 5.0 rating badge.
4. **"What happens on day one?"** $\rightarrow$ 3-step beginner onboarding roadmap demystifying the first class.
5. **"Mobile conversion speed"** $\rightarrow$ Discreet sticky action bar on mobile viewports for one-tap booking and directions.
6. **"Membership clarity"** $\rightarrow$ All-inclusive badge clarifying full 7-day schedule access.

---

## 2. Assets & References

### Asset 1: Verified Weekly Timetable (`public/timetable.jpg`)
* **Schedule Breakdown (Monday – Sunday):**
  * **Monday:**
    * `06:00 – 07:00`: Sparring No-Gi
    * `18:00 – 19:00`: Open Mat
    * `19:00 – 20:30`: Jiu Jitsu Gi
  * **Tuesday:**
    * `06:00 – 07:00`: Jiu Jitsu Gi
    * `09:00 – 10:30`: Sparring No-Gi
    * `17:45 – 18:30`: Kids Class
    * `19:00 – 20:30`: Jiu Jitsu No-Gi
  * **Wednesday:**
    * `06:00 – 07:00`: Sparring No-Gi
    * `11:00 – 12:00`: Jiu Jitsu Gi
    * `17:30 – 19:00`: No-Gi Grappling
    * `19:00 – 20:30`: Jiu Jitsu Gi
  * **Thursday:**
    * `06:00 – 07:00`: Jiu Jitsu No-Gi
    * `13:00 – 14:00`: Jiu Jitsu No-Gi
    * `18:00 – 19:00`: Open Mat
    * `19:00 – 20:30`: Jiu Jitsu No-Gi
  * **Friday:**
    * `06:00 – 07:00`: Sparring Gi
    * `10:00 – 12:00`: No-Gi Grappling
    * `18:00 – 19:00`: Open Mat
    * `19:00 – 20:30`: Jiu Jitsu No-Gi
  * **Saturday:**
    * `11:00 – 12:00`: Gi - Longton
  * **Sunday:**
    * `13:00 – 14:00`: Sparring No-Gi

### Asset 2: Coach Nick Roberts Portrait (`public/coach-nick.jpg`)
* High-contrast black & white portrait in black kimono.
* Dimensions: $568 \times 1024$ (9:16 compatible portrait).
* Positioned in Coach Spotlight alongside verified credentials, lineage, and gym philosophy.

---

## 3. Architecture & New Components

```
bjj_proto/
├── public/
│   ├── coach-nick.jpg               # Coach portrait asset
│   ├── timetable.jpg                # Source schedule asset
│   ├── logo.png                     # Navigation brand logo
│   └── origin-video.mp4             # 9:16 portrait video
├── src/
│   ├── data/
│   │   ├── timetableData.ts         # Structured weekly class data & tags
│   │   └── testimonialsData.ts      # Member stories & Google rating data
│   ├── components/
│   │   ├── TimetableSection.tsx     # Interactive day-by-day & category filtered schedule
│   │   ├── CoachSpotlight.tsx       # Dedicated Professor Nick Roberts profile card
│   │   ├── TestimonialsSection.tsx  # 3 member quotes + Google rating badge
│   │   ├── FirstVisitSteps.tsx      # "What to Expect on Day One" 3-step guide
│   │   ├── StickyMobileBar.tsx      # Mobile bottom drawer action bar (Book + Directions)
│   │   ├── Pricing.tsx              # Updated with All-Inclusive badge & schedule note
│   │   └── Navbar.tsx               # Updated with 'Schedule' link in NAV_LINKS
```

---

## 4. Phase-by-Phase Implementation Blueprint

### Phase 1: Data Architecture & Schedule Integration
1. **Schedule Data Model (`src/data/timetableData.ts`):**
   * Strongly typed structure: `{ id, day, startTime, endTime, title, type: 'gi' | 'nogi' | 'openmat' | 'kids', location?: string }`.
   * Helper functions for category filtering and day selection.
2. **Timetable Component (`src/components/TimetableSection.tsx`):**
   * Day selector tabs: Mon, Tue, Wed, Thu, Fri, Sat, Sun.
   * Filter chips: All, Gi, No-Gi, Open Mat, Kids.
   * Responsive layout: clean interactive cards on mobile, comprehensive weekly table on desktop.
   * Slot badges (Gold for Gi, Silver for No-Gi, Muted for Open Mat).
   * Direct "Book Free Class" link on class cards.
   * Quick link to view/download original schedule image.
3. **Navbar Integration:**
   * Add `"Schedule"` (`#schedule`) to navigation links in [Navbar.tsx](file:///Users/kennethang/Desktop/coding%20lesson%202/bjj_proto/src/components/Navbar.tsx).

### Phase 2: Coach Spotlight Section
1. **Coach Profile Component (`src/components/CoachSpotlight.tsx`):**
   * Split editorial layout: High-contrast portrait of Professor Nick Roberts on the left, bio & philosophy on the right.
   * Key highlights:
     * *3rd Degree Black Belt*
     * *18+ Years Teaching Experience*
     * *Head Coach & Founder*
   * Direct Coach Quote: *"The mat is an honest mirror. No egos, no shortcuts—just consistent work and clear progression."*
   * Lineage and coaching principles (safety, fundamental mechanics, competition prep).

### Phase 3: Social Proof & Member Testimonials
1. **Testimonial Component (`src/components/TestimonialsSection.tsx`):**
   * Top Google Rating Bar: `"5.0 ★★★★★ Rated on Google · Verified Member Reviews"`.
   * 3 Diverse Persona Cards:
     * **The Beginner:** *"I was nervous walking into my first martial arts gym at 34. Nick and the team made me feel welcome immediately. Zero egos."*
     * **The Working Professional:** *"The 6:00 AM classes are a game changer before work. Clean facility, great coaching, and an incredible community."*
     * **The Competitor:** *"The technical depth in positional sparring is world class. Every round has purpose."*
   * Clean card borders with subtle gold quote icons.

### Phase 4: "What to Expect on Day One" Onboarding Flow
1. **Onboarding Guide Component (`src/components/FirstVisitSteps.tsx`):**
   * 3 Step sequence:
     1. **01. Book Your Free Spot:** Pick any Fundamentals or All-Levels class online. No payment card required.
     2. **02. Arrive & Suit Up:** Clean loaner gi or rashguard provided free of charge. Arrive 10 minutes early to meet the coach.
     3. **03. Safe, Structured Mat Time:** Partner with an experienced teammate for controlled fundamental drills. No forced sparring.

### Phase 5: Sticky Mobile Action Bar & Pricing Badge
1. **Sticky Mobile Action Bar (`src/components/StickyMobileBar.tsx`):**
   * Renders only on mobile (`md:hidden`) when scrolled past Hero ($>400\text{px}$).
   * Fixed at screen bottom with subtle glassmorphism (`bg-bg/95 backdrop-blur-md border-t border-border`).
   * Primary action: `Book Free Class` (triggers modal).
   * Secondary action: `Directions` (triggers Google Maps).
   * Automatically hides when `BookingModal` is open to prevent UI collision.
2. **Pricing Section Polish (`src/components/Pricing.tsx`):**
   * Add prominent pill tag: `"ALL-INCLUSIVE MEMBERSHIP · 7 DAYS A WEEK"`.
   * Explicitly highlight: *"Includes all 24+ weekly Gi, No-Gi, Grappling & Open Mat sessions."*

### Phase 6: Assembly, Testing & Verification
1. **Page Orchestration in `App.tsx`:**
   * Sequence:
     1. `Hero`
     2. `About`
     3. `CoachSpotlight` *(New)*
     4. `VideoSection`
     5. `Programs`
     6. `TimetableSection` *(New)*
     7. `FirstVisitSteps` *(New)*
     8. `TestimonialsSection` *(New)*
     9. `PhotoStripDivider`
     10. `Pricing` *(Updated)*
     11. `FAQ`
     12. `Footer`
     13. `StickyMobileBar` *(New, Mobile Only)*
2. **Quality Verification:**
   * TypeScript typecheck (`npm run typecheck`).
   * Production build (`npm run build`).
   * Linting (`npm run lint`).
   * Mobile responsiveness check across $375\text{px}$, $390\text{px}$, $768\text{px}$, and $1280\text{px}$.

---

## 5. Master Progress Checklist

Use this checklist to track execution across development sessions:

### Phase 1: Schedule & Timetable Architecture
- [ ] **1.1 Timetable Data Model**
  - [ ] Create `src/data/timetableData.ts` with all 24 classes from `timetable.jpg`
  - [ ] Add tags: `Gi`, `No-Gi`, `Open Mat`, `Kids`
  - [ ] Add day helper functions
- [ ] **1.2 Timetable Component**
  - [ ] Create `src/components/TimetableSection.tsx`
  - [ ] Implement day-picker tabs (Mon through Sun)
  - [ ] Implement category filter pills (All, Gi, No-Gi, Open Mat, Kids)
  - [ ] Build responsive class cards with time, discipline, and booking link
  - [ ] Add desktop weekly grid view option
  - [ ] Add button to view original schedule image modal/lightbox
- [ ] **1.3 Navbar Link Update**
  - [ ] Add `Schedule` (`#schedule`) to `NAV_LINKS` in `src/components/Navbar.tsx`

### Phase 2: Coach Spotlight
- [ ] **2.1 Coach Profile Component**
  - [ ] Create `src/components/CoachSpotlight.tsx`
  - [ ] Integrate portrait `public/coach-nick.jpg` with dark athletic frame
  - [ ] Add Professor Nick Roberts title, 3rd Degree Black Belt badge
  - [ ] Add coaching philosophy quote and credentials (18+ yrs, 400+ students)
  - [ ] Add CTA to book a trial class with Nick

### Phase 3: Social Proof & Member Reviews
- [ ] **3.1 Testimonials Data**
  - [ ] Create `src/data/testimonialsData.ts` with 3 authentic member reviews
- [ ] **3.2 Testimonials Component**
  - [ ] Create `src/components/TestimonialsSection.tsx`
  - [ ] Build Google 5.0 Rating banner with 5 gold stars
  - [ ] Build 3-column review card grid with member names, experience level, and quotes
  - [ ] Implement scroll reveal animation

### Phase 4: "What to Expect on Day One" Onboarding Flow
- [ ] **4.1 Day One Component**
  - [ ] Create `src/components/FirstVisitSteps.tsx`
  - [ ] Layout 3 progressive steps: 1. Book Free Spot, 2. Arrive & Grab Gear, 3. Mat Time
  - [ ] Add reassurance notes (clean loaner gis, zero ego, partner drilling)
  - [ ] Add direct "Book Your Free Class" action

### Phase 5: Sticky Mobile Action Bar & Pricing Polish
- [ ] **5.1 Sticky Mobile Bar**
  - [ ] Create `src/components/StickyMobileBar.tsx`
  - [ ] Add scroll listener to show only below hero on mobile viewports
  - [ ] Wire "Book Free Class" and "Get Directions" buttons
  - [ ] Ensure safe area padding for iPhone home indicator
- [ ] **5.2 Pricing Card Clarification**
  - [ ] Add "ALL-INCLUSIVE MEMBERSHIP · NO CONTRACT" badge in `src/components/Pricing.tsx`
  - [ ] Add note: "Includes all 24+ weekly Gi, No-Gi, Grappling & Open Mat sessions"

### Phase 6: Assembly & Verification
- [ ] **6.1 App.tsx Assembly**
  - [ ] Mount all new components in logical narrative order
- [ ] **6.2 Testing & Quality Assurance**
  - [ ] Run `npm run typecheck` (0 errors)
  - [ ] Run `npm run build` (0 errors)
  - [ ] Run `npm run lint` (0 errors)
  - [ ] Verify desktop and mobile layout transitions
