// Generates the site's HTML from build/data.mjs. Run: node build/site.mjs
// Output is committed; GitHub Pages serves the files as they are.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { artists, releases, apps, social, email } from './data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://dutdutrecords.com';
const YEAR = 2026;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inkOf = (name) => (artists.find((a) => a.name === name) || { ink: 'ink-2' }).ink;
const slugOf = (name) => (artists.find((a) => a.name === name) || {}).slug;
const cover = (n) => `/assets/web/${n}.jpg`;
const ext = (href, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}" target="_blank" rel="noopener">${text}</a>`;

function page({ path, title, description, body, current }) {
  const nav = [['Music', '/#music', 'music'], ['Artists', '/#artists', 'artists'], ['Apps', '/apps/', 'apps'], ['About', '/#about', 'about']]
    .map(([t, h, k]) => `<a href="${h}"${current === k ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const fullTitle = title ? `${title} | Dut Dut Records` : 'Dut Dut Records';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#EDEEE8">
<link rel="canonical" href="${SITE}${path}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/web/logo.jpg">
<link rel="preload" href="/assets/fonts/anybody-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dut Dut Records">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${SITE}/assets/web/logo.jpg">
<link rel="stylesheet" href="/assets/site.css">
<script src="/assets/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <a class="brand" href="/" aria-label="Dut Dut Records home"><span class="mark" aria-hidden="true"></span><span>Dut Dut Records</span></a>
  <nav aria-label="Site">${nav}</nav>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="foot-in">
    <p class="foot-name">Dut Dut Records</p>
    <p>An independent label in Southern Indiana.</p>
    <ul class="foot-links">${social.map(([t, h]) => `<li>${ext(h, t)}</li>`).join('')}<li><a href="mailto:${email}">Email</a></li></ul>
    <p class="fine">&copy; ${YEAR} Dut Dut Records</p>
  </div>
</footer>
<div class="player" id="player" hidden>
  <img class="player-art" id="player-art" alt="" width="48" height="48">
  <div class="player-text"><p class="player-title" id="player-title"></p><p class="player-artist" id="player-artist"></p></div>
  <button type="button" class="player-toggle" id="player-toggle" aria-label="Pause"><span class="ico" aria-hidden="true"></span></button>
  <div class="player-bar" aria-hidden="true"><span id="player-progress"></span></div>
  <button type="button" class="player-close" id="player-close" aria-label="Close player">&#x2715;</button>
  <audio id="audio" preload="none"></audio>
</div>
</body>
</html>
`;
}

function tile(r) {
  const ink = inkOf(r.artist);
  const play = r.audio
    ? `<button type="button" class="tile-play" data-audio="/assets/audio/${esc(r.audio)}" data-title="${esc(r.title)}" data-artist="${esc(r.artist)}" data-cover="${cover(r.cover)}" aria-label="Play ${esc(r.title)}"><span class="ico" aria-hidden="true"></span></button>`
    : '';
  const listen = r.url ? ext(r.url, 'Listen', 'tile-listen') : '<span class="tile-soon">Coming soon</span>';
  return `<li class="tile" data-artist="${esc(r.artist)}" style="--ink:var(--${ink})">
  <div class="tile-art"><img src="${cover(r.cover)}" alt="" width="700" height="700" loading="lazy" decoding="async">${play}</div>
  <p class="tile-title">${esc(r.title)}</p>
  <p class="tile-meta"><span class="dot" aria-hidden="true"></span>${esc(r.artist)}</p>
  ${listen}
</li>`;
}

function artistLinks(a) {
  return `<ul class="links">${a.links.map(([t, h]) => `<li>${ext(h, t)}</li>`).join('')}</ul>`;
}

// ---------- Home ----------
// The hero is the catalog itself: every sleeve, newest first, like a wall of records in a shop.
const wall = releases.map((r) => `<img src="${cover(r.cover)}" alt="" width="700" height="700">`).join('');

const home = page({
  path: '/',
  description: 'Dut Dut Records is an independent label in Southern Indiana: Sklermbot, Ben Handel, Quincy Handel and Jetson Handel, plus music apps by Ben Handel.',
  current: '',
  body: `
<section class="hero">
  <div class="wall" aria-hidden="true">${wall}</div>
  <div class="hero-band">
    <h1 class="hero-name"><span class="beat">Dut Dut</span> <span class="hero-rec">Records</span></h1>
    <p class="lede">An independent label in Southern Indiana. Four artists, ${releases.length} releases, and a few music apps made on the side.</p>
    <div class="actions">
      <button type="button" class="btn" data-play-latest><span class="ico" aria-hidden="true"></span>Play the newest song</button>
      <a class="text-link" href="#music">See all ${releases.length} releases</a>
    </div>
  </div>
</section>

<section class="band" id="artists" aria-labelledby="h-artists">
  <div class="sec-head"><h2 id="h-artists">Artists</h2><p>${artists.length} on the roster</p></div>
  <ul class="roster">
${artists.map((a) => {
    const n = releases.filter((r) => r.artist === a.name).length;
    return `    <li class="roster-row" style="--ink:var(--${a.ink})">
      <a class="roster-name" href="/artists/${a.slug}/">${esc(a.name)}</a>
      <p class="roster-meta">${esc(a.genre)}. ${n} ${n === 1 ? 'release' : 'releases'}.</p>
      ${artistLinks(a)}
    </li>`;
  }).join('\n')}
  </ul>
</section>

<section class="band" id="music" aria-labelledby="h-music">
  <div class="sec-head"><h2 id="h-music">Music</h2><p>${releases.length} releases, newest first</p></div>
  <div class="filters" role="group" aria-label="Show releases by">
    <button type="button" class="chip" data-filter="all" aria-pressed="true">Everyone</button>
${artists.map((a) => `    <button type="button" class="chip" data-filter="${esc(a.name)}" aria-pressed="false" style="--ink:var(--${a.ink})"><span class="dot" aria-hidden="true"></span>${esc(a.name)}</button>`).join('\n')}
  </div>
  <ul class="grid" id="catalog">
${releases.map(tile).join('\n')}
  </ul>
</section>

<section class="band" id="apps" aria-labelledby="h-apps">
  <div class="sec-head"><h2 id="h-apps">Apps</h2><p>Music software by Ben Handel</p></div>
  ${appList()}
</section>

<section class="band about" id="about" aria-labelledby="h-about">
  <div class="sec-head"><h2 id="h-about">About</h2></div>
  <div class="about-cols">
    <p class="about-text">Dut Dut Records is run by Ben Handel in Southern Indiana. The roster is a family affair: Sklermbot, Ben Handel, Quincy Handel and Jetson Handel, with room for more as the label grows. Everything is out digitally, from drifting electronic records to comedic songs and roots rock.</p>
    <div class="contact">
      <h3>Get in touch</h3>
      <p>Bookings, licensing, merch, or just to say hello.</p>
      <a class="text-link big" href="mailto:${email}">${email}</a>
      <iframe class="bc-follow" title="Follow Dut Dut Records on Bandcamp" loading="lazy" scrolling="no" src="https://bandcamp.com/band_follow_button_deluxe/2814636652"></iframe>
    </div>
  </div>
</section>
`,
});

function appList() {
  return `<ul class="apps">
${apps.map((a) => `    <li class="app">
      <img class="app-icon" src="${a.icon}" alt="" width="72" height="72" loading="lazy">
      <div class="app-body">
        <h3>${esc(a.name)}</h3>
        <p class="app-kind">${esc(a.kind)}</p>
        <p>${esc(a.desc)}</p>
        <p class="app-actions">${a.href.startsWith('http') ? ext(a.href, esc(a.cta), 'btn') : `<a class="btn" href="${a.href}">${esc(a.cta)}</a>`}${a.extra ? ext(a.extra[1], esc(a.extra[0]), 'text-link') : ''}</p>
      </div>
    </li>`).join('\n')}
  </ul>`;
}

// ---------- Artist pages ----------
const artistPages = artists.map((a) => {
  const mine = releases.filter((r) => r.artist === a.name);
  return [`artists/${a.slug}/index.html`, page({
    path: `/artists/${a.slug}/`,
    title: a.name,
    description: `${a.name} on Dut Dut Records. ${a.bio}`,
    current: 'artists',
    body: `
<section class="artist-hero" style="--ink:var(--${a.ink})">
  <img class="artist-cover" src="${cover(mine[0].cover)}" alt="" width="700" height="700">
  <div>
    <p class="crumb"><a href="/#artists">Artists</a></p>
    <h1 class="artist-name">${esc(a.name)}</h1>
    <p class="roster-meta">${esc(a.genre)}. ${mine.length} ${mine.length === 1 ? 'release' : 'releases'} on Dut Dut Records.</p>
    <p class="lede">${esc(a.bio)}</p>
    <h2 class="small-h">Listen everywhere</h2>
    ${artistLinks(a)}
    ${a.slug === 'ben-handel' ? '<p class="also">Also: <a href="/artists/sklermbot/">Sklermbot</a>, his electronic project, and <a href="/apps/">the apps he builds</a>.</p>' : ''}
  </div>
</section>
<section class="band" aria-labelledby="h-rel">
  <div class="sec-head"><h2 id="h-rel">Releases</h2><p>${mine.length} on Dut Dut Records</p></div>
  <ul class="grid">
${mine.map(tile).join('\n')}
  </ul>
</section>
`,
  })];
});

// ---------- Apps page ----------
const appsPage = ['apps/index.html', page({
  path: '/apps/',
  title: 'Apps',
  description: 'Music apps by Ben Handel: mõdRïff, MōdScore and Music Playground.',
  current: 'apps',
  body: `
<section class="band first" aria-labelledby="h-apps">
  <h1 id="h-apps" class="page-h">Apps</h1>
  <p class="section-lede">Music software by Ben Handel. MōdScore and Music Playground run in your browser, right on this site, and keep working offline once opened.</p>
  ${appList()}
</section>
`,
})];

// ---------- 404 ----------
const notFound = ['404.html', page({
  path: '/404.html',
  title: 'Page not found',
  description: 'That page is not on dutdutrecords.com.',
  body: `
<section class="band first">
  <h1 class="page-h">Nothing at this address</h1>
  <p class="section-lede">The link may be old, or the page has moved. Start from <a href="/">the label’s home page</a> or <a href="/#music">the catalog</a>.</p>
</section>
`,
}).replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"')];

const files = [['index.html', home], ...artistPages, appsPage, notFound];
for (const [p, html] of files) {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), html);
}

const urls = ['/', '/apps/', ...artists.map((a) => `/artists/${a.slug}/`), '/apps/modscore/', '/apps/music-playground/'];
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`);
console.log(`wrote ${files.length} pages and sitemap.xml`);
