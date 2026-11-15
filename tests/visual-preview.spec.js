const { test } = require('@playwright/test');

function emitScreenshot(name, buffer) {
  const encoded = buffer.toString('base64');
  console.log('PREVIEW:' + name + ':BEGIN');
  for (let i = 0; i < encoded.length; i += 1500) {
    console.log('PREVIEW:' + name + ':' + encoded.slice(i, i + 1500));
  }
  console.log('PREVIEW:' + name + ':END');
}

test('editorial visual review captures', async ({ page }) => {
  await page.setViewportSize({width: 1280, height: 900});
  await page.goto('/');
  await page.locator('#noticeList .editorial-empty').waitFor();
  await page.evaluate(() => document.fonts.ready);
  emitScreenshot('desktop', await page.screenshot({type:'jpeg',quality:55}));
  emitScreenshot('committee', await page.locator('#committee').screenshot({type:'jpeg',quality:53}));
  emitScreenshot('membership', await page.locator('#membership').screenshot({type:'jpeg',quality:53}));
  await page.setViewportSize({width: 390,height: 844});
  await page.reload();
  await page.evaluate(async () => { await document.fonts.ready; window.scrollTo({top:0,behavior:'instant'}); });
  emitScreenshot('mobile', await page.screenshot({type:'jpeg',quality:55}));
});
