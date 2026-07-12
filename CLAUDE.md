# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website for the **Akuapem Paramount King Council** - a traditional council in Ghana. Built with React Native Web (Expo) for cross-platform support (web + mobile).

## Tech Stack

- **Framework**: Expo SDK 52 with React Native Web
- **Routing**: Expo Router (file-based)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Fonts**: Playfair Display (headings), Inter (body), Cinzel (accent)
- **Icons**: @expo/vector-icons (FontAwesome)

## Commands

```bash
# Development
npm run web          # Start web development server
npm run ios          # Start iOS simulator
npm run android      # Start Android emulator
npx expo start       # Start Expo dev server (all platforms)

# Build
npx expo export --platform web   # Export static web build
```

## Project Structure

```
app/                      # Expo Router pages
├── (tabs)/              # Tab-based navigation
│   ├── index.tsx        # Home page
│   ├── about.tsx        # About the council
│   ├── towns/           # Towns directory
│   │   ├── index.tsx    # Town listing (17 towns)
│   │   └── [id].tsx     # Individual town detail
│   ├── community/       # Community updates
│   │   ├── index.tsx    # Updates hub
│   │   ├── obituaries.tsx
│   │   ├── weddings.tsx
│   │   └── announcements.tsx
│   ├── subscribe.tsx    # Email subscription
│   └── contact.tsx      # Contact form
├── _layout.tsx          # Root layout with fonts

components/
├── ui/                  # Base components (Button, Card, Input, Typography)
├── layout/              # Header, Footer, PageLayout
└── home/                # Home page components (Hero, QuickLinks, etc.)

constants/
├── Colors.ts            # Color palette
└── mockData.ts          # Placeholder data

types/                   # TypeScript interfaces
```

## Design System

### Colors (single source of truth: `constants/tokens.ts`, mirrored in tailwind.config.js; `constants/Colors.ts` and `constants/theme.ts` derive from it)
- `gold` / `gold-light` / `gold-muted` - Primary accent (#d4a843 / #f0e6c8 / #b8922e)
- `green-deep` / `green-mid` / `green-dark` - Secondary (#1a5632 / #22703f / #0e3320)
- `red-kente` - Urgent/important (#8B0000)
- `cream` - Light backgrounds (#faf8f3)
- `gray-warm` - Backgrounds (#f5f2eb)
- `gray-charcoal` - Body text (#2d2d2d)
- `gray-muted` - Muted text (#6b6b6b)
- `blue-heritage` - Links (#1E4D8B)
- `brown-earth` - Borders (#8B4513)

Never hardcode hex values in components — use NativeWind token classes, or `tokens`/`theme` from `constants/` for JS-level colors.

### Typography Classes
- Display: `text-display md:text-display-desktop` (hero headlines, use `Display` component)
- Eyebrow: `text-eyebrow` Cinzel uppercase gold labels (use `Eyebrow` component)
- Headings: `font-heading` / `font-heading-bold`
- Body: `font-body` / `font-body-medium` / `font-body-semibold`
- Accent: `font-accent` (for titles, PK name)

### Responsive Breakpoints
- Mobile: < 768px
- Desktop: >= 768px
- Use `useWindowDimensions()` hook for responsive logic

## Key Patterns

### Page Layout
All pages use `PageLayout` component which includes Header and Footer:
```tsx
import { PageLayout, Section } from "@/components/layout";

export default function MyPage() {
  return (
    <PageLayout>
      <Section background="white">
        {/* Content */}
      </Section>
    </PageLayout>
  );
}
```

### Navigation
- Desktop: Header navigation bar (tab bar hidden)
- Mobile: Bottom tabs + hamburger menu in header

## Backend Status

Currently frontend-only with mock data in `constants/mockData.ts`. Backend integration planned for Phase 2.

## Reference Documents

- `docs/AKUAPEM_PARAMOUNT_KING_COUNCIL WEBSITE_SITEMAP v1.md` - Feature requirements
- `docs/AKUAPEM_PARAMOUNT_KING_COUNCIL_WEBSITE_Design.md` - Design guidelines
