import { expect, Locator, Page } from '@playwright/test';
import { EMPLOYEE_DATA } from '../test-data/employee';
import { expectSuccessToast, expectInfoToast } from '../utils/expectations';

export class ViewEditEmployeeDetailsPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly employeeDetailsForm: Locator;
  readonly saveButton: Locator;
  readonly successToast: Locator;
  readonly infoToast: Locator;
  readonly editEmployeeButton: Locator;
  readonly maritalStatusField: Locator;
  readonly maritalStatusDropdown: Locator;
  readonly marriedOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label').filter({ hasText: 'Employee Id' }) })
      .locator('input')
      .first();
    this.employeeDetailsForm = page
      .locator('form')
      .filter({ has: page.getByText('Employee Full Name', { exact: true }) })
      .first();
    this.editEmployeeButton = page.locator('button.oxd-icon-button.oxd-table-cell-action-space').first();
    this.saveButton = this.employeeDetailsForm.getByRole('button', { name: 'Save' }).first();
    this.successToast = page.locator('.oxd-toast.oxd-toast--success');
    this.infoToast = page.locator('.oxd-toast.oxd-toast--info');
    this.maritalStatusField = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label').filter({ hasText: 'Marital Status' }) })
      .locator('.oxd-select-text-input')
      .first();
    this.maritalStatusDropdown = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label').filter({ hasText: 'Marital Status' }) })
      .locator('.oxd-select-text')
      .first();
    this.marriedOption = page.locator('.oxd-select-dropdown .oxd-select-option').filter({ hasText: 'Married' }).first();
  }

  async openMaritalStatusDropdown(): Promise<void> {
    await this.maritalStatusDropdown.click();
    await this.marriedOption.click();
  }

  async clickEditEmployeeButton(): Promise<void> {
    await this.editEmployeeButton.click();
  }

  async expectEmployeeDetailsDisplayed(): Promise<void> {
    await expect(this.firstNameInput).toHaveValue(EMPLOYEE_DATA.firstName, { timeout: 15000 });
    await expect(this.lastNameInput).toHaveValue(EMPLOYEE_DATA.lastName, { timeout: 15000 });
    await expect(this.employeeIdInput).toHaveValue(EMPLOYEE_DATA.employeeId, { timeout: 15000 });
  }

  async editAndSaveEmployeeDetails(): Promise<void> {
    const updatedFirstName = 'Jane';
    const updatedLastName = 'Smith';

    const editButtonVisible = await this.editEmployeeButton.isVisible().catch(() => false);

    if (editButtonVisible) {
      await this.clickEditEmployeeButton();
    }

    await this.firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.firstNameInput.fill(updatedFirstName);
    await this.lastNameInput.fill(updatedLastName);
    await this.openMaritalStatusDropdown();
    await this.saveButton.click();
  }

  async expectEmployeeDetailsUpdated(): Promise<void> {
    await expectSuccessToast(this.successToast, 'Updated');
    await expect(this.firstNameInput).toHaveValue('Jane', { timeout: 10000 });
    await expect(this.lastNameInput).toHaveValue('Smith', { timeout: 10000 });
    await expect(this.maritalStatusField).toContainText('Married', { timeout: 10000 });
  }

  async expectEmployeeDetailsNotFound(): Promise<void> {
    await expectInfoToast(this.infoToast);
  }
}
