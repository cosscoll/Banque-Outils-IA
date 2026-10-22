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
const obscure=read('assets/obscure-pop.css');
const terrain=read('assets/obscure-terrain.svg');
const theme=read('assets/transformation.css');
const atelier=read('assets/atelier.js');
const catalog=read('catalogue.html');
const inside=['catalogue.html','fiches.html','parcours.html','avancement.html'];
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
 ['Five interactive tool showcases replace the old fictional site',()=>{
  const cats=['medias','creation','auto','redaction','recherche'];
  for(const cat of cats)assert.match(html,new RegExp('href="\\./catalogue\\.html\\?categorie='+cat+'#recherche"'));
  assert.equal(count(html,/class="op-card op-card--/g),5);
  assert.match(html,/class="kinetic-constellation op-constellation"/);
  assert.match(obscure,/\.op-stage\[data-open=true\] \.op-card/);
  assert.match(obscure,/transform-style:preserve-3d/);
  assert.match(terrain,/feTurbulence/);
  assert.doesNotMatch(html,/class="kinetic-sheet /);
 }],
 ['Obscure Pop is consistent across all pages and header stays sticky',()=>{
  assert.match(html,/assets\/obscure-pop\.css/);
  assert.match(html,/class="obscure-pop"/);
  for(const name of inside){
    const content=read(name);
    assert.match(content,/assets\/obscure-pop\.css/);
    assert.match(content,/obscure-pop/);
  }
  assert.match(obscure,/\.obscure-pop \.masthead\{position:sticky!important;top:0!important/);
  assert.match(obscure,/\.library-page\.obscure-pop \.header\{position:sticky!important;top:0!important/);
  assert.match(obscure,/--op-lime:#d9ff3a/);
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
  assert.equal(count(obscure,/\{/g),count(obscure,/\}/g));
 }]
];
let failed=0;
for(const [name,fn] of checks){try{fn();console.log('PASS',name)}catch(e){failed++;console.error('FAIL',name,'—',e.message)}}
if(failed){console.error(failed+' checks failed');process.exitCode=1}
else console.log(checks.length+' tests passed (browser visual verification still required).');
