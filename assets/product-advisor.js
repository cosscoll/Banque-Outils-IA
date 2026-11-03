/* Banque Outils IA — genuine generative chat. No canned replies, no client-side API secret. */
(()=>{
 'use strict';
 if(typeof document==='undefined'||!document.body)return;
 const PRODUCTS={
  redaction:{title:'Rédaction & communication',href:'./pack-redaction.html'},
  visuel:{title:'Design & visuels',href:'./pack-visuel.html'},
  web:{title:'Sites web & prototypes',href:'./pack-sites-web.html'},
  medias:{title:'Vidéo & audio',href:'./pack-video-audio.html'},
  auto:{title:'Première automatisation',href:'./pack-automatisation.html'},
  analyse:{title:'Recherche & analyse',href:'./pack-recherche-analyse.html'}
 };
 const API = window.BANQUE_AI_CHAT_API || (window.location.hostname.endsWith('.vercel.app')
  ? '/api/chat' : 'https://banque-outils-ia-chat.vercel.app/api/chat');
 const root=document.createElement('div');
 root.className='product-guide';root.id='productGuide';
 root.innerHTML=[
  '<button class="product-guide-toggle" id="productGuideToggle" type="button" aria-controls="productGuidePanel" aria-expanded="false">',
    '<span class="product-guide-spark" aria-hidden="true">✳</span><span>Conseiller IA</span></button>',
  '<section class="product-guide-panel" id="productGuidePanel" aria-label="Conseiller IA pour choisir une banque" hidden>',
  '<div class="product-guide-header"><div><strong>Conseiller IA</strong><span id="productGuideStatus" role="status">Réponses générées selon votre projet</span></div>',
  '<div class="product-guide-header-actions"><button type="button" id="productGuideReset" aria-label="Recommencer la conversation" title="Recommencer">↺</button>',
  '<button type="button" id="productGuideClose" aria-label="Fermer le guide" title="Fermer">×</button></div></div>',
  '<div class="product-guide-messages" id="productGuideMessages" role="log" aria-live="polite" aria-relevant="additions"></div>',
  '<div class="product-guide-choices" id="productGuideChoices" role="group" aria-label="Exemples de projets"></div>',
  '<form class="product-guide-form" id="productGuideForm">',
  '<label for="productGuideInput">Décrivez votre projet</label>',
  '<div><input id="productGuideInput" type="text" maxlength="400" placeholder="Ex. : Je cherche plus de clients…" autocomplete="off" required>',
  '<button type="submit" id="productGuideSend">Envoyer</button></div></form>',
  '<label class="product-guide-consent"><input id="productGuideConsent" type="checkbox"> J’accepte que mes messages soient envoyés au fournisseur d’IA pour obtenir une réponse.</label>',
  '<p class="product-guide-privacy">N’écrivez aucune information personnelle ou confidentielle. Les réponses sont générées par une IA externe et peuvent être imparfaites. Les banques ne sont pas encore en vente.</p>',
  '</section>'
 ].join('');
 document.body.appendChild(root);
 const $=id=>root.querySelector('#'+id);
 const toggle=$('productGuideToggle'),panel=$('productGuidePanel'),close=$('productGuideClose'),
 reset=$('productGuideReset'),messages=$('productGuideMessages'),choices=$('productGuideChoices'),
 form=$('productGuideForm'),input=$('productGuideInput'),consent=$('productGuideConsent'),
 send=$('productGuideSend'),status=$('productGuideStatus');
 let history=[],pending=false,controller=null,healthChecked=false;
 const make=(tag,cls,text)=>{
  const el=document.createElement(tag);
  if(cls)el.className=cls;
  if(text!==undefined)el.textContent=text;
  return el;
 };
 const bubble=(text,type)=>{
  const el=make('div','product-guide-bubble '+(type==='user'?'from-user':'from-bot'),text);
  messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;
 };
 const setStatus=(value)=>{status.textContent=value;};
 const showPresets=()=>{
  choices.replaceChildren();
  const cases=[
   'Je veux attirer plus de clients',
   'Je souhaite créer un site',
   'Je veux gagner du temps',
   'Je dois préparer mes réseaux sociaux'
  ];
  for(const line of cases){
   const button=make('button','product-guide-choice',line);
   button.type='button';button.dataset.prompt=line;choices.appendChild(button);
  }
 };
 const card=product=>{
  const p=PRODUCTS[product?.id];
  if(!p)return;
  const el=make('div','product-guide-result');
  el.appendChild(make('strong',null,p.title));
  el.appendChild(make('small',null,'Collection en préparation · pas encore en vente'));
  const a=make('a',null,'Découvrir cette banque →');a.href=p.href;el.appendChild(a);messages.appendChild(el);
 };
 const setBusy=value=>{
  pending=value;send.disabled=value;input.disabled=value;
  choices.querySelectorAll('button').forEach(x=>x.disabled=value);
 };
 const getAvailable=async()=>{
  if(healthChecked)return;
  healthChecked=true;setStatus('Connexion au modèle IA…');
  try{
   const r=await fetch(API,{method:'GET',mode:'cors',cache:'no-store'});
   const data=await r.json();
   setStatus(r.ok&&data.ready?'IA générative disponible':'IA non configurée actuellement');
  }catch{setStatus('Connexion IA momentanément indisponible');}
 };
 const start=()=>{
  if(controller){controller.abort();controller=null;}
  history=[];messages.replaceChildren();
  setBusy(false);
  bubble('Décrivez ce que vous voulez accomplir. Je vous poserai des questions si nécessaire pour trouver la banque adaptée.','bot');
  showPresets();
 };
 const sendMessage=async text=>{
  const value=String(text||'').trim().slice(0,400);
  if(!value||pending)return;
  if(!consent.checked){setStatus('Cochez l’accord d’envoi à l’IA pour commencer.');consent.focus();return;}
  bubble(value,'user');input.value='';
  const payload={messages:[...history,{role:'user',content:value}]};
  controller=new AbortController();setBusy(true);
  setStatus('L’IA prépare une réponse…');
  const indicator=bubble('L’IA réfléchit…','bot');indicator.classList.add('product-guide-thinking');
  try{
   const timer=setTimeout(()=>controller?.abort(),26000);
   let response,data;
   try{
    response=await fetch(API,{method:'POST',mode:'cors',cache:'no-store',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify(payload),signal:controller.signal});
    data=await response.json();
   }finally{clearTimeout(timer);}
   if(!response.ok||!data||typeof data.reply!=='string'||!data.reply.trim()){
    const code=data?.error||'';
    if(response.status===429)throw new Error('Le modèle reçoit trop de demandes. Réessayez plus tard.');
    if(code==='not_configured')throw new Error('Le fournisseur d’IA n’est pas encore configuré.');
    if(code==='not_activated')throw new Error('Le conseiller IA attend l’activation du fournisseur.');
    throw new Error('Le modèle d’IA est momentanément indisponible. Réessayez.');
   }
   indicator.remove();
   bubble(data.reply,'bot');
   for(const p of (Array.isArray(data.products)?data.products:[]).slice(0,2))card(p);
   history=[...history,{role:'user',content:value},{role:'assistant',content:data.reply.slice(0,850)}].slice(-6);
   setStatus('Réponse générée par IA');
  }catch(err){
   indicator.remove();
   bubble(err?.name==='AbortError'?'La réponse a pris trop de temps. Réessayez.':
    err instanceof Error&&/trop de demandes|n.est pas encore configuré|attend l.activation|momentanément indisponible/.test(err.message)?err.message:
    'Connexion à l’IA impossible pour le moment. Réessayez.','bot');
   setStatus('IA momentanément indisponible');
  }finally{
   controller=null;setBusy(false);input.focus();messages.scrollTop=messages.scrollHeight;
  }
 };
 const open=value=>{
  if(!value&&controller){controller.abort();controller=null;}
  panel.hidden=!value;toggle.setAttribute('aria-expanded',String(value));
  if(value){getAvailable();input.focus();}else toggle.focus();
 };
 start();
 toggle.addEventListener('click',()=>open(panel.hidden));
 close.addEventListener('click',()=>open(false));
 reset.addEventListener('click',()=>{start();input.focus();setStatus('Nouvelle conversation');});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();open(false);}});
 document.querySelectorAll('[data-open-product-guide]').forEach(button=>button.addEventListener('click',()=>open(true)));
 form.addEventListener('submit',e=>{e.preventDefault();sendMessage(input.value);});
 choices.addEventListener('click',e=>{
  const target=e.target.closest('button[data-prompt]');
  if(target&&!pending)sendMessage(target.dataset.prompt);
 });
})();
