let staticCacheName = 'restaurant-cache';
let urlsToCache = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];


/**
 * Installation of service worker
 */
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(urlsToCache);
        })
    );
});

/**
 * Fetching for offline content viewing
 */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) {
		console.log('Found ', event.request, ' in cache');
		return response;
	    }
	    else {
		console.log('Could not find ', event.request, ' in cache, FETCHING!');
		return fetch(event.request)
		.then(function(response) {
			caches.open(staticCacheName).then(function(cache) {
				cache.put(event.request, response);
			    })
			    return response;
		})
		.catch(function(err) {
			console.error(err);
        });
      }
      })
    );
  });
