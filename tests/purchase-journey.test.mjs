import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html');
const hub=read('produit.html');
const contact=read('contact.html');
const slugs=['redaction','visuel','sites-web','video-audio','automatisation','recherche-analyse'];

test('conversion : accueil dirige vers produits, outils secondaires distincts',()=>{
 assert.match(home,/<a class="kinetic-button" href="\.\/produit\.html#collections">Découvrir les collections/);
 assert.match(home,/<a class="kinetic-secondary" href="\.\/catalogue\.html">Explorer le catalogue gratuit/);
 assert.ok(home.includes('6 collections en préparation'));
 assert.ok(home.includes('Choisir une collection'));
 assert.doesNotMatch(home,/class="kinetic-button" href="\.\/catalogue\.html"/);
});
test('choix : six banques distinctes, 4 étapes sans panier ni prix fictif',()=>{
 assert.match(hub,/id="comment-acheter"/);
 for(const slug of slugs){
  assert.ok(hub.includes('href="./pack-'+slug+'.html"'),'Carte inaccessible '+slug);
  assert.ok(read('pack-'+slug+'.html').includes('id="disponibilite"'));
 }
 assert.equal((hub.match(/class="collection-tile"/g)||[]).length,6);
 assert.equal((hub.match(/class="commercial-step"/g)||[]).length,3);
 assert.ok(hub.includes('buying-step-future'));
 assert.ok(hub.includes('Aucun achat possible à ce jour'));
 assert.ok(hub.includes('href="./outils/assistant-messages.html"'));
});
test('6 fiches : accès comparaison, démonstration, limites et pas de faux checkout',()=>{
 for(const slug of slugs){
  const page=read('pack-'+slug+'.html');
  assert.match(page,/class="showroom-progress"/,slug);
  for(const anchor of ['contenu-du-pack','exemple','disponibilite'])
   assert.ok(page.includes('href="#'+anchor+'"'),slug+': lien '+anchor);
  assert.ok(page.includes('Aucun achat ou précommande possible'),slug);
  assert.ok(page.includes('Prix : non fixé'),slug);
  assert.ok(page.includes('Contenu du pack envisagé'),slug);
  assert.ok(page.includes('À savoir avant d\\'acheter'),slug);
  assert.ok(page.includes('href="./produit.html#collections"'),slug);
  assert.doesNotMatch(page,/Poser une question sur le produit|href="\.\/panier|href="\.\/checkout|https:\/\/github\.com\/.*\/issues\/new/);
  if(slug==='redaction'){
   assert.ok(page.includes('class="showroom-action primary">Essayer le générateur gratuit'),slug);
   assert.ok(page.includes('href="./outils/assistant-messages.html"'));
  } else {
   assert.ok(page.includes('href="#exemple"'),slug);
   assert.ok(page.includes('Voir la simulation du produit'),slug);
  }
 }
});
test('contact et style : aucune commande via GitHub Issues',()=>{
 assert.ok(contact.includes('Aucun achat ou suivi de commande'));
 assert.ok(contact.includes('précommandes'));
 const style=read('assets/commercial-pages.css');
 assert.match(style,/buying-steps/);
 const showroomStyle=read('assets/product-showroom.css');
 assert.match(showroomStyle,/showroom-progress/);
 assert.match(showroomStyle,/shop-status/);
 assert.match(showroomStyle,/max-width:750px/);
});
test('cahier v1.3 : annexe UX reliée',()=>{
 const main=read('docs/CAHIER_DES_CHARGES_EXECUTION_2026-11-02.md');
 const annex=read('docs/PARCOURS_ACHAT_UX_V1_3.md');
 assert.ok(main.includes('Version 1.3'));
 assert.ok(main.includes('./PARCOURS_ACHAT_UX_V1_3.md'));
 for(let i=1;i<=15;i++)assert.ok(annex.includes('ACH-'+String(i).padStart(2,'0')),i);
 assert.ok(annex.includes('GitHub Pages'));
 assert.ok(annex.includes('guest checkout'));
});
