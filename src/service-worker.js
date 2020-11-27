const cacheName = "default-cache";
let contentToCache = [
  "media/au-coeur-du-g.9cf9695c.mp3",
  "media/damage.a810e600.mp3",
  "media/drill-fr-5.5bffae51.mp3",
  "media/humanoide.a32c4ac4.mp3",
  "media/le-son-interdit.5e7895f7.mp3",
  "media/umla.d5ba35c9.mp3",
  "index.html",
  "manifest.json",
  "favicon.ico",
  "js/app.bab9c5a9.js",
  "js/app.bab9c5a9.js.map",
  "js/chunk-2d0a3165.d0173abd.js",
  "js/chunk-2d0a3165.d0173abd.js.map",
  "js/chunk-2d21083a.a96e9b45.js",
  "js/chunk-2d21083a.a96e9b45.js.map",
  "js/chunk-4c5f0447.d462466b.js",
  "js/chunk-4c5f0447.d462466b.js.map",
  "js/chunk-55c58773.7a53575e.js",
  "js/chunk-55c58773.7a53575e.js.map",
  "js/chunk-587530db.faf55535.js",
  "js/chunk-587530db.faf55535.js.map",
  "js/chunk-vendors.4ffd5fbb.js",
  "js/chunk-vendors.4ffd5fbb.js.map",
  "img/alpha-wann.3014fbc2.jpg",
  "img/cyborg.6e70b801.jpg",
  "img/feu.901bd173.jpg",
  "img/damage.7ff1bce3.jpg",
  "img/drill-fr-5.69e1c523.jpg",
  "img/gazo.c0600a2d.jpg",
  "img/her.61e61e93.jpg",
  "img/le-son-interdit.c440ceb1.jpg",
  "img/nekfeu.dae06b88.jpg",
  "img/umla.ae098fa9.jpg",
  "css/app.edf40d7a.css",
  "css/chunk-4c5f0447.518e7f8e.css",
  "css/chunk-55c58773.1ca61f41.css",
  "css/chunk-587530db.e4ac76df.css",
  "css/chunk-vendors.71549ec7.css",
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
        console.log("[Service Worker] Fetching resource: " + event.request.url);
        return (
          cacheResponse ||
          fetch(event.request).then((networkResponse) => {
            return caches.open(cacheName).then((cache) => {
              console.log(
                "[Service Worker] Caching new resource: " + event.request.url
              );
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
      .catch(function(error) {
        // This catch() will handle exceptions that arise from the match() or fetch() operations.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error("  Error in fetch handler:", error);

        throw error;
      })
  );
});
