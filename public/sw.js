const CACHE_NAME = 'sirkula-v1';
const APP_SHELL = ['/', '/student', '/manifest.json', '/logo.png'];

// ── Install: pre-cache app shell ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_SHELL).catch(() => {}),
    ),
  );
  self.skipWaiting();
});

// ── Activate: remove stale caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

// ── Fetch: network-first for API, cache-first for static ─────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(JSON.stringify({ error: 'offline' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          }),
      ),
    );
    return;
  }
  event.respondWith(
    caches
      .match(request)
      .then((cached) => cached ?? fetch(request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
        }
        return res;
      })),
  );
});

// ── Background Sync ───────────────────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-waste-logs') {
    event.waitUntil(syncWasteLogs());
  }
});

function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('sirkula-db', 1);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore('pending_logs', { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getAllLogs(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending_logs', 'readonly');
    const req = tx.objectStore('pending_logs').getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function deleteLog(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending_logs', 'readwrite');
    const req = tx.objectStore('pending_logs').delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function syncWasteLogs() {
  let db;
  try {
    db = await openIDB();
  } catch {
    return;
  }

  const logs = await getAllLogs(db).catch(() => []);

  for (const log of logs) {
    try {
      const res = await fetch('/api/waste-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: log.data.product_name,
          category: log.data.category,
          ecoStationId: log.data.eco_station_id,
          photoUrl: log.data.photo_url,
          notes: log.data.notes,
        }),
      });
      // Delete on success or 4xx (bad data — don't retry); keep on 5xx (server error)
      if (res.ok || res.status < 500) {
        await deleteLog(db, log.id);
      } else {
        throw new Error(`Server error ${res.status}`);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        // Network error — stop syncing, browser will retry the sync tag
        throw err;
      }
    }
  }
}
