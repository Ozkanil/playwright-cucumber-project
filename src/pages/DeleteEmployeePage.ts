import { expect, Locator, Page } from '@playwright/test';
import { EMPLOYEE_DATA } from '../test-data/employee';
import { expectSuccessToast } from '../utils/expectations';

export class DeleteEmployeePage {
  readonly page: Page;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = page.locator('button.oxd-icon-button.oxd-table-cell-action-space').filter({
      has: page.locator('i.bi-trash'),
    }).first();
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
    this.successToast = page.locator('.oxd-toast.oxd-toast--success');
  }

  async clickDeleteButton(): Promise<void> {
    const employeeRow = this.page
      .locator('.oxd-table-card, .oxd-table-row')
      .filter({ hasText: EMPLOYEE_DATA.employeeId })
      .first();

    await employeeRow.waitFor({ state: 'visible', timeout: 15000 });

    const deleteButton = employeeRow.locator('button:has(i.bi-trash)').first();
    await deleteButton.waitFor({ state: 'visible', timeout: 15000 });
    await deleteButton.click();
  }

  async confirmDelete(): Promise<void> {
    await this.confirmDeleteButton.click();
  }

  async expectEmployeeDeletedSuccessfully(): Promise<void> {
    await expectSuccessToast(this.successToast, 'Deleted');
  }
}
