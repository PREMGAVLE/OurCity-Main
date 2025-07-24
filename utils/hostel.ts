import { Page, expect } from '@playwright/test';

export async function fillHostelRegistrationForm(page: Page) {
  // Step 1: Fill hostel details
  await page
    .getByRole('textbox', { name: 'Hostel Name' })
    .fill('(2nd floor) D.Y.P Hostel');
  await page.getByRole('textbox', { name: 'Address' }).fill('Pune');

  // Step 2: Select location
  await page.getByRole('textbox', { name: 'Location' }).click();
  page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));
  await page.locator('img').nth(2).click();

  await page.getByRole('textbox', { name: 'Search' }).fill('pune');
  await page.getByText('Pune, Pune District,').click();
  await page.getByRole('button', { name: 'Select' }).click();

  // Step 3: Select hostel type
  await page.getByText('Hostel Type').click();
  await page.getByRole('radio', { name: 'Boys' }).check();

  // Step 4: Media upload section
  await expect(page.getByText('Media Upload')).toBeVisible();
  await expect(page.getByText('Add Hostel Photos')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 5: Add members
  await expect(page.getByText('Add Hostel')).toBeVisible();
  await expect(page.getByText('Add Members')).toBeVisible();
  await page.getByText('+').first().click();
  await page.getByText('John Doe').click();
  await page.getByText('Jane Smith').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 6: registration sucessfull
  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
  await expect(page.getByText('Hostel Registration Status')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Hostel Registered Successfully' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();

  await expect(page.getByRole('tab', { name: 'Hostels' })).toBeVisible();
  await page.getByRole('tab', { name: 'Hostels' }).click();

  const element = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(element).toBeVisible();
}
