# Akuapem Traditional Council — Website Redesign Spec

## Context

This is the redesign spec for https://www.akuapemtraditionalcouncil.com/. The site is built with Expo (React Native for Web) using Expo Router for file-based routing. Styling uses React Native Web's `StyleSheet.create()`. All components use React Native primitives (`View`, `Text`, `Image`, `Pressable`, etc.).

The site currently works and has the right content structure. The goal is to elevate the visual design, add motion, and make the site feel modern and alive — while respecting the existing brand identity (deep green + gold color palette, serif headings).

Routes: `/`, `/about`, `/towns`, `/community`, `/subscribe`, `/contact`, `/community/obituaries`, `/community/weddings`, `/admin`

---

## Brand Tokens

Create a shared theme/constants file if one doesn't exist. Use these values consistently across the entire site.

**Colors:**
- Primary dark green: `#1a5632`
- Mid green: `#22703f`
- Gold accent: `#d4a843`
- Light gold: `#f0e6c8`
- Dark gold: `#b8922e`
- Off-white background: `#f5f2eb`
- White: `#ffffff`
- Dark text: `#2d2d2d`
- Muted text: `#6b6b6b`
- Green overlay: `rgba(26, 86, 50, 0.6)`
- Gold overlay: `rgba(212, 168, 67, 0.75)`

**Typography:**
- Headings: Georgia or serif fallback. If custom fonts are set up, use Playfair Display.
- Body text: system-ui / sans-serif stack.
- Section label style: 13px, uppercase, letter-spacing 3, gold color, bold weight.

**Spacing:**
- Vertical padding between major sections: 100px desktop, 60px mobile
- Max content width: 1200px, centered
- Horizontal page padding: 8% of viewport width
- Card grid gap: 24px
- Card border radius: 12px

---

## Dependencies to Install

- `react-intersection-observer` — for triggering animations when elements scroll into view
- `react-countup` — for animated number counting in the stats section

---

## Shared Components to Create

### AnimateOnScroll wrapper
Create a reusable component that wraps any child and makes it fade in + slide up when it enters the viewport. It should accept an optional `delay` prop (in milliseconds) for staggering multiple items in a row. Use `react-intersection-observer` with `triggerOnce: true` and `threshold: 0.1`. The animation should be: opacity 0 → 1 and translateY 30px → 0 over 0.7 seconds with ease-out timing. On non-web platforms, just render children without animation.

### PlaceholderImage component
Create a simple branded placeholder for use where real photos aren't available yet. It should render a dark green rectangle at a given height with faint centered text that says "Photo coming soon." This gets swapped for real `<Image>` components later.

### useResponsive hook
Create a hook that returns `{ isMobile, isTablet, isDesktop, width }` using `useWindowDimensions()`. Breakpoints: mobile < 768, tablet 768–1023, desktop ≥ 1024. Use this throughout the site to switch between row/column layouts, adjust font sizes, and control spacing.

### Shared section heading pattern
Create a reusable section heading style used consistently across all pages. It includes: a small gold uppercase label on top (like "OUR COMMUNITIES"), a large serif heading below it, and an optional muted subtitle underneath. All centered.

---

## Homepage Redesign — Section by Section

### Hero Section

**Current state:** Flat dark green background. AK logo in a gold-bordered circle. "Akuapem Traditional Council" heading. Tagline paragraph. Two buttons ("Learn About Us" and "Subscribe for Updates").

