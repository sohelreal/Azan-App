const V='azan-shell-v5',RT='azan-rt-v5',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==RT).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(/api\.alquran\.cloud|cdn\.jsdelivr\.net|raw\.githubusercontent\.com|fonts\.(googleapis|gstatic)\.com/.test(u.host)){
  e.respondWith(caches.open(RT).then(async c=>{const hit=await c.match(r);const net=fetch(r).then(x=>{if(x.ok||x.type==='opaque')c.put(r,x.clone());return x}).catch(()=>hit);return hit||net}));return}
 if(u.origin===location.origin&&(r.mode==='navigate'||/(index\.html|\/)$/.test(u.pathname))){
  e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(V).then(c=>c.put(r,cp));return x}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))}});
