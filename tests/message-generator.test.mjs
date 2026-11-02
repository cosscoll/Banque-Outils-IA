import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const html=read('outils/assistant-messages.html');
const script=read('assets/message-generator.js');
const product=read('pack-redaction.html');

test('outil de rédaction : formulaire accessible, format, copie et export',()=>{
  for(const id of ['messageForm','business','audience','offer','benefit','cta','channel','tone','messageOutput','copyMessage','saveMessage','messageStatus'])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const v of ['value="email"','value="post"','value="web"'])
    assert.ok(html.includes(v),v);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes('aria-live="polite"'));
  assert.ok(!/<textarea[^>]+readonly/.test(html),'Le brouillon doit être éditable');
  assert.ok(html.includes('prefers-reduced-motion'));
  assert.ok(product.includes('./outils/assistant-messages.html'),'lien sur page produit');
});
test('outil de rédaction : JS syntaxiquement valide et sans réseau',()=>{
  new vm.Script(script);
  for(const needle of ['form.reportValidity()','output.value=build(values)',"copy.addEventListener('click'","save.addEventListener('click'",'URL.createObjectURL(blob)',"form.addEventListener('reset'"])
    assert.ok(script.includes(needle),needle);
  assert.doesNotMatch(script,/fetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon|api[_-]?key/i);
});
test('outil de rédaction : promesse honnête et aucun paiement',()=>{
  assert.ok(html.includes('aucune IA connectée'));
  assert.ok(html.includes('aucune donnée envoyée'));
  assert.doesNotMatch(html,/stripe\.com|paypal\.com|checkout|api[_-]?key/i);
});


test('outil de rédaction : exercice fonctionnel réel en mémoire, trois canaux, copie et export',async()=>{
  const values={business:'Atelier Papier',audience:'les commerces de quartier',offer:'un atelier de dessin',benefit:'concevoir un visuel clair',cta:'Contactez-nous',channel:'email',tone:'pro'};
  const elements={};
  const make=(id,val='')=>({
    value:val,disabled:true,textContent:'',handlers:{},
    addEventListener(name,callback){this.handlers[name]=callback;},
    reportValidity(){return true;},focus(){},select(){}
  });
  for(const [id,val] of Object.entries(values))elements[id]=make(id,val);
  for(const id of ['messageForm','messageOutput','messageStatus','copyMessage','saveMessage'])
    elements[id]=make(id);
  let copied='',clicked=false,revoked=false;
  const document={
    getElementById(id){return elements[id]||null;},
    createElement(){return {href:'',download:'',click(){clicked=true;},remove(){}};},
    body:{appendChild(){}}
  };
  const context={
    document,Blob,
    navigator:{clipboard:{async writeText(value){copied=value;}}},
    URL:{createObjectURL(){return 'blob:local';},revokeObjectURL(){revoked=true;}},
    setTimeout(fn){fn();}
  };
  vm.runInNewContext(script,context,{filename:'message-generator.js'});
  const submit=elements.messageForm.handlers.submit;
  assert.equal(typeof submit,'function');
  submit({preventDefault(){}});
  assert.match(elements.messageOutput.value,/Objet :/);
  assert.match(elements.messageOutput.value,/Atelier Papier/);
  assert.equal(elements.copyMessage.disabled,false);
  assert.equal(elements.saveMessage.disabled,false);
  elements.channel.value='post';elements.tone.value='warm';
  submit({preventDefault(){}});
  assert.match(elements.messageOutput.value,/Atelier Papier propose/);
  assert.doesNotMatch(elements.messageOutput.value,/Objet :/);
  elements.channel.value='web';submit({preventDefault(){}});
  assert.match(elements.messageOutput.value,/Notre objectif/);
  await elements.copyMessage.handlers.click();
  assert.equal(copied,elements.messageOutput.value,'copie du texte exact');
  elements.saveMessage.handlers.click();
  assert.ok(clicked,'téléchargement déclenché');
  assert.ok(revoked,'URL temporaire révoquée');
  elements.messageForm.handlers.reset();
  assert.equal(elements.messageOutput.value,'');
  assert.equal(elements.copyMessage.disabled,true);
  assert.equal(elements.saveMessage.disabled,true);
});


