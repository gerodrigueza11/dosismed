// Nombre del cache
const CACHE_NAME = 'dosis-medicamentos-v1';

// Lista de recursos para cachear
const ASSETS_TO_CACHE = [
  '/', // Página principal
  '/index.html', // Archivo HTML principal
  '/script.js',
  '/ico-192x192.png', // Ícono de 192x192
  '/ico-512x512.png', // Ícono de 512x512
];

// Evento de instalación: Cachea los recursos estáticos
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

// Evento de activación: Elimina caches antiguos
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

// Evento de fetch: Sirve recursos desde el cache o la red
self.addEventListener('fetch', (event) => {
  console.log('Solicitud interceptada:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si el recurso está en el cache, lo devuelve
        if (response) {
          console.log('Recurso encontrado en el cache:', event.request.url);
          return response;
        }
        // Si no está en el cache, lo solicita a la red
        console.log('Recurso no encontrado en el cache, solicitando a la red:', event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {
        console.error('Error al manejar la solicitud:', error);
        // Puedes devolver una página de respaldo o un mensaje personalizado
        return new Response('No se pudo cargar el recurso. Verifica tu conexión a Internet.');
      })
  );
});
