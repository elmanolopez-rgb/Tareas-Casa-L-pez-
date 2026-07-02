// Service Worker para notificaciones push de Casa López · Tareas
// Este archivo DEBE estar en la raíz del sitio (misma carpeta que index.html)

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD3UQ0JE-pSf1Ct-7dulpVa4aDQlSZmJNg",
  authDomain: "casa-lopez-tareas-eeb9a.firebaseapp.com",
  projectId: "casa-lopez-tareas-eeb9a",
  storageBucket: "casa-lopez-tareas-eeb9a.firebasestorage.app",
  messagingSenderId: "965351698613",
  appId: "1:965351698613:web:1c6c70fb33c959c4b9cefc"
});

const messaging = firebase.messaging();

// Manejar notificaciones cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Notificación en segundo plano:', payload);
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Casa López', {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'casa-lopez-' + Date.now(),
    data: payload.data || {},
  });
});

// Al tocar la notificación, abrir o enfocar la app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
