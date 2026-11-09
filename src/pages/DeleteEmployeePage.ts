import { expect, Locator, Page } from '@playwright/test';
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

  async clickDeleteButton(employeeId: string): Promise<void> {
    const employeeRow = this.page
      .locator('.oxd-table-card, .oxd-table-row')
      .filter({ hasText: employeeId })
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
