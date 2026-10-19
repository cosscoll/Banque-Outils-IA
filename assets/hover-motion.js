/* Interaction layer — same public data as WebGL scene, no tracking or storage. */
(()=>{
'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const precise=window.matchMedia('(hover:hover) and (pointer:fine)');
const scene=document.getElementById('scene');
const buttons=[...document.querySelectorAll('[data-family]')];
const detail=document.getElementById('universeDetail');
let lastFocus=-1;
const clamped=(v,min,max)=>Math.min(max,Math.max(min,v));
const isInteractive=()=>precise.matches&&!reduced.matches;
function point(el,event){
 const rect=el.getBoundingClientRect();
 const x=event.clientX-rect.left,y=event.clientY-rect.top;
 const px=clamped((x/Math.max(rect.width,1))*100,0,100);
 const py=clamped((y/Math.max(rect.height,1))*100,0,100);
 el.style.setProperty('--light-x',px+'%');el.style.setProperty('--light-y',py+'%');
 return{x,y,rect,px,py};
}
if(scene){
 scene.addEventListener('pointermove',event=>{
  if(!isInteractive())return;
  const p=point(scene,event);
  scene.style.setProperty('--cursor-x',p.px+'%');
  scene.style.setProperty('--cursor-y',p.py+'%');
 },{passive:true});
 scene.addEventListener('pointerleave',()=>{
  scene.style.setProperty('--cursor-x','50%');
  scene.style.setProperty('--cursor-y','50%');
 });
}
document.querySelectorAll('[data-magnet]').forEach(el=>{
 let frame=0,x=0,y=0,nextX=0,nextY=0;
 const tick=()=>{frame=0;x+=(nextX-x)*.35;y+=(nextY-y)*.35;
  el.style.setProperty('--mag-x',x.toFixed(2)+'px');
  el.style.setProperty('--mag-y',y.toFixed(2)+'px');
  if(Math.abs(nextX-x)+Math.abs(nextY-y)>.5)frame=requestAnimationFrame(tick);
 };
 const move=e=>{if(!isInteractive())return;
  const p=point(el,e);
  nextX=clamped((p.x-p.rect.width/2)*.13,-12,12);
  nextY=clamped((p.y-p.rect.height/2)*.2,-9,9);
  if(!frame)frame=requestAnimationFrame(tick);
 };
 const reset=()=>{nextX=0;nextY=0;if(!frame)frame=requestAnimationFrame(tick)};
 el.addEventListener('pointermove',move,{passive:true});
 el.addEventListener('pointerleave',reset);
 el.addEventListener('blur',reset);
});
function preview(button){
 const index=Number(button.dataset.family);
 if(!Number.isInteger(index)||index===lastFocus)return;
 lastFocus=index;
 button.click();
 if(detail&&!reduced.matches){
  detail.classList.remove('is-switching');
  // New animation is keyed to actual data selection; no duplicated tiles.
  void detail.offsetWidth;
  detail.classList.add('is-switching');
 }
}
buttons.forEach(b=>{
 b.addEventListener('pointerenter',()=>{
  if(isInteractive())preview(b);
 });
 b.addEventListener('focus',()=>preview(b));
 b.addEventListener('pointermove',e=>{if(isInteractive())point(b,e)},{passive:true});
 b.addEventListener('click',()=>{lastFocus=Number(b.dataset.family)});
});
const revealers=[...document.querySelectorAll('[data-reveal]')];
if('IntersectionObserver' in window&&!reduced.matches&&revealers.length){
 // Activate only after DOM is ready. Fallback remains visible without JS.
 document.documentElement.classList.add('reveal-ready');
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('is-visible');
   observer.unobserve(entry.target);
  });
 },{threshold:.10,rootMargin:'0px 0px -18px 0px'});
 revealers.forEach(el=>observer.observe(el));
}else{
 revealers.forEach(el=>el.classList.add('is-visible'));
}
window.addEventListener('pagehide',()=>{document.documentElement.classList.remove('reveal-ready')},{once:true});
})();
