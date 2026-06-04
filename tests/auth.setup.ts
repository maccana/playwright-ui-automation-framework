import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import testData from '../fixtures/test-data.json';

setup('Authenticate Standard User and Save Session State', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.login(testData.validUser.email, testData.validUser.password);

  // Wait for the inventory page redirect
  await page.waitForURL('**/inventory.html', { timeout: 10000 });

  // Assert the primary header title is visible
  const pageHeader = page.locator('[data-test="title"]');
  await expect(pageHeader).toBeVisible();
  await expect(pageHeader).toHaveText('Products');

  // Persist the clean session state to disk
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});