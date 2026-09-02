# AYNZEN

Website for **AYNZEN** — an aerial film production and visual storytelling
studio focused on drone cinematography, built in Dubai.

The design/behavior is modeled directly on the
[Amber Framer template](https://amber.framer.media/) — layout, spacing,
typography, and scroll/animation behavior are reproduced as closely as
technically possible, with AYNZEN's own content, footage, and brand.

## Tech stack

- **React 19** + **Vite 8** (`npm run dev`)
- **Tailwind CSS 4** for layout/type — theme tokens (colors, fonts, custom
  breakpoints) live in `src/index.css`
- **GSAP** (+ `ScrollTrigger`) for scroll-linked and reveal animations
- **Lenis** for the site's smooth-scroll feel
- **React Router** for client-side routing between pages
- Plain JS + JSX (no TypeScript), matching the other Lamma-family projects
- **oxlint** for linting, **Playwright** (dev-only) for visual verification
  during development — not a project test suite

## Getting started

```bash
npm install
npm run dev       # http://localhost:5176
npm run build     # production build to dist/
npm run preview   # preview the production build
```

The dev server port is fixed at **5176** (see `vite.config.js`) and binds to
all network interfaces (`host: true`), so it's reachable from other devices
on the same LAN at `http://<your-lan-ip>:5176`.

### A note on `public/videos`

Vite's dev-server file watcher is deliberately configured to **ignore all of
`public/**`** (see `vite.config.js`) — without this, adding a large file
mid-session (video or otherwise) reliably crashed the dev server with an
`EBUSY` error on Windows (a brief OS-level lock right after a file is copied
in). This was originally scoped to just `public/videos/**` and
`public/company logo/**`, but a new `public/Pictures/**` folder crashed the
server the same way, so it now covers the whole tree instead of naming each
subfolder one at a time.

The trade-off, confirmed to go beyond just the crash: **a file added to
`public/` after the dev server started won't actually be servable — Vite
falls through to the SPA shell (`200 text/html` instead of the real file)
until the dev server is restarted**, even though editing an *existing*
file's contents is picked up fine. Restart (`npm run dev`) any time a new
file lands under `public/`, before wiring it up in a component.

## Pages

| Route       | File                    | Notes                                             |
| ----------- | ----------------------- | -------------------------------------------------- |
| `/`         | `src/pages/Home.jsx`    | Hero, logo strip, project gallery, About, Footer   |
| `/about`    | `src/pages/About.jsx`   | Nav's "About" destination — Intro, Our Story + stats, then the same "Start Your Story" CTA/footer as the homepage |
| `/contact`  | `src/pages/Contact.jsx` | "Let's talk" destination — info + contact form     |

Note `src/pages/About.jsx` (the standalone About page) is distinct from
`src/components/About.jsx` (the homepage's own services section, `id="about"`,
still linked from the nav's "Services" item) — same name, different folders,
not the same content.

Both pages share `Nav` (rendered once in `App.jsx`, outside `<Routes>`) and
the site's dark theme. Cross-page section links (e.g. "About" from the
Contact page) are plain `<a href="/#about">` tags rather than router
`Link`s — see the comment in `Nav.jsx` for why, and `App.jsx`'s
`ScrollToTop` component for how the hash-scroll is made to actually work
in a client-rendered SPA.

## Structure

```
src/
  components/       Shared UI: Nav, Hero, ProjectsGallery, About, Footer,
                     FooterBar, RollingText, TickRuler, LogoMarquee,
                     LogoStrip, ShowreelModal
  pages/            Home.jsx, Contact.jsx
  data/             projects.js, services.js — homepage copy/content
  lib/              useLenis, useAppear, lenisInstance (see below)
  index.css         Tailwind theme tokens (colors, fonts, breakpoints)
public/
  videos/           Project + hero background footage (see naming below)
  company logo/     AYNZEN logo used in the marquee
```

### Notable implementation details

- **`RollingText`** reproduces the reference's per-character hover "roll"
  effect (nav links, logo, footer CTA) — a text-shadow duplicate one
  line-height below the real glyphs, revealed via `translateY` on hover.
- **`ProjectsGallery`** pins each project with native `position: sticky`
  (no JS pin) — later projects simply cover earlier ones via DOM order +
  z-index. The inner video has a scroll-linked parallax offset, and each
  project's title/caption lives *inside* its own box (not a separate
  overlay) — see the comments at the top of the file for why, including
  what was tried and ruled out along the way.
