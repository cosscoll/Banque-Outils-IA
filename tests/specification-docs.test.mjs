import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const main=read('docs/CAHIER_DES_CHARGES_EXECUTION_2026-11-02.md');
const functional=read('docs/SPECIFICATIONS_FONCTIONNELLES_V1_1.md');
const products=read('docs/SPECIFICATIONS_PRODUITS_V1_1.md');
const commercial=read('docs/ARCHITECTURE_ET_COMMERCIALISATION_V1_1.md');
const backlog=read('docs/BACKLOG_PRIORISE_V1_1.md');
const recette=read('docs/RECETTE_PACK_REDACTION_V1_2.md');
test('specifications v1.3 links and source of truth',()=>{
  for(const name of ['SPECIFICATIONS_FONCTIONNELLES_V1_1.md','SPECIFICATIONS_PRODUITS_V1_1.md','ARCHITECTURE_ET_COMMERCIALISATION_V1_1.md','BACKLOG_PRIORISE_V1_1.md','RECETTE_PACK_REDACTION_V1_2.md'])
    assert.ok(main.includes('./'+name),'Missing main documentation link '+name);
  assert.ok(read('README.md').includes('docs/CAHIER_DES_CHARGES_EXECUTION_2026-11-02.md'));
  const links=[...main.matchAll(/\]\(\.\/([^#)]+)\)/g)].map(x=>x[1]);
  for(const link of links)assert.ok(existsSync(resolve(root,'docs',link)),'Broken local document link '+link);
});
test('functional IDs, six product specs, release gates and safeguards',()=>{
  for(let i=1;i<=24;i++)assert.ok(functional.includes('F-'+String(i).padStart(3,'0')),'Missing functional requirement '+i);
  for(const id of ['R-01','V-01','W-01','M-01','A-01','Q-01'])
    assert.ok(products.includes(id),'Missing spec '+id);
  for(const id of ['G0','G1','G2','G3','G4','G5'])
    assert.ok(backlog.includes(id),'Missing release gate '+id);
  assert.ok(commercial.includes('GitHub Pages')&&commercial.includes('https://docs.github.com/'));
  assert.ok(commercial.includes('aucune boutique activée'));
  assert.ok(main.includes('aucune vente ouverte'));
  assert.ok(main.includes('aucune banque G4/G5'));
  assert.ok(backlog.includes('SOC-01')&&backlog.includes('LEG-01')&&backlog.includes('PAY-01'));
});

test('recette Rédaction v1.2 : critères et cas de tests',()=>{
  for(let n=1;n<=24;n++)assert.ok(recette.includes('RQ-'+String(n).padStart(2,'0')),n);
  for(let n=1;n<=17;n++)assert.ok(recette.includes('RT-'+String(n).padStart(2,'0')),n);
  assert.ok(recette.includes('STD-08'));
  assert.ok(recette.includes('trois utilisateurs débutants'));
  assert.ok(main.includes('Version 1.6'));
});

test('chatbot d orientation v1.5 relié au cahier',()=>{
 const chatbot=read('docs/CHATBOT_ORIENTATION_V1_5.md');
 assert.ok(main.includes('./CHATBOT_ORIENTATION_V1_5.md'));
 for(let n=1;n<=12;n++)assert.ok(chatbot.includes('BOT-'+String(n).padStart(2,'0')),n);
 assert.ok(chatbot.includes('Aucune API'));
});

test('guide multi-tour v1.6 documenté',()=>{
 const doc=read('docs/CHATBOT_FONCTIONNEL_V1_6.md');
 assert.ok(main.includes('./CHATBOT_FONCTIONNEL_V1_6.md'));
 for(let n=1;n<=9;n++)assert.ok(doc.includes('BOT-V2-'+String(n).padStart(2,'0')),n);
});
