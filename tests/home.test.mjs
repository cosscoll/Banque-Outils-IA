import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Script de recherche présent');
new vm.Script(match[1]);
function setup(){
 const items=[...html.matchAll(/<article class="tool" data-key="([^"]+)">([\s\S]*?)<\/article>/g)];
 assert.equal(items.length,6,'Six familles d’usage');
 const cards=items.map(m=>({dataset:{key:m[1]},textContent:m[2].replace(/<[^>]*>/g,' '),hidden:false}));
 const obj=()=>({handlers:{},addEventListener(type,fn){this.handlers[type]=fn}});
 const query={...obj(),value:'',focus(){this.focused=true}};
 const count={textContent:''},empty={hidden:true},form=obj(),clear=obj(),explorer={scrollIntoView(opt){this.scrolled=opt}};
 const ids={query,count,empty,finder:form,'clear-search':clear,explorer};
 const document={getElementById:id=>ids[id],querySelectorAll:selector=>selector==='.tool'?cards:[]};
 vm.runInNewContext(match[1],{document,window:{matchMedia:()=>({matches:true})}});
 return {cards,query,count,empty,form,clear,explorer};
}
test('la recherche reste locale et accessible',()=>{
 assert.match(html,/role="search"/);
 assert.match(html,/aria-describedby="search-instructions"/);
 assert.match(html,/id="count" aria-live="polite"/);
 assert.match(html,/id="clear-search"/);
 assert.doesNotMatch(match[1],/fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});
test('comprendre une demande naturelle et les accents',()=>{
 const v=setup(); assert.equal(v.cards.filter(c=>!c.hidden).length,6);
 v.query.value='Je veux faire une vidéo';v.query.handlers.input();
 assert.equal(v.cards.filter(c=>!c.hidden).length,1);
 assert.match(v.cards.find(c=>!c.hidden).dataset.key,/vidéo/);
 v.query.value='Je voudrais résumer un document';v.query.handlers.input();
 assert.ok(v.cards.some(c=>!c.hidden&&c.dataset.key.includes('rédaction')));
 assert.equal(v.empty.hidden,true);
});
test('effacement et réduction du mouvement',()=>{
 const v=setup();
 v.query.value='xyzxyzxyz';v.query.handlers.input();assert.equal(v.empty.hidden,false);
 v.clear.handlers.click();assert.equal(v.query.value,'');
 assert.equal(v.cards.filter(c=>!c.hidden).length,6);assert.equal(v.query.focused,true);
 v.form.handlers.submit({preventDefault(){}});
 assert.equal(v.explorer.scrolled.behavior,'auto');
});
