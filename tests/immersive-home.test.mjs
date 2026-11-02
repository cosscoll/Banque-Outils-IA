import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const html=read('index.html');
const kinetic=read('assets/kinetic-hero.js');
const kineticCss=read('assets/kinetic-hero.css');
const obscureCss=read('assets/obscure-pop.css');
const showroom=read('assets/product-showroom.js');
const packs=['redaction','visuel','sites-web','video-audio','automatisation','recherche-analyse'];

test('accueil : cinq cartes en perspective, ancien WebGL volontairement retiré',()=>{
  new vm.Script(kinetic);
  assert.ok(html.includes('id="kineticStage"'));
  assert.ok(html.includes('id="kineticToggle"'));
  assert.ok(html.includes('id="usages"'));
  assert.equal((html.match(/class="op-card op-card--/g)||[]).length,5);
  assert.ok(kineticCss.includes('transform-style:preserve-3d')||obscureCss.includes('transform-style:preserve-3d'));
  for(const slug of ['video-audio','visuel','automatisation','redaction','recherche-analyse'])
    assert.ok(html.includes('href="./pack-'+slug+'.html"'),slug);
  for(const obsolete of ['id="atelier3d"','id="workshop"','assets/atelier.js','assets/vendor/three.min.js'])
    assert.ok(!html.includes(obsolete),'obsolete computer 3D: '+obsolete);
});

test('accueil : navigation, accessibilité et honnêteté commerciale',()=>{
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  for(const needle of ['class="skip-link"','aria-label="Navigation principale"','href="./produit.html"','href="./contact.html"'])
    assert.ok(html.includes(needle),needle);
  assert.ok(kineticCss.includes('prefers-reduced-motion'));
  assert.ok(obscureCss.includes('prefers-reduced-motion'));
  assert.doesNotMatch(html,/stripe\.com|paypal\.com|api[_-]?key/i);
});

test('six produits : showroom, démo, liens et statut non commercialisé',()=>{
  new vm.Script(showroom);
  for(const slug of packs){
    const page=read('pack-'+slug+'.html');
    assert.equal((page.match(/<h1\b/g)||[]).length,1,slug);
    for(const needle of ['data-showroom','id="demo-action"','id="demo-result"','href="./produit.html"','noindex,follow','Aucun achat possible actuellement'])
      assert.ok(page.includes(needle),slug+' '+needle);
    assert.equal((page.match(/data-focus-card="/g)||[]).length,3,slug);
  }
  assert.doesNotMatch(showroom,/fetch\(|XMLHttpRequest|sendBeacon/);
});
