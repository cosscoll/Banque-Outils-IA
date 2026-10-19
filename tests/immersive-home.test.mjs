import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const home=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const classic=readFileSync(new URL('../recherche.html',import.meta.url),'utf8');
const map=readFileSync(new URL('../cartographie.html',import.meta.url),'utf8');

test('accueil affiche immédiatement la cartographie et son code interactif',()=>{
 assert.match(home,/id="scene"/);
 assert.match(home,/id="nodes"/);
 assert.match(home,/id="liste"/);
 assert.match(home,/id="query"/);
 assert.match(home,/getContext\\('webgl'/);
 assert.match(home,/getContext\\('2d'/);
 const js=home.match(/<script>([\\s\\S]*?)<\\/script>/)?.[1];
 assert.ok(js,'script interactif présent');
 new vm.Script(js);
});
test('navigation entre version classique, accueil et carte dédiée',()=>{
 assert.match(home,/href="\\.\\/recherche\\.html"/);
 assert.match(home,/href="\\.\\/catalogue\\.html"/);
 assert.match(classic,/id="finder"/);
 assert.match(classic,/href="\\.\\/cartographie\\.html"/);
 assert.match(map,/href="\\.\\/recherche\\.html"/);
});
test('préserver SEO, accessibilité et zéro paiement',()=>{
 assert.match(home,/rel="canonical"/);
 assert.match(home,/prefers-reduced-motion/);
 assert.match(home,/role="status"/);
 assert.match(home,/href="#main"/);
 assert.doesNotMatch(home,/stripe|paypal|checkout|api[_-]?key/i);
});
