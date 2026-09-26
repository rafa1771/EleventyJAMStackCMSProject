# Asides — viztnivlir.com

The source for [asides.viztnivlir.com](https://asides.viztnivlir.com), a collection of
quiet digressions and technical oddities by Vizt Nivlir. Built with Eleventy, edited
through Decap CMS, hosted on Netlify.

A note on vocabulary: the posts here are **asides**, not blog posts. That word is used
consistently in URLs, folder names, asset paths, and CMS labels — `/asides/`,
`src/asides/`, `/assets/asides/`. Old `/blog/*` URLs are 301-redirected, so please keep
new code on the current vocabulary rather than reintroducing the old one.

Originally scaffolded from a [Kevin Powell](https://www.kevinpowell.co/) tutorial for
[DevProjects](https://www.codementor.io/projects/web/create-a-fast-and-secure-blog-using-jamstack-c93coupnxb),
since diverged substantially.

## Tech stack

| | |
|---|---|
| Static site generator | [Eleventy](https://www.11ty.dev/) 3.1.6 |
| Templating | Nunjucks (layouts, pages), Liquid + Markdown (posts) |
| Dates | Luxon, via a `postDate` filter |
| CMS | [Decap CMS](https://decapcms.org/) 3.x, loaded from CDN at `/admin/` |
| Auth | Netlify Identity + Git Gateway |
| Hosting | Netlify |

No build step beyond Eleventy — no bundler, no CSS pipeline. `src/style.css` is copied
through as-is, and all page behaviour is small inline vanilla-JS blocks in the templates
they belong to.

## Prerequisites

- Node.js 18 or newer (Eleventy 3 requires `>=18`)
- npm

## Local development

```bash
npm install
npm start          # dev server with live reload at http://localhost:8080
npm run build      # one-off production build into public/
```

## Project structure

```
├── src/
│   ├── _data/
│   │   └── siteData.js       # shared tag configuration (see "Tags" below)
│   ├── _includes/
│   │   ├── base.njk          # HTML shell, Netlify Identity, translation layer
│   │   ├── header.njk        # branding + nav
│   │   ├── footer.njk
│   │   ├── article.njk       # single-aside layout
│   │   └── article-snippet.njk  # list-item card, used by every listing
│   ├── admin/
│   │   ├── config.yml        # Decap collections, fields, media paths
│   │   └── index.html        # CMS entry point
│   ├── asides/
│   │   ├── asides.json       # directory data: layout + the "post:" tag
│   │   └── YYYY-MM-DD-*.md   # the asides themselves
│   ├── assets/               # logos, favicons, manifest (passthrough copy)
│   │   └── asides/           # images committed by hand
│   ├── index.njk             # homepage: hero rotation + "From the Stack"
│   ├── asides.njk            # /asides/ listing: tag filters + pagination
│   ├── style.css             # all styles (passthrough copy)
│   └── _redirects            # Netlify redirects (passthrough copy)
├── public/                   # BUILD OUTPUT — committed, see note below
│   └── assets/asides/        # CMS image uploads land here
├── docs/
│   └── spanish-edition-plan.md   # planned ES edition, not yet built
├── design-files/             # original Figma file and design JPGs
└── .eleventy.js              # filters, shortcodes, collections, dir config
```

**`public/` is committed to the repository.** It is build output, so never edit it by
hand — but do run `npm run build` before committing, so the tracked output matches the
source. Image uploads from the CMS are the one thing that originates in `public/`
(Decap writes to `public/assets/asides/`); Eleventy's passthrough copy of `src/assets/`
is layered on top of it at build time.

## How the site works

### Tags

`src/_data/siteData.js` is the single source of truth for tags with special meaning:

- **`silentTags`** — `post`, `post:`, `featured`, `hero-image`, `hero image`. These are
  structural, so the category filter pills on `/asides/` skip them. Every other tag on a
  post becomes a filter pill automatically.
- **`heroImageTags`** — `hero-image`, `hero image`. Tagging an aside with one of these
  puts its featured image into the homepage hero rotation.

Add a tag here rather than hardcoding it in a template; both `.eleventy.js` and
`asides.njk` read from this file.

### Collections

- `collections.post` — every aside, via the `post:` tag applied by `src/asides/asides.json`
- `collections.featured` — asides tagged `featured`, used by the homepage
- `collections.heroImages` — defined in `.eleventy.js`: asides carrying a hero tag *and*
  an `image`

### Listing behaviour

`/asides/` renders every aside server-side, then filters and paginates client-side
(10 per page). Tag pills are derived from the rendered `data-tags` attributes, so they
stay in sync with the content without any extra configuration.

### Language handling

The site is in English, with a hand-written Spanish layer rather than machine
translation: elements carrying `data-translate-es` are swapped when the browser language
is Spanish or when a translation tool activates (detected via a `MutationObserver` on
`html[lang]`). The site title is additionally protected with `translate="no"` and
restored if a tool overrides it.

This is a stopgap. A full Spanish edition — `/es/apartes/`, paired posts, a language
switcher — is planned in [docs/spanish-edition-plan.md](docs/spanish-edition-plan.md)
and will replace this layer when the Spanish posts are written.

### Redirects

`src/_redirects` is copied into the publish directory. It currently maps the pre-rename
URLs — `/blog/*` → `/asides/*` and `/assets/blog/*` → `/assets/asides/*` — so older
links and cached `og:image` references still resolve.

## Content management

### Via the CMS

1. Go to `/admin/` and log in with Netlify Identity
2. Open the **Asides** collection and create a new entry
3. Fill in the fields, upload a featured image, and publish

Decap commits straight to `main` through Git Gateway, which triggers a Netlify rebuild.
The slug pattern is `{{year}}-{{month}}-{{day}}-{{slug}}`.

### By hand

Create a Markdown file in `src/asides/` named `YYYY-MM-DD-slug.md`:

```yaml
---
title: On Leaving One Thing Off
description: A one-line summary, shown on listing cards and in metadata.
author: Vizt Nivlir
date: 2026-09-17T15:56:00.000+02:00
tags:
  - post
  - elegance
image: /assets/asides/vizt-leaving-one-thing-off.jpg
imageAlt: “One final adjustment. Then one final removal.”
---

The body of the aside, in Markdown.
```

The `layout` and the `post:` tag come from `src/asides/asides.json`, so they don't belong
in the frontmatter. Add `featured` to surface the aside on the homepage, or `hero-image`
to enter its image into the hero rotation.

### Images

Shared across languages and stored flat in `public/assets/asides/`, referenced as
`/assets/asides/<file>`. Images with Spanish text are regenerated and added to the same
folder rather than duplicated into a parallel tree.

## Deployment

Netlify builds from `main`:

- **Build command**: `npm run build`
- **Publish directory**: `public`
- **Node version**: 18+

One thing worth knowing: Eleventy must stay at **3.1.x or newer**. Under Node 22.12+,
Eleventy 3.0.0 mis-unwraps CommonJS files in `_data/`, which silently empties
`siteData` in templates — that broke the tag filters and pagination on `/asides/` until
the version bump.

### CMS setup (one-time, already done for the live site)

1. Netlify dashboard → **Settings** → **Identity** → *Enable Identity*
2. **Registration preferences** → *Invite only*
3. **Services** → **Git Gateway** → *Enable*
4. **Identity** → *Invite users* for anyone who needs CMS access

## License

[MIT](https://choosealicense.com/licenses/mit/). The `LICENSE` file still carries the
original tutorial author's copyright line.
