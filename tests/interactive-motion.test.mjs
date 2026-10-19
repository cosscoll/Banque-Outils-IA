import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const base=new URL('../',import.meta.url);
const html=fs.readFileSync(new URL('index.html',base),'utf8');
const scene=fs.readFileSync(new URL('assets/atlas.js',base),'utf8');
const motion=fs.readFileSync(new URL('assets/hover-motion.js',base),'utf8');
const css=fs.readFileSync(new URL('assets/motion.css',base),'utf8');

test('noyau de connaissance polygonal non décoratif',()=>{
 new vm.Script(scene);
 assert.match(scene,/function crystal\(/);
 assert.match(scene,/app\.crystal/);
 assert.match(scene,/app\.satellite/);
 assert.match(scene,/drawMesh\(app\.crystal/);
 assert.match(scene,/drawMesh\(app\.satellite/);
 assert.match(scene,/DATA\.forEach/);
 assert.match(scene,/scrollDepth/);
 assert.match(scene,/hoverX/);
});
test('survol realimentant selection et contenu',()=>{
 new vm.Script(motion);
 assert.match(motion,/pointerenter/);
 assert.match(motion,/button\.click\(\)/);
 assert.match(motion,/dataset\.family/);
 assert.match(motion,/pointermove/);
 assert.match(motion,/requestAnimationFrame/);
 assert.match(motion,/IntersectionObserver/);
 assert.match(css,/\[data-magnet\]/);
 assert.match(css,/\.universe:hover/);
 assert.match(css,/headline-rise/);
 assert.match(css,/aurora-drift/);
});
test('navigation privee, lisible et option animations reduites',()=>{
 assert.match(html,/assets\/motion\.css/);
 assert.match(html,/assets\/hover-motion\.js/);
 assert.match(html,/href="\.\/catalogue\.html"/);
 assert.match(html,/href="\.\/recherche\.html"/);
 assert.match(html,/id="familyTitle"/);
 assert.match(html,/data-family="5"/);
 assert.match(css,/prefers-reduced-motion/);
 assert.doesNotMatch(motion,/fetch\(|sendBeacon|localStorage|sessionStorage/);
 assert.doesNotMatch(scene,/fetch\(|sendBeacon|localStorage|sessionStorage/);
});