test('qualité R-02 : sorties cohérentes sur 3 canaux x 3 tons et 20 exemples français',()=>{
  const samples=[
    ['Atelier Papier','les commerces de quartier',"un atelier de création d'affiches",'créer une affiche claire','Contactez-nous pour les dates'],
    ['La Boutique des Fleurs','des particuliers','des bouquets de saison','composer une décoration florale','Demandez un conseil personnalisé !'],
    ['Studio Nord','les artisans locaux','une vitrine web accessible','présenter des services en ligne','Prenez rendez-vous.'],
    ['Cabinet Mosaic','les entreprises','une séance de cadrage','clarifier les priorités','Souhaitez-vous en discuter ?'],
    ['Boulangerie du Parc','les familles','des pains fabriqués sur place','choisir un pain adapté','Passez nous voir'],
    ['L’Atelier du Bois','les associations','des réparations de meubles','redonner vie à vos meubles','Décrivez-nous votre projet'],
    ['Agence Rivière','les commerces','une page de présentation','expliquer une offre simplement','Demandez un devis'],
    ['Maison Sable','les nouveaux arrivants','un guide du quartier','découvrir les services locaux','Consultez le programme'],
    ['Le Jardin Local','les habitants','un atelier de jardinage','apprendre à semer','Réservez votre place'],
    ['Formations Nomade','les équipes','une initiation au numérique','comprendre les outils de base','Écrivez-nous'],
    ['Artisan Léo','les propriétaires','une visite préparatoire','étudier les travaux nécessaires','Proposez un créneau'],
    ['Optique Clara','les clients','une présentation des montures','comparer des modèles','Venez découvrir la sélection'],
    ['Collectif Avenir','les bénévoles','une rencontre d’information','découvrir les activités','Inscrivez-vous'],
    ['Le Café Vert','les étudiants','une rencontre hebdomadaire','échanger autour d’un café','Contactez notre équipe'],
    ['Pépinière Sud','les jardiniers','des conseils pratiques','choisir des plantes adaptées','Posez vos questions'],
    ['Atelier Monceau','les associations','une fiche service','préparer un événement','Demandez les détails'],
    ['Les Éditions de la Rue','les libraires','une sélection thématique','découvrir de nouveaux titres','Consultez le catalogue'],
    ['Horizon Conseil','les entrepreneurs','un entretien de diagnostic','cadrer les objectifs','Prenons contact'],
    ['Le Panier Bleu','les voisins','un panier de légumes locaux','découvrir les produits du territoire','Venez nous rencontrer'],
    ['Le Studio des Pages','les indépendants','une relecture de site','clarifier une page de vente','Écrivez pour en parler']
  ];
  const controls={};
  function elem(id,val=''){
    return {value:val,disabled:false,textContent:'',handlers:{},
      addEventListener(event,fn){this.handlers[event]=fn;},reportValidity(){return true;},focus(){},select(){}};
  }
  for(const id of ['business','audience','offer','benefit','cta','channel','tone','messageForm','messageOutput','messageStatus','copyMessage','saveMessage'])
    controls[id]=elem(id);
  const ctx={
    document:{getElementById:id=>controls[id],body:{appendChild(){}},createElement(){return {click(){},remove(){}}}},
    navigator:{},Blob,URL:{createObjectURL(){return 'blob:local';},revokeObjectURL(){}},
    setTimeout(){}
  };
  vm.runInNewContext(script,ctx);
  for(const s of samples){
    ['business','audience','offer','benefit','cta'].forEach((id,i)=>{controls[id].value=s[i]});
    for(const channel of ['email','post','web'])for(const tone of ['pro','warm','direct']){
      controls.channel.value=channel;controls.tone.value=tone;
      controls.messageForm.handlers.submit({preventDefault(){}});
      const result=controls.messageOutput.value;
      assert.ok(result.includes(s[0]),'activité perdue');
      assert.ok(result.includes(s[1]),'public perdu');
      assert.ok(result.includes(s[2]),'offre perdue');
      assert.ok(result.includes(s[3]),'bénéfice perdu');
      assert.ok(result.includes(s[4]),'action perdue');
      assert.doesNotMatch(result,/à les\b|à des\b|[.!?]{2}|undefined|NaN/);
    }
  }
  assert.equal(samples.length,20);
  controls.messageOutput.value='Brouillon réécrit à la main.';
  controls.messageOutput.handlers.input();
  assert.equal(controls.copyMessage.disabled,false);
  assert.equal(controls.saveMessage.disabled,false);
  controls.messageOutput.value='   ';
  controls.messageOutput.handlers.input();
  assert.equal(controls.copyMessage.disabled,true);
  assert.equal(controls.saveMessage.disabled,true);
  controls.messageOutput.value='Test';
  controls.business.value=' ';
  controls.messageForm.handlers.submit({preventDefault(){}});
  assert.match(controls.messageStatus.textContent,/Complétez/,'espaces seuls interdits');
});
