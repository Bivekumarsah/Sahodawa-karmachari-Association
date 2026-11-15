import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const siteURL = pathToFileURL(resolve(process.cwd(), 'index.html')).href;

test('Bajika is the initial language and Nepali + English switches work', async ({ page }) => {
  await page.goto(siteURL);
  const title = page.locator('.hero h1');
  const lead = page.locator('.hero-lead');
  const ne = page.locator('.lang-btn[data-lang="ne"]');
  const en = page.locator('.lang-btn[data-lang="en"]');
  const bj = page.locator('.lang-btn[data-lang="bj"]');

  await expect(page.locator('html')).toHaveAttribute('lang', 'vjk');
  await expect(title).toContainText('एकता में ताकत');
  await expect(bj).toHaveAttribute('aria-pressed', 'true');

  await ne.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ne');
  await expect(title).toContainText('एकतामा शक्ति');
  await expect(lead).toContainText('कर्मचारीहरूलाई');
  await expect(ne).toHaveAttribute('aria-pressed', 'true');
  await expect(bj).toHaveAttribute('aria-pressed', 'false');

  await en.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(title).toContainText('A stronger voice.');
  await expect(lead).toContainText('A shared platform');
  await expect(en).toHaveAttribute('aria-pressed', 'true');

  await bj.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vjk');
  await expect(title).toContainText('एकता में ताकत');
  await expect(bj).toHaveAttribute('aria-pressed', 'true');
});

test('notice board and form labels follow the Nepali selection', async ({ page }) => {
  await page.goto(siteURL);
  await page.locator('.lang-btn[data-lang="ne"]').click();
  await expect(page.locator('#noticeList')).toContainText('आधिकारिक सूचना यहाँ प्रकाशित गरिनेछ');
  await expect(page.locator('.member-form-card h3')).toContainText('सदस्यता रुचि फारम');
  await expect(page.locator('#noticeSearch')).toHaveAttribute('placeholder', 'सूचना खोज्नुहोस्...');
  await expect(page.locator('#memberName')).toHaveAttribute('placeholder', 'आफ्नो नाम');
  await page.locator('.lang-btn[data-lang="bj"]').click();
  await expect(page.locator('#noticeList')).toContainText('आधिकारिक सूचना इहाँ प्रकाशित कइल जाई');
});

test.describe('mobile screen', () => {
  test.use({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });

  test('Nepali switch is visible and tappable on a small screen', async ({ page }) => {
    await page.goto(siteURL);
    const ne = page.locator('.lang-btn[data-lang="ne"]');
    await expect(ne).toBeVisible();
    await ne.tap();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ne');
    await expect(page.locator('.hero h1')).toContainText('एकतामा शक्ति');
    await expect(ne).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.lang-btn[data-lang="en"]').tap();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
