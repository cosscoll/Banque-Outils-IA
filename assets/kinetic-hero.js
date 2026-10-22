/* Banque Outils IA — hero kinetic 3D pages. No network, no payment, no fabricated AI output. */
(()=>{
  'use strict';
  const stage=document.getElementById('kineticStage');
  const toggleButton=document.getElementById('kineticToggle');
  const toggleLabel=document.getElementById('kineticToggleText');
  if(!stage||!toggleButton)return;
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let hovered=false,pinned=false,open=false;
  function resetTilt(){
    stage.style.setProperty('--rx','6deg');
    stage.style.setProperty('--ry','-19deg');
  }
  function render(){
    open=hovered||pinned;
    stage.dataset.open=String(open);
    toggleButton.setAttribute('aria-pressed',String(pinned));
    toggleButton.setAttribute('aria-label',pinned?'Refermer les cartes de découverte':'Déployer les cartes de découverte');
    toggleLabel.textContent=pinned?'Réduire les cartes':finePointer.matches?'Survolez pour explorer les outils':'Touchez pour découvrir les outils';
  }
  stage.addEventListener('pointerenter',event=>{
    if(!finePointer.matches||event.pointerType==='touch')return;
    hovered=true;render();
  });
  stage.addEventListener('pointermove',event=>{
    if(!finePointer.matches||reduceMotion.matches||event.pointerType==='touch')return;
    const bounds=stage.getBoundingClientRect();
    if(!bounds.width||!bounds.height)return;
    const nx=Math.max(-1,Math.min(1,2*(event.clientX-bounds.left)/bounds.width-1));
    const ny=Math.max(-1,Math.min(1,2*(event.clientY-bounds.top)/bounds.height-1));
    stage.style.setProperty('--ry',(-19+nx*10).toFixed(2)+'deg');
    stage.style.setProperty('--rx',(6-ny*8).toFixed(2)+'deg');
  },{passive:true});
  stage.addEventListener('pointerleave',event=>{
    if(event.pointerType==='touch')return;
    hovered=false;resetTilt();render();
  });
  toggleButton.addEventListener('click',()=>{
    pinned=!pinned;render();
  });
  // Preserve discoverability for non-hover devices and changing pointer capabilities.
  if(finePointer.addEventListener)finePointer.addEventListener('change',()=>{hovered=false;resetTilt();render()});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&pinned){pinned=false;hovered=false;resetTilt();render();toggleButton.focus()}
  });
  const menu=document.querySelector('.mobile-menu-toggle');
  const mobile=document.getElementById('mobile-menu');
  if(menu&&mobile){
    function setMenu(open){
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
      menu.textContent=open?'FERMER ×':'MENU ☰';
      mobile.hidden=!open;
    }
    menu.addEventListener('click',()=>setMenu(mobile.hidden));
    mobile.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!mobile.hidden){setMenu(false);menu.focus()}
    });
  }
  render();
  window.__kineticHero={version:2,theme:'obscure-pop',isOpen:()=>open};
})();
