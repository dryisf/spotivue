const cacheName = "default-cache";
let contentToCache = [
  ...self.__precacheManifest.map((ressource) => ressource.url),
  "/",
];

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheResponse) => {
        return (
          cacheResponse ||
          fetch(event.request).then((networkResponse) => {
            return caches.open(cacheName).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
      .catch(function(error) {
        console.error("  Error in fetch handler:", error);

        throw error;
      })
  );
});
