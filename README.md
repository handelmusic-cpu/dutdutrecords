# dutdutrecords.com

The Dut Dut Records website: label home (roster, catalog with a preview player, apps,
about), a page per artist, the apps page, and the web apps themselves under `/apps/`.

Plain static files served by GitHub Pages. No framework, no CDN, no web fonts from
other companies (Anybody is self-hosted, OFL). The one third-party embed is the
Bandcamp follow button in About.

The apps themselves (mõdRïff, mõdScore, Music Playground) live together on modriff.com;
the apps page here lists them, and `/apps/modscore/` and `/apps/music-playground/` only
forward there (they were hosted here briefly).

```
build/data.mjs        everything the site says: artists, releases, apps, social links
build/site.mjs        writes the HTML pages from data.mjs (node build/site.mjs)
index.html            generated: home
artists/<slug>/       generated: one page per artist
apps/index.html       generated: the apps page
apps/modscore/, apps/music-playground/  forwarding pages to modriff.com (+ a sw.js that
                      retires the service worker the old copies installed)
404.html, sitemap.xml generated
assets/site.css       the one stylesheet
assets/site.js        catalog filter and preview player (pages work without it)
assets/web/           cover art (700x700 JPEG) and the logo
assets/audio/         full tracks for the preview player
assets/fonts/         Anybody variable font + licence
CNAME                 the custom domain: leave it in place
```

## Editing

Change `build/data.mjs`, run `node build/site.mjs`, commit the regenerated pages.
A new release: add the cover as `assets/web/<n>.jpg` (700x700), add a line at the top
of `releases`; add `audio` only if the full track is in `assets/audio/`.

## Publishing

This repository is what GitHub Pages serves: push to `main`.
