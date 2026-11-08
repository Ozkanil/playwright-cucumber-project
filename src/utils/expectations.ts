import { expect, Locator } from '@playwright/test';

export async function expectSuccessToast(locator: Locator, action: 'Saved' | 'Updated' = 'Saved'): Promise<void> {
  await expect(locator).toContainText(`Successfully ${action}`, { timeout: 10000 });
}
