import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import testData from '../fixtures/test-data.json';

const authFile = 'playwright/.auth/user.json';

setup('Authenticate User and Save Session State', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.login(testData.validUser.email, testData.validUser.password);

  // Verify we reached the dashboard before saving the session
  const pageHeader = page.locator('h1[data-test="page-title"]');
  await expect(pageHeader).toBeVisible();
  await expect(pageHeader).toContainText('My Account', { ignoreCase: true });

  // Capture cookies/storage and save it locally
  await page.context().storageState({ path: authFile });
});