**Changes:**
- Remove the centered AK logo from the hero. It can stay in the navbar.
- Make the hero full viewport height on desktop (at least 700px), ~500px on mobile.
- Add a full-bleed background image that covers the entire hero. Use a placeholder image for now (dark green rectangle). When real photography is available, use a panoramic shot of the Akuapem Ridge or an Odwira festival procession.
- Layer a semi-transparent dark green overlay on top of the image so white text remains readable.
- Above the main title, add a short gold uppercase tagline: **"Heritage. Unity. Progress."** — styled as the section label pattern (small, uppercase, letter-spaced, gold).
- Add a thin gold horizontal divider line (60px wide, 2px tall) between the tagline and the title.
- Keep the title "Akuapem Traditional Council" but make it larger (56px desktop, 36px mobile), white, serif font.
- Keep the subtitle paragraph but trim it shorter. Max 2 lines.
- Keep both buttons but restyle them: "Learn About Us" should be a solid gold button with dark green text. "Subscribe for Updates" should be an outlined button with gold border and gold text.
- Add a subtle animated scroll-down chevron at the bottom of the hero.

---

### Welcome / Introduction Section

**Current state:** Left-aligned heading "Welcome to the Akuapem Traditional Council." Two paragraphs of text. Small card on the right showing "Ahenfie (Royal Palace)" with a generic building icon.

**Changes:**
- Convert to a two-column layout: image on the left (55% width), text on the right (45%).
- The left column should show a large photo of the Royal Palace (use PlaceholderImage until a real photo is available). The image should have rounded corners (12px) and fill the full height of the section.
- The right column contains: a gold section label ("WELCOME"), a serif heading ("The Custodians of Akuapem Heritage"), 2 short paragraphs of body text (trim the current text down — no more than 4-5 sentences total), and a gold text link ("Meet the Council →") that routes to `/about`.
- Remove the separate "Ahenfie (Royal Palace)" card — it's now replaced by the image column.
- On mobile: stack to single column, image on top, text below.
- Wrap the entire section in AnimateOnScroll.

---

### Stats Section

**Current state:** Three stats on a beige background — "17 / Principal Towns", "100+ / Years of Heritage", "1 / United Kingdom". Small text, plain styling.

