var V='cuchis-v1';
var CORE=['./','index.html','logo.png','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(hit){
    var net=fetch(e.request).then(function(r){
      if(r&&(r.status===200||r.type==='opaque')){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp)})}
      return r;
    }).catch(function(){return hit});
    return hit||net;
  }));
});
