// E-Courses : permet l'installation comme application.
// Toujours la version en ligne d'abord (les mises à jour arrivent tout de suite), la copie gardée seulement sans connexion.
const CACHE = 'ecourses-4';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r, {cache:'no-cache'}).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)); return res; })
    .catch(() => caches.match(r).then(x => x || caches.match('./'))));
});
