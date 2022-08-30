const cacheName = "v2"

self.addEventListener("install", e => {
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				`/`,
				`/index.html`,
				`/projectPlanner.bundle.js`,
				`/favicon.ico`,
			])
		})
	)
})
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(res => {
			return res || fetch(event.request)
			.then(res => {
				return caches.open(cacheName)
				.then(cache => {
					cache.put(event.request, res.clone())
					return res
				})
			})
			.catch(e => console.log(e))
		})
	)
});
