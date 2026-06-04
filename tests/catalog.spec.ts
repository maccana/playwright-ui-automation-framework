import { test, expect } from '@playwright/test';

test.describe('Protected Catalog Space', () => {
  test('Should directly access protected inventory space using saved state', async ({ page }) => {
    // Go directly to the protected inventory page
    await page.goto('/inventory.html');

    // Assert: Verify we are logged in automatically by checking the SauceDemo title element
    const pageHeader = page.locator('[data-test="title"]');
    await expect(pageHeader).toBeVisible();
    await expect(pageHeader).toHaveText('Products');
  });
});