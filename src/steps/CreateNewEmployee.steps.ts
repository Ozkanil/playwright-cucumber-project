import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I open the PIM page', async function (this: CustomWorld) {
  await this.employeePage.openPim();
});

When('I click the Add button', async function (this: CustomWorld) {  
  await this.employeePage.clickAdd();
});

When('I fill in employee details', async function (this: CustomWorld) {
  await this.employeePage.fillEmployeeDetails(this.employeeData);
});

When('I save the employee details', async function (this: CustomWorld) {  
  await this.employeePage.saveEmployee();
});

Then('the employee should be created', async function (this: CustomWorld) {
  await this.employeePage.expectEmployeeCreated(this.employeeData);
});

When('I search for the employee by ID', async function (this: CustomWorld) {
  await this.employeePage.searchEmployeeById(this.employeeData.employeeId);
});

Then('the employee should be visible in the results', async function (this: CustomWorld) {
  await this.employeePage.expectEmployeeFoundInResults(this.employeeData);
});

When('I click on the found employee to view details', async function (this: CustomWorld) {
  await this.employeePage.clickFoundEmployeeToViewTheDetails(this.employeeData.employeeId);  
});