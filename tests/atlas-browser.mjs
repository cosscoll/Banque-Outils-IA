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


  // Chemin de découverte préachat — il doit rester non transactionnel.
  for(const width of [390,1440]){
    const journey=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const errors=[];
    journey.on('pageerror',error=>errors.push(error.message));
    await open(journey,'index.html');
    await journey.locator('.kinetic-button').click();
    assert.ok(journey.url().includes('produit.html#collections'),'Héros → six collections');
    assert.equal(await journey.locator('.collection-tile').count(),6);
    assert.equal(await journey.locator('#comment-acheter').count(),0,'Aucune étape superflue');
    assert.equal(await journey.locator('.collection-tile').count(),6,'Six objectifs lisibles');
    assert.ok(await journey.locator('.hub-status').isVisible(),'Disponibilité comprise');
    await journey.locator('.collection-tile').first().click();
    assert.ok(journey.url().includes('pack-redaction.html'),'Collection → rédaction');
    assert.equal(await journey.locator('.shop-status').innerText(),'En préparation · Aucun achat ou précommande possible');
    assert.equal(await journey.locator('.showroom-progress').count(),0,'Navigation doublon retirée');
    await journey.locator('.showroom-action.primary').click();
    assert.ok(journey.url().includes('/outils/assistant-messages.html'),'Rédaction → outil réel');
    assert.ok(await journey.locator('#messageForm').count());
    const overflow=await journey.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=4,'Parcours : débordement '+width+' '+overflow);
    assert.equal(errors.length,0,'Erreurs JS du parcours '+width+': '+errors.join('; '));
    await journey.screenshot({path:join(evidence,'achat-parcours-'+width+'.png'),fullPage:true});
    await journey.close();
    checked++;
  }
  for(const slug of ['visuel','sites-web','video-audio','automatisation','recherche-analyse']){
    const p=await browser.newPage({viewport:{width:390,height:844}});
    await open(p,'pack-'+slug+'.html');
    assert.ok(await p.locator('.shop-facts').count(),'Contenu de '+slug+' expliqué');
    const cta=p.locator('.showroom-buy-options > a').first();
    assert.equal(await cta.getAttribute('href'),'#exemple','Pas de tunnel GitHub public depuis '+slug);
    assert.equal(await p.locator('.shop-back-link').getAttribute('href'),'./produit.html#collections');
    await cta.click();
    assert.ok(p.url().includes('#exemple'),'Démo atteinte : '+slug);
    const overflow=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=4,'Débordement fiche '+slug+': '+overflow);
    await p.close();
    checked++;
  }


  // Guide d'orientation : aucun compte ni API, six produits, formulations libres.
  for(const width of [320,390,1440]){
    const guide=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
    const errors=[];
    guide.on('pageerror',error=>errors.push(error.message));
    await open(guide,'index.html');
    const toggle=guide.locator('#productGuideToggle');
    assert.equal(await toggle.count(),1,'Le guide est intégré sur l’accueil');
    assert.equal(await guide.locator('#productGuidePanel').isVisible(),false,'Fermé par défaut');
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    assert.equal(await guide.locator('#productGuidePanel').isVisible(),true,'Panneau visible');
    const rect=await guide.locator('#productGuidePanel').boundingBox();
    assert.ok(rect.x>=-1&&rect.x+rect.width<=width+1,'Panneau dans le viewport '+width);
    await guide.locator('#productGuideInput').fill('Je veux lancer un site internet pour mon atelier');
    await guide.locator('#productGuideForm button[type=submit]').click();
    assert.match(await guide.locator('.product-guide-result strong').last().innerText(),/Sites web/,'Recommandation de site');
    assert.equal(await guide.locator('.product-guide-result a').last().getAttribute('href'),'./pack-sites-web.html');
    await guide.locator('#productGuideInput').fill('Je veux rédiger un e-mail et créer une affiche');
    await guide.locator('#productGuideForm button[type=submit]').click();
    assert.equal(await guide.locator('.product-guide-result').count(),3,'1 puis 2 suggestions');
    await guide.locator('#productGuideInput').fill('Je suis artisan et je ne sais pas quoi faire');
    await guide.locator('#productGuideForm button[type=submit]').click();
    assert.match(await guide.locator('.product-guide-bubble.from-bot').last().innerText(),/quelle action|quel résultat/i,'Clarification si besoin imprécis');

    await guide.locator('#productGuideInput').fill('Je voudrais attirer plus de clients');
    await guide.locator('#productGuideForm button[type=submit]').click();
    assert.equal(await guide.locator('[data-guide-choice=web]').count(),1,'Choix visibilité');
    await guide.locator('[data-guide-choice=web]').click();
    assert.equal(await guide.locator('.product-guide-result a').last().getAttribute('href'),'./pack-sites-web.html','Choix retenu');
    await guide.locator('#productGuideInput').fill('Pourquoi cette banque ?');
    await guide.locator('#productGuideForm button[type=submit]').click();
    assert.match(await guide.locator('.product-guide-bubble.from-bot').last().innerText(),/pourquoi cette recommandation/i,'Explication contextuelle');
    await guide.locator('[data-guide-choice=price]').click();
    assert.match(await guide.locator('.product-guide-bubble.from-bot').last().innerText(),/aucun prix définitif/i,'Prix exact');
    await guide.locator('#productGuideReset').click();
    assert.equal(await guide.locator('.product-guide-result').count(),0,'Réinitialisation');
    await guide.locator('[data-guide-choice=redaction]').click();
    assert.equal(await guide.locator('.product-guide-result a').last().getAttribute('href'),'./pack-redaction.html');
    await guide.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'),'false','Fermeture au clavier');
    assert.equal(await guide.locator('#productGuidePanel').isVisible(),false);
    assert.equal(errors.length,0,'Guide sans erreurs JS : '+errors.join('; '));
    const overflow=await guide.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=4,'Aucun débordement sur accueil '+width+' '+overflow);
    await toggle.click();
    await guide.screenshot({path:join(evidence,'guide-produit-'+width+'.png'),fullPage:false});
    await guide.close();
    checked++;
  }
  // Accessible depuis Produit et depuis une fiche sans noyer les CTA existants.
  const hubGuide=await browser.newPage({viewport:{width:390,height:844}});
  await open(hubGuide,'produit.html');
  await hubGuide.locator('[data-open-product-guide]').click();
  assert.equal(await hubGuide.locator('#productGuidePanel').isVisible(),true);
  await hubGuide.locator('[data-guide-choice=web]').click();
  assert.equal(await hubGuide.locator('.product-guide-result a').last().getAttribute('href'),'./pack-sites-web.html');
  const hubOverflow=await hubGuide.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(hubOverflow<=4,'Pas de débordement page Produit avec guide');
  await hubGuide.close();
  checked++;
  const packGuide=await browser.newPage({viewport:{width:390,height:844}});
  await open(packGuide,'pack-automatisation.html');
  await packGuide.locator('#productGuideToggle').click();
  await packGuide.locator('#productGuideInput').fill('Comparer plusieurs prestataires');
  await packGuide.locator('#productGuideForm button[type=submit]').click();
  assert.equal(await packGuide.locator('.product-guide-result a').last().getAttribute('href'),'./pack-recherche-analyse.html');
  await packGuide.close();
  checked++;

}finally{
  await browser.close();
}
console.log('QA actuelle :',checked,'scénarios navigateur réussis. Captures : qa-screenshots/');
