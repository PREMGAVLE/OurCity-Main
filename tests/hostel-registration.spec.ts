import { test, expect } from '@playwright/test';
import { loginAndSelectAdminRole } from '../utils/setup';

test('Admin - Fill hostel form and complete hostel registration flow', async ({
  page,
}) => {
  await test.step('Login and select Admin role', async () => {
    await loginAndSelectAdminRole(page, 'Admin');
  });

  await test.step('Fill hostel basic details', async () => {
    await page.getByRole('textbox', { name: 'Hostel Name' }).click();
    await page
      .getByRole('textbox', { name: 'Hostel Name' })
      .fill('D.Y.P Hostel');

    await page.getByRole('textbox', { name: 'Address' }).click();
    await page.getByRole('textbox', { name: 'Address' }).fill('Pune');

    await page.getByRole('textbox', { name: 'Location' }).click();
    page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));
    await page.locator('img').nth(2).click();
  });

  await test.step('Select location from search', async () => {
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('pune');
    await page.getByText('Pune, Pune District,').click();
    await page.getByRole('button', { name: 'Select' }).click();
  });

  await test.step('Choose hostel type', async () => {
    await page.getByText('Hostel Type').click();
    await page.getByRole('radio', { name: 'Boys' }).check();

    await expect(page.getByText('Media Upload')).toBeVisible();
    await expect(page.getByText('Add Hostel Photos')).toBeVisible();
  });

  await test.step('Proceed to Add Members section', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Add Hostel')).toBeVisible();
    await expect(page.getByText('Add Members')).toBeVisible();
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
  });

  await test.step('Add members to hostel', async () => {
    await page.getByText('+').first().click();
    await page.getByText('John Doe').click();
    await page.getByText('Jane Smith').click();
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Hostel Incharge')).toBeVisible();
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
  });

  await test.step('Complete registration and verify success', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
    await expect(page.getByText('Hostel Registration Status')).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Hostel Registered Successfully' })
    ).toBeVisible();
    await expect(page.getByText('Approved for (2nd floor) D.Y.')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Proceed' })).toBeVisible();
    await page.getByRole('button', { name: 'Proceed' }).click();
  });

  await test.step('Navigate to Chats and select hostel', async () => {
    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
    await page.getByRole('switch').click();
    await page.getByRole('tab', { name: 'Hostels' }).click();

    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });
});