- **`useAppear`** is the shared scroll-reveal hook (opacity/translateY,
  matching the reference's load-in animation). Its trigger threshold is
  `'top bottom'` specifically so it still fires reliably for elements at
  the very bottom of the page (the footer) — a narrower threshold measured
  a trigger point beyond the page's actual max scroll and never fired.
- **`lenisInstance.js`** is a tiny singleton so components outside the
  scroll-setup hook (e.g. `ShowreelModal`) can pause/resume Lenis without a
  full context provider.
- **`ShowreelModal`** is a video lightbox (fade + scale, Escape/backdrop/✕
  to close, pauses Lenis + locks body scroll while open) triggered by the
  "Showreel" nav item. The Vimeo embed URL and its `referrerPolicy` need to
  exactly match what Vimeo's own "Share → Embed" panel outputs for that
  video, or the player 401s.

## Content that's still placeholder / needs a decision

- **`src/data/services.js`** is a draft re-mapping of the reference
  template's service list to aerial/drone work — wording isn't locked.
- **Footer social links** (`FooterBar.jsx`) and the **Contact page's**
  social links (`Contact.jsx`) only have a real URL for Instagram; Vimeo
  and LinkedIn are `href="#"` placeholders.
- **The contact form** (`Contact.jsx`) submits via
  [Web3Forms](https://web3forms.com) — a client-side `fetch` POST, no
  backend needed. The destination address (`Moekhalil@aynzen.com`) is tied
  to the access key on Web3Forms' side, not passed from the form. The key
  lives in `.env` as `VITE_WEB3FORMS_KEY` (gitignored) — get one free by
  entering the destination email at web3forms.com; without a valid key set,
  submissions will fail with the "Something Went Wrong" state.
- Placeholder project entries in `projects.js` without a `video` key
  render a gradient background with an "Aerial footage placeholder" label
  instead of a video.

## Media asset naming

Video files live under `public/videos/<Project Name>/`. A few things worth
knowing if adding more:

- **Avoid `&` in folder/file names** — it broke Vite's dev-server static
  file resolution in testing (confirmed independent of URL-encoding).
  Display titles can still use `&` freely; only the file path can't.
- Windows treats folder names as **case-insensitive** for existence checks
  but Vite's dev server does a **case-sensitive** match — a path that
  exists on disk with different casing than the code references it by will
  silently 404 to the SPA shell instead of erroring. Keep the casing in
  `src/data/projects.js` exact.
- Source footage typically arrives as H.264 video + AAC (or raw PCM, which
  browsers don't support in `<video>`) audio, plus a stray metadata track.
  Since these are muted background videos anyway, they're remuxed with
  `ffmpeg -map 0:v:0 -c:v copy -an -movflags +faststart` before use — video
  re-encoded not at all (fast, lossless), audio and the extra track
  dropped, `moov` atom moved to the front for clean streaming start.
- Photos (`public/Pictures/`) tend to arrive as full-resolution camera PNGs
  (5504×3072, 20MB+) — far larger than any layout displays them at. Before
  wiring one into a component, downscale/convert with
  `ffmpeg -i in.png -vf "scale=2400:-1" -q:v 3 out.jpg` (2400px is generous
  for a full-bleed section at realistic viewport widths) — this took the
  About page's two source PNGs from ~22–26MB down to ~180–600KB each with
  no visible quality loss.

## Deployment note

This is a client-side-routed SPA (`react-router-dom`'s `BrowserRouter`).
Any static host needs to be configured to fall back to `index.html` for
unknown paths (e.g. a direct visit to `/contact`), or that route will 404
on a real server the way Vite's dev server doesn't.
