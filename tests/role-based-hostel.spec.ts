import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test.describe.parallel('Role-based hostel flows', () => {
  test('Student can access Check-in and Check-out after Admin registers the hostel', async ({
    page,
  }) => {
    await loginForAuthOnly(page);

    await page.goto('http://localhost:5173/role-selection');
    await expect(
      page.getByRole('heading', { name: 'Select your Role to Proceed' })
    ).toBeVisible();

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

    await page.getByRole('radio', { name: 'Boys' }).check();

    await expect(page.getByText('Media Upload')).toBeVisible();
    await expect(page.getByText('Add Hostel Photos')).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Add Hostel', { exact: true })).toBeVisible();
    await expect(page.getByText('Add Members')).toBeVisible();
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
    await page.getByText('+').first().click();
    await page.getByRole('img', { name: 'Selection Icon' }).nth(1).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
    await expect(page.getByText('Hostel Registration Status')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Hostel Registered Successfully' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Proceed' }).click();

    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
    await page.getByRole('switch').click();
    await page.getByRole('tab', { name: 'Hostels' }).click();
    const element = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(element).toBeVisible();
    await element.click();

    await expect(page.getByText('Profile Name')).toBeVisible();

    await page.getByRole('button', { name: 'plus' }).click();

    await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
    //await page.getByRole('button', { name: 'Settings' }).click();

    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('img', { name: 'Back', exact: true }).click();
    await page.getByRole('link', { name: 'Feature Feature' }).click();
    await page.getByRole('heading', { name: 'Hostel Management' }).click();
    await page.getByRole('button', { name: 'Student' }).click();
    await page.getByText('(2nd floor) D.Y.P Hostel').click();
    await page.getByRole('button', { name: 'plus' }).click();

    await expect(page.getByRole('button', { name: 'Check-in' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Check-out' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
  });

  test('Parent cannot access Bottom Action Bar to add hostel interactions', async ({
    page,
  }) => {
    await loginForAuthOnly(page);

    await page.goto('http://localhost:5173/role-selection');
    await expect(
      page.getByRole('heading', { name: 'Select your Role to Proceed' })
    ).toBeVisible();

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

    await page.getByRole('radio', { name: 'Boys' }).check();

    await expect(page.getByText('Media Upload')).toBeVisible();
    await expect(page.getByText('Add Hostel Photos')).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Add Hostel', { exact: true })).toBeVisible();
    await expect(page.getByText('Add Members')).toBeVisible();
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
    await page.getByText('+').first().click();
    await page.getByRole('img', { name: 'Selection Icon' }).nth(1).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
    await expect(page.getByText('Hostel Registration Status')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Hostel Registered Successfully' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Proceed' }).click();

    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
    await page.getByRole('switch').click();
    await page.getByRole('tab', { name: 'Hostels' }).click();
    const element = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(element).toBeVisible();
    await element.click();

    await expect(page.getByText('Profile Name')).toBeVisible();

    await page.getByRole('button', { name: 'plus' }).click();

    await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
    //await page.getByRole('button', { name: 'Settings' }).click();

    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('img', { name: 'Back', exact: true }).click();
    await page.getByRole('link', { name: 'Feature Feature' }).click();
    await page.getByRole('heading', { name: 'Hostel Management' }).click();
    await page.getByRole('button', { name: 'Parent' }).click();
    await page.getByRole('switch').click();
    await page.getByRole('tab', { name: 'Hostels' }).click();
    await page.getByText('(2nd floor) D.Y.P Hostel').click();
    await expect(page.getByRole('button', { name: 'plus' })).toBeDisabled();
  });
});
