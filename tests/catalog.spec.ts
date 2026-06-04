import { test, expect } from '@playwright/test';
import testData from '../fixtures/test-data.json';

test.describe('Data-Driven Catalog Validations', () => {
  
  for (const user of testData.userProfiles) {
    test.describe(`Session Context: ${user.type.toUpperCase()}`, () => {
      
      // Inject the specific storage state generated during the setup phase
      test.use({ storageState: `playwright/.auth/${user.type}.json` });

      test(`Validate catalog load state for ${user.username}`, async ({ page }) => {
        await page.goto('/inventory.html');

        const pageHeader = page.locator('[data-test="title"]');
        await expect(pageHeader).toBeVisible();
        await expect(pageHeader).toHaveText('Products');

        // Mid-level assertion touch: Verify product items are actually rendering on screen
        const inventoryItems = page.locator('[data-test="inventory-item"]');
        if (user.shouldSeeProducts) {
          await expect(inventoryItems.first()).toBeVisible();
          const count = await inventoryItems.count();
          expect(count).toBeGreaterThan(0);
        }
      });
    });
  }
});