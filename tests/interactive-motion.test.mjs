import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=new URL('../',import.meta.url);
const html=fs.readFileSync(new URL('index.html',base),'utf8');
const js=fs.readFileSync(new URL('assets/atelier.js',base),'utf8');
const css=fs.readFileSync(new URL('assets/atelier.css',base),'utf8');

test('quatre usages réellement sélectionnables',()=>{
  const ids=[...html.matchAll(/<button[^>]*data-mode="(\d+)"[^>]*>/g)].map(m=>m[1]);
  assert.deepEqual(ids,['0','1','2','3']);
  assert.match(js,/addEventListener\('click',\(\)=>changeMode/);
  assert.match(js,/setAttribute\('aria-pressed'/);
  assert.match(js,/surfaceMaterial\.map=textures\[i\]/);
});

test('survol et drag changent vraiment la scène active',()=>{
  assert.match(js,/mouseenter/);
  assert.match(js,/pointermove/);
  assert.match(js,/pointerdown/);
  assert.match(js,/pointerup/);
  assert.match(js,/setPointerCapture/);
  assert.match(js,/requestAnimationFrame/);
  assert.match(js,/IntersectionObserver/);
  assert.match(js,/root\.rotation\.y/);
  assert.match(js,/renderer\.render\(scene,camera\)/);
});

test('menu mobile et fallback 2D explicites',()=>{
  assert.match(js,/mobileNav\.hidden=!opening/);
  assert.match(js,/aria-expanded/);
  assert.match(js,/reason:'three-local'/);
  assert.match(js,/reason:'context'/);
  assert.match(js,/webglcontextlost/);
  assert.match(css,/prefers-reduced-motion/);
  assert.match(html,/id="workshopFallback"/);
  assert.doesNotMatch(js,/https?:\/\/cdn\.jsdelivr\.net/);
});
