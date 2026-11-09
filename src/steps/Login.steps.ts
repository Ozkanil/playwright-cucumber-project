import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I open the OrangeHRM homepage', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When('I login with valid credentials', async function (this: CustomWorld) {
  await this.loginPage.login();
});

Then('the page should show Dashboard', async function (this: CustomWorld) {
  await this.loginPage.expectDashboardVisible();
});

When('I login with {string} and {string}', async function (this: CustomWorld, username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('I should see the error message {string}', async function (this: CustomWorld, message: string) {
  await this.loginPage.expectErrorMessage(message);
});

Then('I should see the required message for {string}', async function (this: CustomWorld, field: string) {
  await this.loginPage.expectRequiredMessage(field);
});
