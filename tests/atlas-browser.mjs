import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const url=pathToFileURL(join(root,'index.html')).href;
const dir=join(root,'qa-screenshots');mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-webgl']});
try{
 for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.goto(url,{waitUntil:'load'});
   await page.locator('#familyTitle').waitFor();
   await page.waitForTimeout(700);
   const before=await page.evaluate(()=>({rendered:document.getElementById('scene').dataset.rendered,webgl:!!document.getElementById('atlas3d').getContext('webgl'),overflow:document.documentElement.scrollWidth-innerWidth,canvasWidth:document.getElementById('atlas3d').width,families:document.querySelectorAll('[data-family]').length}));
   assert.equal(errors.length,0,'JS runtime errors: '+errors.join(';'));
   assert.equal(before.rendered,'true','3D canvas displayed');
   assert.equal(before.families,6);
   assert.ok(before.canvasWidth>0,'canvas initialized');
   assert.ok(before.overflow<=2,'horizontal overflow '+before.overflow);
   await page.locator('[data-family="4"]').click();
   assert.equal(await page.locator('#familyTitle').innerText(),'Automatisation');
   await page.screenshot({path:join(dir,'atlas-'+width+'.png'),fullPage:true});
   console.log('PASS',width,JSON.stringify(before));
   await page.close();
 }
 for(const target of ['catalogue.html','recherche.html','avancement.html']){
   const page=await browser.newPage({viewport:{width:390,height:844}});
   const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
   await page.goto(pathToFileURL(join(root,target)).href,{waitUntil:'load'});
   const result=await page.evaluate(()=>({background:getComputedStyle(document.body).backgroundColor,overflow:document.documentElement.scrollWidth-innerWidth}));
   assert.equal(result.background,'rgb(245, 244, 239)',target+' new palette');
   assert.ok(result.overflow<=2,target+' overflow: '+result.overflow);
   assert.equal(pageErrors.length,0,target+' runtime');
   if(target==='catalogue.html'){
      await page.locator('[data-filter="creation"]').click();
      assert.ok((await page.locator('.card:visible').count())>0,'catalogue filters');
   }
   if(target==='recherche.html'){
      await page.locator('#query').fill('vidéo');
      assert.ok((await page.locator('.tool:visible').count())>=1,'recherche locale');
   }
   await page.screenshot({path:join(dir,target.replace('.html','')+'-390.png'),fullPage:false});
   console.log('PASS',target,JSON.stringify(result));
   await page.close();
 }
 const fallback=await browser.newPage({viewport:{width:390,height:800}});
 await fallback.addInitScript(()=>{const orig=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl')return null;return orig.call(this,type,...args)}});
 await fallback.goto(url);
 await fallback.waitForTimeout(500);
 assert.equal(await fallback.locator('#scene').getAttribute('data-rendered'),'true','2D fallback');
 await fallback.screenshot({path:join(dir,'atlas-fallback.png')});
 console.log('PASS canvas 2D fallback');
 await fallback.close();
}finally{await browser.close()}
