import { Given, Then, When } from '@cucumber/cucumber';

Given('I open the OrangeHRM homepage', async function (this: any) {
  await this.loginPage.open();
});

When('I login with valid credentials', async function (this: any) {
  await this.loginPage.login();
});

Then('the page should show Dashboard', async function (this: any) {
  await this.loginPage.expectDashboardVisible();
});

When('I login with {string} and {string}', async function (this: any, username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('I should see the error message {string}', async function (this: any, message: string) {
  await this.loginPage.expectErrorMessage(message);
});

Then('I should see the required message for {string}', async function (this: any, field: string) {
  await this.loginPage.expectRequiredMessage(field);
});
