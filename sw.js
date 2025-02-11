const CACHE = 'offline-fallback-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll([
                'index.html',
                'main.css',
                'main.js',
                'credit-calculator/index.html',
                'credit-calculator/style.css',
                'credit-calculator/script.js',
                'deposit-calculator/index.html',
                'deposit-calculator/style.css',
                'deposit-calculator/script.js',
                'kilogram/index.html',
                'kilogram/style.css',
                'kilogram/script.js',
                'discount/index.html',
                'discount/style.css',
                'discount/script.js',
                'payback-period/index.html',
                'payback-period/style.css',
                'payback-period/script.js',
                'services/index.html',
                'services/style.css',
                'services/script.js',
                'time-price/index.html',
                'time-price/style.css',
                'time-price/script.js',
                'assets/start.ogg',
                'assets/timer.ogg'
            ]))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}