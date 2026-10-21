import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
window.gsap=gsap;window.ScrollTrigger=ScrollTrigger;
const phases=[
  {title:'UNE IDÉE.<br><span>UN OBJET.</span>',desc:'Du châssis au moindre détail de la presse. La création web devient un objet que l’on peut observer sous tous ses angles.',poster:'01-hero.png'},
  {title:'DANS LES<br><span>ROUAGES.</span>',desc:'La caméra s’approche des rouleaux en cuivre, des guides en acier et du mécanisme de pression.',poster:'01-hero.png'},
  {title:'LES PIÈCES<br><span>S’ÉCARTENT.</span>',desc:'La mécanique se soulève. Sous le vérin, les éléments qui composent le site se révèlent.',poster:'02-exploded.png'},
  {title:'L’IDÉE<br><span>PREND FORME.</span>',desc:'Une feuille imprimée émerge de la presse. Composition, typographie, modules : l’idée se transforme en expérience.',poster:'03-macro.png'},
  {title:'FAIT POUR<br><span>ÊTRE VÉCU.</span>',desc:'La machine se referme, le site est prêt. C’est le début de ton propre processus de création.',poster:'04-final.png'}
];
let currentStep=-1,progress=0,sceneApi=null,previousPointer=null;
const qs=s=>document.querySelector(s),clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function refresh(){const j=qs('#journey');if(!j)return;const r=j.getBoundingClientRect();progress=clamp(-r.top/(j.offsetHeight-innerHeight),0,1);const id=clamp(Math.floor(progress*4.999),0,4);if(id!==currentStep){currentStep=id;let p=phases[id];qs('#phase-title').innerHTML=p.title;qs('#phase-desc').textContent=p.desc;qs('#phase-counter').textContent=`FRAME 0${id+1} / 05`;qs('#phase-label').textContent=`02 / 06 — ${['STRUCTURE','MATIÈRE','DÉPLOIEMENT','IMPRESSION','ACHÈVEMENT'][id]}`;qs('#stage-fallback').style.backgroundImage=`url('assets/${p.poster}')`;}qs('#progress-fill').style.width=`${Math.round(progress*100)}%`;sceneApi?.setProgress(progress);}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;refresh()})}},{passive:true});let pending=false;addEventListener('resize',refresh);refresh();
let mode='type';for(const el of document.querySelectorAll('[data-mode]'))el.addEventListener('click',()=>{mode=el.dataset.mode;for(const btn of document.querySelectorAll('[data-mode]'))btn.classList.toggle('active',btn===el);sceneApi?.setMode(mode);});qs('#press-button').addEventListener('click',()=>{qs('#journey').scrollIntoView();const y=qs('#journey').offsetTop+qs('#journey').offsetHeight*.55;scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})});
const sector=qs('#sector'),mood=qs('#mood'),name=qs('#concept-name');
function prompt(){const obj={architecture:'un mécanisme architectural précis qui se déploie',cosmetique:'un flacon sculptural et sa matière organique réactive',technologie:'un dispositif technologique en fonctionnement',artisanat:'un outil artisanal et son geste de fabrication'};const mat={chrome:'acier poli, matériaux minéraux et lumière photographique',organique:'verre épais, refractions douces et textures organiques',brutaliste:'pierre taillée, matières brutes et ombres profondes'};const text=`MISSION / STUDIO WEB 3D\nProjet : ${name.value.trim()||'Mon projet'}\nActivité : ${sector.options[sector.selectedIndex].text}\nDirection matière : ${mood.options[mood.selectedIndex].text}\n\nConçois une expérience web originale et réellement 3D. L'objet central doit représenter ${obj[sector.value]}. Utilise ${mat[mood.value]}. Commence par trois directions artistiques, puis un storyboard en cinq plans. Crée une scène originale Blender (.blend, .glb) avec matériaux PBR, éclairages, caméra animée et trajet distinct sur mobile. Intègre Three.js et GSAP ScrollTrigger ; le scroll doit piloter la caméra, le hover doit modifier la matière ou le mécanisme. Vérifie WebGL sur un véritable navigateur GPU, la cohérence des collisions, les matériaux et le responsive ; ne livre pas un fallback comme rendu GPU. Source du kit : Studio-Web-3D / Banque Outils IA. Aucun outil payant, aucune copie de modèle ou de code tiers sans licence compatible. Livrer sources, licence, preuve visuelle, prompts et URL publiée vérifiée.`;qs('#brief-text').textContent=text;return text;}
for(const el of [sector,mood,name])el.addEventListener('input',prompt);prompt();qs('#copy-prompt').addEventListener('click',async()=>{const b=qs('#copy-prompt');try{await navigator.clipboard.writeText(prompt());b.textContent='COPIÉ ✓'}catch(e){const t=document.createElement('textarea');t.value=prompt();document.body.append(t);t.select();document.execCommand('copy');t.remove();b.textContent='COPIÉ ✓'}setTimeout(()=>b.textContent='Copier le prompt ↗',1500)});
// Real WebGL renderer; photos remain the full-quality fallback until loaded.
async function initThree(){
let renderer;try{renderer=new THREE.WebGLRenderer({canvas:qs('#three-canvas'),antialias:true,alpha:true,powerPreference:'high-performance'});}catch(e){qs('#render-status').textContent='RENDER BLENDER · WEBGL INDISPONIBLE';return;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.3));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.45;renderer.setClearColor(0x11181b,0);
const stage=qs('#stage'),heroStage=qs('#hero-stage'),scene=new THREE.Scene(),loader=new GLTFLoader(),clock=new THREE.Clock();
const liveCanvas=qs('#three-canvas'); let host=stage;
function relocateCanvas(){
 const rect=qs('#top').getBoundingClientRect();
 const heroVisible=rect.bottom>0&&rect.top<innerHeight;
 const dest=heroVisible?heroStage:stage;
 if(dest!==host){dest.appendChild(liveCanvas);host=dest;fit();}
 stage.classList.toggle('is-ready',!heroVisible&&liveCanvas.classList.contains('ready'));
 qs('#top').classList.toggle('webgl-ready',liveCanvas.classList.contains('ready'));
 heroStage.classList.toggle('is-ready',heroVisible&&liveCanvas.classList.contains('ready'));
}
scene.add(new THREE.HemisphereLight(0xf9e8d8,0x1d3841,2.15));const sun=new THREE.DirectionalLight(0xffdfb3,4);sun.position.set(3,8,12);scene.add(sun);const rim=new THREE.DirectionalLight(0x84b9ed,4);rim.position.set(-6,6,-5);scene.add(rim);
let env;try{const pmrem=new THREE.PMREMGenerator(renderer);env=pmrem.fromScene(new RoomEnvironment(),.04).texture;scene.environment=env;}catch(e){}
let model,mixer,camera=new THREE.PerspectiveCamera(35,1,.01,150),duration=4.96,realCamera=null,currentCameraProg=0,pointerX=0,pointerY=0;
// glTF exports Blender Z-up geometry to Three.js Y-up. Never position a fallback camera at negative Y.
camera.position.set(9,6.5,12);camera.lookAt(0,1.05,0);let orbitX=0,orbitY=0,pressed=false;const canvas=qs('#three-canvas');
canvas.addEventListener('pointerdown',e=>{pressed=true;previousPointer=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointerup',()=>{pressed=false;previousPointer=null});canvas.addEventListener('pointermove',e=>{const b=canvas.getBoundingClientRect();pointerX=(e.clientX-b.left)/b.width*2-1;pointerY=(e.clientY-b.top)/b.height*2-1;if(pressed&&previousPointer){orbitX=clamp(orbitX+(e.clientX-previousPointer[0])*.005,-.8,.8);orbitY=clamp(orbitY+(e.clientY-previousPointer[1])*.003,-.32,.32);previousPointer=[e.clientX,e.clientY]}});canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')orbitX-=.1;if(e.key==='ArrowRight')orbitX+=.1;if(e.key==='ArrowUp')orbitY+=.08;if(e.key==='ArrowDown')orbitY-=.08});
function fit(){const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(realCamera){realCamera.aspect=w/h;realCamera.updateProjectionMatrix()}}const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(heroStage);fit();
try{const gltf=await loader.loadAsync('assets/web-press-original.glb');model=gltf.scene;scene.add(model);mixer=new THREE.AnimationMixer(model);for(const clip of gltf.animations){const a=mixer.clipAction(clip);a.play();duration=Math.max(duration,clip.duration)}// Use a deterministic, positive-Y camera track until the baked glTF camera can be calibrated against GPU screenshots.
realCamera=null;
const bound=new THREE.Box3().setFromObject(model), center=bound.getCenter(new THREE.Vector3()), size=bound.getSize(new THREE.Vector3());
console.info('[WEB PRESS] GLB bounds:',{center:center.toArray(),size:size.toArray()});
window.__webPressDebug={cameraMode:'studio-path-y-up',modelBounds:{center:center.toArray(),size:size.toArray()},cameraPosition:null,progress:0};qs('#render-status').textContent='THREE.JS / MODÈLE BLENDER ACTIF';qs('#status-dot').classList.remove('fallback');canvas.classList.add('ready');relocateCanvas();}catch(e){qs('#render-status').textContent='RENDUS BLENDER / MODÈLE 3D NON CHARGÉ';ro.disconnect();renderer.dispose();return;}
sceneApi={setProgress:v=>{currentCameraProg=v},setMode:v=>{if(!model)return;model.traverse(o=>{if(o.isMesh&&o.material){if(o.userData.originalColor===undefined&&o.material.color)o.userData.originalColor=o.material.color.clone();if(o.name.includes('Module gloss inlay')&&o.material.color){o.material=o.material.clone();o.material.emissive=new THREE.Color(v==='motion'?0xff6a32:v==='grid'?0x8ac1e5:0xdab978);o.material.emissiveIntensity=.35;}}})}};
let last=-100;const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;function frame(){requestAnimationFrame(frame);relocateCanvas();if(document.hidden||!model||host.getBoundingClientRect().bottom<0||host.getBoundingClientRect().top>innerHeight)return;const dt=clock.getDelta();if(mixer){mixer.setTime(clamp(currentCameraProg,0,1)*duration)}// Five authored views of the machine, in Three.js Y-up coordinates.
const shots=[
  {at:[9.3,6.5,12.8],look:[0,1.0,0]},
  {at:[7.3,5.8,9.8],look:[0,1.2,0]},
  {at:[9.4,7.9,10.6],look:[0,1.65,0]},
  {at:[6.8,5.0,8.5],look:[0,1.2,0]},
  {at:[9.4,6.8,12.4],look:[0,1.0,0]}
];
const scaled=clamp(currentCameraProg,0,1)*4, ix=Math.min(3,Math.floor(scaled));
const t=scaled-ix, smooth=t*t*(3-2*t);const a=shots[ix],b=shots[ix+1];
const lerp=(i,j)=>i+(j-i)*smooth;
camera.position.set(
 lerp(a.at[0],b.at[0])+orbitX*2.5+pointerX*.08,
 lerp(a.at[1],b.at[1])+orbitY*1.9-pointerY*.06,
 lerp(a.at[2],b.at[2]));
camera.lookAt(lerp(a.look[0],b.look[0]),lerp(a.look[1],b.look[1]),lerp(a.look[2],b.look[2]));
if(window.__webPressDebug){window.__webPressDebug.cameraPosition=camera.position.toArray();window.__webPressDebug.progress=currentCameraProg;}renderer.render(scene,camera)}frame();}
// GSAP coordinates editable design timelines; manual scroll remains a safe fallback.
if(window.gsap && window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({trigger:'#journey',start:'top top',end:'bottom bottom',onUpdate:()=>refresh()});
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    gsap.from('.hero-copy h1',{y:42,opacity:0,duration:1.1,ease:'power3.out',delay:.1});
    gsap.from('.hero-sub,.hero-buttons',{y:30,opacity:0,duration:.85,stagger:.13,ease:'power3.out',delay:.45});
    gsap.utils.toArray('.machine-card').forEach((card,i)=>{gsap.from(card,{scrollTrigger:{trigger:card,start:'top 88%',once:true},y:70,opacity:0,duration:.95,ease:'power3.out',delay:i*.08})});
  }
}
initThree();
