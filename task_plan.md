# Task Plan

## Phase 1: B - Blueprint (Vision & Logic)
- [ ] **Discovery:**
    - [x] Define North Star (Customer Acquisition)
    - [x] Select Host (Vercel)
    - [x] **Decision:** Contact Form Backend → Option B (DB + Email)
    - [ ] **ACTION:** Select specific providers (Recommendation: Vercel Postgres + Resend)
    - [ ] **ACTION:** Confirm Content Strategy (Placeholders vs Real Copy)
- [x] **Schema:** Defined Contact Form JSON shape in `gemini.md`.
- [ ] **Research:** Look for modern agency design trends/inspiration.

## Phase 2: L - Link (Connectivity)
- [ ] Initialize Next.js Project (`npx create-next-app@latest`)
- [ ] Set up Git Repository
- [ ] Connect to Vercel (CLI or Dashboard)
- [ ] Verify environment variables (if any API keys are needed for forms)

## Phase 3: A - Architect (The Build)
- [ ] **Setup:**
    - [ ] Configure Tailwind CSS
    - [ ] Install essential libraries (clsx, tailwind-merge, lucide-react)
    - [ ] Create folder structure (`components/ui`, `app/`, `lib/`)
- [ ] **Core Components:**
    - [ ] Navigation / Header
    - [ ] Footer
    - [ ] Button & Card Primitives
    - [ ] Contact Form Component (Client-side validation)
- [ ] **Pages:**
    - [ ] Landing Page (Hero, Value Prop, Services, Portfolio, Testimonials, CTA)
    - [ ] Contact Page

## Phase 4: S - Stylize (Refinement & UI)
- [ ] Implement "Wow" factor (Animations with Framer Motion?)
- [ ] Responsive Design Check (Mobile/Tablet/Desktop)
- [ ] SEO Optimization (Metadata, sitemap)

## Phase 5: T - Trigger (Deployment)
- [ ] Final Build Check (`npm run build`)
- [ ] Deploy to Vercel Production
- [ ] Verify Contact Form functionality
