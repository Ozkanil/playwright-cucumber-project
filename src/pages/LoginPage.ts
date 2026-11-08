import { PASSWORD, USERNAME } from '../test-data/credentials';

import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;
  readonly errorMessage: Locator;
  readonly usernameRequired: Locator;
  readonly passwordRequired: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.usernameRequired = page.locator('.oxd-input-group').filter({ has: this.usernameInput }).locator('.oxd-input-field-error-message');
    this.passwordRequired = page.locator('.oxd-input-group').filter({ has: this.passwordInput }).locator('.oxd-input-field-error-message');
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/'
    );
  }

  async login(username: string = USERNAME, password: string = PASSWORD) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectDashboardVisible(): Promise<void> {
    await expect(this.dashboardHeading).toBeVisible();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectRequiredMessage(field: string): Promise<void> {
    const requiredMessage = field === 'username' ? this.usernameRequired : this.passwordRequired;
    await expect(requiredMessage).toContainText('Required');
  }
}
