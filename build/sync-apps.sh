#!/usr/bin/env bash
# Copies the web apps hosted on dutdutrecords.com into apps/<slug>/ from their own
# repositories, checked out next to this one. Only the files the app needs at runtime are
# copied (no tests, no CI). Run from anywhere:
#   build/sync-apps.sh            # both apps
#   build/sync-apps.sh modscore   # one app
# Then commit the result. The app repositories stay the source: never edit apps/* here.
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
src_root="${APPS_SRC:-$(dirname "$here")}"

sync_app() {
  local slug="$1" repo="$2"; shift 2
  local src="$src_root/$repo" dst="$here/apps/$slug"
  [ -d "$src" ] || { echo "missing $src (clone $repo next to this repo, or set APPS_SRC)" >&2; exit 1; }
  rm -rf "$dst"; mkdir -p "$dst"
  (cd "$src" && cp -R --parents "$@" "$dst/")
  local rev; rev="$(git -C "$src" rev-parse --short HEAD 2>/dev/null || echo unknown)"
  printf '%s %s\n' "$repo" "$rev" > "$dst/.source"
  echo "apps/$slug <- $repo@$rev ($(find "$dst" -type f | wc -l | tr -d ' ') files)"
}

want="${1:-all}"
if [ "$want" = all ] || [ "$want" = modscore ]; then
  sync_app modscore Mobile-Notation \
    index.html sw.js manifest.webmanifest icon-180.png icon-192.png icon-512.png \
    js/core.js js/panels.js js/editing.js js/render.js js/audio.js js/io.js js/boot.js \
    lib/vexflow.js lib/Tone.js
fi
if [ "$want" = all ] || [ "$want" = music-playground ]; then
  sync_app music-playground General-Music \
    index.html manifest.json sw.js css js icons audio dist THIRD-PARTY-NOTICES.md
  # General-Music bundles its own older copies of MōdScore and mõdRïff under apps/. Here they
  # are left out and its two links point at the real ones instead: a second MōdScore on this
  # domain would share saved songs (same localStorage keys) with a different version of itself.
  ext="$here/apps/music-playground/js/externalapps.js"
  sed -i.bak -e 's|external: "apps/modscore/index.html"|external: "../modscore/"|' \
             -e 's|external: "apps/modriff/index.html"|external: "https://modriff.com/play/"|' "$ext"
  rm -f "$ext.bak"
  grep -q '"../modscore/"' "$ext" && grep -q 'modriff.com/play' "$ext" \
    || { echo "externalapps.js links not rewritten: check General-Music/js/externalapps.js" >&2; exit 1; }
fi
