const cacheId = 'Restaurant Reviews';

// Cache an array of files
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
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
