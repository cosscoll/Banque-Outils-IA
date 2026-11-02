/* Banque Outils IA — guide local : aucun réseau, traceur, stockage ni IA distante. */
(()=>{
  'use strict';
  const PRODUCTS=[
    {id:'redaction',title:'Rédaction & communication',url:'./pack-redaction.html',outcome:'Préparer des e-mails, publications et textes de présentation.',reason:'Votre besoin concerne les mots et les messages à adresser à votre public.',patterns:[[/\bredig\w*|\bredaction\b|\becri\w*|\btexte\w*|\barticle\w*|\be[\s-]?mails?\b|\bmessages?\b|\bnewsletter\w*|\bsms\b|\blettres? de motivation\b|\bfiches? produits?\b|\bposts? instagram\b|\bposts?\b|\bpublication\w*|\bprospect\w*|\baccroche\w*|\blegende\w*|\bcopywriting\b|\bcommunication\b/,6],[/\bfiches? produits?\b|\bdescription\w* produits?\b/,3]]},
    {id:'visuel',title:'Design & visuels',url:'./pack-visuel.html',outcome:'Cadrer une affiche, une bannière ou un autre visuel.',reason:'Votre projet demande de définir une direction graphique.',patterns:[[/\baffich\w*|\bvisuel\w*|\bgraph\w*|\bimages?\b|\blogos?\b|\bflyers?\b|\bbannier\w*|\bdesign\b|\bidentite visuelle\b|\bcharte graphique\b|\bphotograph\w*|\bpresentation\w* powerpoint\b|\bcarrousel\w* visuel\w*|\bminiature\w*/,7]]},
    {id:'web',title:'Sites web & prototypes',url:'./pack-sites-web.html',outcome:'Structurer les pages d’un site et préparer un prototype.',reason:'Votre objectif concerne la structure ou la présentation d’un site.',patterns:[[/\bsites?\b|\bpage\w* web\b|\blanding page\b|\bwordpress\b|\bvitrine\b|\bboutique en ligne\b|\be[\s-]?commerce\b|\bapplication web\b|\bprototyp\w*|\bheberg\w*|\bnom de domaine\b|\bsite internet\b|\bformulaire\w* en ligne\b|\breservation\w* en ligne\b|\bprise de rendez vous\b/,8]]},
    {id:'medias',title:'Vidéo & audio',url:'./pack-video-audio.html',outcome:'Préparer un script, un storyboard ou un projet audio.',reason:'Vous travaillez sur un contenu vidéo ou sonore.',patterns:[[/\bvideo\w*|\bmontage\b|\bpodcast\w*|\baudio\b|\bvoix off\b|\bsous[\s-]?titres?\b|\breels?\b|\byoutube\b|\btiktok\b|\bstoryboard\b|\bfilm\w*|\bvideaste\w*|\binterview\w*|\bnarration\w*/,8]]},
    {id:'auto',title:'Première automatisation',url:'./pack-automatisation.html',outcome:'Décrire et simuler un processus répétitif avec contrôle humain.',reason:'Vous cherchez à organiser ou éviter une tâche répétitive.',patterns:[[/\bautomati\w*|\bworkflows?\b|\bprocessus\b|\bprocess\b|\brelances? automatiques?\b|\bn8n\b|\bzapier\b|\bmake\b|\bconnecter des outils\b|\bressaisi\w*|\bdevis automatique\b|\bfactur\w* automatique\w*|\brepet\w*\b/,8],[/\btaches? repetiti\w*|\bactions? recurrent\w*|\btous les jours\b|\bchaque semaine\b/,5]]},
    {id:'analyse',title:'Recherche & analyse',url:'./pack-recherche-analyse.html',outcome:'Comparer des options et organiser des sources fiables.',reason:'Votre besoin consiste à analyser ou comparer des informations avant de décider.',patterns:[[/\bcompar\w*|\banaly\w*|\brecherch\w*|\bbenchmark\b|\bveille\b|\betude de marche\b|\bdecisi\w*|\bsources?\b|\bdonnees?\b|\bstatistiqu\w*|\bconcurren\w*|\btableau\w*|\bdiagnostic\b|\btableaux? de bord\b|\bcomparatif\w*/,7]]}
  ];
  const fold=input=>String(input??'').toLocaleLowerCase('fr').normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^\p{L}\p{N}]+/gu,' ').replace(/\s+/g,' ').trim();
  const choose=input=>{
    const clean=fold(input).slice(0,250);
    if(!clean)return {kind:'clarify',ids:[],reason:'Décrivez ce que vous souhaitez réaliser ou choisissez une idée ci-dessous.'};
    const ranked=PRODUCTS.map((p,i)=>({id:p.id,order:i,score:p.patterns.reduce((sum,[pattern,weight])=>sum+(pattern.test(clean)?weight:0),0)}))
      .filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.order-b.order);
    if(!ranked.length)return {kind:'clarify',ids:[],reason:'Pour vous orienter, quel résultat voulez-vous obtenir ? Choisissez un besoin ou donnez un exemple concret.'};
    if(ranked.length>1&&ranked[1].score>=ranked[0].score*0.72)return {kind:'match',ids:[ranked[0].id,ranked[1].id]};
    return {kind:'match',ids:[ranked[0].id]};
  };
  const getProduct=id=>PRODUCTS.find(p=>p.id===id);
  const newSession=()=>({lastIds:[],role:'',pending:''});
  // Conversational state is stored in RAM only for the current tab; it is never sent or saved.
  // This is guidance, NOT an LLM. Unclear requests require an explicit choice.
  const interpret=(value,previous=newSession())=>{
    const clean=fold(value).slice(0,250);
    const state={lastIds:[...(previous.lastIds||[])],role:previous.role||'',pending:previous.pending||''};
    if(!clean)return {kind:'clarify',reason:'Quelle tâche souhaitez-vous réaliser ?',options:'all',state};
    const roleMatch=clean.match(/\b(artisan|commercant|coiffeur|restaurateur|restaurant|freelance|independant|consultant|association|entrepreneur|boutique|tpe)\b/);
    if(roleMatch)state.role=roleMatch[1];
    if(/\b(prix|tarif|combien cout|acheter|commande|paiement|payant|disponib|precomman)\w*/.test(clean)){
      return {kind:'info',reason:'Les banques sont encore en préparation : aucun prix définitif, achat ou précommande n’est disponible. Vous pouvez consulter leur aperçu gratuitement.',ids:state.lastIds,options:'after',state};
    }
    if(/\b(es tu une ia|vraie ia|vrai chatbot|ce chatbot|assistant ia|intelligence artificielle|chatgpt|qui es tu|confidentialite|donnees personnelles|mes donnees|tu conserves|stock\w*|sauvegard\w*)\b/.test(clean)){
      return {kind:'info',reason:'Je suis un guide de choix automatique, pas une IA générative. J’analyse votre demande localement, sans transmettre ni conserver vos messages. Je peux vous orienter vers les six banques.',ids:[],options:'all',state};
    }
    if(/\b(merci|au revoir|bye)\b/.test(clean)&&clean.length<28){
      return {kind:'info',reason:'Avec plaisir. Vous pouvez décrire un autre objectif ou consulter les banques proposées.',ids:[],options:'after',state};
    }
    if(/\b(pourquoi cette banque|pourquoi ce produit|pourquoi ce choix|explique|en savoir plus|qu est ce que ca fait|qu est ce que c est)\b/.test(clean)&&state.lastIds.length){
      return {kind:'explain',ids:state.lastIds,reason:'Voici pourquoi cette recommandation correspond à votre demande, ainsi que ce que le kit est censé aider à préparer.',options:'after',state};
    }
    const result=choose(value);
    if(result.kind==='match'){
      state.lastIds=result.ids.slice(0,2);
      state.pending='';
      return {...result,reason:result.ids.length>1?'Votre projet couvre deux tâches différentes. Ces deux banques peuvent se compléter :':'Voici la banque la plus proche de votre objectif :',options:'after',state};
    }
    if(/\b(visibilite|me faire connaitre|plus de clients|trouver des clients|attirer des clients|developper mon activite|faire de la pub|promouvoir|marketing|publicite|etre trouve sur internet|visible sur internet|etre visible en ligne)\b/.test(clean)){
      state.pending='visibility';
      return {kind:'clarify',reason:'Pour vous faire connaître, que souhaitez-vous faire en premier : créer un site, écrire des messages ou réaliser des visuels ?',options:'visibility',state};
    }
    if(/\b(reseaux sociaux|instagram|facebook|linkedin)\b/.test(clean)){
      state.pending='social';
      return {kind:'clarify',reason:'Sur les réseaux sociaux, souhaitez-vous surtout écrire des publications, créer des visuels ou préparer des vidéos ?',options:'social',state};
    }
    if(/\b(gagner du temps|plus rapide|simplifier mon quotidien|mieux m organiser|organiser mon activite)\b/.test(clean)){
      state.pending='time';
      return {kind:'clarify',reason:'Quelle tâche vous prend du temps : répéter les mêmes opérations, rédiger des messages ou organiser des informations ?',options:'time',state};
    }
    if(state.pending&&/\b(oui|non|peut etre|je sais pas|aucune idee)\b/.test(clean)){
      const mode=state.pending;
      return {kind:'clarify',reason:'Pas de problème. Choisissez le résultat qui vous intéresse le plus, ou décrivez une tâche concrète.',options:mode,state};
    }
    return {kind:'clarify',reason:state.role?'D’accord. Quelle action souhaitez-vous réaliser pour votre activité ? Choisissez un exemple ci-dessous ou décrivez le résultat attendu.':'Pour mieux vous conseiller, que souhaitez-vous obtenir concrètement ? Vous pouvez choisir une idée ci-dessous.',options:'all',state};
  };
  if(typeof module!=='undefined'&&module.exports)module.exports={choose,fold,PRODUCTS,interpret,newSession};
  if(typeof document==='undefined'||!document.body)return;
  const root=document.createElement('div');
  root.className='product-guide';root.id='productGuide';
  root.innerHTML=[
    '<button class="product-guide-toggle" id="productGuideToggle" type="button" aria-controls="productGuidePanel" aria-expanded="false">',
      '<span class="product-guide-spark" aria-hidden="true">✳</span><span>Quel produit choisir ?</span></button>',
    '<section class="product-guide-panel" id="productGuidePanel" aria-label="Guide de choix de banque" hidden>',
      '<div class="product-guide-header"><div><strong>Conseiller produit</strong><span>Échange guidé · gratuit</span></div>',
      '<div class="product-guide-header-actions"><button type="button" id="productGuideReset" aria-label="Recommencer la conversation" title="Recommencer">↺</button>',
      '<button type="button" id="productGuideClose" aria-label="Fermer le guide" title="Fermer">×</button></div></div>',
      '<div class="product-guide-messages" id="productGuideMessages" role="log" aria-live="polite" aria-relevant="additions"></div>',
      '<div class="product-guide-choices" id="productGuideChoices" role="group" aria-label="Suggestions de besoins"></div>',
      '<form class="product-guide-form" id="productGuideForm"><label for="productGuideInput">Votre besoin</label>',
      '<div><input id="productGuideInput" type="text" maxlength="250" placeholder="Ex. : Je veux créer mon site…" autocomplete="off" required>',
      '<button type="submit" aria-label="Envoyer le message">Envoyer</button></div></form>',
      '<p class="product-guide-privacy">Ce guide fonctionne ici, sans IA connectée. Vos textes ne sont ni transmis ni enregistrés. Aucune banque n’est encore en vente.</p>',
    '</section>'
  ].join('');
  document.body.appendChild(root);
  const toggle=root.querySelector('#productGuideToggle');
  const panel=root.querySelector('#productGuidePanel');
  const close=root.querySelector('#productGuideClose');
  const reset=root.querySelector('#productGuideReset');
  const messages=root.querySelector('#productGuideMessages');
  const choices=root.querySelector('#productGuideChoices');
  const form=root.querySelector('#productGuideForm');
  const input=root.querySelector('#productGuideInput');
  const make=(tag,cls,value)=>{
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(value!==undefined)el.textContent=value;
    return el;
  };
  const bubble=(message,who)=>{
    const el=make('div','product-guide-bubble '+(who==='user'?'from-user':'from-bot'),message);
    messages.appendChild(el);messages.scrollTop=messages.scrollHeight;
    return el;
  };
  const choiceModes={
    start:[['redaction','Écrire un message'],['web','Créer mon site'],['auto','Simplifier une tâche'],['all','Voir les 6 besoins']],
    all:[['redaction','Rédiger'],['visuel','Créer un visuel'],['web','Créer un site'],['medias','Vidéo / audio'],['auto','Automatiser'],['analyse','Comparer']],
    visibility:[['web','Créer un site'],['redaction','Écrire des messages'],['visuel','Créer des visuels']],
    social:[['redaction','Écrire des posts'],['visuel','Créer des visuels'],['medias','Préparer des vidéos']],
    time:[['auto','Automatiser une tâche'],['redaction','Rédiger plus facilement'],['analyse','Organiser des informations']],
    after:[['all','Autre besoin'],['price','Le prix ?'],['restart','Recommencer']]
  };
  const showChoices=mode=>{
    choices.replaceChildren();
    for(const [id,label] of choiceModes[mode]||choiceModes.all){
      const b=make('button','product-guide-choice',label);
      b.type='button';b.dataset.guideChoice=id;choices.appendChild(b);
    }
  };
  const display=id=>{
    const p=getProduct(id);
    if(!p)return;
    const item=make('div','product-guide-result');
    item.appendChild(make('strong',null,p.title));
    item.appendChild(make('p',null,p.reason));
    item.appendChild(make('p','product-guide-outcome',p.outcome));
    item.appendChild(make('small',null,'En préparation · pas encore disponible à l’achat'));
    const link=make('a',null,'Découvrir cette banque →');
    link.href=p.url;item.appendChild(link);messages.appendChild(item);
  };
  let session=newSession();
  const respond=(value,explicitId)=>{
    const message=String(value).trim().slice(0,250);
    if(!message&&!explicitId)return;
    bubble(message,'user');
    const result=explicitId&&getProduct(explicitId)
      ?{kind:'match',ids:[explicitId],reason:'Voici une banque correspondant à ce besoin :',options:'after',state:{...session,lastIds:[explicitId],pending:''}}
      :interpret(message,session);
    session=result.state;
    bubble(result.reason,'bot');
    if(result.kind==='match'||result.kind==='explain'){
      for(const id of result.ids)display(id);
    }
    // Previous results stay visible for continuity; long chats are kept scrollable.
    showChoices(result.options||'all');
    messages.scrollTop=messages.scrollHeight;
    input.value='';
  };
  const start=()=>{
    session=newSession();
    messages.replaceChildren();
    bubble('Bonjour ! Que souhaitez-vous réaliser ? Décrivez votre projet en quelques mots, même si vous ne connaissez pas les outils IA.','bot');
    showChoices('start');
  };
  const setOpen=open=>{
    panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));
    if(open)input.focus();else toggle.focus();
  };
  start();
  toggle.addEventListener('click',()=>setOpen(panel.hidden));
  close.addEventListener('click',()=>setOpen(false));
  reset.addEventListener('click',()=>{start();input.focus();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){event.preventDefault();setOpen(false);}});
  document.querySelectorAll('[data-open-product-guide]').forEach(button=>button.addEventListener('click',()=>setOpen(true)));
  choices.addEventListener('click',event=>{
    const button=event.target.closest('[data-guide-choice]');
    if(!button||!choices.contains(button))return;
    const id=button.dataset.guideChoice;
    if(id==='all'){bubble(button.textContent,'user');bubble('Choisissez ce que vous souhaitez obtenir :','bot');showChoices('all');return;}
    if(id==='restart'){start();input.focus();return;}
    if(id==='price'){respond('Quels sont les prix ?');return;}
    respond(button.textContent,id);
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(input.value.trim())respond(input.value);else input.focus();
  });
})();
