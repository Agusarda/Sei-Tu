// sw.js - Versión de limpieza
self.addEventListener('install', (e) => {
    self.skipWaiting(); // Fuerza al nuevo SW a activarse
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => caches.delete(key)) // Borra TODA la caché de archivos
            );
        }).then(() => self.clients.claim()) // Toma el control de las pestañas abiertas
    );
});
