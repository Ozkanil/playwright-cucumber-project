import { Then, When } from '@cucumber/cucumber';

When('I click on the delete button', async function (this: any) {
  await this.deleteEmployeePage.clickDeleteButton();
  await this.deleteEmployeePage.confirmDelete();
});

Then('the employee should be deleted successfully', async function (this: any) {
  await this.deleteEmployeePage.expectEmployeeDeletedSuccessfully();
});
