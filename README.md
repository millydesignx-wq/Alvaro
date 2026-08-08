# Armando Alvarez — Landing Page

A dark, cinematic, design-build contractor landing page built to the **"Sequel"** design
system (pure black canvas, warm-cream accent, editorial hairline type with an italic serif
payoff word). Hand-written HTML / CSS / JS — **no build step, no frameworks, no external
dependencies.**

## Files

```
index.html            # markup + copy
assets/css/styles.css # full design system + components + responsive + reduced-motion
assets/js/main.js     # interactions (see below)
```

Open `index.html` directly in a browser, or serve the folder:

```bash
npx http-server .      # then open the printed URL
```

## What's included

- **Hero** with background video + cinematic gradient/grain fallback, word-by-word headline
  reveal, floating glass "Reel" play button (opens a lightbox), and a scroll cue.
- **Interactions & micro-interactions:** custom blend-mode cursor (desktop only), magnetic
  buttons, animated underlines on every link, sheen/wipe fills on buttons, nav scroll state,
  animated mobile menu, scroll-progress bar, IntersectionObserver scroll reveals, animated
  count-up stats, hover-reveal service cards, masonry gallery with zoom, back-to-top, and a
  fully validated contact form with inline error micro-states.
- **Fully responsive** (1440 → 320px) with dedicated breakpoints at 1024 / 860 / 560px.
- **Accessible:** visible focus states, `prefers-reduced-motion` support, semantic landmarks,
  keyboard-operable menu/lightbox (Esc to close).

## ⚠️ Before you go live — replace the placeholders

This sandbox can't reach the internet, so imagery is referenced by URL and falls back to a
cinematic gradient if a URL is missing. On your machine the images load normally. Swap these:

### 1. Photography (Unsplash placeholders → your real project photos)
Every `<img>` uses an `images.unsplash.com` URL as a stand-in. Search-and-replace them with
your own high-res project photography (or keep the Unsplash shots if the license suits you —
they hotlink freely). Each image has a `data-media` attribute; if a photo fails to load, the
element hides and a tasteful dark gradient shows in its place, so the layout never breaks.

### 2. Hero + reel video (Pexels placeholders → your footage)
- Hero: `<video>` inside `.hero__media` — `assets`/`index.html`, `videos.pexels.com/...`
- Reel: `<video>` inside `.lightbox__inner`
Replace with your own compressed MP4 (H.264, ~1080p, muted, short loop for the hero).

### 3. Business details (currently placeholder)
| Field | Placeholder | Where |
|-------|-------------|-------|
| Phone | `(555) 210-4408` / `tel:+15552104408` | nav, hero-menu, contact, footer |
| Email | `build@armandoalvarezcontractor.com` | nav-menu, contact, footer |
| Address | `1200 Craftsman Way, Your City, ST 00000` | contact |
| Hours | `Mon–Fri, 7am–5pm` | contact |
| License # | `Lic. #000000` | footer |

`555` numbers are intentionally the fiction-safe range — swap in the real number.

### 4. Contact form
The form validates on the client and shows a success state, but **does not submit anywhere
yet.** Point it at your handler (Formspree, Netlify Forms, your backend, etc.) by adding an
`action`/`method` to `<form class="form">` and removing the `e.preventDefault()` success
shortcut in `main.js` (`form.addEventListener("submit", …)`), or wire it to `fetch()`.

## Design tokens

All colors, type scale, spacing, radii, shadows and motion live as CSS custom properties at
the top of `styles.css` (`:root`), mapped directly from the provided design system.
