# Armando Alvarez — Landing Page

A neat, minimalist **design-build contractor** landing page: a near-white warm canvas, a single
restrained clay accent, **Manrope** headlines and **DM Sans** body/captions, generous whitespace,
and precise, orderly grids. Inspired by the calm editorial minimalism of Framer templates like
Whenevr.

**One self-contained file. No build step, no frameworks, no external requests** — the fonts are
embedded as woff2 data URIs, so it renders identically offline, on any host, and in a sandboxed
preview.

```
index.html    # markup + copy + inline CSS (incl. embedded fonts) + inline JS
```

Open `index.html` directly in a browser, or serve the folder:

```bash
npx http-server .      # then open the printed URL
```

## What's included

- **Hero** — staggered line-by-line headline reveal (Manrope), short supporting copy, dual CTAs,
  and a wide hero image frame.
- **Design system** — near-white warm palette (`--paper #F8F7F4`) with one clay accent
  (`--clay #B4573A`); Manrope for all headings/UI, DM Sans for body and captions.
- **Light + dark themes** — automatic (`prefers-color-scheme`) plus a manual toggle that persists
  in `localStorage`.
- **Interactions** — condensing sticky nav, scroll-progress bar, IntersectionObserver reveals,
  animated count-up stats, a quiet credentials marquee, hover-lift service cards, a fully
  responsive slide-down mobile menu (Esc / tap-to-close, scroll-locked), back-to-top, and a
  validated contact form with inline error + success states.
- **Fully responsive** (1200 → 320px) with breakpoints at 1000 / 820 / 560px.
- **Accessible** — semantic landmarks, visible focus rings, `prefers-reduced-motion` support,
  keyboard-operable menu, and a no-JS fallback that shows all content.

## Imagery — placeholders, ready to swap

Every image slot is a clean neutral **placeholder** (`.shot`) with a small corner tag naming what
belongs there (e.g. *Custom home*, *Oakview Kitchen*). Drop in real photography by placing an
`<img>` inside the `.shot` element:

```html
<div class="shot"><img src="your-photo.jpg" alt="…" /><span class="shot__tag">Custom home</span></div>
```

The `<img>` fills the frame (`object-fit:cover`) and covers the placeholder automatically. Source
high-res photos from Unsplash / Lummi (or the client's own project photos) and swap them in — no
other markup changes needed.

## Before you go live — replace the placeholders

| Field | Placeholder | Where |
|-------|-------------|-------|
| Phone | `(555) 210-4408` / `tel:+15552104408` | nav, mobile menu, contact, footer |
| Email | `build@armandoalvarezcontractor.com` | mobile menu, contact, footer |
| Address | `1200 Craftsman Way, Your City, ST` | contact |
| Hours | `Mon–Fri · 7am – 5pm` | contact |
| License # | `Lic. #000000` | footer |
| Photos | neutral `.shot` placeholders | throughout |

`555` numbers are the fiction-safe range — swap in the real number.

### Contact form

The form validates on the client and shows a success state, but **does not submit anywhere yet.**
To wire real delivery: add an `action`/`method` to `<form id="form">` (Formspree, Netlify Forms,
your backend, etc.) and replace the marked block at the end of the submit handler in the inline
`<script>` with a `fetch()` or native submit.

## Design tokens

All colors, type stacks, spacing, radii, and motion live as CSS custom properties at the top of the
inline `<style>` (`:root`), with light, `prefers-color-scheme: dark`, and `[data-theme]` variants.
