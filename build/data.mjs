// Everything the site says lives here. Edit this file, then run `node build/site.mjs`
// to regenerate the HTML pages. The pages are committed, so GitHub Pages serves them
// as plain files: there is no runtime framework and nothing to fail when a CDN is down
// (the previous site rendered in the browser through React and Babel from unpkg, and
// showed a blank page whenever that request failed).

export const artists = [
  {
    slug: 'sklermbot', name: 'Sklermbot', genre: 'Electronic and experimental', ink: 'blue',
    bio: 'Sklermbot is the label’s electronic project: drifting ambient pieces, club-ready loops, odd little jokes made out of drum machines, and the occasional jazz band run through a dub mixer.',
    links: [
      ['Spotify', 'https://open.spotify.com/artist/3NMvEkwcO0ItPqEereSlVl'],
      ['Apple Music', 'https://music.apple.com/us/artist/sklermbot/1562683841'],
      ['YouTube', 'https://www.youtube.com/@Sklermbot'],
    ],
  },
  {
    slug: 'ben-handel', name: 'Ben Handel', genre: 'Electronic and comedic', ink: 'pink',
    bio: 'Ben Handel is a musician and app developer, and the founder of Dut Dut Records. He writes songs under his own name, records as Sklermbot, and builds the music apps listed on this site.',
    links: [
      ['Spotify', 'https://open.spotify.com/artist/2Fm9Jq3VKFU8E57IsDmxLT'],
      ['Apple Music', 'https://music.apple.com/us/artist/ben-handel/332584375'],
    ],
  },
  {
    slug: 'quincy-handel', name: 'Quincy Handel', genre: 'Roots rock', ink: 'yellow',
    bio: 'Quincy Handel writes and plays roots rock, with lyrics that do their homework.',
    links: [
      ['Spotify', 'https://open.spotify.com/artist/4GOAVEUORqfzZrEWidgm2s'],
      ['Apple Music', 'https://music.apple.com/us/artist/quincy-handel/1828953204'],
    ],
  },
  {
    slug: 'jetson-handel', name: 'Jetson Handel', genre: 'Electronic and experimental', ink: 'green',
    bio: 'Jetson Handel makes electronic and experimental tracks, built fast and played loud.',
    links: [
      ['Spotify', 'https://open.spotify.com/artist/2MnGI5IIMBBb6Kj0zgTAio'],
      ['Apple Music', 'https://music.apple.com/us/artist/jetson-handel/1819305335'],
    ],
  },
];

const hf = (a, s) => `https://distrokid.com/hyperfollow/${a}/${s}`;

