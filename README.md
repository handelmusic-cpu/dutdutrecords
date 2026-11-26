# dutdutrecords.com

The Dut Dut Records website: label home (roster, catalog with a preview player, apps,
about), a page per artist, the apps page, and the web apps themselves under `/apps/`.

Plain static files served by GitHub Pages. No framework, no CDN, no web fonts from
other companies (Anybody is self-hosted, OFL). The one third-party embed is the
Bandcamp follow button in About.

```
build/data.mjs        everything the site says: artists, releases, apps, social links
build/site.mjs        writes the HTML pages from data.mjs (node build/site.mjs)
build/sync-apps.sh    copies the hosted web apps in from their own repositories
index.html            generated: home
artists/<slug>/       generated: one page per artist
apps/index.html       generated: the apps page
apps/modscore/        copied from the Mobile-Notation repo; do not edit here
apps/music-playground/ copied from the General-Music repo; do not edit here
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

## The hosted apps

`build/sync-apps.sh` copies MōdScore and Music Playground from their repositories
(checked out next to this one) into `apps/`, with only the files they need at runtime,
and records the source commit in `apps/<slug>/.source`. Re-run it after a change to
either app and commit the result. Both apps use relative URLs and service workers
scoped to their own folder, so they work at any path.

Saved data is per domain: songs made in MōdScore on modscore.vercel.app don't appear on
dutdutrecords.com. Leave the Vercel deployment up so people can export them.

## Publishing

This repository is what GitHub Pages serves: push to `main`.
