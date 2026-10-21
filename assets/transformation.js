/* Banque Outils IA · Comparateur Transformation · pas d'API externe */
(()=>{'use strict';
 const stage=document.getElementById('compareStage');
 const slider=document.getElementById('rangeBeforeAfter');
 if(!stage||!slider)return;
 const buttons=[...document.querySelectorAll('[data-case]')];
 const scenarios=[
  {draft:'atelier samedi<br>créatif ?',note:"un truc pour annoncer l'atelier, donner envie aux gens de venir, avec la date et le lieu…",result:'FAIS<br>PLACE<br>AUX IDÉES.',signature:'SAMEDI 14H — ATELIER DE CRÉATION'},
  {draft:'besoin d’un<br>mail client',note:"Il faudrait remercier les clients, annoncer les nouveautés, et rester naturel dans le ton…",result:'UN MOT<br>QUI FAIT<br>PLAISIR.',signature:'EXEMPLE DE MESSAGE — À RELIRE'},
  {draft:'trop de trucs<br>à retenir…',note:"Relancer les fournisseurs, envoyer les devis, préparer la réunion, sans rien oublier.",result:'LE BON<br>ORDRE.<br>AU BON MOMENT.',signature:'PLAN DE TRAVAIL — À VALIDER'}
 ];
 function scenario(i){
  if(!Number.isInteger(i)||i<0||i>=scenarios.length)return;
  const v=scenarios[i];
  document.getElementById('beforeTitle').innerHTML=v.draft;
  document.getElementById('beforeText').textContent=v.note;
  document.getElementById('afterTitle').innerHTML=v.result;
  document.getElementById('afterText').textContent=v.signature;
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.case)===i)));
 }
 buttons.forEach(b=>b.addEventListener('click',()=>scenario(Number(b.dataset.case))));
 const mouseLike=window.matchMedia('(hover: hover) and (pointer: fine)');
 function moveTo(value){const p=Math.min(100,Math.max(0,Number(value)||0));stage.style.setProperty('--split',p+'%');slider.value=String(p)}
 function follow(event){
  if(!mouseLike.matches||event.pointerType==='touch')return;
  const r=stage.getBoundingClientRect();if(r.width<=0)return;
  moveTo((event.clientX-r.left)/r.width*100);
 }
 stage.addEventListener('pointerenter',follow);
 stage.addEventListener('pointermove',follow);
 stage.addEventListener('pointerleave',()=>{if(mouseLike.matches&&document.activeElement!==slider)moveTo(50)});
 slider.addEventListener('input',()=>moveTo(slider.value));
 slider.addEventListener('change',()=>moveTo(slider.value));
 const menu=document.querySelector('.mobile-menu-toggle'),mobile=document.getElementById('mobile-menu');
 if(menu&&mobile){
  function toggle(open){menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'FERMER ×':'MENU ☰';menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');mobile.hidden=!open}
  menu.addEventListener('click',()=>toggle(mobile.hidden));
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){toggle(false);menu.focus()}});
 }
})();
