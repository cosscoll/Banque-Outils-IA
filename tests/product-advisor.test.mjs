import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const js=read('assets/product-advisor.js');
const css=read('assets/product-advisor.css');
const context={module:{exports:{}}};
vm.runInNewContext(js,context,{filename:'product-advisor.js'});
const {choose,fold,PRODUCTS}=context.module.exports;

test('guide : six banques uniques, urls locales valides, aucun réseau ni stockage',()=>{
 assert.equal(PRODUCTS.length,6);
 assert.equal(new Set(PRODUCTS.map(p=>p.id)).size,6);
 for(const product of PRODUCTS){
  assert.ok(product.title&&product.reason&&product.outcome);
  assert.ok(product.url.startsWith('./pack-'));
  assert.ok(!product.url.includes('https:'));
 }
 assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|openai\.com|https?:\/\//i);
 assert.match(css,/prefers-reduced-motion/);
 assert.match(js,/Vos textes ne sont ni transmis ni enregistrés/);
 assert.match(js,/Aucune banque n’est encore en vente/);
});
test('guide : formulations françaises et accents, besoin principal',()=>{
 const expectations=[
  ['Rédiger un e-mail à mes clients','redaction'],
  ['écrire un post Instagram','redaction'],
  ['une newsletter pour mon entreprise','redaction'],
  ['créer une affiche pour une boutique','visuel'],
  ['faire un logo et une identité visuelle','visuel'],
  ['concevoir une bannière','visuel'],
  ['créer mon site internet','web'],
  ['un site vitrine pour mes services','web'],
  ['faire une landing page','web'],
  ['préparer un montage vidéo','medias'],
  ['lancer un podcast audio','medias'],
  ['ajouter des sous-titres à une vidéo','medias'],
  ['automatiser mes relances','auto'],
  ['structurer une tâche répétitive','auto'],
  ['faire un workflow avec n8n','auto'],
  ['comparer plusieurs fournisseurs','analyse'],
  ['faire une étude de marché','analyse'],
  ['analyser des données et des sources','analyse']
 ];
 for(const [q,want] of expectations){
   const result=choose(q);
   assert.equal(result.kind,'match',q);
   assert.equal(result.ids[0],want,q);
 }
 assert.equal(expectations.length,18);
 assert.equal(fold('ÉCRIRE un E-MAIL !'),'ecrire un e mail');
});
test('guide : recommandations multiples et clarification sans choix arbitraire',()=>{
 for(const q of ['Je veux créer un site et écrire des e-mails','Rédiger une publication et concevoir une affiche']){
  const r=choose(q);assert.equal(r.kind,'match',q);assert.equal(r.ids.length,2,q);
 }
 for(const q of ['Je suis artisan','Bonjour','J’aimerais être accompagné','','   ','gagner du temps']){
  const r=choose(q);assert.equal(r.kind,'clarify',q);assert.equal(r.ids.length,0,q);
 }
});
test('guide : aucune interprétation HTML du contenu utilisateur',()=>{
 for(const q of ['<img src=x onerror=alert(1)>','<script>alert(1)</script>']){
  const r=choose(q);
  assert.equal(r.kind,'clarify');
 }
 assert.match(js,/el\.textContent=value/);
 assert.match(js,/input\.value\.trim\(\)/);
 assert.doesNotMatch(js,/messages\.innerHTML\s*\+=|input\.value[\s\S]{0,30}innerHTML/);
});
test('guide disponible sur les pages principales et six showrooms',()=>{
 const pages=['index.html','produit.html','contact.html','catalogue.html','fiches.html','parcours.html','avancement.html',
 'pack-redaction.html','pack-visuel.html','pack-sites-web.html','pack-video-audio.html','pack-automatisation.html','pack-recherche-analyse.html'];
 for(const p of pages){
  const c=read(p);
  assert.ok(c.includes('./assets/product-advisor.js?v=20261102-a1'),p);
  assert.ok(c.includes('./assets/product-advisor.css?v=20261102-a1'),p);
 }
 const hub=read('produit.html');
 assert.ok(hub.includes('data-open-product-guide'));
});
