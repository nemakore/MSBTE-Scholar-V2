// Service Worker for MSBTE Scholar 2.0
const CACHE_NAME = 'msbte-scholar-cache-v2.0';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/offline',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache failed for some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Network first with cache fallback for page navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;
        const offlinePage = await cache.match('/offline');
        if (offlinePage) return offlinePage;
        return new Response(
          `<!DOCTYPE html><html><head><meta charset="utf-8"><title>MSBTE Scholar 2.0 - Offline</title><style>body{font-family:sans-serif;text-align:center;padding:50px;background:#FAF6EE;color:#141414}h1{color:#0B3B2E}</style></head><body><h1>MSBTE Scholar 2.0</h1><p>You are currently offline. Please reconnect to access real-time notes and updates.</p></body></html>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
    );
    return;
  }

  // Stale-while-revalidate for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
