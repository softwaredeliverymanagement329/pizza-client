// @ts-check
import { test, expect } from '@playwright/test';

test('testAddStoreButton', async ({ page }) => {
  const serverStoreJson = [
    { name: 'nyc', date: '2028-01-01' },
    { name: 'san diego', date: '2032-10-31' },
  ];

  await page.route('*/**/api/store', async (route) => {
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ store: serverStoreJson });
  });

  await page.route('*/**/api/store/provo', async (route) => {
    expect(route.request().method()).toBe('POST');
    const json = [
      { name: 'nyc', date: '2028-01-01' },
      { name: 'san diego', date: '2032-10-31' },
    ];
    await route.fulfill({ json });
  });

  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle('DevOps Demo');

  await page.locator('css=input').fill('provo');

  const addStoreBtn = page.getByRole('button', { name: 'Add' });
  await addStoreBtn.click();
  const storeTable = page.locator('css=table td:first-child');
  await expect(storeTable).toHaveText('provo');
});
