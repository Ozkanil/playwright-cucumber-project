import { Then, When } from '@cucumber/cucumber';

Then('the employee details should be displayed', async function (this: any) {
  await this.viewEditEmployeeDetailsPage.expectEmployeeDetailsDisplayed();
});

When('I edit and save the employee details', async function (this: any) {
  await this.viewEditEmployeeDetailsPage.editAndSaveEmployeeDetails();
});

Then('the employee details should be updated successfully', async function (this: any) {
  await this.viewEditEmployeeDetailsPage.expectEmployeeDetailsUpdated();
});
