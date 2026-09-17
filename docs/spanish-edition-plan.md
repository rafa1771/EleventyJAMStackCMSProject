# Spanish edition — implementation plan

Status: **planned, not started** (decided 2026-09-17). Waiting on hand-written
Spanish versions of the posts; Vizt's Spanish voice is written, not machine-translated.

## Decisions (settled)

| Question | Decision |
|---|---|
| URL structure | `/es/` tree; section slug is `apartes` |
| Spanish post slugs | Translated (e.g. `sobre-dejar-una-cosa-fuera`), paired via `translationKey` |
| Images | Shared `/assets/asides/` folder; Spanish-text images are regenerated and added there |
| Browser-language handling | Dismissable banner on English pages only; no `Accept-Language` redirect |
| Eleventy i18n plugin | Not used — its pairing assumes identical stems across languages |
| Decap i18n mode | Not used — it would move English files into `en/` subfolders. Separate collection instead |

## URLs

| English (unchanged) | Spanish |
|---|---|
| `/` | `/es/` |
| `/asides/` | `/es/apartes/` |
| `/asides/2026-09-17-on-leaving-one-thing-off/` | `/es/apartes/2026-09-17-sobre-dejar-una-cosa-fuera/` |

## Source layout

```
src/
├── _data/
│   ├── siteData.js          (existing)
│   ├── lang.json            "en"  — global default
│   └── strings.js           { en: {…}, es: {…} } — every piece of UI copy
├── asides/                  English posts — unchanged, no new frontmatter
├── asides.njk
├── index.njk
└── es/
    ├── es.json              { "lang": "es" } — directory data, applies to the whole subtree
    ├── index.njk            Spanish home
    ├── apartes.njk          Spanish listing
    └── apartes/
        ├── apartes.json     { "layout": "article.njk", "tags": "post" }
        └── 2026-09-17-sobre-dejar-una-cosa-fuera.md
```

The data cascade sets `lang`: `lang.json` says `en` globally, `es/es.json`
overrides to `es` under `src/es/`.

## Pairing translations

Spanish posts carry one extra frontmatter field — the English file's stem:

```yaml
translationKey: 2026-09-17-on-leaving-one-thing-off
```

English posts need nothing; their stem is the key. A collection in `.eleventy.js`
builds `key → { en: url, es: url }`. Missing counterpart → switcher falls back to
the other language's listing, so posts can be translated one at a time.

## Template changes

- `base.njk`: `<html lang="{{ lang }}">`; description / `og:title` / `og:locale`
  from `strings[lang]`; `<link rel="alternate" hreflang="en|es|x-default">` for the
  current page's pair.
- `article.njk`, `article-snippet.njk`, `header.njk`, `footer.njk`, listing pages:
  all hardcoded copy → `{{ strings[lang].key }}`. Remove `data-translate-es`
  attributes in the same pass.
- `postDate` filter: accept the locale (`DateTime.setLocale(lang)`).
- Collections: split `collections.post` into `asides` (en) and `apartes` (es) by
  `data.lang`. Homepage "From the Stack" and each listing use their own.
- Category pills: unchanged mechanism; Spanish posts carry Spanish tag names
  (`elegancia`, `arquitectura`). Silent/system tags in `siteData.js` stay shared.

## Language switcher

Header nav, text not flags: `ES` on English pages, `EN` on Spanish. Link carries
`hreflang` and `lang`. Target = counterpart page from the map, else the other
language's listing.

## Browser-language banner

On English pages, when `navigator.language` starts with `es` and a Spanish
counterpart exists: one dismissable line ("Este aparte también está en español →").
Dismissal remembered in `localStorage`. Replaces the current label-swap script.
Keep the `translate="no"` / `notranslate` protections on the site title.

## CMS (Decap)

Second collection alongside `asides`:

```yaml
- name: apartes
  label: Apartes
  folder: src/es/apartes
  create: true
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
  fields:
    - (same fields as asides)
    - { label: "Translation key (English file stem)", name: "translationKey", widget: "string" }
```

Top-level `slug: { encoding: unicode, clean_accents: true }` so Spanish titles
produce accent-free slugs.

## Rollout (each step shippable on its own)

1. **English becomes lang-aware, no visible change** — `lang.json`, `strings.js`,
   parameterised templates, `postDate` locale, split collections. Ship alone; it's
   the refactor with the most surface area.
2. **Scaffold Spanish** — `es/` tree, first translated post(s), switcher with
   listing fallback, `hreflang`. Ship.
3. **Translate the back catalogue** via CMS at any pace.
4. **Retire the old hack** — drop the `data-translate-es` script, add the banner,
   add `hreflang` entries to a sitemap (add one if none exists).
