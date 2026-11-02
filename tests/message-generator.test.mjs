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
