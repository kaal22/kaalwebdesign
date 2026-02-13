# Preferred Tech Stack & Implementation Rules

When generating code or UI components for **Kaal**, you **MUST** strictly adhere to the following technology choices.

## Core Stack

*   **Framework:** Next.js 14+ (App Router, TypeScript)
*   **Styling Engine:** Tailwind CSS
*   **Animation:** Framer Motion (Critical for the "premium" feel. Use for reveal effects, hover states, and smooth transitions.)
*   **Icons:** Lucide React (Stroke width: 1.5px or 2px to match bold typography)

## Implementation Guidelines

### 1. Visual Style (The "Kaal" Look)

*   **Dark Mode First:** The default theme is deep black (`bg-[#050505]`).
*   **Orange Accents:** Use `#FF6B00` sparingly but impactfully (buttons, active states, glowing borders).
*   **Grids & Borders:** Use visible grid lines (subtle `border-white/10`) to create structure.
*   **Glassmorphism:** Use `backdrop-blur-md` combined with low-opacity white backgrounds (`bg-white/5`) for cards.

### 2. Component Patterns

*   **Buttons:** Sharp corners (`rounded-none` or `rounded-sm`). Primary buttons are solid Orange. Text should be uppercase and bold.
*   **Typography:** Headings (`h1`-`h3`) should use `font-syne` (or similar bold display font) and be very large.
*   **Layout:** heavily rely on CSS Grid (`grid-cols-12`) for asymmetrical, magazine-style layouts.

### 3. Forbidden Patterns

*   Do NOT use standard Bootstrap/Material Design shadowing (e.g., big soft drop shadows). Use glows or sharp borders instead.
*   Do NOT use rounded "pill" shapes for buttons. Keep it industrial/sharp.
*   Do NOT use light mode by default.
