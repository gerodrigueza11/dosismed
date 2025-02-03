const CACHE_NAME = 'dosis-medicamentos-v1';

const ASSETS_TO_CACHE = [
  '/', 
  '/index.html', 
  '/script.js',
  '/ico-192x192.png',
  '/ico-512x512.png',
];

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cacheando recursos estáticos');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Error al cachear recursos:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Solicitud interceptada:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Recurso encontrado en el cache:', event.request.url);
          return response;
        }
        console.log('Recurso no encontrado en el cache, solicitando a la red:', event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {
        console.error('Error al manejar la solicitud:', error);
        return new Response('No se pudo cargar el recurso. Verifica tu conexión a Internet.');
      })
  );
});
