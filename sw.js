const CACHE_NAME = 'seitu-v2'; // Cambiar a v3, v4, etc. cuando hagas cambios grandes
const ASSETS = [
  './',
  './index.html',
  './icono.webp',
  './banner.webp'
];

self.addEventListener('install', (e) => {
  // Esto hace que el nuevo SW se active apenas se instala, sin esperar
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  // Esto borra los cachés viejos (como el v1) automáticamente
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
