import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test('Student List Graph', async ({ page }) => {
  await loginForAuthOnly(page);

  await page.goto('http://localhost:5173/student-list-graph');

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Dropdown' }).click();
  await page.getByText('Weekly Report').click();

  await expect(page.getByText('Checkin', { exact: true })).toBeVisible();
  await expect(page.getByText('Checkout', { exact: true })).toBeVisible();
  await expect(page.getByText('Missed Checkin', { exact: true })).toBeVisible();
  await expect(page.getByText('Late Checkin', { exact: true })).toBeVisible();

  await expect(page.getByText('.CSV')).toBeVisible();
  await page.getByRole('heading', { name: 'Summary' }).click();
});


