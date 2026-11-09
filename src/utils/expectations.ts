//Reusable assertion methods for toast messages.

import { expect, Locator } from '@playwright/test';

export async function expectSuccessToast(locator: Locator, action: 'Saved' | 'Updated' | 'Deleted' = 'Saved'): Promise<void> {
  await expect(locator).toContainText(`Successfully ${action}`, { timeout: 10000 });
}

export async function expectInfoToast(locator: Locator): Promise<void> {
  await expect(locator).toContainText('No Records Found', { timeout: 10000 });
}
