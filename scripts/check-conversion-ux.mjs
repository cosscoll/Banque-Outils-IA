#!/usr/bin/env node
// Source-based UX, navigation and content quality checks; does not make network calls.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','catalogue.html','fiches.html','parcours.html','avancement.html'];
const html=new Map(pages.map(name=>[name,fs.readFileSync(path.join(root,name),'utf8')]));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const normalize=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
let passed=0,failed=0;
function check(name,run){
 try{run();passed++;console.log('PASS',name)}
 catch(error){failed++;console.error('FAIL',name,error.message)}
}
check('All local HTML links and hash anchors resolve',()=>{
 for(const [origin,body] of html){
  for(const hit of body.matchAll(/href=["']([^"']+)["']/g)){
   const href=hit[1];
   if(href.startsWith('https:')||href.startsWith('http:')||href.startsWith('mailto:')||href.startsWith('tel:'))continue;
   if(href.startsWith('javascript:'))throw Error(origin+': javascript link');
   const [relative,fragment='']=href.split('#');
   const page=relative?relative.replace(/^\.\//,''):origin;
   if(!page.endsWith('.html'))continue;
   assert.ok(html.has(page),origin+' points to missing '+page);
   if(fragment){
    const target=html.get(page);
    assert.ok(target.includes('id="'+fragment+'"'),origin+' -> '+page+'#'+fragment+' missing anchor');
   }
  }
 }
});
check('Every page has one useful headline and a descriptive title',()=>{
 for(const [name,body] of html){
  assert.equal((body.match(/<h1\b/g)||[]).length,1,name+' H1');
  assert.match(body,/<title>[^<]{18,}<\/title>/);
  assert.match(body,/<meta name="description" content="[^"]{50,}"/);
 }
});
check('Hero preserves interactive 5-card Obscure Pop experience',()=>{
 const page=html.get('index.html');
 assert.equal((page.match(/class="op-card op-card--/g)||[]).length,5);
 assert.match(page,/id="kineticStage"/);
 assert.match(page,/class="value-proof"/);
 assert.match(page,/href="\.\/catalogue\.html"/);
 assert.match(page,/href="\.\/parcours\.html"/);
});
check('Catalogue offers useful search, filters and individual examples',()=>{
 const page=html.get('catalogue.html');
 assert.equal((page.match(/class="resource"/g)||[]).length,18);
 assert.equal((page.match(/class="resource-example"/g)||[]).length,18);
 assert.equal((page.match(/data-quick-query=/g)||[]).length,4);
 assert.match(page,/id="resultCount" aria-live="polite"/);
 assert.match(page,/querySelector\('h3'\)/);
 assert.match(page,/querySelector\('p:not\(\.resource-example\)'\)/);
 assert.doesNotMatch(page,/recherche\.html/);
});
check('Six practical guides have useful exercises and distinct next actions',()=>{
 const page=html.get('fiches.html');
 assert.equal((page.match(/class="method-card"/g)||[]).length,6);
 assert.equal((page.match(/class="method-starter"/g)||[]).length,6);
 assert.match(page,/objectif=organiser/);
 assert.match(page,/objectif=creer/);
 assert.match(page,/objectif=mesurer/);
 assert.match(page,/categorie=auto/);
});
check('Interactive guide follows visitor-selected goal to a matching tool bank',()=>{
 const page=html.get('parcours.html');
 assert.match(page,/id="result-tools"/);
 assert.match(page,/new URLSearchParams\(location.search\)/);
 assert.match(page,/\['organiser','creer','mesurer'\]/);
 assert.match(page,/f\.get\('goal'\)/);
});
check('Sales language avoids fabricated transactions or social proof',()=>{
 const home=html.get('index.html'),catalogue=html.get('catalogue.html'),methods=html.get('fiches.html');
 assert.doesNotMatch(home,/déjà plus de [0-9]+ clients|avis vérifiés|résultats garantis/i);
 assert.match(catalogue,/services sont externes/i);
 assert.match(methods,/pas encore commercialisés/i);
});
check('Obscure Pop design and kinetic hover script are preserved',()=>{
 const visual=read('assets/obscure-pop.css');
 const css=read('assets/conversion.css');
 const script=read('assets/kinetic-hero.js');
 assert.match(visual,/\.op-stage \.op-card\.is-featured/);
 assert.match(script,/closestLeftCard\(/);
 assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length);
 for(const [name,body] of html)if(name!=='avancement.html')assert.match(body,/assets\/conversion\.css/);
});
check('One consistent compact sticky navigation on all five pages',()=>{
 for(const [name,body] of html){
  assert.equal((body.match(/class="global-header"/g)||[]).length,1,name+' header');
  assert.equal((body.match(/class="global-nav"/g)||[]).length,1,name+' desktop navigation');
  assert.match(body,/aria-controls="global-mobile-nav"/);
  assert.match(body,/href="\.\/parcours\.html"[^>]*>Me guider/);
  assert.match(body,/assets\/journey-nav\.js/);
  assert.match(body,/assets\/journey-nav\.css/);
  assert.doesNotMatch(body,/class="masthead"|class="menu-button"|class="mobile-menu-toggle"/);
 }
 const styles=read('assets/journey-nav.css');
 assert.match(styles,/position:sticky;top:0;z-index:6000/);
 const menu=read('assets/journey-nav.js');
 assert.match(menu,/event\.key==='Escape'/);
 assert.match(menu,/menu\.querySelectorAll\('a'\)/);
});
check('Progressive disclosure prevents information overload without removing content',()=>{
 const catalog=html.get('catalogue.html');
 const guides=html.get('fiches.html');
 assert.equal((catalog.match(/class="resource"/g)||[]).length,18);
 assert.match(catalog,/id="showAllTools"/);
 assert.match(catalog,/introCards=new Set/);
 assert.match(catalog,/showingIntro/);
 assert.match(catalog,/class="discovery-help"/);
 assert.equal((guides.match(/class="method-card"/g)||[]).length,6);
 assert.match(guides,/id="moreMethods"/);
 assert.match(guides,/function openDeepLink\(/);
 assert.match(guides,/requestAnimationFrame\(\(\)=>target\.scrollIntoView/);
});
console.log(passed+' passed, '+failed+' failed.');
if(failed)process.exitCode=1;
