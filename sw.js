/* Eclipse Eterno: guarda o jogo no aparelho para abrir rapido e funcionar sem internet */
const CACHE='eclipse-eterno-744e2f14f1';
const CORE=["./", "./index.html", "./jogar.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./favicon-32.png", "./favicon.svg", "./logo.svg", "./emblem-256.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('eclipse-eterno-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  const font=u.host==='fonts.googleapis.com'||u.host==='fonts.gstatic.com';
  if(u.origin!==location.origin&&!font)return;
  // paginas: tenta a rede primeiro (pega a versao nova), cai no que esta guardado se estiver offline
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{if(res.ok&&!res.redirected){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./jogar.html'))));
    return}
  // resto (imagens, icones, fontes): o que esta guardado na hora, atualizando por tras
  e.respondWith(caches.match(r).then(m=>{const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>m);return m||net}));
});
