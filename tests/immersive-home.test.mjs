import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const src = new URL('../', import.meta.url);
const html = fs.readFileSync(new URL('index.html',src),'utf8');
const scene = fs.readFileSync(new URL('assets/atelier.js',src),'utf8');
const css = fs.readFileSync(new URL('assets/atelier.css',src),'utf8');
const engine = fs.readFileSync(new URL('assets/vendor/three.min.js',src),'utf8');

test('moteur 3D en local, sans dépendance CDN ni repli invisible',()=>{
  new vm.Script(scene);
  assert.match(html, /<canvas id="atelier3d"/);
  assert.match(html, /id="workshop"/);
  assert.match(html, /assets\/vendor\/three\.min\.js/);
  assert.match(html, /assets\/atelier\.js/);
  assert.doesNotMatch(scene, /cdn\.jsdelivr\.net|import\(['"]https?:/);
  assert.ok(engine.length>200_000,'moteur local Three.js non vide');
  assert.match(scene, /const THREE=window\.THREE/);
  assert.match(scene, /new THREE\.WebGLRenderer/);
  assert.match(scene, /new THREE\.CanvasTexture/);
  assert.match(scene, /window\.__atelierDebug/);
});

test('scène WebGL pertinente et interface sémantique',()=>{
  assert.match(scene,/displayBack/);
  assert.match(scene,/const keyboard=/);
  assert.match(scene,/const screen=/);
  assert.match(scene,/modes\.map/);
  assert.match(html,/aria-label="Navigation principale"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/href="\.\/catalogue\.html"/);
  assert.match(html,/id="mobileNav"/);
  assert.match(html,/class="skip-link"/);
});

test('dégradation progressive, clavier, tactile et réduction des mouvements',()=>{
  assert.match(scene,/prefers-reduced-motion/);
  assert.match(css,/prefers-reduced-motion/);
  assert.match(html,/id="workshopFallback"/);
  assert.match(scene,/pointerdown/);
  assert.match(scene,/pointerup/);
  assert.match(scene,/webglcontextlost/);
  assert.match(html,/aria-pressed="true"/);
  assert.match(html,/aria-expanded="false"/);
  assert.doesNotMatch(scene,/sendBeacon|localStorage|sessionStorage|XMLHttpRequest/);
});

test('séparation démonstration et parcours produit, sans paiement actif',()=>{
  for(const p of ['catalogue.html','fiches.html','recherche.html'])
    assert.ok(fs.existsSync(new URL(p,src)),p);
  assert.match(html,/id="experience"/);
  assert.match(html,/id="univers"/);
  assert.doesNotMatch(html,/<script[^>]*src="https?:/);
  assert.doesNotMatch(html,/stripe\.com|paypal\.com|api[_-]?key/i);
});
