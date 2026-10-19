import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const home=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const classic=readFileSync(new URL('../recherche.html',import.meta.url),'utf8');
const map=readFileSync(new URL('../cartographie.html',import.meta.url),'utf8');
test('cartographie embarquée directement dans l accueil',()=>{
 for(const marker of ['id="scene"','id="nodes"','id="liste"','id="query"', "getContext('webgl'", "getContext('2d'"])assert.ok(home.includes(marker),marker);
 const script=home.split('<script>')[1]?.split('</script>')[0];
 assert.ok(script,'script HTML disponible');
 new vm.Script(script);
});
test('navigation entre les vues 3D et la recherche historique',()=>{
 for(const dest of ['./recherche.html','./catalogue.html','./cartographie.html'])assert.ok(home.includes(dest),dest);
 assert.ok(classic.includes('id="finder"'));
 assert.ok(classic.includes('./cartographie.html'));
 assert.ok(map.includes('./recherche.html'));
});
test('SEO, accessible et aucune transaction',()=>{
 for(const marker of ['rel="canonical"','prefers-reduced-motion','role="status"','href="#main"'])assert.ok(home.includes(marker),marker);
 for(const forbidden of ['stripe','paypal','checkout','api_key'])assert.equal(home.toLowerCase().includes(forbidden),false,forbidden);
});
