#!/usr/bin/env node
// Banque Outils IA — non-regression, statique, sans dépendances externes.
// node scripts/check-visual-features.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const home=read('index.html');
const theme=read('assets/transformation.css');
const demoCSS=read('assets/experience-demo.css');
const demoJS=read('assets/experience-demo.js');
const atelier=read('assets/atelier.js');
const catalogue=read('catalogue.html');
const count=(s,reg)=>[...s.matchAll(reg)].length;
const tests=[
 ['The selected design and functional demo remain at the top',()=>{
  assert.match(home,/id="experience"/);
  assert.match(home,/id="expDemo"/);
  assert.match(home,/id="expBrowserContent"/);
  assert.ok(home.indexOf('id="experience"')<home.indexOf('id="atelier"'));
  assert.ok(home.indexOf('id="experience"')<home.indexOf('id="usages"'));
  assert.match(home,/assets\/experience-demo\.css/);
  assert.match(home,/assets\/experience-demo\.js/);
 }],
 ['The rejected horizontal before/after slider and duplicate category tabs are absent',()=>{
  assert.doesNotMatch(home,/id="compareStage"|id="rangeBeforeAfter"/);
  assert.doesNotMatch(home,/data-bank=|class="bank-selector"/);
  assert.doesNotMatch(home,/assets\/banks-hover\.js|assets\/transformation\.js/);
 }],
 ['Live demonstration has real hover, touch, focus and click behaviors',()=>{
  assert.equal(count(home,/data-demo-trigger="(?:copy|object|workflow)"/g),3);
  assert.match(demoJS,/addEventListener\('pointerenter'/);
  assert.match(demoJS,/addEventListener\('pointerleave'/);
  assert.match(demoJS,/addEventListener\('focus'/);
  assert.match(demoJS,/addEventListener\('click'/);
  assert.match(demoJS,/setAttribute\('aria-hidden'/);
  assert.match(demoJS,/scroller\.addEventListener\('scroll'/);
 }],
 ['Demonstration shows site, crafted object and honest workflow',()=>{
  for(const id of ['expLiveHeadline','expLiveDescription','expFinishLabel','expWorkflow','expActionStatus'])
   assert.match(home,new RegExp('id="'+id+'"'));
  assert.match(home,/id="expLiveHeadline"/);
  assert.match(home,/AUCUNE DEMANDE ENVOYÉE/);
  assert.match(home,/fictif|fictive/i);
  assert.match(demoCSS,/\.exp-demo\[data-demo-state="object"\]/);
  assert.match(demoCSS,/\.exp-demo\[data-demo-state="workflow"\]/);
 }],
 ['Mobile and accessible reduced-motion paths remain present',()=>{
  assert.match(demoCSS,/@media\(max-width:480px\)/);
  assert.match(demoCSS,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(home,/tabindex="0"/);
  assert.match(home,/data-demo-trigger="object"/);
  assert.match(demoJS,/event\.key==='Escape'/);
 }],
 ['Existing WebGL atelier and animations remain loaded',()=>{
  assert.match(home,/<script defer src="\.\/assets\/vendor\/three\.min\.js"><\/script>/);
  assert.match(home,/<script defer src="\.\/assets\/atelier\.js"><\/script>/);
  assert.ok(home.indexOf('vendor/three.min.js')<home.indexOf('assets/atelier.js'));
  assert.ok(fs.statSync(path.join(root,'assets/vendor/three.min.js')).size>300000);
  assert.match(home,/id="workshop"/);
  assert.match(home,/id="atelier3d"/);
  assert.equal(count(home,/data-mode="[0-3]"/g),4);
  assert.match(atelier,/new THREE\.WebGLRenderer/);
  assert.match(atelier,/canvas\.addEventListener\('pointermove'/);
  assert.match(atelier,/threeScroll\(progress\)/);
  assert.match(theme,/\.scroll-reveal\.is-visible/);
 }],
 ['The six tool families stay in the existing bottom section',()=>{
  assert.match(home,/id="usages"/);
  const categories=['redaction','creation','dev','medias','auto','recherche'];
  for(const category of categories)
   assert.match(home,new RegExp('\\?categorie='+category+'#recherche'));
  assert.match(catalogue,/data-filter="tout"/);
 }],
 ['Commercial calls to action lead to real existing pages',()=>{
  assert.match(home,/href="\.\/fiches\.html"/);
  assert.match(home,/href="\.\/catalogue\.html"/);
  assert.doesNotMatch(home,/stripe\.com|checkout\.stripe\.com/i);
 }],
 ['Unique HTML IDs and balanced style rules',()=>{
  const ids=[...home.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const style of [theme,demoCSS])
   assert.equal(count(style,/\{/g),count(style,/\}/g));
 }]
];
let failures=0;
for(const [name,verify] of tests){
 try{verify();console.log('PASS',name)}
 catch(error){failures++;console.error('FAIL',name,'—',error.message)}
}
if(failures){console.error(failures+' checks failed');process.exitCode=1}
else console.log(tests.length+' regression checks passed. Visual/GPU tests are separate.');
