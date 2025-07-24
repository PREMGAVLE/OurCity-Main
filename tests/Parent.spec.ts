//TO DO Mrunali Currently In-Progress  parent

import { test, expect, Page } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test('Tabs should switch correctly when toggle is OFF', async ({ page }) => {
  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/chats');

  const toggle = page.getByRole('switch');
  if ((await toggle.getAttribute('aria-checked')) === 'true') {
    await toggle.click();
  }

  await expect(toggle).toHaveAttribute('aria-checked', 'false');

  const tabNames = ['All', 'Hostels', 'Group', 'SplitMoney'];

  for (const tabName of tabNames) {
    const tab = page.getByRole('tab', { name: tabName });
    await expect(tab).toBeVisible();

    await tab.click();

    await expect(tab).toHaveAttribute('aria-selected', 'true');

    if (tabName === 'Group') {
      await expect(page.getByText('Aarav Deshmukh')).toBeVisible();
      //await expect(page.getByText('(2nd floor) D.Y.P Hostel')).toBeVisible();
    }
  }
});

test('Parent shold sees student data ', async ({ page }) => {
  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/role-selection');
  await page
    .getByRole('heading', { name: 'Select your Role to Proceed' })
    .click();
  await page.getByRole('button', { name: 'Admin' }).click();

  await page.getByRole('textbox', { name: 'Hostel Name' }).click();
  await page
    .getByRole('textbox', { name: 'Hostel Name' })
    .fill('(2nd floor) D.Y.P Hostel');
  await page.getByRole('textbox', { name: 'Address' }).click();
  await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
  await page.getByRole('textbox', { name: 'Location' }).click();
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('img').nth(2).click();

  await page.getByRole('textbox', { name: 'Search' }).click();

  await page.getByRole('textbox', { name: 'Search' }).fill('pune');
  await page.getByText('Pune, Pune District,').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByText('Hostel Type').click();
  await page.getByText('Hostel Type');

  await page.getByRole('radio', { name: 'Boys' }).check();

  await expect(page.getByText('Media Upload')).toBeVisible();
  await expect(page.getByText('Add Hostel Photos')).toBeVisible();
  //await page.getByText('Add Hostel Photos').click();

  //await page.locator('input[type="file"]').setInputFiles('Vector (5).svg');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Add Hostel', { exact: true })).toBeVisible();
  await expect(page.getByText('Add Members')).toBeVisible();
  await expect(page.getByText('Hostel Incharge')).toBeVisible();
  await page.getByText('+').first().click();
  await page.getByRole('img', { name: 'Selection Icon' }).first().click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Ajay');
  await page.getByRole('img', { name: 'Selection Icon' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText('John Doe')).toBeVisible();
  await expect(page.getByText('Ajay Tayde')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
  await expect(page.getByText('Hostel Registration Status')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Status Icon' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Hostel Registered Successfully' })
  ).toBeVisible();
  await expect(page.getByText('Approved for (2nd floor) D.Y.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Proceed' })).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
  await page.getByRole('tab', { name: 'Hostels' }).click();
  const element = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(element).toBeVisible();

  await page.getByRole('link', { name: 'Feature Feature' }).click();
  await page.getByRole('heading', { name: 'Hostel Management' }).click();
  await page.getByRole('button', { name: 'Parent' }).click();
  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
  await page.getByRole('tab', { name: 'Hostels' }).click();

  const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(hostelElement).toBeVisible();
  await hostelElement.click();

  await expect(
    page.getByRole('heading', { name: 'Profile Name' })
  ).toBeVisible();
});
