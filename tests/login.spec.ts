import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Negative Authentication Tests', () => {
  
  // BEST PRACTICE FIX: Explicitly isolate negative tests from global authentication states
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Should display explicit error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    // Intentionally pass bad credentials
    await loginPage.login('invalid_user_payload', 'wrong_password_123');

    // Assert SauceDemo error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match any user in this service');
  });
});