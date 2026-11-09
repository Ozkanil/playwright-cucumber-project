import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I click on the delete button', async function (this: CustomWorld) {
  await this.deleteEmployeePage.clickDeleteButton(this.employeeData.employeeId);
  await this.deleteEmployeePage.confirmDelete();
});

Then('the employee should be deleted successfully', async function (this: CustomWorld) {
  await this.deleteEmployeePage.expectEmployeeDeletedSuccessfully();
});
