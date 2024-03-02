// @ts-check
import { test, expect } from 'playwright-test-coverage';

test.beforeEach(async ({ page }) => {
  let serverStoreJson = [
    { name: 'nyc', date: '2031-05-20' },
    { name: 'san diego', date: '2032-10-31' },
  ];

  await page.route('*/**/api/store', async (route) => {
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: { store: serverStoreJson } });
  });

  await page.route('*/**/api/store/provo', async (route) => {
    expect(route.request().method()).toBe('POST');
    serverStoreJson = [
      ...serverStoreJson,
      { name: 'provo', date: '2021-10-31' },
    ];
    await route.fulfill({ json: { store: serverStoreJson } });
  });

  await page.goto('http://localhost:5173/');
});

test('addStoreButton', async ({ page }) => {
  await expect(page).toHaveTitle('DevOps Demo');

  await page.locator('css=input').fill('provo');

  const addStoreBtn = page.getByRole('button', { name: 'Add' });
  await addStoreBtn.click();
  await expect(page.getByRole('cell', { name: 'provo' })).toHaveText('provo');
});
