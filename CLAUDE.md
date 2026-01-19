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

### Colors (defined in tailwind.config.js)
- `gold` / `gold-light` - Primary accent (#D4AF37)
- `green-deep` - Secondary (#1B4D3E)
- `red-kente` - Urgent/important (#8B0000)
- `gray-warm` - Backgrounds (#F5F5F0)
- `gray-charcoal` - Body text (#2C3E50)
- `blue-heritage` - Links (#1E4D8B)
- `brown-earth` - Borders (#8B4513)

### Typography Classes
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
