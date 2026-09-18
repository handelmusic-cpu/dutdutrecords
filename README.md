# dutdutrecords.com

The Dutdut Records website: a single-page site with the roster, discography,
apps, merch store (mockup) and about/contact sections, plus a hidden
`#ben` page for Ben Handel.

`index.html` is exported from the label's design project and rendered client-side
by `support.js`, which loads React, ReactDOM and Babel from unpkg, and the
Anton/Work Sans fonts from Google Fonts. There's no build step, but it does
need an internet connection to render. Re-export `index.html` from the design
project after edits rather than hand-editing it — the release list, apps,
products and roster all live in the `<script data-dc-script>` block at the
bottom of that file.

```
index.html            the whole site (markup + data)
support.js             the runtime index.html depends on — keep next to it
assets/web/            album covers + logo (web-optimized JPEGs)
assets/style.css       unused, left over from an earlier version
assets/favicon.svg     unused, left over from an earlier version
404.html                served by GitHub Pages for unknown URLs
CNAME                   the custom domain
robots.txt, sitemap.xml for search engines
```

## Editing

Releases, apps, products and roster entries are plain JS arrays near the
bottom of `index.html` (inside `class Component extends DCLogic`) — add,
remove or edit entries there directly, or re-export from the design project.

## Publishing

With [Pagesmith](https://github.com/handelmusic-cpu/pagesmith):

```sh
pagesmith deploy "Dutdut Records"   # or press Deploy in the dashboard
```

Or straight from git, since this repository is what GitHub Pages serves:

```sh
git push
```

The first publish needs GitHub Pages switched on for the repository (Settings →
Pages → Deploy from a branch → `main` / root). The `CNAME` file here is what
holds `dutdutrecords.com` to the site; leave it in place.

DNS at your registrar, once:

| Type  | Name | Value                    |
| ----- | ---- | ------------------------ |
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
| AAAA  | @    | 2606:50c0:8000::153      |
| AAAA  | @    | 2606:50c0:8001::153      |
| AAAA  | @    | 2606:50c0:8002::153      |
| AAAA  | @    | 2606:50c0:8003::153      |
| CNAME | www  | handelmusic-cpu.github.io |

`pagesmith dns "Dutdut Records"` checks those for you and says what is missing.
