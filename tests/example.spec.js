// @ts-check
import { test, expect } from '@playwright/test';

test('testAddStoreButton', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle('DevOps Demo');

  await page.locator('css=input').fill('my store name');

  const addStoreBtn = page.getByRole('button', { name: 'Add' });
  await addStoreBtn.click();
  const storeTable = page.locator('css=table td:first-child');
  await expect(storeTable).toHaveText('my store name');
});
