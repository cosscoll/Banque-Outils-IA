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
