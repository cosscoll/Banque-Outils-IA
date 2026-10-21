import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const url=new URL('../catalogue.html',import.meta.url);
const html=fs.readFileSync(url,'utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'script de catalogue manquant');
const script=match[1];

test('catalogue accessible et interactions syntaxiquement valides',()=>{
  new vm.Script(script);
  for(const id of ['toolQuery','resetQuery','resultCount','emptyState','toolsGrid'])
    assert.match(html,new RegExp('id="'+id+'"'));
  assert.match(html, /aria-label="Navigation principale"/);
  assert.match(html, /data-filter="tout"/);
  assert.doesNotMatch(script,/fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});

test('18 ressources locales réelles et six familles de filtres',()=>{
  assert.equal((html.match(/<article class="resource"/g)||[]).length,18);
  for(const key of ['redaction','creation','dev','medias','auto','recherche'])
    assert.ok(html.includes('data-cat="'+key+'"')||html.includes('data-filter="'+key+'"'),key);
  assert.match(script,/s\.normalize\('NFD'\)/);
  assert.match(script,/item\.hidden=!keep/);
  assert.match(script,/const words=norm\(input\.value\)/);
});

test('recherche réactive, filtres, effacement et menu',()=>{
  assert.match(script,/addEventListener\('input',render\)/);
  assert.match(script,/addEventListener\('click'/);
  assert.match(script,/input\.value=''/);
  assert.match(script,/input\.focus\(\)/);
  assert.match(script,/btns\.forEach\(x=>x\.setAttribute\('aria-pressed'/);
  assert.match(script,/nav\.hidden=!open/);
  assert.match(html,/href="\.\/index\.html"/);
});
