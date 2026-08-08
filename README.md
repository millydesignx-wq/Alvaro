# Armando Alvarez — Landing Page

A light, editorial, **design-build contractor** landing page built to the **"Drawing Set"**
design system: a warm linen canvas, brown-black ink, and a restrained clay/terracotta accent,
with an architect's-drawing motif throughout — hairline grid, dimension-line dividers, plate
numbers, and blueprint image frames. Minimalist and calm, inspired by editorial Framer templates
(Whenevr / Lavande).

**One self-contained file. No build step, no frameworks, no external JS/CSS dependencies.**

```
index.html    # markup + copy + inline CSS + inline JS
```

Open `index.html` directly in a browser, or serve the folder:

```bash
npx http-server .      # then open the printed URL
```

## What's included

- **Hero** — masked, staggered headline reveal; a "plate"-captioned hero image in a blueprint
  frame; a floating spec chip (delivered / on-schedule / warranty).
- **Design system** — warm-linen palette with a clay accent, a serif display face paired with a
  clean sans and a **mono utility face** used for labels, plate numbers, and measurements.
- **Light + dark themes** — automatic (`prefers-color-scheme`) plus a manual toggle that persists
  in `localStorage`.
- **Interactions** — sticky/condensing nav, scroll-progress bar, IntersectionObserver reveals,
  animated count-up stats, credentials marquee, hover-reveal service grid, hover-caption gallery,
  magnetic buttons (fine-pointer only), animated mobile menu, back-to-top, and a validated
  contact form with inline error + success states.
- **Fully responsive** (1240 → 320px) with breakpoints at 1024 / 860 / 560px.
- **Accessible** — semantic landmarks, visible focus rings, `prefers-reduced-motion` support,
  keyboard-operable menu (Esc to close), and a no-JS fallback that shows all content.

## Imagery — Unsplash

Every photo is an `<img data-src="…unsplash…">` lazy-loaded over a **blueprint placeholder frame**.
When a photo loads it fades in; if a URL ever fails, the tasteful blueprint frame stays in place,
so the layout never breaks.

> **Note on preview:** in a sandboxed preview host (e.g. the claude.ai artifact viewer) external
> images are blocked by a strict content-security policy, so you'll see the blueprint frames instead
> of the photos. Served from this repo or any normal host, the Unsplash photos load normally.
> Swap these URLs for the client's own project photography before launch.

## Before you go live — replace the placeholders

| Field | Placeholder | Where |
|-------|-------------|-------|
| Phone | `(555) 210-4408` / `tel:+15552104408` | nav, mobile menu, contact, footer |
| Email | `build@armandoalvarezcontractor.com` | mobile menu, contact, footer |
| Address | `1200 Craftsman Way, Your City, ST` | contact |
| Hours | `Mon–Fri · 7am – 5pm` | contact |
| License # | `Lic. #000000` | footer |
| Photos | `images.unsplash.com/...` placeholders | throughout |

`555` numbers are the fiction-safe range — swap in the real number.

### Contact form

The form validates on the client and shows a success state, but **does not submit anywhere yet.**
To wire real delivery: add an `action`/`method` to `<form id="form">` (Formspree, Netlify Forms,
your backend, etc.) and replace the marked block at the end of the submit handler in the inline
`<script>` with a `fetch()` or native submit.

## Design tokens

All colors, type stacks, spacing, radii, and motion live as CSS custom properties at the top of the
inline `<style>` (`:root`), with light, `prefers-color-scheme: dark`, and `[data-theme]` variants.
