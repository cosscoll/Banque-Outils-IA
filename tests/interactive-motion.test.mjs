import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const html=read('index.html');
const hero=read('assets/kinetic-hero.js');
const menu=read('assets/journey-nav.js');
const showroom=read('assets/product-showroom.js');
const heroCss=read('assets/kinetic-hero.css');
const showroomCss=read('assets/product-showroom.css');

test('survol, focus et clic des cartes 3D CSS',()=>{
  for(const needle of ["card.addEventListener('pointerenter'","card.addEventListener('pointerleave'","card.addEventListener('focusin'","stage.addEventListener('pointermove'","stage.dataset.open=String(open)",'snapshotLeftRects()','closestLeftCard(','window.location.assign(card.href)',"item.classList.toggle('is-featured'"])
    assert.ok(hero.includes(needle),'missing '+needle);
  assert.ok(heroCss.includes('transform-style:preserve-3d'));
});

test('menu mobile et clavier, gestion des mouvements réduits',()=>{
  assert.ok(html.includes('id="global-mobile-nav"'));
  assert.ok(html.includes('class="global-menu-toggle"'));
  for(const needle of ["button.addEventListener('click'","event.key==='Escape'","menu.hidden=!expanded","link.addEventListener('click'","button.setAttribute('aria-expanded'"])
    assert.ok(menu.includes(needle),'missing '+needle);
  assert.ok(hero.includes("event.key==='Escape'"));
  assert.ok(hero.includes('prefers-reduced-motion'));
  assert.ok(heroCss.includes('prefers-reduced-motion'));
});

test('showroom : sélection verrouillée, interaction tactile, démo locale',()=>{
  for(const needle of ['let active=-1,locked=-1','if(!fine.matches','locked>=0',"button.setAttribute('aria-pressed'","demo.addEventListener('click'",'output.textContent=on?result:initial','prefers-reduced-motion'])
    assert.ok(showroom.includes(needle),'missing '+needle);
  assert.ok(showroomCss.includes('prefers-reduced-motion'));
  assert.ok(showroomCss.includes('transform-style:preserve-3d'));
});
