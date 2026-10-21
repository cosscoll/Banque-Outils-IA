import {test,expect} from '@playwright/test';
test('desktop: interactive 3D experience renders or explicitly reports WebGL fallback',async({page})=>{
 await page.goto('/');await expect(page.locator('h1')).toBeVisible();
 const status=page.locator('#status');await expect(status).not.toHaveText('Chargement de la scène 3D…',{timeout:20000});
 await expect(page.locator('[data-material]')).toHaveCount(3);
 await page.getByRole('button',{name:'Cuivre'}).click();
 await expect(page.getByRole('button',{name:'Cuivre'})).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('html')).toHaveJSProperty('scrollWidth',await page.locator('html').evaluate(e=>e.clientWidth));
});
test('mobile: no horizontal overflow and meaningful controls',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await expect(page.locator('h1')).toBeVisible();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
 expect(overflow).toBeLessThanOrEqual(1);
 await page.getByRole('button',{name:'Ivoire'}).click();
 await expect(page.getByRole('button',{name:'Ivoire'})).toHaveAttribute('aria-pressed','true');
});