// Newest first. `audio` is a full track in assets/audio for the in-page player;
// without it, the tile links straight to the release.
export const releases = [
  { artist: 'Ben Handel', title: 'I Have A Dog', url: hf('benhandel', 'i-have-a-dog'), cover: 1, audio: 'i-have-a-dog.mp3' },
  { artist: 'Sklermbot', title: 'Standing On The Corner / Tylenol PM', url: hf('sklermbot', 'standing-on-the-corner--tylenol-pm'), cover: 2 },
  { artist: 'Sklermbot', title: 'Tylenol PM', url: hf('sklermbot', 'tylenol-pm'), cover: 3, audio: 'tylenol-pm.mp3' },
  { artist: 'Sklermbot', title: 'Standing On The Corner', url: hf('sklermbot', 'standing-on-the-corner'), cover: 4, audio: 'standing-on-the-corner.mp3' },
  { artist: 'Sklermbot', title: 'Drift Away', url: hf('sklermbot', 'drift-away-3'), cover: 5 },
  { artist: 'Quincy Handel', title: 'Rubik’s Got The Rubric', url: hf('quincyhandel', 'rubiks-got-the-rubric'), cover: 6 },
  { artist: 'Jetson Handel', title: 'Jet Can Jam', url: hf('jetsonhandel', 'jet-can-jam'), cover: 7 },
  { artist: 'Sklermbot', title: 'Drift Under', url: hf('sklermbot', 'drift-under'), cover: 8 },
  { artist: 'Sklermbot', title: 'Drift On', url: hf('sklermbot', 'drift-on'), cover: 9 },
  { artist: 'Sklermbot', title: 'Downtown', url: hf('sklermbot', 'downtown-2'), cover: 10 },
  { artist: 'Sklermbot', title: 'Just A Second', url: hf('sklermbot', 'just-a-second'), cover: 11, audio: 'just-a-second.mp3' },
  { artist: 'Sklermbot', title: 'Click 15 Semiquaver', url: hf('sklermbot', 'click-15-semiquaver'), cover: 12 },
  { artist: 'Sklermbot', title: 'HYPERPOP', url: hf('sklermbot', 'hyperpop-2'), cover: 13 },
  { artist: 'Sklermbot', title: 'Document 21 (Please Save Me)', url: hf('sklermbot', 'document-21-please-save-me'), cover: 14 },
  { artist: 'Sklermbot', title: 'Bounce and Jump', url: hf('sklermbot', 'bounce-and-jump'), cover: 15, audio: 'bounce-and-jump.mp3' },
  { artist: 'Sklermbot', title: 'Nanyo Business', url: hf('sklermbot', 'nanyo-business'), cover: 16 },
  { artist: 'Sklermbot', title: 'Lil Guy', url: hf('sklermbot', 'lil-guy'), cover: 17 },
  { artist: 'Sklermbot', title: 'LIVING', url: hf('sklermbot', 'living'), cover: 18 },
  { artist: 'Sklermbot', title: 'Walk in the Woods', url: hf('sklermbot', 'walk-in-the-woods-2'), cover: 19 },
  { artist: 'Sklermbot', title: 'Low PH', url: hf('sklermbot', 'low-ph'), cover: 20 },
  { artist: 'Sklermbot', title: 'Candlelit', url: hf('sklermbot', 'candlelit-2'), cover: 21 },
  { artist: 'Sklermbot', title: 'Dogface (feat. Dusty Pockets)', url: hf('sklermbot', 'dogface-feat-dusty-pockets'), cover: 22 },
  { artist: 'Sklermbot', title: 'The Tension Builds', url: hf('sklermbot', 'the-tension-builds-2'), cover: 23 },
  { artist: 'Sklermbot', title: 'Sleep + Please', url: hf('sklermbot', 'sleep--please'), cover: 24 },
  { artist: 'Sklermbot', title: '(I Didn’t Forget) To Put This Out', url: hf('sklermbot', 'i-didnt-forget-to-put-this-out'), cover: 25 },
  { artist: 'Sklermbot', title: 'Viral Jazz Dub (feat. Jefferson St. Parade Band) [Angry Dubie Mix]', url: hf('sklermbot', 'viral-jazz-dub-feat-jefferson-st-parade-band-angry-dubie-mix'), cover: 26 },
  { artist: 'Sklermbot', title: 'GoShi PongPing', url: hf('sklermbot', 'goshi-pongping-2'), cover: 27 },
  { artist: 'Sklermbot', title: 'Computers R Cool', url: hf('sklermbot', 'computers-r-cool-3'), cover: 28 },
  { artist: 'Sklermbot', title: 'Hammer 3000', url: hf('sklermbot', 'hammer-3000'), cover: 29 },
  // Not on any store yet, so no listen link.
  { artist: 'Dr Djo Bi', title: 'Topalon', url: null, cover: 30 },
];

// `href` is where "Open" goes. `mark` is the name as the brand sets it: the second word in italic. Apps hosted on this site live under /apps/<slug>/,
// copied in by `build/sync-apps.sh` from their own repositories.
export const apps = [
  {
    slug: 'modriff', name: 'mõdRïff', mark: 'mõd<i>Rïff</i>', kind: 'iPhone, iPad and Mac',
    desc: 'A groovebox where every part is always in key. Chords, drums, bass, melody and a synth, with the music theory handled for you.',
    href: 'https://modriff.com/', cta: 'Visit modriff.com',
    extra: ['Play free in your browser', 'https://modriff.com/play/'],
    icon: '/assets/apps/modriff.png',
  },
  {
    slug: 'modscore', name: 'mõdScore', mark: 'mõd<i>Score</i>', kind: 'Web app',
    desc: 'Write music notation on your phone. Tap notes onto the staff, hear them back, and keep your scores on the device.',
    href: '/apps/modscore/', cta: 'Open mõdScore',
    icon: '/apps/modscore/icon-192.png',
  },
  {
    slug: 'music-playground', name: 'Music Playground', kind: 'Web app for classrooms',
    desc: 'Games and tools for elementary music class: a song and game library, rhythm building, the staff, clef drawing and steady beat. Made for iPads, Chromebooks and the projector.',
    href: '/apps/music-playground/', cta: 'Open Music Playground',
    icon: '/apps/music-playground/icons/icon-192.png',
  },
];

export const social = [
  ['Instagram', 'https://instagram.com/handelmusic'],
  ['Facebook', 'https://facebook.com/benjamin.handel'],
  ['YouTube', 'https://www.youtube.com/@Sklermbot'],
];

export const email = 'handelmusic@gmail.com';
