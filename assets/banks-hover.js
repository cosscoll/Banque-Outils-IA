/* Banque Outils IA — six interactive tool banks. Local visual demonstrations only. */
(()=>{
'use strict';
const stage=document.getElementById('compareStage');
const output=document.getElementById('bankOutputArt');
const selectors=[...document.querySelectorAll('[data-bank]')];
if(!stage||!output||selectors.length!==6)return;
const bankData={
 redaction:{
  number:'01', category:'01 / ÉCRITURE',
  draft:'un mail pour<br>mes clients…', note:'il faudrait les remercier et annoncer les nouveautés, mais sans faire trop commercial.',
  draftFoot:'UN BROUILLON / UNE INTENTION', resultType:'UN MESSAGE À RELIRE',
  name:'Écriture & idées', description:'Formuler un message, structurer un argument ou débloquer un premier texte à partir de vos notes.',
  examples:'CHATGPT · CLAUDE · GEMINI', link:'./catalogue.html?categorie=redaction#recherche',cta:'Explorer les outils d’écriture',
  visual:`<div class="bo-art bo-art-letter"><div class="bo-letter-meta"><span>MESSAGE / VERSION 01</span><span>À RELIRE</span></div><h3>Quelques nouvelles<br>de notre atelier.</h3><p>Bonjour,<br>Merci de faire partie de l’aventure. Nous préparons une nouvelle rencontre et <mark>nous serions ravis de vous y retrouver</mark>…</p><p>On vous partage très bientôt les détails.</p><span class="bo-letter-signature">À BIENTÔT — L’ÉQUIPE</span></div>`
 },
 creation:{
  number:'02',category:'02 / CRÉATION',
  draft:'atelier samedi<br>créatif ?',note:'une affiche pour donner envie de venir, avec la date et les infos importantes…',
  draftFoot:'IDÉE BRUTE / À STRUCTURER',resultType:'UNE AFFICHE À PERSONNALISER',
  name:'Création visuelle',description:'À partir d’une idée vague, préparer une première direction graphique que vous pourrez retravailler.',
  examples:'CANVA · ADOBE FIREFLY · FIGMA',link:'./catalogue.html?categorie=creation#recherche',cta:'Explorer les outils de création',
  visual:`<div class="bo-art bo-art-poster"><span class="bo-poster-kicker">ATELIER OUVERT • SAMEDI</span><strong>LES IDÉES<br>PRENNENT<br>FORME.</strong><span class="bo-poster-date">14H — INITIATION CRÉATIVE ↗</span></div>`
 },
 dev:{
  number:'03',category:'03 / DÉVELOPPEMENT',
  draft:'il nous faut<br>un site web…',note:'une page claire pour montrer notre activité, nos services et permettre de nous contacter.',
  draftFoot:'IDÉE DE SITE / À PROTOTYPER',resultType:'UN PREMIER PROTOTYPE WEB',
  name:'Développement & web',description:'Passer d’un croquis de site à une interface à tester, avec du code que vous pourrez vérifier.',
  examples:'CURSOR · GITHUB COPILOT · REPLIT',link:'./catalogue.html?categorie=dev#recherche',cta:'Explorer les outils de développement',
  visual:`<div class="bo-art bo-art-site"><div class="bo-site-browser"><i></i><i></i><i></i><span>projet-exemple.fr</span></div><div class="bo-site-nav">ATELIER<span>PROJETS &nbsp;&nbsp; CONTACT</span></div><div class="bo-site-content"><strong>DONNEZ VIE<br>À VOS IDÉES.</strong><small>DÉCOUVRIR LE PROJET &nbsp;↗</small></div></div>`
 },
 medias:{
  number:'04',category:'04 / VIDÉO & AUDIO',
  draft:'filmer notre<br>événement ?',note:'faire une courte vidéo avec des images, du son et un message compréhensible.',
  draftFoot:'UNE IDÉE / DES RUSHS À MONTER',resultType:'UNE SÉQUENCE AUDIOVISUELLE',
  name:'Vidéo & audio',description:'Transformer des prises de vue, des voix et des idées en une séquence structurée.',
  examples:'RUNWAY · ELEVENLABS · DESCRIPT',link:'./catalogue.html?categorie=medias#recherche',cta:'Explorer les outils vidéo & audio',
  visual:`<div class="bo-art bo-art-media"><div class="bo-media-head"><span>PROJET / FILM 01</span><span>00:46</span></div><div class="bo-video-frame"><span class="bo-video-play">APERÇU DE MONTAGE</span><strong>UNE HISTOIRE.<br>EN 30 SECONDES.</strong></div><div class="bo-media-timeline"><div class="bo-media-time"><span>00:00</span><span>00:15</span><span>00:30</span></div><div class="bo-track"><i></i><i></i><i></i><span class="bo-media-playhead"></span></div><div class="bo-track audio" aria-label="Piste audio fictive"></div></div></div>`
 },
 auto:{
  number:'05',category:'05 / AUTOMATISATION',
  draft:'toujours copier<br>les mêmes infos…',note:'récupérer les demandes reçues, préparer un suivi et éviter de tout recopier.',
  draftFoot:'TÂCHES RÉPÉTITIVES / À REVOIR',resultType:'UN FLUX AVEC VALIDATION HUMAINE',
  name:'Automatisation',description:'Repérer les étapes répétitives puis relier les outils sans abandonner les validations importantes.',
  examples:'N8N · MAKE · ZAPIER',link:'./catalogue.html?categorie=auto#recherche',cta:'Explorer les outils d’automatisation',
  visual:`<div class="bo-art bo-art-flow"><span class="bo-flow-label">EXEMPLE DE WORKFLOW</span><div class="bo-flow-node"><strong>Nouvelle demande</strong><small>DÉCLENCHEUR</small></div><div class="bo-flow-connector"></div><div class="bo-flow-node is-current"><strong>Classer les informations</strong><small>TRAITEMENT</small></div><div class="bo-flow-connector"></div><div class="bo-flow-node"><strong>Vérifier puis transmettre</strong><small>VALIDATION</small></div></div>`
 },
 recherche:{
  number:'06',category:'06 / RECHERCHE & ANALYSE',
  draft:'que disent<br>nos chiffres ?',note:'on reçoit plusieurs tableaux, mais on n’arrive pas à voir ce qui évolue vraiment.',
  draftFoot:'DONNÉES À COMPRENDRE / À VÉRIFIER',resultType:'UNE LECTURE VISUELLE DES DONNÉES',
  name:'Recherche & analyse',description:'Interroger vos sources, organiser les données et en tirer des pistes à vérifier.',
  examples:'PERPLEXITY · NOTEBOOKLM · ELICIT',link:'./catalogue.html?categorie=recherche#recherche',cta:'Explorer les outils de recherche',
  visual:`<div class="bo-art bo-art-data"><div class="bo-data-head"><span>VUE D’ENSEMBLE / EXEMPLE FICTIF</span><span>JAN → MAI</span></div><div class="bo-data-stat"><strong>+28 %</strong><span>ILLUSTRATION</span></div><div class="bo-data-chart"><div class="bo-data-column"><i style="--bar-height:29%"></i><small>JAN</small></div><div class="bo-data-column"><i style="--bar-height:38%"></i><small>FÉV</small></div><div class="bo-data-column"><i style="--bar-height:56%"></i><small>MAR</small></div><div class="bo-data-column"><i style="--bar-height:68%"></i><small>AVR</small></div><div class="bo-data-column"><i style="--bar-height:89%"></i><small>MAI</small></div></div><span class="bo-data-footer">VALEURS DE DÉMONSTRATION — PAS DE DONNÉES RÉELLES</span></div>`
 }
};
const byId=id=>document.getElementById(id);
const beforeTitle=byId('beforeTitle'),beforeText=byId('beforeText'),beforeFoot=byId('bankBeforeFoot');
const categoryLabel=byId('bankPreviewCategory'),resultType=byId('bankResultType');
const count=byId('bankProgress'),title=byId('bankActiveTitle'),description=byId('bankActiveDescription');
const tools=byId('bankExampleTools'),link=byId('bankActiveLink');
let active=stage.dataset.bankActive||'creation';
let animationTimer=0;
function setBank(id){
 const data=bankData[id];if(!data||active===id)return;
 active=id;
 selectors.forEach(button=>{const on=button.dataset.bank===id;button.classList.toggle('is-active',on);button.setAttribute('aria-pressed',String(on))});
 stage.dataset.bankActive=id;
 beforeTitle.innerHTML=data.draft;
 beforeText.textContent=data.note;
 beforeFoot.textContent=data.draftFoot;
 categoryLabel.textContent=data.category;
 resultType.textContent=data.resultType;
 output.setAttribute('aria-label','Exemple illustratif : '+data.name);
 output.innerHTML=data.visual; // Authored, local static HTML strings. No input is interpolated.
 count.textContent=data.number+' / 06';
 title.textContent=data.name;
 description.textContent=data.description;
 tools.textContent=data.examples;
 link.href=data.link;
 link.querySelector('[data-bank-link-label]').textContent=data.cta;
 // Keep the comparison halfway revealed when a new category is selected.
 stage.style.setProperty('--split','51%');
 const slider=byId('rangeBeforeAfter');if(slider)slider.value='51';
 stage.classList.remove('is-changing');
 void stage.offsetWidth; // Restart one coherent transition between two actual examples.
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  stage.classList.add('is-changing');
  window.clearTimeout(animationTimer);
  animationTimer=window.setTimeout(()=>stage.classList.remove('is-changing'),560);
 }
}
const hovering=window.matchMedia('(hover: hover) and (pointer: fine)');
selectors.forEach(button=>{
 const id=button.dataset.bank;
 button.addEventListener('click',()=>setBank(id));
 button.addEventListener('focus',()=>setBank(id));
 // No clicks and no delay: moving from one category to another changes the example.
 if(hovering.matches)button.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')setBank(id)});
});
if(hovering.matches){
 stage.addEventListener('pointermove',event=>{
  const r=stage.getBoundingClientRect();if(!r.width)return;
  const offset=((event.clientX-r.left)/r.width-.5)*2;
  stage.style.setProperty('--bank-parallax-left',Math.round(-offset*9)+'px');
  stage.style.setProperty('--bank-parallax-right',Math.round(offset*8)+'px');
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{
  stage.style.setProperty('--bank-parallax-left','0px');
  stage.style.setProperty('--bank-parallax-right','0px');
 },{passive:true});
}
})();