**Changes:**
- Change the background to dark green (`#1a5632`).
- Make the numbers dramatically larger: 56px, bold, serif, gold colored.
- Labels underneath: 15px, uppercase, letter-spaced, white with slight transparency.
- Use the `react-countup` library to animate the numbers counting up from 0 when the section scrolls into view. Trigger with `react-intersection-observer`.
- Change "100+" to "300+" (or whatever is historically accurate — Akuapem's history goes back centuries).
- Horizontal layout on desktop with even spacing. Vertical stack on mobile with 40px gap between each stat.
- Section padding: 80px vertical.

---

### Quick Access Cards

**Current state:** Four white cards with small gold circle icons (Obituaries, Weddings, Our Towns, Contact Us). Flat appearance, no hover effects.

**Changes:**
- Make cards taller with more padding (32px internal padding).
- Left-align all content within each card.
- Make the icon larger (32px) and place it at the top.
- Title in serif font, 20px, bold.
- Description text in muted gray, 15px.
- Add a gold arrow "→" at the bottom of each card.
- Add hover effect (web only): card lifts up 6px, shadow deepens, arrow shifts right slightly. Use smooth transitions (0.3s ease).
- Add a subtle border (1px, light gray).
- Wrap each card in AnimateOnScroll with staggered delays (0ms, 100ms, 200ms, 300ms) so they animate in one after another.
- On mobile: stack cards to single column, full width.

---

### Latest Announcements Section

**Current state:** Horizontal scrolling row of text-only cards. Some cards overflow off the right edge of the screen. Category labels as colored text.

**Changes:**
- Show exactly 3 cards on desktop in a row. No horizontal overflow or scrolling.
- Each card should have space at the top for an image (180px tall). Use PlaceholderImage until real event photos are available.
- Below the image: a colored category pill/badge (small rounded rectangle with white text on a colored background — gold for events, green for development, blue for council).
- Then the title (serif, 20px, bold), description (15px, muted, max 3 lines), and date (13px, light gray).
- Add hover lift effect identical to the Quick Access cards.
- Below the 3 cards, add a centered "View All Announcements →" link in gold.
- On mobile: stack to single column.
- Use the shared section heading pattern above the cards: label "LATEST NEWS", title "Announcements", subtitle "Stay informed with the latest news from the Council."

---

### Subscribe / CTA Banner

**Current state:** Flat gold background. "Stay Connected with Your Community" heading. "Subscribe Now" button.

**Changes:**
- Add a background image behind the gold overlay (use PlaceholderImage for now — eventually a community gathering or festival photo).
- The gold overlay should sit on top of the image at about 80% opacity.
- Add a thin dark green divider line above and below the content (same style as the hero divider).
- Add a descriptive line between the heading and button: "Festival dates, council decisions, obituaries, wedding announcements — delivered to your inbox."
- Button should be dark green background with white text (inverted from the hero buttons for contrast against the gold).
- Heading: white, 36px, serif.

---

### Footer

**Current state:** Dark green footer with logo, tagline, Quick Links, Contact Us, social icons, copyright.

**Changes (minor):**
- Add hover opacity change on social media icons (0.7 → 1.0 on hover).
- Make sure all social media links point to real, active profiles. If they don't exist yet, remove the icons until they do.
- Consider adding a small "Back to Top" link or button.
- Everything else is fine — the footer is clean and functional.

---

## Towns Page Redesign

### Current state
- Hero banner with "Towns & Communities" heading (fine, keep it).
- Location & Boundaries text section and Districts text section.
- "Map of Akuapem Traditional Area" heading (but no visible map).
- Grid of town cards, each with an identical green house icon, town name, chief's name, and "Learn more" link.

### Changes

**Town cards:**
- Replace the house icon placeholder with a town-specific image. Use PlaceholderImage for now, with the town name as the label. Each town should have its own image asset slot in `assets/images/towns/[townname].jpg`.
- Add a division tag to each card — a small colored pill showing which division the town belongs to (Benkum, Nifa, Adonten, Kyidom, Gyase). Use different colors for each division.
- Add hover lift effect on each card (same as homepage cards).
- Wrap each card in AnimateOnScroll with staggered delay.
- On mobile: 1 column. On tablet: 2 columns. On desktop: 4 columns (current layout, keep it).

**Map section:**
- If there's a map placeholder or heading with no actual map, either implement an embedded map (Google Maps or a static SVG map of the ridge showing town locations) or remove the heading until a map is ready. An empty "Map of..." heading with nothing below it looks unfinished.

**Data accuracy note:** The chief names and division assignments should be verified by the site owner. If a data file exists for towns, add a `division` field to each town entry.

---

## About Page Redesign

### Current state
- Hero banner with "About the Council" heading (fine, keep it).
- "Our History" section — one paragraph of text with no images.
- "Our Structure" section — a CSS-based organizational chart (Okuapehene → Divisional Chiefs → Elders → Committees).
- Royal Portrait section — placeholder with person icon and "Photo forthcoming."

### Changes

**History section:**
- Keep the text but break it into shorter paragraphs (no more than 3-4 sentences each).
- Add a photo alongside the text (two-column layout, same as homepage welcome section). Use PlaceholderImage for now — eventually a historical photo, image of the palace, or a festival scene.
- On mobile: stack to single column.

**Organizational chart:**
- The current chart is functional. Keep the structure but polish the visual styling:
  - Use the brand green for the Okuapehene box and a slightly lighter shade for Divisional Chiefs.
  - Add subtle rounded corners and shadows to each box.
  - Make the connecting lines cleaner.

**Leadership / Royal Portrait section:**
- This is the most important part to fix. Replace the generic person icon placeholder with a proper leadership layout.
- Two-column: portrait image on the left (use PlaceholderImage with label "Royal Portrait" until a real photo is added), biographical info on the right.
- Right column should include: a gold section label ("OKUAPEHENE"), the full name in large serif text ("Oseadeeyo Nana Kwasi Akufo III"), the title ("President, Akuapem Traditional Council"), a thin gold divider, and 2-3 sentences of biographical text.
- On mobile: stack to single column, image on top.
- Wrap in AnimateOnScroll.

---

## Global Changes (All Pages)

### Scroll animations
Wrap every major section on every page in the AnimateOnScroll component. This single change will make the entire site feel dramatically more modern.

### Smooth scrolling
Enable smooth scroll behavior site-wide on the web. When any anchor link or scroll indicator is clicked, the page should glide to the target instead of jumping.

### Section spacing
Increase vertical padding on all major sections to at least 80-100px on desktop, 60px on mobile. The current sections feel too close together.

### Hover states on all interactive elements
Every button, card, and link should have a visible hover state on web — either a color change, lift, underline animation, or opacity shift. Currently most elements have no hover feedback.

### Open Graph meta tags
Add OG meta tags so the site shows a rich preview when shared on WhatsApp, Facebook, or Twitter. Include: og:title, og:description, og:image (use a 1200×630 branded image), og:url, og:type.

### Page transition animations
When navigating between routes (Home → About → Towns, etc.), add a subtle fade transition instead of a hard page swap. Expo Router supports layout-level transitions.

---

## Image Asset Checklist

Create the following directory structure. Every path listed here should eventually contain a real photograph. Until then, the PlaceholderImage component fills in.

```
assets/images/
├── hero/
│   ├── ridge-panorama.jpg         (Akuapem Ridge landscape, 1920×1080+)
│   ├── odwira-festival.jpg        (Festival procession)
│   └── royal-palace.jpg           (Ahenfie exterior)
├── towns/
│   ├── abiriw.jpg
│   ├── adukrom.jpg
│   ├── akropong.jpg
│   ├── amanokrom.jpg
│   ├── apirede.jpg
│   ├── aseseeso.jpg
│   ├── awukugua.jpg
│   ├── berekuso.jpg
│   ├── aburi.jpg
│   ├── dawu.jpg
│   ├── larteh.jpg
│   ├── mamfe.jpg
│   ├── mampong.jpg
│   ├── mangoase.jpg
│   ├── obosomase.jpg
│   ├── tinkong.jpg
│   └── tutu.jpg
├── about/
│   ├── okuapehene-portrait.jpg    (Formal portrait)
│   ├── council-meeting.jpg
│   └── palace-interior.jpg
├── community/
│   ├── odwira-event.jpg
│   ├── cultural-day.jpg
│   └── community-project.jpg
└── og-image.jpg                   (1200×630, for social sharing previews)
```

---

## Implementation Order

1. Install dependencies (`react-intersection-observer`, `react-countup`)
2. Create shared utilities: theme constants file, `AnimateOnScroll` component, `PlaceholderImage` component, `useResponsive` hook, shared section heading styles
3. Set up the image asset directory structure
4. Homepage hero section redesign
5. Homepage welcome/introduction section redesign
6. Homepage stats section redesign
7. Homepage Quick Access cards redesign
8. Homepage announcements section redesign
9. Homepage subscribe banner redesign
10. Towns page card redesign
11. About page history and leadership section redesign
12. Global polish: smooth scrolling, OG meta tags, section spacing increase, hover states, page transitions

After each step, run `npx expo start --web` and verify the changes look correct in the browser. Test both desktop and mobile widths.

---

## What This Spec Does NOT Cover

- **Sourcing actual photographs.** Every PlaceholderImage must eventually be replaced with real photos. This is the single most important factor in the redesign and must be done by the site owner.
- **Verifying data accuracy.** Chief names, division assignments, town details, and historical facts should be reviewed by the council.
- **Content copywriting.** Suggested text in this spec is approximate. Final copy should be approved by the council.
- **Backend or API changes.** This is purely a frontend visual redesign.
- **Domain, hosting, or deployment changes.** No infrastructure changes needed.
