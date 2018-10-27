const cacheId = 'Restaurant Reviews';

// Cache an array of files
const cacheFiles = [
  '/',
  '/index.html',
  '/resturant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/resturants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jgp',
  '/img/4.jpg',
  '/img/5.jgp',
  '/img/6.jpg',
  '/img/7.jgp',
  '/img/8.jgp',
  '/img/9.jgp',
  '/img/10.jgp'
];
// Listen for Service Worker install and cache array of assets
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheId).then(function(cache) {
        return cache.addAll(cacheFiles);
      })
    );
  });
// Install Fetch event
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(event.request).then(function(resp) {
        return resp || fetch(event.request).then(function(response) {
          let responseClone = response.clone();
          caches.open('cacheFiles').then(function(cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
      .catch(function(err) {
          console.log(err);
      })
    );
});
