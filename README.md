# Nafiz Ahmed Nafi — Portfolio

Personal portfolio site. Static HTML, CSS and vanilla JavaScript — no framework,
no build step, no dependencies to install.

**Live:** https://nafizahmednafi.netlify.app

---

## Updating the site

Almost everything you'll ever want to change lives in one file:

```
data/content.js
```

Open it, edit the text, save, refresh the browser. Adding a project or a job is
a matter of adding one entry to the matching array — the page renders itself
from that file, so you never have to touch the HTML.

The two exceptions:

| What | Where |
| --- | --- |
| Page title, Google description, link-preview tags | the marked block at the top of `index.html` |
| Colours, spacing, typography | the token block at the top of `css/style.css` |

## Running it locally

Because the page loads `data/content.js` with a normal `<script>` tag, you can
just double-click `index.html` and it works — no server needed.

If you'd rather serve it properly (recommended, it matches production):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

Netlify is connected to this repository. Push to `main` and it deploys; there is
no build command, `netlify.toml` just tells Netlify to serve the root directory
and sets cache and security headers.

## Project structure

```
.
├── index.html              # page shell + SEO tags; sections are filled in by JS
├── 404.html                # styled not-found page
├── data/
│   └── content.js          # ← all site content lives here
├── css/
│   └── style.css           # design tokens + all component styles
├── js/
│   └── main.js             # renders content.js, theme toggle, nav, scroll spy
├── assets/
│   ├── img/                # web-optimised images (WebP)
│   ├── docs/               # CV
│   └── favicon.svg
├── netlify.toml            # headers + publish config
├── robots.txt / sitemap.xml
└── _source/                # local-only: full-resolution photo originals (gitignored)
```

## Adding images

Keep web images small — the whole page should stay well under a megabyte.
To add a project screenshot:

```bash
cwebp -q 82 -resize 1200 0 screenshot.png -o assets/img/projects/name.webp
```

Then reference `assets/img/projects/name.webp` in the project's `image` field.

## Notes

- **Dark mode** follows the operating system by default; the toggle in the
  header overrides it and the choice is remembered in `localStorage`.
- **`_source/`** holds the original high-resolution photos and the old template
  archive. It is deliberately gitignored — back those up somewhere else, they
  are not in the repository.
- The phone number from the CV is intentionally **not** published on the site;
  public phone numbers get scraped for spam. Email and LinkedIn are enough.

## Licence

[MIT](LICENSE)
