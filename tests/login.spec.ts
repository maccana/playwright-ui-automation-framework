import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
// 1. Import your text data fixture securely
import testData from '../fixtures/test-data.json';

test.describe('User Authentication Suite', () => {
  
  // Your existing negative test remains here...
  test('Should show error validation with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('invalid-user@example.com', 'wrongpassword');

    const errorMessage = page.locator('div[data-test="login-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid email or password');
  });

  // 2. Add the new positive test flow
  test('Should successfully log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    
    // Act: Feed the login method data straight out of our JSON fixture
    await loginPage.login(testData.validUser.email, testData.validUser.password);

    // Assert: Verify that the user lands on the protected dashboard/profile page
    const pageHeader = page.locator('h1[data-test="page-title"]');
    await expect(pageHeader).toBeVisible();
    await expect(pageHeader).toContainText('My Account', { ignoreCase: true });
  });

});