import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Negative Authentication Tests', () => {
  test('Should display explicit error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    // Intentionally pass bad credentials
    await loginPage.login('invalid_user_payload', 'wrong_password_123');

    // Assert: SauceDemo wraps its error message inside an element with this data-test attribute
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match any user in this service');
  });
});