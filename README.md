# WAC — Premium Agency Site

Cinematic Next.js 14 + Tailwind + GSAP + Swiper agency site inspired by webandcrafts.com.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- GSAP (hero per-slide animations)
- Swiper.js (hero + testimonials)
- Lucide icons
- Plus Jakarta Sans + Syne (Google Fonts)

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Sections
1. Sticky transparent → blurred Nav (mobile fullscreen overlay)
2. Hero fullscreen Swiper slider with Ken Burns + thumb strip + counter
3. Case Studies grid with stagger reveal + hover scale
4. Stats with CountUp on scroll
5. Services grid with hover color flip
6. Gen AI gradient/blob section
7. Client logos infinite marquee (two opposing rows)
8. Testimonials Swiper carousel
9. Careers split layout with spinning circular SVG text badge
10. Insights blog grid
11. Footer CTA banner
12. Footer with social icons

## Animations
- Word-by-word clip-path heading reveal (`RevealText`)
- IntersectionObserver staggered card reveals
- Ken Burns zoom on hero images
- GSAP timeline per Swiper slide change
- CSS marquee + spin keyframes
- Custom blend-mode cursor (desktop)
- Respects `prefers-reduced-motion`
