# Nafiz Ahmed Nafi — Portfolio

Personal portfolio for a Computer Science and Engineering student working in
data engineering and NLP. Static site, no framework, no build step, no runtime
dependencies.

**Live:** https://nafiz-kodar.github.io/portfolio-website-v2/

<sub>Built with HTML, CSS and vanilla JavaScript · deployed on GitHub Pages</sub>

---

## Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting started](#getting-started)
- [Editing the site](#editing-the-site)
- [Project structure](#project-structure)
- [Deployment](#deployment)
- [Design system](#design-system)
- [Accessibility & performance](#accessibility--performance)
- [Conventions](#conventions)
- [Licence](#licence)

---

## Overview

The site is a single page rendered entirely from one data file. Adding a
project or a role means appending an object to an array — no HTML editing, no
templating language, no rebuild.

| | |
| --- | --- |
| **Stack** | HTML5, CSS custom properties, vanilla ES5-compatible JavaScript |
| **Dependencies** | None. Two Google Fonts are the only external requests. |
| **Build step** | None |
| **Page weight** | ~160 KB total, including both photographs |
| **Hosting** | GitHub Pages (`main` branch, served from the repository root) |
| **Browser support** | All evergreen browsers; degrades to a readable `<noscript>` block |

## Architecture

```
index.html ──▶ loads data/content.js  (plain <script>, defines CONTENT)
           └─▶ loads js/main.js       (reads CONTENT, renders each section)
```

`index.html` ships the page shell, the SEO tags and empty section containers.
`js/main.js` renders the content into those containers on load and wires up the
dock navigation, theme toggle, scroll-spy, hero marquee and reveal animations.

Two deliberate decisions are worth knowing about:

**Content loads via a `<script>` tag, not `fetch`.** This means the site works
when you open `index.html` directly from disk — no local server required, and no
CORS error to debug.

**SEO tags live in `index.html`, not in the content file.** Facebook, LinkedIn
and Slack crawlers do not execute JavaScript, so the `<title>`, description and
Open Graph tags have to be present in the raw HTML. There is a clearly marked
block at the top of the file.

## Getting started

Clone and open:

```bash
git clone https://github.com/Nafiz-kodar/portfolio-website-v2.git
cd portfolio-website-v2
open index.html          # macOS — or just double-click the file
```

To serve it over HTTP instead, which matches production more closely:

```bash
python3 -m http.server 4173
# http://localhost:4173
```

## Editing the site

Almost every change you will ever make is in a single file:

```
data/content.js
```

It is heavily commented, with a worked example above each array. Edit, save,
refresh.

**Adding a project**

```js
projects: [
  {
    title: "Retail Sales Dashboard",
    kind: "Course project",              // optional small label
    status: "Ongoing",                   // optional badge
    blurb: "Cleaned three years of POS data and built a dashboard that surfaced a 12% seasonal dip finance had been missing.",
    tags: ["Python", "pandas", "Tableau"],
    image: "assets/img/projects/retail.webp",   // optional
    links: [{ label: "GitHub", url: "https://github.com/..." }],
  },
],
```

**Adding a role**

```js
experience: [
  {
    role: "Data Engineering Intern",
    org: "Company Name",
    period: "Jun 2026 — Aug 2026",       // optional
    current: true,                        // optional "Current" badge
    summary: "One line of context.",     // optional
    points: ["What changed because you were there."],
    tags: ["Python", "Airflow"],          // optional
  },
],
```

Empty arrays are safe: a section with no entries renders a placeholder card
rather than a blank gap, so the page never looks broken mid-edit.

**Display copy**

A few strings are set as display type and are deliberately short. Keep them to
a line or two — they are the largest text on the page:

| Field | Where it appears |
| --- | --- |
| `hero.role` | the oversized scrolling headline in the grey panel |
| `hero.intro` | the small right-aligned paragraph in the top bar |
| `about.lead` | the large opening statement |
| `about.note` | the small paragraph beside it |
| `skills[].blurb` | one sentence under each dark card |
| `contact.kicker` / `contact.lead` | the monospace line and the big heading |
| `footer.tagline` / `footer.wordmark` | the sign-off and the giant wordmark |

A project without an `image` draws a typographic tile from its `mark` (or the
title's initials), so the grid never shows a gap while you wait for a
screenshot.

The two things **not** in `content.js`:

| What | Where |
| --- | --- |
| Title, meta description, Open Graph tags | marked block at the top of `index.html` |
| Colours, spacing, type scale | `:root` token block at the top of `css/style.css` |

## Project structure

```
.
├── index.html              Page shell, SEO tags, empty section containers
├── 404.html                Styled not-found page
├── data/
│   └── content.js          ← all site content
├── css/
│   └── style.css           Design tokens, components, responsive rules
├── js/
│   └── main.js             Rendering, theme toggle, nav, scroll-spy
├── assets/
│   ├── img/                profile.webp · about.webp · og-cover.jpg
│   ├── docs/               nafiz-ahmed-nafi-cv.pdf
│   └── favicon.svg
├── netlify.toml            Headers, retained for a future Netlify deploy
├── robots.txt
├── sitemap.xml
├── .nojekyll               Serve files verbatim; do not run Jekyll
├── _design/                Local only, gitignored — Figma reference exports
└── _source/                Local only, gitignored — full-resolution originals
```

## Deployment

GitHub Pages builds from the `main` branch, repository root. Any push to `main`
publishes within a minute or two.

```bash
git add -A
git commit -m "Update projects"
git push
```

Because the site is served from a subpath (`/portfolio-website-v2/`), three files
carry that prefix and must be updated together if the URL ever changes: the
canonical and Open Graph tags in `index.html`, the asset paths in `404.html`,
and `sitemap.xml` / `robots.txt`.

`netlify.toml` is kept in the repository so the site can be moved to Netlify
without reconstructing the cache and security headers. It is inert on Pages.

## Design system

The layout is Swiss-editorial, adapted from a Figma reference kept in
`_design/` (gitignored). Two rules carry most of the look, and both are easy to
break by accident:

1. **Headlines are never bold.** Scale carries the emphasis, not weight —
   `--w-display` is 400. Raising it flattens the whole design.
2. **Structure is drawn with 1px rules and whitespace**, not with bordered,
   shadowed cards. Border-radius appears only on media tiles and the dark
   cards.

All visual decisions are CSS custom properties declared once in `:root`, with a
dark variant that follows `prefers-color-scheme` and a `[data-theme]` override
for the manual toggle. Changing the accent is a one-line edit.

- **Type** — Inter Tight for everything, JetBrains Mono for micro-labels and
  metadata. The scale is fluid via `clamp()`, so it adapts without breakpoints;
  the hero headline runs up to `15rem`.
- **Colour** — paper white, true black, a grey hero field, and a single indigo
  accent (`#455ce9`, sampled from the reference). The black skills section
  keeps its own fixed scale in both themes, so it reads identically either way.
- **Navigation** — a floating pill dock rather than a top bar. Buttons are
  generated in `main.js` from a `DOCK` array; an entry whose section is missing
  from `index.html` is skipped, so it cannot leave a dead button behind. The
  theme toggle lives in the footer, keeping the dock purely navigational.
- **Motion** — the hero headline drifts on a marquee whose track is always two
  identical halves, regrown on resize so the `-50%` loop stays seamless at any
  width. It parks under `prefers-reduced-motion`.
- **Responsive** — media queries sit beside the component they affect rather
  than in a separate file.

### Working from the design reference

`_design/` holds the Figma exports and is gitignored: it is working material,
not site content. Anything from it that the site actually needs — the dock
icons, for instance — is **inlined** into `js/main.js` rather than linked, so
the site never depends on an untracked folder.

## Accessibility & performance

- Skip-to-content link, semantic landmarks, and visible focus rings.
- Text meets WCAG AA contrast in both themes, verified by computing every
  foreground/background pair. Two values are set by that constraint rather than
  by taste: the hero field is `#6f7272` rather than the reference's `#a3a7a8`
  (white on the lighter grey is only 2.43:1, below even the large-text floor),
  and `--ink-4` is darkened to clear 4.5:1 because it carries dates and channel
  labels.
- The dock buttons carry `aria-label`s; their visible tooltips are
  `aria-hidden` so nothing is announced twice, and the current section is
  reported with `aria-current`.
- The marquee is `aria-hidden` and duplicates its phrase, so the heading is
  exposed once, as a real `<h1>`.
- All motion is disabled under `prefers-reduced-motion`.
- Content rendered from `content.js` is HTML-escaped on the way in.
- Photographs are 800 px WebP (32 KB and 45 KB, down from 1.7 MB and 2.0 MB
  PNGs); icons are inline SVG, so the page makes no image requests beyond the
  two portraits.

## Conventions

- Two-space indentation, enforced by `.editorconfig`.
- CSS class names follow BEM-ish `block__element--modifier`.
- `js/main.js` is written in ES5-compatible syntax and needs no transpilation.
- Full-resolution photo originals live in `_source/`, which is gitignored.
  **They are not backed up by this repository.**

## Licence

Released under the [MIT Licence](LICENSE). The written content, photographs and
CV are personal to Nafiz Ahmed Nafi; the code is free to reuse.
