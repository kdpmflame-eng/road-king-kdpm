const CACHE='road-king-v1'; const FILES=['./','./index.html','./tuk.jpg','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>k!==CACHE?caches.delete(k):Promise.resolve()))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone(); if(e.request.method==='GET' && new URL(e.request.url).origin===location.origin){caches.open(CACHE).then(c=>c.put(e.request,copy))} return res}).catch(()=>caches.match('./index.html'))))});
