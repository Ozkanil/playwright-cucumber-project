import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Then('the employee details should be displayed', async function (this: CustomWorld) {
  await this.viewEditEmployeeDetailsPage.expectEmployeeDetailsDisplayed(this.employeeData);
});

When('I edit and save the employee first name last name and marital status', async function (this: CustomWorld) {
  await this.viewEditEmployeeDetailsPage.editAndSaveEmployeeDetails();
});

Then('the employee details should be updated successfully', async function (this: CustomWorld) {
  await this.viewEditEmployeeDetailsPage.expectEmployeeDetailsUpdated();
});

Then('the employee details cannot be fetched as the employee does not exist', async function (this: CustomWorld) {
  await this.viewEditEmployeeDetailsPage.expectEmployeeDetailsNotFound();
});
