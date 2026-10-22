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
  assert.ok(html.indexOf('id="experience"')<html.indexOf('id="usages"'));
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
  assert.doesNotMatch(terrain,/feTurbulence|filter="url\(#noise\)"|M0 0h1400v720H0z/);
  assert.match(terrain,/viewBox="0 382 1400 338"/);
  assert.doesNotMatch(html,/op-volcanic-rocks/);
  assert.doesNotMatch(obscure,/op-volcanic-rocks|obscure-terrain\.svg/);
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
 ['Every tool card rises above its siblings on hover and focus',()=>{
  const names=['video','visuel','auto','texte','analyse'];
  for(const name of names)assert.match(html,new RegExp('class="op-card op-card--'+name+'"'));
  assert.equal(count(html,/class="op-card op-card--/g),names.length);
  assert.match(js,/stage\.querySelectorAll\('\.op-card'\)/);
  assert.match(js,/card\.addEventListener\('pointerenter'/);
  assert.match(js,/card\.addEventListener\('pointerleave'/);
  assert.match(js,/card\.addEventListener\('focusin'/);
  assert.match(js,/stage\.classList\.toggle\('has-featured'/);
  assert.match(js,/item\.classList\.toggle\('is-featured'/);
  assert.match(obscure,/\.op-stage \.op-card\.is-featured/);
  assert.match(obscure,/z-index:9999!important/);
  assert.match(obscure,/340px\) rotateZ\(0deg\) scale\(1\.08\)/);
  assert.match(obscure,/\.op-stage\.has-featured \.op-card:not\(\.is-featured\)/);
 }],
 ['Two left cards remain pointer-accessible through editorial layers',()=>{
  assert.match(obscure,/Hero hit-test repair/);
  assert.match(obscure,/\.obscure-pop \.kinetic-left\s*\{[^}]*pointer-events:\s*none/);
  assert.match(obscure,/\.obscure-pop \.kinetic-left \.kinetic-actions a\s*\{[^}]*pointer-events:\s*auto/);
  assert.match(obscure,/\.obscure-pop \.kinetic-right\s*\{[^}]*z-index:\s*6/);
  assert.match(obscure,/\.obscure-pop \.kinetic-stage\.op-stage\s*\{[^}]*z-index:\s*7/);
  assert.match(obscure,/\.obscure-pop \.op-card\s*\{[^}]*pointer-events:\s*auto/);
  assert.match(html,/obscure-pop\.css\?v=20261022-hover-hitfix/);
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
 ['Unwanted computer model and obsolete navigation are fully gone',()=>{
   assert.doesNotMatch(html,/id="atelier3d"|id="workshopFallback"|id="workshop"|id="atelier"/);
   assert.doesNotMatch(html,/href="#atelier"|Atelier 3D/);
   assert.doesNotMatch(html,/assets\/atelier\.js|assets\/vendor\/three\.min\.js/);
   assert.doesNotMatch(html,/data-mode="[0-3]"/);
   assert.match(html,/href="#usages"/);
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
  assert.match(obscure,/overflow-x:clip/);
 }]
];
let failed=0;
for(const [name,fn] of checks){try{fn();console.log('PASS',name)}catch(e){failed++;console.error('FAIL',name,'—',e.message)}}
if(failed){console.error(failed+' checks failed');process.exitCode=1}
else console.log(checks.length+' tests passed (browser visual verification still required).');
