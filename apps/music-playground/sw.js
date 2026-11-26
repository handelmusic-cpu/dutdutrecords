// This app moved to modriff.com. Browsers that installed its worker here re-check this file;
// this version deletes the app's caches, unregisters itself and reloads its pages, which
// then forward to the new address. Without it, the old worker would keep serving the cached
// app here indefinitely.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (/^(modscore-|music-playground-)/.test(k)) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
