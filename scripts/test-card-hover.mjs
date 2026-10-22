#!/usr/bin/env node
// Independent interaction regression. Run: node scripts/test-card-hover.mjs
// Simulates the browser delivering events to an overlay instead of the two left cards.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const code=readFileSync(resolve(root,'assets/kinetic-hero.js'),'utf8');
const listeners=new Map(),timers=new Map(),nodes=new Map();
let timerId=0;
const subscribe=(name,fn)=>listeners.set(name,[...(listeners.get(name)||[]),fn]);
class MockElement{
  constructor(id,rect=[0,0,10,10]){
    this.id=id;this.rect={left:rect[0],top:rect[1],width:rect[2],height:rect[3],right:rect[0]+rect[2],bottom:rect[1]+rect[3]};
    this.dataset={open:'false'};this.attributes={};this.href='./catalogue.html?categorie='+id+'#recherche';this.hidden=true;
    this.cl=new Set();this.style={properties:{},setProperty:(key,value)=>{this.style.properties[key]=value}};
    this.classList={contains:key=>this.cl.has(key),toggle:(key,enable)=>{if(enable)this.cl.add(key);else this.cl.delete(key)}};
  }
  addEventListener(event,fn){subscribe(this.id+':'+event,fn)}
  setAttribute(key,value){this.attributes[key]=value}
  getBoundingClientRect(){return this.rect}
  matches(q){return q===':hover'?!!this.hovered:false}
  contains(node){return node===this}
  closest(q){
    if(q==='.op-card')return this.cl.has('op-card')?this:null;
    if(q.includes('a,button'))return this.interactive?this:null;
    return null;
  }
  querySelectorAll(q){return q==='.op-card'?cards:[]}
  focus(){this.focused=true}
}
const get=id=>nodes.get(id);
const positions={
 video:[520,220,230,240],visuel:[880,130,230,240],auto:[850,370,250,220],
 texte:[540,465,220,195],analyse:[810,615,240,145]
};
const cards=Object.entries(positions).map(([id,rect])=>{
  const card=new MockElement(id,rect);card.cl.add('op-card');card.cl.add('op-card--'+id);card.interactive=true;
  nodes.set(id,card);return card
});
const stage=new MockElement('kineticStage',[500,100,650,700]);
const toggle=new MockElement('kineticToggle');
const label=new MockElement('kineticToggleText');
for(const item of [stage,toggle,label])nodes.set(item.id,item);
const overlay=new MockElement('blocked-overlay');
const doc={
  activeElement:null,
  getElementById:id=>get(id),
  querySelector:()=>null,
  addEventListener:(event,fn)=>subscribe('document:'+event,fn)
};
const visits=[];
const win={
  matchMedia:q=>({matches:q.includes('hover: hover'),addEventListener(){}}),
  setTimeout(fn){const id=++timerId;timers.set(id,fn);return id},
  clearTimeout(id){timers.delete(id)},
  location:{assign:url=>visits.push(url)}
};
runInNewContext(code,{document:doc,window:win,Element:MockElement});
const dispatch=(target,event,details={})=>{
  for(const fn of listeners.get(target+':'+event)||[])fn(details)
};
const move=(x,y,target)=>dispatch('document','pointermove',{pointerType:'mouse',clientX:x,clientY:y,target});
const center=card=>[card.rect.left+card.rect.width/2,card.rect.top+card.rect.height/2];

for(const card of cards){
  const [x,y]=center(card);
  move(x,y,['video','texte'].includes(card.id)?overlay:card);
  assert.equal(card.cl.has('is-featured'),true,card.id+' should lift even behind an overlay');
  assert.equal(stage.cl.has('has-featured'),true);
  assert.equal(cards.filter(c=>c.cl.has('is-featured')).length,1,'Only one card highlighted');
  console.log('PASS',card.id,'hover (with overlays where relevant)');
}
const video=get('video');
const [vx,vy]=center(video);move(vx,vy,overlay);
dispatch('kineticStage','pointerleave',{pointerType:'mouse',clientX:vx,clientY:vy});
assert.equal(video.cl.has('is-featured'),true,'False pointerleave must not cancel left-card hover');
console.log('PASS false stage leave does not cancel hover');

let prevented=false;
dispatch('document','click',{clientX:vx,clientY:vy,target:overlay,preventDefault(){prevented=true}});
assert.equal(prevented,true);
assert.equal(visits.at(-1),video.href);
console.log('PASS covered link navigates to matching catalogue category');
move(20,20,overlay);
assert.equal(stage.cl.has('has-featured'),false);
console.log('PASS leaving the showcase resets hover');
