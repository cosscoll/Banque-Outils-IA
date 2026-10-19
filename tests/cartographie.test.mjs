import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../cartographie.html',import.meta.url),'utf8');
const home=readFileSync(new URL('../recherche.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test('script immersif syntaxiquement valide',()=>{
 assert.ok(script,'script intégré');
 new vm.Script(script,{filename:'cartographie-inline.js'});
});
test('six familles du catalogue et un graphe de relations',()=>{
 for(const id of ['texte','image','code','media','agents','recherche']) assert.ok(script.includes("['"+id+"',"),id);
 assert.match(script,/const E=\[\[/);
 assert.match(script,/E\.forEach/);
});
test('interactions intégrées au catalogue',()=>{
 assert.match(html,/id="nodes"/);
 assert.match(html,/id="liste"/);
 assert.match(html,/id="detail"/);
 assert.match(html,/id="query"/);
 assert.match(html,/id="filters"/);
 assert.match(script,/query=e\.target\.value/);
 assert.match(script,/function filter\(/);
 assert.match(script,/function choose\(/);
 assert.match(script,/\.\/catalogue\.html/);
});
test('accessibilité et dégradation progressive',()=>{
 assert.match(html,/href="#main"/);
 assert.match(html,/aria-label="Familles IA à sélectionner"/);
 assert.match(html,/role="status"/);
 assert.match(html,/prefers-reduced-motion/);
 assert.match(html,/\<noscript\>/);
 assert.match(script,/getContext\('webgl'/);
 assert.match(script,/getContext\('2d'/);
 assert.match(script,/setAttribute\('aria-pressed'/);
});
test('liens valides et préservation recherche accueil',()=>{
 for(const target of ['catalogue.html','fiches.html','parcours.html','avancement.html','index.html']) assert.ok(existsSync(new URL('../'+target,import.meta.url)),target);
 assert.match(home,/href="\.\/cartographie\.html"/);
 assert.match(home,/id="finder"/);
 assert.match(home,/id="clear-search"/);
 assert.match(home,/const stops=new Set/);
});
test('confidentialité et absence de paiement',()=>{
 assert.doesNotMatch(script,/fetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon|https?:\/\//);
 assert.doesNotMatch(html,/stripe|paypal|checkout|api[_-]?key|carte bancaire/i);
});
