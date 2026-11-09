import { expect, Locator, Page } from '@playwright/test';
import { EmployeeData } from '../utils/employeeHelper';
import { expectSuccessToast, expectInfoToast } from '../utils/expectations';

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

  async fillEmployeeDetails(data: EmployeeData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.employeeIdInput.fill(data.employeeId);
  }

  async saveEmployee(): Promise<void> {
    await this.saveButton.click();
  }

  async expectEmployeeCreated(data: EmployeeData): Promise<void> {
    await expectSuccessToast(this.successToast, 'Saved');
    await expect(this.personalDetails).toBeVisible({ timeout: 10000 });
    await expect(this.firstNameInput).toHaveValue(data.firstName, { timeout: 10000 });
    await expect(this.lastNameInput).toHaveValue(data.lastName, { timeout: 10000 });
    await expect(this.employeeIdInput).toHaveValue(data.employeeId, { timeout: 10000 });
  }

  async searchEmployeeById(employeeId: string): Promise<void> {
    await this.employeeSearchInput.fill(employeeId);
    await this.searchButton.click();
  }

  async expectEmployeeFoundInResults(data: EmployeeData): Promise<void> {
    const employeeRow = this.employeeTableResultRow.filter({ hasText: data.employeeId }).first();

    await expect(employeeRow).toBeVisible({ timeout: 15000 });
    await expect(employeeRow).toContainText(data.employeeId, { timeout: 15000 });
    await expect(employeeRow).toContainText(data.firstName, { timeout: 15000 });
    await expect(employeeRow).toContainText(data.lastName, { timeout: 15000 });
  }

  async clickFoundEmployeeToViewTheDetails(employeeId: string): Promise<void> {
    const employeeRow = this.employeeTableResultRow.filter({ hasText: employeeId }).first();
    await employeeRow.click();
  }

  async expectNoEmployeeFound(): Promise<void> {
    const infoToast = this.page.locator('.oxd-toast.oxd-toast--info');
    await expectInfoToast(infoToast);
  }
}
