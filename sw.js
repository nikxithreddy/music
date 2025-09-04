const CACHE_NAME = "nr-music-v1";
const ASSETS = [
  "/music/",
  "/music/index.html",
  "/music/manifest.json",
  "/music/icons/icon-192.png",
  "/music/icons/icon-512.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
