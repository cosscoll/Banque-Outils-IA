/* Banque Outils IA — interactive demonstration, not an AI backend. */
(()=>{
'use strict';
const demo=document.getElementById('expDemo');
if(!demo)return;
const status=document.getElementById('expActionStatus');
const heading=document.getElementById('expLiveHeadline');
const description=document.getElementById('expLiveDescription');
const finish=document.getElementById('expFinishLabel');
const workflow=document.getElementById('expWorkflow');
const scroller=document.getElementById('expBrowserContent');
const triggers=[...demo.querySelectorAll('[data-demo-trigger]')];
const original={heading:heading.innerHTML,description:description.textContent};
const labels={
 idle:'EXPLOREZ LA DÉMONSTRATION',
 copy:'UNE ACCROCHE QUI ÉVOLUE',
 object:'UN OBJET QUI CHANGE DE FINITION',
 workflow:'UNE DEMANDE, UN PROCESSUS À VÉRIFIER'
};
let active='idle';
let sticky=false;
let activeSource=null;
function show(action,source,{pinned=false}={}){
 if(!Object.hasOwn(labels,action))return;
 if(action===active&&activeSource===source&&sticky===pinned)return;
 const previous=active;
 active=action;
 activeSource=source||null;
 sticky=pinned;
 demo.dataset.demoState=action;
 status.textContent=labels[action];
 heading.innerHTML=action==='copy'?'Des objets<br><i>qui racontent<br>une histoire.</i>':original.heading;
 description.textContent=action==='copy'
  ? 'La bonne formulation donne une voix à votre marque. Ici, elle change au simple passage de la souris.'
  :original.description;
 finish.textContent=action==='object'?'FINITION / ÉMAIL BLEU':'FINITION / SABLE';
 workflow.setAttribute('aria-hidden',String(action!=='workflow'));
 // The workflow is a simulation. Never submit a request or imply an AI API ran.
 if(action==='workflow'&&previous!=='workflow'){
  workflow.querySelectorAll('.exp-workflow-step').forEach(step=>{step.style.animation='none';void step.offsetWidth;step.style.removeProperty('animation')});
 }
}
function idle(){show('idle',null)}
triggers.forEach(trigger=>{
 const action=trigger.dataset.demoTrigger;
 trigger.addEventListener('pointerenter',event=>{
  if(event.pointerType==='mouse'||event.pointerType==='pen')show(action,trigger);
 });
 trigger.addEventListener('pointerleave',event=>{
  if((event.pointerType==='mouse'||event.pointerType==='pen')&&!sticky&&activeSource===trigger)idle();
 });
 trigger.addEventListener('focus',()=>show(action,trigger));
 trigger.addEventListener('blur',()=>{
  if(!sticky&&activeSource===trigger)idle();
 });
 trigger.addEventListener('click',event=>{
  // Touch and keyboard can toggle the effect. No external action is performed.
  const same=active===action&&sticky;
  if(same)idle();else show(action,trigger,{pinned:true});
 });
});
demo.addEventListener('keydown',event=>{
 if(event.key==='Escape'){idle();if(document.activeElement?.matches('[data-demo-trigger]'))document.activeElement.blur()}
});
demo.addEventListener('pointerdown',event=>{
 if(sticky&&event.target instanceof Element&&!event.target.closest('[data-demo-trigger]'))idle();
});
let scrolling=false;
scroller.addEventListener('scroll',()=>{
 if(scrolling)return;
 scrolling=true;
 requestAnimationFrame(()=>{
  demo.classList.toggle('has-scrolled',scroller.scrollTop>90);
  scrolling=false;
 });
},{passive:true});
const menu=document.querySelector('.mobile-menu-toggle');
const mobile=document.getElementById('mobile-menu');
if(menu&&mobile){
 function toggle(open){
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  menu.textContent=open?'FERMER ×':'MENU ☰';
  mobile.hidden=!open;
 }
 menu.addEventListener('click',()=>toggle(mobile.hidden));
 mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobile.hidden){toggle(false);menu.focus()}});
}
window.__boiaDemo={version:2,sceneCount:3,getState:()=>active};
})();
