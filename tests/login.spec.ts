import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('User Authentication Suite', () => {
  
  test('Should show error validation with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login('invalid-user@example.com', 'wrongpassword');

    const errorMessage = page.locator('div[data-test="login-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid email or password');
  });

});