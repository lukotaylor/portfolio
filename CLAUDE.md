# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build (uses Turbopack)
- `npm run lint` — ESLint (v9 flat config, extends next/core-web-vitals + next/typescript)
- No test framework is configured

## Tech Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript 5**
- **Tailwind CSS 4** — configured via `@import "tailwindcss"` and `@theme inline` in `globals.css` (no tailwind.config file; uses PostCSS plugin `@tailwindcss/postcss`)
- Mix of `.tsx` (layout) and `.jsx` (all components/pages) — new files should use `.jsx` for consistency with the component layer

## Architecture

This is a single-page product designer portfolio with three layers:

### Data layer (`app/data/`)
Static JS modules exporting constants: `profileData`, `experiences`, `themes`, `fonts`/`fontSizes`. The experiences array drives the entire main feed and case-study views.

### UI primitives (`app/components/ui/`)
Small, reusable components (`Button`, `IconButton`, `NavItem`, `Divider`, `Footer`). All use **inline styles with CSS custom properties** (e.g. `var(--color-accent)`) — not Tailwind utility classes — for theme-aware dynamic styling. Some components mix both approaches.

### Section components (`app/sections/`)
Larger composites: `Sidebar`, `ExperienceFeed`, `ProjectCarousel`, `ThemeCustomizer`, `CaseStudyModal`, `StandaloneCaseStudy`. These are assembled in `app/page.jsx`.

### Theme system
`ThemeProvider` (named export from `app/components/ui/ThemeProvider.jsx`) wraps the app in `layout.tsx`. It:
- Stores `{ mode, font, fontSize }` in React context and localStorage
- Sets `data-theme` attribute on a wrapper div
- `globals.css` maps 5 theme palettes (`dark`, `light`, `nature`, `desert`, `space`) via `[data-theme="..."]` selectors to CSS custom properties
- The `@theme inline` block in `globals.css` bridges CSS vars into Tailwind utilities (e.g. `bg-bg-primary`, `text-text-secondary`)

Components consume the theme via `useTheme()` hook or directly through CSS variables.

### Page orchestration (`app/page.jsx`)
Thin orchestration layer (~190 lines) that manages state for: theme customizer visibility, case-study modal/standalone views, carousel indices, and scroll effects. Delegates all rendering to section components.

Two view modes: **main portfolio** (sidebar + experience feed) and **standalone case study** (full-page deep-dive). A modal case study also exists for non-standalone projects and the "About" section.

## Layout Rules

- **Single Container strategy:** The content area uses one container with a max-width constraint. Do not nest additional width-constraining containers inside it.
- **Footer:** Must be full-width within the container but constrained by the same max-width as the main content. Never render the footer edge-to-edge against the viewport.

## Key Patterns

- All components are `"use client"` — this is a fully client-rendered app
- Styling is predominantly **inline styles with CSS custom properties**, not Tailwind utilities. Preserve this pattern when editing existing components.
- Google Fonts are loaded via `<link>` tags in `layout.tsx` (Space Grotesk, Inter, Poppins, Plus Jakarta Sans, Noto Sans, Lexend, Work Sans)
- Font switching is handled at runtime by `ThemeProvider` setting `fontFamily` on the wrapper div
