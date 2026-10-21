// Banque Outils IA · Atelier interactif · 2026
// Scène 3D originale : un poste de création, avec rendus d'usages IA. Aucun service payant.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const modes=[{label:'Créer',title:'Imaginez. Créez.',genre:'CRÉATION VISUELLE'},{label:'Écrire',title:'Les mots justes.',genre:'ÉCRITURE ASSISTÉE'},{label:'Automatiser',title:'Tout se connecte.',genre:'FLUX DE TRAVAIL'},{label:'Analyser',title:'Voyez plus clair.',genre:'RECHERCHE & DONNÉES'}];
let current=0,threeSelect=()=>{},threeScroll=()=>{},threeResize=()=>{};
const buttons=[...document.querySelectorAll('[data-mode]')];
const fallback=document.getElementById('workshopFallback');
const fbText=fallback?.querySelector('.fallback-art b');
const fbKind=fallback?.querySelector('.fallback-number');
const revealTargets=[document.querySelector('.statement h2'),document.querySelector('.statement-foot'),document.querySelector('.universes-header'),...document.querySelectorAll('.universe-row'),document.querySelector('.approach-copy'),document.querySelector('.closing h2')].filter(Boolean);
for(const el of revealTargets)el.setAttribute('data-reveal','');
document.body.classList.add('js-ready');
const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}},{threshold:.12,rootMargin:'0px 0px -20px 0px'});
for(const el of revealTargets)revealObserver.observe(el);
function changeMode(index){if(!Number.isInteger(index)||index<0||index>=modes.length)return;current=index;buttons.forEach((b,i)=>{b.classList.toggle('is-current',i===current);b.setAttribute('aria-pressed',String(i===current))});if(fbText)fbText.textContent=modes[index].title;if(fbKind)fbKind.textContent=String(index+1).padStart(2,'0')+' / '+modes[index].genre;fallback?.setAttribute('data-mode',String(index));threeSelect(index);}
for(const b of buttons){b.addEventListener('click',()=>changeMode(Number(b.dataset.mode)));if(finePointer)b.addEventListener('mouseenter',()=>changeMode(Number(b.dataset.mode)));}
const menuButton=document.querySelector('.menu-button'),mobileNav=document.getElementById('mobileNav');
menuButton?.addEventListener('click',()=>{const opening=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(opening));menuButton.setAttribute('aria-label',opening?'Fermer le menu':'Ouvrir le menu');mobileNav.hidden=!opening});
for(const a of mobileNav?.querySelectorAll('a')||[])a.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Ouvrir le menu')});
const cursor=document.querySelector('.cursor-orbit');
if(finePointer&&!reducedMotion&&cursor){window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('active')},{passive:true});for(const el of document.querySelectorAll('a,button')){el.addEventListener('pointerenter',()=>cursor.classList.add('over'));el.addEventListener('pointerleave',()=>cursor.classList.remove('over'))}}
let ticking=false;
function handleScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const hero=document.querySelector('.hero'),progress=Math.min(1,Math.max(0,window.scrollY/Math.max(hero?.offsetHeight||1,1)));threeScroll(progress);ticking=false})}
window.addEventListener('scroll',handleScroll,{passive:true});
window.addEventListener('resize',()=>threeResize(),{passive:true});
const colors={ink:'#192b25',light:'#f3ead6',coral:'#e98766',peach:'#f5ba91',sage:'#aebdab',deep:'#253d32'};
function screenTextureCanvas(mode){
 const c=document.createElement('canvas');c.width=1200;c.height=800;
 const x=c.getContext('2d'),W=1200,H=800;x.imageSmoothingQuality='high';
 const rounded=(px,py,w,h,r,fill)=>{x.beginPath();x.roundRect(px,py,w,h,r);x.fillStyle=fill;x.fill()};
 const text=(value,px,py,size,color,weight='500',family='Arial')=>{x.fillStyle=color;x.font=weight+' '+size+'px '+family;x.fillText(value,px,py)};
 const line=(px,py,w,h=5,color='#b9bfb2')=>rounded(px,py,w,h,h/2,color);
 const labels=()=>{text('BO / IA',58,72,29,colors.ink,'bold');text('WORKSPACE  /  '+String(mode+1).padStart(2,'0'),776,70,20,colors.ink,'bold');x.fillStyle=colors.ink;x.fillRect(56,100,1088,2)};
 x.fillStyle=colors.light;x.fillRect(0,0,W,H);
 if(mode===0){
  labels();text('VISUAL STUDIO',57,165,25,colors.ink,'bold');text('BRIEF / CAMPAGNE 2026',59,220,17,'#69776d','bold');
  rounded(56,263,300,390,14,'#d9e0ce');text('DIRECTION',83,307,18,colors.ink,'bold');
  line(83,335,210,8,'#a4ada0');line(83,360,175,8,'#a4ada0');
  text('Palette',83,425,20,'#4d604e');['#b0b9a0','#ef9b7e','#314b3f','#e7d1a5'].forEach((col,i)=>rounded(83+i*55,447,42,42,8,col));
  line(83,535,238,3,'#adbaa7');text('Format  /  4:5',83,582,19,colors.ink);
  rounded(382,143,762,530,7,'#b2bfad');
  const grad=x.createLinearGradient(400,170,1120,665);grad.addColorStop(0,'#cfb59c');grad.addColorStop(.43,'#a4b5a0');grad.addColorStop(1,'#486757');x.fillStyle=grad;x.fillRect(382,143,762,530);
  x.save();x.translate(816,395);x.rotate(-.42);
  for(let i=0;i<5;i++){x.beginPath();x.ellipse(0,0,215+i*30,64+i*26,(i*.29),0,Math.PI*2);x.lineWidth=32;x.strokeStyle=['#f1b48d','#435c4d','#e7d8b4','#f1b48d','#20392f'][i];x.stroke()}
  x.restore();x.fillStyle='#f7ead6';x.font='italic 96px Georgia';x.fillText('Forme',454,548);x.font='italic 96px Georgia';x.fillText('& matière.',459,640);
  rounded(382,691,762,54,5,'#293d33');text('PROPOSITION 01  /  UN VISUEL À AFFINER',405,726,19,'#f2ead7','bold');
 }else if(mode===1){
  labels();text('ÉCRITURE / ÉDITEUR',58,169,24,colors.ink,'bold');
  rounded(58,211,225,502,10,'#d5ddcc');text('MES PROJETS',82,259,18,'#41584b','bold');
  ['Nouvelle idée','Présentation','Article de blog','Newsletter'].forEach((t,i)=>{if(i===1)rounded(74,302+i*73,189,57,8,'#b5c2af');text(t,86,338+i*73,19,colors.ink)});
  rounded(315,170,830,544,9,'#fffdf4');text('BROUILLON / 02',371,225,18,'#a87960','bold');
  text('Les mots',367,355,91,colors.ink,'400','Georgia');text('justes.',370,452,105,'#b77a61','400','Georgia');
  text('Transformer une idée en message clair.',374,519,27,'#44594d');
  for(let i=0;i<5;i++)line(372,568+i*26,680-i%2*115,8,i===0?'#dabca7':'#c2c9bc');
  rounded(372,670,215,28,14,'#e6cfb7');text('PROPOSITION IA',391,690,14,colors.ink,'bold');
 }else if(mode===2){
  x.fillStyle='#1c312b';x.fillRect(0,0,W,H);text('BO / IA',58,72,29,'#f0ecd8','bold');text('WORKFLOW  /  03',834,70,20,'#b9c7b4','bold');x.fillStyle='#698274';x.fillRect(56,100,1088,2);
  text('Tout se connecte.',58,208,71,'#f7edda','400','Georgia');text('UNE ACTION → UNE SUITE LOGIQUE',60,263,19,'#adc0a8','bold');
  const nodes=[{x:74,y:399,t:'01 / ENTRÉE',sub:'Nouveau message',color:'#e9b291'},{x:444,y:340,t:'02 / TRAITEMENT',sub:'Extraire les infos',color:'#a6c9b0'},{x:836,y:410,t:'03 / ACTION',sub:'Créer une tâche',color:'#e8cea5'}];
  x.strokeStyle='#b9d4bb';x.lineWidth=5;
  for(let i=0;i<2;i++){const a=nodes[i],b=nodes[i+1];x.beginPath();x.moveTo(a.x+275,a.y+71);x.bezierCurveTo(a.x+355,a.y+71,b.x-70,b.y+71,b.x,b.y+71);x.stroke();x.beginPath();x.arc((a.x+275+b.x)/2,(a.y+b.y)/2+71,9,0,7);x.fillStyle='#e7a97f';x.fill()}
  nodes.forEach((n,i)=>{rounded(n.x,n.y,285,152,15,'#3b5548');x.fillStyle=n.color;x.fillRect(n.x,n.y,285,9);text(n.t,n.x+24,n.y+52,20,'#c4d6c7','bold');text(n.sub,n.x+24,n.y+104,25,'#fff5e4');});
  rounded(60,662,1082,68,12,'#2e463b');text('VÉRIFICATION HUMAINE AVANT TOUTE ACTION SENSIBLE',82,704,21,'#cae0d0','bold');
 }else{
  labels();text('LES CHIFFRES RACONTENT',56,199,49,colors.ink,'bold');text('UNE HISTOIRE.',56,251,49,colors.ink,'bold');
  rounded(57,306,340,385,15,'#dce3d3');text('VUE D’ENSEMBLE',85,360,22,colors.ink,'bold');text('+28%',85,495,103,'#b97559','400','Georgia');text('TENDANCE OBSERVÉE',92,548,19,'#55705b');
  line(92,596,242,7,'#aabdad');line(92,622,177,7,'#aabdad');
  rounded(420,306,725,385,15,'#fdf9ed');
  const values=[.32,.39,.30,.52,.48,.61,.60,.73,.67,.85];
  x.beginPath();x.moveTo(477,611);
  values.forEach((v,i)=>x.lineTo(489+i*65,606-v*254));x.lineTo(1074,636);x.closePath();x.fillStyle='#c1d5b7';x.fill();
  x.beginPath();values.forEach((v,i)=>i?x.lineTo(489+i*65,606-v*254):x.moveTo(489,606-v*254));x.strokeStyle='#b76f50';x.lineWidth=9;x.lineJoin='round';x.stroke();
  x.fillStyle=colors.ink;text('ÉVOLUTION DES RÉSULTATS',473,358,20,colors.ink,'bold');
  text('Jan',482,657,19,'#87998a');text('Juin',757,657,19,'#87998a');text('Oct',1025,657,19,'#87998a');
 }
 x.fillStyle='#28362e';x.fillRect(0,773,1200,27);text('DÉMONSTRATION VISUELLE · AUCUNE DONNÉE RÉELLE',54,791,12,'#f2ead6','bold');
 return c;
}
function keyboardCanvas(){const c=document.createElement('canvas');c.width=1024;c.height=450;const x=c.getContext('2d');x.fillStyle='#5a665d';x.fillRect(0,0,1024,450);
 for(let r=0;r<4;r++){for(let col=0;col<14;col++){const px=35+col*69+(r%2)*5,py=22+r*93;x.fillStyle='#15231e';x.beginPath();x.roundRect(px,py,59,70,7);x.fill();x.fillStyle='#39473e';x.fillRect(px+8,py+8,42,3);x.fillStyle='#8b9488';x.font='12px Arial';x.fillText('•',px+12,py+44);}}
 x.fillStyle='#15231e';x.beginPath();x.roundRect(290,392,440,32,8);x.fill();return c;}
