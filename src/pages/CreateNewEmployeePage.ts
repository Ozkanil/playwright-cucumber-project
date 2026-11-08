import { expect, Locator, Page } from '@playwright/test';
import { EMPLOYEE_DATA } from '../test-data/employee';
import { expectSuccessToast } from '../utils/expectations';

export class CreateNewEmployeePage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly employeeIdField: Locator;
  readonly saveButton: Locator;
  readonly successToast: Locator;
  readonly employeeSearchInput: Locator;
  readonly searchButton: Locator;
  readonly employeeTableRow: Locator;
  readonly personalDetails: Locator;
  readonly employeeTableResultRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdField = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label').filter({ hasText: 'Employee Id' }) })
      .first();
    this.employeeIdInput = this.employeeIdField.locator('input').first();
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successToast = page.locator('.oxd-toast.oxd-toast--success');
    this.employeeSearchInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input')
      .first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.employeeTableRow = page.locator('.oxd-table-body');
    this.personalDetails = page.getByText('Personal Details', { exact: true }).first();
    this.employeeTableResultRow = page.locator('.oxd-table-card, .oxd-table-row');
  }

  async openPim(): Promise<void> {
    await this.pimMenu.click();
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
  }

  async fillEmployeeDetails(data = EMPLOYEE_DATA): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.employeeIdInput.fill(data.employeeId);
  }

  async saveEmployee(): Promise<void> {
    await this.saveButton.click();
  }

  async expectEmployeeCreated(): Promise<void> {
    await expectSuccessToast(this.successToast, 'Saved');
    await expect(this.personalDetails).toBeVisible({ timeout: 10000 });
    await expect(this.firstNameInput).toHaveValue(EMPLOYEE_DATA.firstName, { timeout: 10000 });
    await expect(this.lastNameInput).toHaveValue(EMPLOYEE_DATA.lastName, { timeout: 10000 });
    await expect(this.employeeIdInput).toHaveValue(EMPLOYEE_DATA.employeeId, { timeout: 10000 });
  }

  async searchEmployeeById(): Promise<void> {
    await this.employeeSearchInput.fill(EMPLOYEE_DATA.employeeId);
    await this.searchButton.click();
  }

  async expectEmployeeFoundInResults(): Promise<void> {
    const employeeRow = this.employeeTableResultRow.filter({ hasText: EMPLOYEE_DATA.employeeId }).first();

    await expect(employeeRow).toBeVisible({ timeout: 15000 });
    await expect(employeeRow).toContainText(EMPLOYEE_DATA.employeeId, { timeout: 15000 });
    await expect(employeeRow).toContainText(EMPLOYEE_DATA.firstName, { timeout: 15000 });
    await expect(employeeRow).toContainText(EMPLOYEE_DATA.lastName, { timeout: 15000 });
  }

  async clickFoundEmployeeToViewTheDetails(): Promise<void> {
    const employeeRow = this.employeeTableResultRow.filter({ hasText: EMPLOYEE_DATA.employeeId }).first();
    await employeeRow.click();
  }
}
