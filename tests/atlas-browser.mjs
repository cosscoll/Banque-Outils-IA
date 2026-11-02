import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {mkdirSync} from 'node:fs';
import {join,dirname} from 'node:path';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const evidence=join(root,'qa-screenshots');
mkdirSync(evidence,{recursive:true});
const pages=['index.html','produit.html','contact.html','catalogue.html','fiches.html','parcours.html','avancement.html','pack-redaction.html','pack-visuel.html','pack-sites-web.html','pack-video-audio.html','pack-automatisation.html','pack-recherche-analyse.html','outils/assistant-messages.html'];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const open=async(page,path)=>page.goto(pathToFileURL(join(root,path)).href,{waitUntil:'domcontentloaded'});
let checked=0;
try{
  for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await open(page,'index.html');
    assert.equal(await page.locator('.op-card').count(),5,'Cinq cartes du héros');
    assert.equal(await page.locator('h1').count(),1,'Un H1');
    await page.locator('#kineticToggle').click();
    assert.equal(await page.locator('#kineticToggle').getAttribute('aria-pressed'),'true','Bouton ouvre la scène');
    const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,header:getComputedStyle(document.querySelector('.global-header')).position,open:document.querySelector('#kineticStage').dataset.open}));
    assert.ok(result.overflow<=4,'Accueil : débordement horizontal '+width+' '+result.overflow);
    assert.equal(result.open,'true','Hero state');
    assert.equal(errors.length,0,'Accueil : erreurs JS '+errors.join('; '));
    await page.screenshot({path:join(evidence,'home-'+width+'.png'),fullPage:true});
    if(width===390){
      const nav=page.locator('.global-menu-toggle');
      await nav.click();
      assert.equal(await nav.getAttribute('aria-expanded'),'true','Menu mobile ouvert');
      assert.equal(await page.locator('#global-mobile-nav').isVisible(),true);
      await page.keyboard.press('Escape');
      assert.equal(await nav.getAttribute('aria-expanded'),'false','Menu mobile refermé');
    }
    console.log('PASS accueil',width,JSON.stringify(result));
    await page.close();
    checked++;
  }

  for(const p of pages){
    const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await open(page,p);
    const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,h1:document.querySelectorAll('h1').length}));
    assert.equal(result.h1,1,p+' : H1');
    assert.ok(result.overflow<=4,p+' : débordement '+result.overflow);
    assert.equal(errors.length,0,p+' : erreurs JS '+errors.join('; '));
    console.log('PASS mobile',p,JSON.stringify(result));
    await page.close();
    checked++;
  }

  const catalogue=await browser.newPage({viewport:{width:1280,height:850}});
  await open(catalogue,'catalogue.html');
  assert.equal(await catalogue.locator('.resource:visible').count(),6,'Six suggestions au chargement');
  await catalogue.locator('#showAllTools').click();
  assert.equal(await catalogue.locator('.resource:visible').count(),18,'18 outils accessibles');
  await catalogue.locator('#toolQuery').fill('site web');
  assert.ok((await catalogue.locator('.resource:visible').count())>0,'Recherche locale fonctionnelle');
  await catalogue.locator('#resetQuery').click();
  console.log('PASS recherche, expansion, reset');
  await catalogue.close();
  checked++;

  const showroom=await browser.newPage({viewport:{width:1280,height:850}});
  await open(showroom,'pack-redaction.html');
  await showroom.locator('[data-focus-card="0"]').click();
  assert.equal(await showroom.locator('[data-focus-card="0"]').getAttribute('aria-pressed'),'true');
  const initial=await showroom.locator('#demo-result').innerText();
  await showroom.locator('#demo-action').click();
  assert.notEqual(await showroom.locator('#demo-result').innerText(),initial,'Démo change le contenu');
  await showroom.screenshot({path:join(evidence,'showroom-redaction.png'),fullPage:true});
  console.log('PASS showroom interactif');
  await showroom.close();
  checked++;
  const generator=await browser.newPage({viewport:{width:390,height:844}});
  await open(generator,'outils/assistant-messages.html');
  await generator.locator('#messageForm button[type="submit"]').click();
  assert.match(await generator.locator('#messageOutput').inputValue(),/Objet :/,'Génération e-mail');
  assert.equal(await generator.locator('#saveMessage').isEnabled(),true,'Export déverrouillé');
  await generator.locator('#channel').selectOption('post');
  await generator.locator('#messageForm button[type="submit"]').click();
  assert.doesNotMatch(await generator.locator('#messageOutput').inputValue(),/Objet :/,'Changement de format');
  await generator.screenshot({path:join(evidence,'outil-messages-mobile.png'),fullPage:true});
  console.log('PASS générateur de messages interactif mobile');
  await generator.close();
  checked++;

}finally{
  await browser.close();
}
console.log('QA actuelle :',checked,'scénarios navigateur réussis. Captures : qa-screenshots/');
