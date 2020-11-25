const cacheName = "GuessWhov3";
let cachedFiles = [
  "/",
  "index.html",
  "manifest.json",
  "js/index.js",
  "css/index.css",
  "img/guesswho.jpg"
];

self.addEventListener("install", function(evt) {
  console.log("Service Worker Install Event");

  // Add the files to the cache
  evt.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        console.log("Caching files");
        return cache.addAll(cachedFiles);
      })
      .then(function() {
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.log("Cache Failed", error);
      })
  );
});

// listen for activate event
self.addEventListener("activate", function(evt) {
  console.log("Service worker activated");
  evt.waitUntil(
    // remove any previous versions of caches
    // global caches object has a keys object that can help
    caches.keys().then(function(keyList) {
      // delete older caches
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName) {
            console.log("Removing old cache: ", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// return cached files if offline. Fetch event called when any request is made on PWA
self.addEventListener("fetch", function(evt) {
  console.log("Fetch event occurred " + evt.request.url);
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      // use internet to fetch page since response/cached files not available
      // can reverse the 2 but tradeoffs are freshest vs speed
      return response || fetch(evt.request);
    })
  );
});
