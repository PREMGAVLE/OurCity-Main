import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';
test('select hostel members and clicking Add after login', async ({ page }) => {
  await loginForAuthOnly(page);

  await page.goto('http://localhost:5173/add-hostel-member-list');
  await expect(page.getByAltText('Headerimage')).toBeVisible();
  await expect(page.getByText('Cancel')).toBeVisible();
  await expect(page.getByText('Add')).toBeVisible();
  await expect(page.getByText('Recent Chats')).toBeVisible();

  const searchBox = page.getByPlaceholder('Search');
  await expect(searchBox).toBeVisible();

  const members = ['Jane Smith', 'John Doe', 'Ajay Tayde'];
  for (const name of members) {
    await searchBox.fill('');
    await searchBox.fill(name);
    await expect(page.getByText(name)).toBeVisible();
  }

  await searchBox.fill('');

  await page.getByText('Jane Smith').click();
  await page.getByText('John Doe').click();
  await page.getByText('Ajay Tayde').click();

  let selectedIcons = page.locator('img[src="/assets/circle 3.svg"]');
  await expect(selectedIcons).toHaveCount(3);

  const allText = page.getByText('All');
  await expect(allText).toBeVisible();

  await allText.click();
});
