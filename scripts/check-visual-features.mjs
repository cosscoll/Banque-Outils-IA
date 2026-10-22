#!/usr/bin/env node
// Banque Outils IA — structural and interaction regression tests, no dependencies.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const html=read('index.html');
const css=read('assets/kinetic-hero.css');
const js=read('assets/kinetic-hero.js');
const theme=read('assets/transformation.css');
const atelier=read('assets/atelier.js');
const catalog=read('catalogue.html');
const count=(s,reg)=>[...s.matchAll(reg)].length;
const checks=[
 ['The rejected inset miniature and top slider are gone',()=>{
  assert.doesNotMatch(html,/id="expDemo"|id="expBrowserContent"|class="exp-demo"/);
  assert.doesNotMatch(html,/id="compareStage"|id="rangeBeforeAfter"|data-bank=/);
  assert.doesNotMatch(html,/assets\/experience-demo\.(?:css|js)|assets\/banks-hover\.(?:css|js)/);
 }],
 ['A clear kinetic hero is above the fold',()=>{
  assert.match(html,/class="kinetic-hero"/);
  assert.match(html,/id="main-title"/);
  assert.match(html,/id="kineticStage"/);
  assert.match(html,/id="kineticToggle"/);
  assert.ok(html.indexOf('id="experience"')<html.indexOf('id="atelier"'));
  assert.match(html,/assets\/kinetic-hero\.css/);
  assert.match(html,/assets\/kinetic-hero\.js/);
 }],
 ['Spatial pages form a coherent example site, not random blocks',()=>{
  assert.match(html,/class="kinetic-sheet kinetic-sheet-front"/);
  assert.match(html,/class="kinetic-sheet kinetic-sheet-middle"/);
  assert.match(html,/class="kinetic-sheet kinetic-sheet-back"/);
  assert.match(html,/SITE FICTIF|SITE FICTIF|UN SITE FICTIF/i);
  assert.match(css,/perspective:1700px/);
  assert.match(css,/transform-style:preserve-3d/);
  assert.match(css,/\.kinetic-stage\[data-open="true"\]/);
 }],
 ['Mouse hover unfolds and orients the site without clicks',()=>{
  assert.match(js,/stage\.addEventListener\('pointerenter'/);
  assert.match(js,/stage\.addEventListener\('pointermove'/);
  assert.match(js,/stage\.addEventListener\('pointerleave'/);
  assert.match(js,/stage\.dataset\.open=String\(open\)/);
  assert.match(js,/style\.setProperty\('--ry'/);
  assert.match(js,/style\.setProperty\('--rx'/);
 }],
 ['Touch, keyboard and mobile menu still work',()=>{
  assert.match(js,/toggleButton\.addEventListener\('click'/);
  assert.match(js,/event\.key==='Escape'/);
  assert.match(js,/menu\.addEventListener\('click'/);
  assert.match(js,/mobile\.querySelectorAll\('a'\)/);
  assert.match(css,/@media\(max-width:640px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(html,/aria-pressed="false"/);
 }],
 ['WebGL workspace and its four modes remain intact',()=>{
  assert.match(html,/id="atelier3d"/);
  assert.match(html,/id="workshopFallback"/);
  assert.equal(count(html,/data-mode="[0-3]"/g),4);
  assert.ok(html.indexOf('vendor/three.min.js')<html.indexOf('assets/atelier.js'));
  assert.ok(fs.statSync(path.join(root,'assets/vendor/three.min.js')).size>300000);
  assert.match(atelier,/new THREE\.WebGLRenderer/);
  assert.match(atelier,/threeScroll\(progress\)/);
  assert.match(theme,/\.scroll-reveal\.is-visible/);
 }],
 ['Six tool categories remain only lower in the homepage',()=>{
  assert.match(html,/id="usages"/);
  for(const item of ['redaction','creation','dev','medias','auto','recherche'])
   assert.match(html,new RegExp('\\?categorie='+item+'#recherche'));
  assert.match(catalog,/data-filter="tout"/);
  assert.doesNotMatch(html,/class="bank-selector"/);
 }],
 ['The commercial links point to current available pages',()=>{
  assert.match(html,/href="\.\/catalogue\.html"/);
  assert.match(html,/href="\.\/fiches\.html"/);
  assert.doesNotMatch(html,/stripe\.com|checkout\.stripe/i);
 }],
 ['HTML IDs are unique and styles syntactically balanced',()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  assert.equal(count(css,/\{/g),count(css,/\}/g));
 }]
];
let failed=0;
for(const [name,fn] of checks){try{fn();console.log('PASS',name)}catch(e){failed++;console.error('FAIL',name,'—',e.message)}}
if(failed){console.error(failed+' checks failed');process.exitCode=1}
else console.log(checks.length+' tests passed (browser visual verification still required).');
