import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../assets/atlas.css',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../assets/atlas.js',import.meta.url),'utf8');
test('vraies géométries WebGL : sphères, torus, profondeur et lumière',()=>{
 new vm.Script(js);
 for(const marker of ['getContext(\'webgl\'','gl.DEPTH_TEST','gl.drawElements','function sphere(','function torus(','uMvp','uModel','uColor','requestAnimationFrame'])assert.ok(js.includes(marker),marker);
 assert.ok(html.includes('id="atlas3d"'));
 assert.ok(html.includes('id="scene"'));
});
test('accueil calme, dense en visuel mais pas en texte',()=>{
 assert.match(html,/point de vue/);
 assert.match(html,/atlas\.css/);
 assert.match(html,/atlas\.js/);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.equal((html.match(/data-family="/g)||[]).length,6);
 assert.ok(css.includes('--paper:#f5f4ef'));
 assert.ok(css.includes('--ink:#182124'));
 assert.doesNotMatch(css,/@import|fonts\.googleapis\.com|url\(https?:/);
});
test('mobile, reduced motion, fallback et clavier',()=>{
 assert.ok(css.includes('@media(max-width:570px)'));
 assert.ok(css.includes('prefers-reduced-motion'));
 assert.ok(js.includes("getContext('2d')"));
 assert.ok(js.includes("pointerdown"));
 assert.ok(js.includes("pointerup"));
 assert.ok(js.includes("button"));
 assert.match(html,/aria-pressed="false"/);
 assert.match(html,/href="#main"/);
});
test('découverte utile sans contenu premium ni tracking',()=>{
 for(const path of ['catalogue.html','recherche.html','avancement.html'])assert.ok(fs.existsSync(new URL('../'+path,import.meta.url)),path);
 assert.ok(html.includes('href="./catalogue.html"'));
 assert.ok(html.includes('href="./recherche.html"'));
 assert.ok(js.includes('family(index)'));
 assert.doesNotMatch(js,/fetch\(|XMLHttpRequest|localStorage|sendBeacon/);
 assert.doesNotMatch(html,/stripe|paypal|checkout|api[_-]?key/i);
});
