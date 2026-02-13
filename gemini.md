# Project Constitution

## 1. North Star
Build a high-converting, modern web design agency website hosted on Vercel to acquire new customers.

## 2. Tech Stack & Architecture
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with potential for Framer Motion for animations)
- **Deployment:** Vercel
- **Form Handling:** Option B (Database + Email Notification)
    - **Database:** Postgres (e.g., Vercel Postgres or Supabase)
    - **Email:** Transactional API (e.g., Resend)

## 3. Data Schemas

### Contact Form Submission
```json
{
  "name": "string (required)",
  "email": "string (email format, required)",
  "company": "string (optional)",
  "service_interest": "string (enum: 'Web Design', 'Development', 'SEO', 'Other')",
  "message": "string (required)",
  "budget_range": "string (optional)"
}
```

## 4. Behavioral Rules
- **Design:** Premium, modern, responsive aesthetics (Glassmorphism, vibrant accents, dark mode support).
- **Performance:** Core Web Vitals optimized (LCP, CLS, INP).
- **SEO:** Semantic HTML, proper meta tags, OpenGraph support.
- **Code:** Strict TypeScript, reusable components, atomic design structure.

