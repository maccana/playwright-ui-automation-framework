import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import testData from '../fixtures/test-data.json';

// Loop through each profile in our JSON matrix dynamically
for (const user of testData.userProfiles) {
  setup(`Authenticate Profile Tier: ${user.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login(user.username, user.password);

    // Confirm navigation to inventory cleared successfully
    await page.waitForURL('**/inventory.html', { timeout: 10000 });

    // Persist a unique session state file for this specific user type
    await page.context().storageState({ path: `playwright/.auth/${user.type}.json` });
  });
}