async function init3D(){
 const holder=document.getElementById('workshop'),canvas=document.getElementById('atelier3d');if(!holder||!canvas)return;
 const THREE=window.THREE;
 if(!THREE){console.warn('Three.js local indisponible. Vue de remplacement utilisée.');window.__atelierDebug={webgl:false,reason:'three-local'};return}
 let renderer;
 try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35}
 catch(error){console.warn('WebGL inaccessible. Vue de remplacement utilisée.',error);window.__atelierDebug={webgl:false,reason:'context'};return}
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(39,1,.1,100);
 camera.position.set(0,2.45,10.5);camera.lookAt(0,.1,.2);
 scene.add(new THREE.HemisphereLight(0xe8fff0,0x2b362e,2.2));
 const key=new THREE.DirectionalLight(0xffdbbd,3.0);key.position.set(-5,8,7);scene.add(key);
 const side=new THREE.DirectionalLight(0xa2dec5,2.4);side.position.set(6,2,-4);scene.add(side);
 const front=new THREE.PointLight(0xffbd8d,19,13);front.position.set(2,0,5);scene.add(front);
 const mat=(color,metalness=.0,roughness=.6)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
 const shellMat=mat(0x303e37,.72,.29),edgeMat=mat(0x8d9d8f,.88,.23),keyMat=mat(0x0d1713,.35,.65),hingeMat=mat(0x9c9e8b,.8,.28);
 const root=new THREE.Group();scene.add(root);
 const machine=new THREE.Group();root.add(machine);
 const add=(geom,material,parent=machine)=>{const o=new THREE.Mesh(geom,material);parent.add(o);return o};
 function roundedRect(w,h,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s}
 function solidRounded(w,h,depth,r){return new THREE.ExtrudeGeometry(roundedRect(w,h,r),{depth,steps:1,bevelEnabled:true,bevelThickness:.035,bevelSize:.032,bevelSegments:3,curveSegments:7})}
 const displayBack=add(solidRounded(4.92,3.34,.12,.18),shellMat);
 displayBack.position.set(0,.76,-.45);
 const edge=add(solidRounded(4.67,3.08,.02,.12),edgeMat);edge.position.set(0,.76,-.283);
 const blackMask=add(new THREE.PlaneGeometry(4.53,2.97),keyMat);blackMask.position.set(0,.76,-.226);
 const surfaceMaterial=new THREE.MeshBasicMaterial({color:0xffffff,map:null,side:THREE.FrontSide,toneMapped:false});
 const screen=add(new THREE.PlaneGeometry(4.45,2.89),surfaceMaterial);screen.position.set(0,.76,-.215);
 const lens=add(new THREE.SphereGeometry(.025,16,8),mat(0x151e1a,.5,.12));lens.position.set(0,2.382,-.17);
 const led=add(new THREE.SphereGeometry(.013,12,7),new THREE.MeshBasicMaterial({color:0x8ca89a}));led.position.set(.12,2.382,-.17);
 const hinge=add(new THREE.CylinderGeometry(.095,.095,4.5,32),hingeMat);hinge.rotation.z=Math.PI/2;hinge.position.set(0,-.925,-.35);
 const base=add(solidRounded(4.98,3.55,.10,.2),shellMat);base.rotation.x=-Math.PI/2;base.position.set(0,-1.1,1.18);
 const baseLine=add(new THREE.BoxGeometry(4.3,.025,.025),edgeMat);baseLine.position.set(0,-.99,-.27);
 const keyTexture=new THREE.CanvasTexture(keyboardCanvas());keyTexture.colorSpace=THREE.SRGBColorSpace;keyTexture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const keyboard=add(new THREE.PlaneGeometry(4.41,1.78),new THREE.MeshBasicMaterial({map:keyTexture,toneMapped:false}));keyboard.rotation.x=-Math.PI/2;keyboard.position.set(0,-.965,1.08);
 const touch=add(new THREE.PlaneGeometry(1.36,.69),new THREE.MeshStandardMaterial({color:0x77867d,metalness:.52,roughness:.47}));touch.rotation.x=-Math.PI/2;touch.position.set(0,-.961,2.47);
 const badge=add(new THREE.PlaneGeometry(.5,.12),new THREE.MeshBasicMaterial({color:0xf5bb9b}));badge.position.set(-2.08,2.35,-.171);
 // Sol et ombre atmosphérique, sans éléments géométriques gratuits.
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=256;shadowCanvas.height=256;const cx=shadowCanvas.getContext('2d');const gradient=cx.createRadialGradient(128,128,10,128,128,125);gradient.addColorStop(0,'rgba(0,0,0,.55)');gradient.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=gradient;cx.fillRect(0,0,256,256);
 const shadow=add(new THREE.PlaneGeometry(7.5,6.3),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false,opacity:.72}));shadow.rotation.x=-Math.PI/2;shadow.position.set(.3,-1.34,1.08);
 const textures=modes.map((_,i)=>{const t=new THREE.CanvasTexture(screenTextureCanvas(i));t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);return t;});
 surfaceMaterial.map=textures[current];surfaceMaterial.needsUpdate=true;
 holder.classList.add('has-webgl');window.__atelierDebug={webgl:true,object:'interactive workbench',modes:modes.length};
 let scroll=.0,pointerX=0,pointerY=0,rotX=.0,rotY=.0,turn=0,drag=false,startX=0,dragStart=0,visible=true,frame=0,alive=true,targetMode=current;
 function resize(){const rect=holder.getBoundingClientRect();const w=Math.max(1,rect.width),h=Math.max(1,rect.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<530?47:w<870?43:39;camera.position.set(0,w<530?2.55:2.45,w<530?12.3:10.5);camera.updateProjectionMatrix();}
 threeResize=resize;resize();
 threeSelect=(i)=>{targetMode=i;surfaceMaterial.map=textures[i];surfaceMaterial.needsUpdate=true;if(reducedMotion)renderOnce()};
 threeScroll=v=>{scroll=v;if(reducedMotion)renderOnce()};
 function move(e){if(drag){turn=dragStart+(e.clientX-startX)*.006;return}const r=holder.getBoundingClientRect();pointerX=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));pointerY=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));if(reducedMotion)renderOnce()}
 canvas.addEventListener('pointermove',move,{passive:true});
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen'){drag=true;startX=e.clientX;dragStart=turn;canvas.setPointerCapture(e.pointerId)}});
 const endDrag=()=>{drag=false};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
 const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;if(visible&&!frame&&!reducedMotion)frame=requestAnimationFrame(tick)},{threshold:0});observer.observe(holder);
 function pose(){const ease=.085;rotX+=(pointerY*.09-rotX)*ease;rotY+=(pointerX*.16-rotY)*ease;const mobile=holder.clientWidth<530;
  const restY=mobile?-.26:-.34;
  root.rotation.y+=((restY+rotY+turn+scroll*.52)-root.rotation.y)*ease;
  root.rotation.x+=((mobile?-.095:-.06)+rotX*.6-scroll*.065-root.rotation.x)*ease;
  machine.position.y+=((scroll*.24)-machine.position.y)*ease;
  const scale=mobile?.89:1;root.scale.setScalar(scale);
 }
 function renderOnce(){pose();renderer.render(scene,camera)}
 function tick(){frame=0;if(!alive||!visible)return;pose();renderer.render(scene,camera);if(!reducedMotion)frame=requestAnimationFrame(tick)}
 renderOnce();if(!reducedMotion)frame=requestAnimationFrame(tick);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();alive=false;if(frame)cancelAnimationFrame(frame);holder.classList.remove('has-webgl');window.__atelierDebug.webgl=false;console.warn('Contexte WebGL perdu : repli disponible')});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0}else if(visible&&!reducedMotion&&!frame)frame=requestAnimationFrame(tick)});
}
init3D().catch(error=>{console.warn('Scène 3D indisponible : mode de repli conservé',error);window.__atelierDebug={webgl:false,reason:'render-error'}});
