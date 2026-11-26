// Catalog filter and the preview player. The pages work without this file: every
// release still links to its listen page; only the in-page player and filter need it.
(function () {
  // The old single-page site showed Ben's page at /#ben; keep those links working.
  function toBen() { if (location.hash === '#ben') { location.replace('/artists/ben-handel/'); return true; } }
  if (toBen()) return;
  window.addEventListener('hashchange', toBen);

  document.addEventListener('DOMContentLoaded', function () {
    // ---------- filter ----------
    var chips = document.querySelectorAll('.chip[data-filter]');
    var tiles = document.querySelectorAll('#catalog .tile');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.dataset.filter;
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        tiles.forEach(function (t) { t.hidden = f !== 'all' && t.dataset.artist !== f; });
      });
    });

    // ---------- player ----------
    var player = document.getElementById('player');
    var audio = document.getElementById('audio');
    if (!player || !audio) return;
    var art = document.getElementById('player-art');
    var title = document.getElementById('player-title');
    var artist = document.getElementById('player-artist');
    var toggle = document.getElementById('player-toggle');
    var progress = document.getElementById('player-progress');
    var current = null;

    function setState(playing) {
      toggle.dataset.state = playing ? 'playing' : 'paused';
      toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      document.querySelectorAll('.tile-play').forEach(function (b) {
        var on = playing && b === current;
        b.dataset.state = on ? 'playing' : 'paused';
        b.setAttribute('aria-label', (on ? 'Pause ' : 'Play ') + b.dataset.title);
      });
    }

    function play(btn) {
      if (current === btn) { audio.paused ? audio.play() : audio.pause(); return; }
      current = btn;
      audio.src = btn.dataset.audio;
      art.src = btn.dataset.cover;
      title.textContent = btn.dataset.title;
      artist.textContent = btn.dataset.artist;
      player.hidden = false;
      document.body.classList.add('has-player');
      audio.play().catch(function () { setState(false); });
    }

    document.querySelectorAll('.tile-play').forEach(function (b) {
      b.addEventListener('click', function () { play(b); });
    });
    var latest = document.querySelector('[data-play-latest]');
    if (latest) latest.addEventListener('click', function () {
      var first = document.querySelector('.tile-play');
      if (first) play(first);
    });

    toggle.addEventListener('click', function () { audio.paused ? audio.play() : audio.pause(); });
    document.getElementById('player-close').addEventListener('click', function () {
      audio.pause(); audio.removeAttribute('src'); audio.load();
      current = null; player.hidden = true; document.body.classList.remove('has-player'); setState(false);
    });
    audio.addEventListener('play', function () { setState(true); });
    audio.addEventListener('pause', function () { setState(false); });
    audio.addEventListener('ended', function () { setState(false); progress.style.width = '0'; });
    audio.addEventListener('timeupdate', function () {
      if (audio.duration) progress.style.width = (100 * audio.currentTime / audio.duration) + '%';
    });

    if ('mediaSession' in navigator) {
      audio.addEventListener('play', function () {
        if (!current) return;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: current.dataset.title, artist: current.dataset.artist, album: 'Dut Dut Records',
          artwork: [{ src: current.dataset.cover, sizes: '700x700', type: 'image/jpeg' }],
        });
      });
    }
  });
})();
