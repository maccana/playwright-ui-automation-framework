import { test, expect } from '@playwright/test';

test.describe('E-commerce Catalog & Profile Verifications', () => {

  test('Should directly access protected account space without manually logging in', async ({ page }) => {
    // Navigate straight to the profile page bypass
    await page.goto('https://practicesoftwaretesting.com/account');

    // Assert: We are already logged in automatically because of our global state injection!
    const pageHeader = page.locator('h1[data-test="page-title"]');
    await expect(pageHeader).toBeVisible();
    await expect(pageHeader).toContainText('My Account', { ignoreCase: true });
  });

});