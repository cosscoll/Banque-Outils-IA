import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const html=fs.readFileSync(new URL('catalogue.html',root),'utf8');
const home=fs.readFileSync(new URL('index.html',root),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'Catalogue local inline script absent');

test('catalogue : 18 outils, six familles et contrôles accessibles',()=>{
  new vm.Script(script);
  for(const id of ['toolQuery','resetQuery','resultCount','emptyState','toolsGrid','showAllTools'])
    assert.ok(html.includes('id="'+id+'"'),id+' missing');
  assert.equal((html.match(/<article class="resource"/g)||[]).length,18);
  for(const cat of ['redaction','creation','dev','medias','auto','recherche'])
    assert.ok(html.includes('data-cat="'+cat+'"'),cat+' missing');
  assert.equal((html.match(/data-quick-query=/g)||[]).length,4);
  assert.ok(html.includes('data-filter="tout"'));
  assert.doesNotMatch(script,/fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});

test('catalogue : recherche et six outils initiaux',()=>{
  for(const needle of [".normalize('NFD')",'const corpus=new Map(cards.map(','searchWords.every(','card.hidden=!show','firstByCategory.values()','showingIntro','visible!==0',"more.addEventListener('click'"])
    assert.ok(script.includes(needle),'Expected functionality '+needle);
});

test('catalogue : réinitialisation, état de filtres et navigation',()=>{
  for(const needle of ["input.addEventListener('input',render)","reset.addEventListener('click'","input.value=''","input.focus()","button.setAttribute('aria-pressed'","filter='tout'"])
    assert.ok(script.includes(needle),'Expected event '+needle);
  for(const href of ['./produit.html','./contact.html'])
    assert.ok(html.includes('href="'+href+'"'),href);
  assert.ok(home.includes('href="./catalogue.html"'));
});
