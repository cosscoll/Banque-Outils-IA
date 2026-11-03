import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('index.html');
const hub=read('produit.html');
const contact=read('contact.html');
const slugs=['redaction','visuel','sites-web','video-audio','automatisation','recherche-analyse'];

test('Accueil : une seule direction commerciale et un outil gratuit différencié',()=>{
  assert.match(home,/<a class="kinetic-button" href="\.\/produit\.html#collections">Choisir ma banque/);
  assert.match(home,/<a class="kinetic-secondary" href="\.\/outils\/assistant-messages\.html">Essayer gratuitement/);
  assert.equal((home.match(/class="op-card op-card--/g)||[]).length,5);
  assert.equal((home.match(/class="use-link"/g)||[]).length,6);
  for(const slug of slugs) assert.ok(home.includes('href="./pack-'+slug+'.html"'),'Lien de banque '+slug);
  for(const removed of ['<section class="home-method"','<section class="endcap"'])
    assert.ok(!home.includes(removed),'Section redondante conservée '+removed);
  assert.ok(home.includes('Catalogue gratuit'),'Le catalogue demeure accessible en pied de page');
});

test('Page Produit : six objectifs en accès direct, sans empilement de CTA',()=>{
  assert.equal((hub.match(/class="collection-tile"/g)||[]).length,6);
  for(const slug of slugs) assert.ok(hub.includes('href="./pack-'+slug+'.html"'),slug);
  for(const label of ['Rédiger un texte','Créer un visuel','Préparer mon site','Préparer une vidéo','Simplifier une tâche','Comparer des options'])
    assert.ok(hub.includes(label),label);
  assert.doesNotMatch(hub,/id="comment-acheter"|class="commercial-end"|class="commercial-actions"/,'Sections et CTA superflus');
  assert.match(hub,/Ces banques sont en préparation/);
  assert.ok(hub.includes("Tester l'outil gratuit Rédaction"));
  assert.ok(hub.includes('services tiers du catalogue'));
});

test('Pages produit : navigation réduite, démos et retours toujours accessibles',()=>{
  for(const slug of slugs){
    const page=read('pack-'+slug+'.html');
    assert.doesNotMatch(page,/class="showroom-progress"/);
    assert.doesNotMatch(page,/POUR ALLER PLUS LOIN/);
    assert.ok(page.includes('href="./produit.html#collections"'),slug);
    assert.ok(page.includes('id="exemple"'),slug);
    assert.ok(page.includes('id="contenu-du-pack"'),slug);
    assert.ok(page.includes('Aucun achat ou précommande possible'),slug);
    assert.ok(page.includes('Prix : non fixé'),slug);
    assert.ok(page.includes('Contenu du pack envisagé'),slug);
    assert.doesNotMatch(page,/Poser une question sur le produit|href="\.\/panier|href="\.\/checkout/);
  }
  assert.ok(read('pack-redaction.html').includes('href="./outils/assistant-messages.html"'));
});
test('Contact et responsive : conserver les messages de sécurité et la grille compacte',()=>{
  assert.ok(contact.includes('Aucun achat ou suivi de commande'));
  const css=read('assets/product-showroom.css');
  assert.match(css,/\.collections-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css,/max-width:740px/);
  assert.match(css,/\.hub-secondary/);
  assert.doesNotMatch(css,/\.showroom-progress/);
});
test('Cahier des charges V1.5 (navigation V1.4) : décisions de simplification traçables',()=>{
  const spec=read('docs/CAHIER_DES_CHARGES_EXECUTION_2026-11-02.md');
  const ux=read('docs/SIMPLIFICATION_NAVIGATION_V1_4.md');
  assert.ok(spec.includes('Version 1.7'));
  assert.ok(spec.includes('./SIMPLIFICATION_NAVIGATION_V1_4.md'));
  for(let i=1;i<=9;i++)assert.ok(ux.includes('SIM-'+String(i).padStart(2,'0')),i);
});
