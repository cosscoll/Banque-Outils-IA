#!/usr/bin/env node
// Regression guard — no packages required, no external network calls.
// Run locally: node scripts/check-visual-features.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve(import.meta.dirname,'..');
const file=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=file('index.html'),css=file('assets/transformation.css'),atelier=file('assets/atelier.js'),comparison=file('assets/transformation.js');
const matchCount=(content,pattern)=>[...content.matchAll(pattern)].length;

const checks=[
 ['Three.js vendor remains loaded before atelier.js',()=>{
    assert.match(html,/<script defer src="\.\/assets\/vendor\/three\.min\.js"><\/script>/);
    assert.match(html,/<script defer src="\.\/assets\/atelier\.js"><\/script>/);
    assert.ok(html.indexOf('vendor/three.min.js')<html.indexOf('assets/atelier.js'));
    assert.ok(fs.statSync(path.join(root,'assets/vendor/three.min.js')).size>300000);
 }],
 ['Visible interactive 3D section and fallback remain available',()=>{
    assert.match(html,/id="workshop"/);
    assert.match(html,/id="atelier3d"/);
    assert.match(html,/id="workshopFallback"/);
    assert.ok(html.indexOf('class="home-workshop')<html.indexOf('class="transformations"'));
    assert.match(atelier,/window\.THREE/);
    assert.match(atelier,/new THREE\.WebGLRenderer/);
 }],
 ['3D has hover control and four working mode selectors',()=>{
    assert.equal(matchCount(html,/data-mode="[0-3]"/g),4);
    assert.match(atelier,/addEventListener\('mouseenter'/);
    assert.match(atelier,/canvas\.addEventListener\('pointermove'/);
    assert.match(atelier,/threeSelect=\(i\)=>/);
 }],
 ['Scroll-directed camera and scroll reveal exist',()=>{
    assert.match(atelier,/rect=holder\.getBoundingClientRect/);
    assert.match(atelier,/threeScroll\(progress\)/);
    assert.match(atelier,/scroll-reveal/);
    assert.match(css,/\.scroll-reveal\.is-visible/);
 }],
 ['Six categories have meaningful animated hover previews',()=>{
    assert.equal(matchCount(html,/class="use-output use-output-/g),6);
    assert.match(css,/\.use-link:hover \.use-output/);
    assert.match(css,/\.use-link:focus-visible \.use-output/);
 }],
 ['Six-bank hover stage and unique catalogue categories remain available',()=>{
    const bankJS=file('assets/banks-hover.js'),bankCSS=file('assets/banks-hover.css');
    const names=['redaction','creation','dev','medias','auto','recherche'];
    for(const name of names){
      assert.match(html,new RegExp('data-bank="'+name+'"'));
      assert.match(bankJS,new RegExp('categorie='+name));
    }
    assert.equal(matchCount(html,/class="bank-choice(?: is-active)?"/g),6);
    assert.match(html,/id="compareStage"/);
    assert.match(html,/id="bankOutputArt"/);
    assert.match(html,/assets\/banks-hover\.js/);
    assert.match(html,/assets\/banks-hover\.css/);
    assert.match(bankJS,/addEventListener\('pointerenter'/);
    assert.match(bankJS,/addEventListener\('click'/);
    assert.match(bankCSS,/\.bank-stage\.is-changing/);
 }],
 ['Before and after comparison supports hover, mobile and keyboard',()=>{
    assert.match(html,/id="rangeBeforeAfter"/);
    assert.match(comparison,/stage\.addEventListener\('pointermove'/);
    assert.match(comparison,/stage\.addEventListener\('pointerdown'/);
    assert.match(comparison,/slider\.addEventListener\('input'/);
    assert.match(css,/\.m-range:focus-visible/);
 }],
 ['Motion remains accessible and no automated spending is introduced',()=>{
    assert.match(css,/prefers-reduced-motion:reduce/);
    assert.doesNotMatch(html,/stripe\.com|checkout\.stripe|buy\.stripe/i);
 }]
];
let failed=0;
for(const [name,check] of checks){
 try{check();console.log('PASS',name)}
 catch(err){failed++;console.error('FAIL',name,'—',err.message)}
}
if(failed){console.error(failed+' regression check(s) failed');process.exitCode=1}
else console.log(checks.length+' checks passed. Real-device GPU/visual QA remains separate.');
