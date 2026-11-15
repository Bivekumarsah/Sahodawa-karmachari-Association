const { test, expect } = require('@playwright/test');

test('Bajjika opens first and switching Bajjika → Nepali → English is reversible', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('.hero h1');
  await expect(page.locator('html')).toHaveAttribute('lang', 'vjk');
  await expect(hero).toContainText('एकता में ताकत');
  await page.locator('[data-lang="ne"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ne');
  await expect(hero).toContainText('एकतामा शक्ति');
  await expect(page.locator('.hero-lead')).toContainText('कर्मचारीहरूलाई');
  await expect(page.locator('[data-lang="ne"]')).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(hero).toContainText('एकतामा शक्ति');
  await page.locator('[data-lang="en"]').click();
  await expect(hero).toContainText('A stronger voice.');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('[data-lang="bj"]').click();
  await expect(hero).toContainText('एकता में ताकत');
});

test('no fictional leadership or announcements appear when content has not been published', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#noticeList')).toContainText('अभी कौनो आधिकारिक सूचना प्रकाशित नइखे');
  await expect(page.locator('#committeeGrid')).toContainText('कार्यसमिति के आधिकारिक सूची अभी उपलब्ध नइखे');
  await expect(page.locator('#noticeToolbar')).toBeHidden();
  await expect(page.locator('.member-card')).toHaveCount(0);
  await expect(page.locator('.notice-item')).toHaveCount(0);
  await page.locator('[data-lang="ne"]').click();
  await expect(page.locator('#noticeList')).toContainText('अहिलेसम्म आधिकारिक सूचना प्रकाशित गरिएको छैन');
  await expect(page.locator('#committeeGrid')).toContainText('कार्यसमितिको आधिकारिक सूची उपलब्ध छैन');
});

test('published updates are searchable and localized, and leadership data is rendered safely', async ({ page }) => {
  await page.route('**/content/notices.json', route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({ notices: [
      {
        id: 'notice-2026-01', status: 'published', category: 'meeting', date: '2026-11-16',
        title: { bj: 'बैठक के सूचना', ne: 'बैठकको सूचना', en: 'Meeting notice' },
        description: { bj: 'बैठक के जानकारी', ne: 'बैठकको जानकारी', en: 'Meeting information' },
        url: 'javascript:alert(1)'
      },
      {
        id: 'notice-2026-02', status: 'published', category: 'membership', date: '2026-11-15',
        title: { bj: 'सदस्यता सूचना', ne: 'सदस्यता सूचना', en: 'Membership notice' },
        description: { bj: 'सदस्य सब खातिर', ne: 'सदस्यहरूको लागि', en: 'For all members' }
      },
      {
        id: 'private', status: 'draft', category: 'general',
        title: { bj: 'अप्रकाशित', ne: 'अप्रकाशित', en: 'Unpublished' },
        description: { bj: 'निजी', ne: 'निजी', en: 'Private' }
      }
    ] })
  }));
  await page.route('**/content/committee.json', route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({members:[{
      id:'member-01', status:'published',
      name:{bj:'परीक्षण सदस्य',ne:'परीक्षण सदस्य',en:'Test Member'},
      role:{bj:'अध्यक्ष',ne:'अध्यक्ष',en:'President'}
    }]})
  }));
  await page.goto('/');
  await expect(page.locator('.notice-item')).toHaveCount(2);
  await expect(page.locator('.member-card')).toHaveCount(1);
  await expect(page.locator('#noticeToolbar')).toBeVisible();
  await expect(page.locator('.notice-item a')).toHaveCount(0);
  await page.locator('[data-lang="ne"]').click();
  await expect(page.locator('.notice-item').first()).toContainText('बैठकको सूचना');
  await page.locator('[data-filter="membership"]').click();
  await expect(page.locator('.notice-item')).toHaveCount(1);
  await page.locator('#noticeSearch').fill('no matching result');
  await expect(page.locator('#noticeList')).toContainText('खोजसँग मिल्दो सूचना भेटिएन');
  await page.locator('#noticeSearch').fill('सदस्यता');
  await expect(page.locator('.notice-item')).toHaveCount(1);
  await page.locator('[data-lang="en"]').click();
  await expect(page.locator('#noticeList')).toContainText('Membership notice');
  await expect(page.locator('.member-card')).toContainText('Test Member');
  await expect(page.locator('body')).not.toContainText('Unpublished');
});

test('membership draft downloads and printing creates a populated, local-only sheet', async ({ page }) => {
  await page.goto('/');
  await page.locator('#memberName').fill('Test Member');
  await page.locator('#memberPhone').fill('9800000000');
  await page.locator('#memberArea').fill('Test Area');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#membershipForm button[type="submit"]').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('sahodawa-membership-draft.txt');
  await expect(page.locator('#formStatus')).toContainText('डाउनलोड');
  await page.evaluate(() => { window.print = () => { window.printWasCalled = true; }; });
  await page.locator('#printMemberDraft').click();
  expect(await page.evaluate(() => window.printWasCalled)).toBe(true);
  await expect(page.locator('#printSheet')).toContainText('Test Member');
  await expect(page.locator('#printSheet')).toContainText('9800000000');
  await expect(page.locator('#printSheet')).toContainText('Test Area');
});

test('FAQ expands and share action uses device sharing when available', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true, value: async payload => { window.sharedSiteURL = payload.url; }
    });
  });
  await page.goto('/');
  await page.locator('#faq details').first().locator('summary').click();
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  await page.locator('#shareSite').click();
  await expect.poll(() => page.evaluate(() => window.sharedSiteURL)).toContain('/Sahodawa-karmachari-Association/');
});

test.describe('360px touchscreen layout', () => {
  test.use({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });

  test('all languages are tappable and mobile navigation opens/closes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-lang="ne"]')).toBeVisible();
    await page.locator('[data-lang="ne"]').tap();
    await expect(page.locator('.hero h1')).toContainText('एकतामा शक्ति');
    await page.locator('[data-lang="en"]').tap();
    await expect(page.locator('.hero h1')).toContainText('A stronger voice.');
    await page.locator('#menuButton').tap();
    await expect(page.locator('#navLinks')).toHaveClass(/is-open/);
    await page.locator('#navLinks a[href="#about"]').tap();
    await expect(page.locator('#navLinks')).not.toHaveClass(/is-open/);
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 2);
  });
});
