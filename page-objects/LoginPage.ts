import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[data-test="email"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-submit"]');
  }

  async navigateTo() {
    // await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    // Clean relative routing
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}