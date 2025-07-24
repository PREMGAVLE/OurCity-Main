import { test, expect } from '@playwright/test';
import { loginAndSelectAdminRole } from '../utils/setup';
import { fillHostelRegistrationForm } from '../utils/hostel';

test.beforeEach(async ({ page }) => {
  await loginAndSelectAdminRole(page); // Step 1: login + Admin
  await fillHostelRegistrationForm(page); // Step 2: fill and submit form
});

test('Check Chat screen after hostel registration', async ({ page }) => {
  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
  await page.getByRole('switch').click();
  await page.getByRole('tab', { name: 'Hostels' }).click();

  const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(hostelElement).toBeVisible();
  await hostelElement.click();
});

test('Should select a hostel and navigate to its chat screen', async ({
  page,
}) => {
  await test.step('Click on a hostel item from the list', async () => {
    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });

  await test.step('Verify chat screen elements', async () => {
    await expect(page.getByText('Profile Name')).toBeVisible();
    await expect(
      page.getByText(/Welcome to the .*D\.Y\.P Hostel Group/i)
    ).toBeVisible();
  });
});

test('Action Toolbar - Open, use User & CSV, then Close', async ({ page }) => {
  await test.step('Click on a hostel item from the list', async () => {
    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });
  await test.step('Open Filters toolbar', async () => {
    const filtersButton = page.getByRole('button', { name: 'Filters' });
    await expect(filtersButton).toBeVisible();
    await filtersButton.click();
  });

  await test.step('Click on User button', async () => {
    const userButton = page.getByRole('button', { name: 'User' });
    await expect(userButton).toBeVisible();
    await userButton.click();
  });

  await test.step('Click on CSV button', async () => {
    const csvButton = page.getByRole('button', { name: 'CSV' });
    await expect(csvButton).toBeVisible();
    await csvButton.click();
  });

  await test.step('Verify Checkin/Checkout cards are visible', async () => {
    await expect(page.getByText('Checkin', { exact: true })).toBeVisible();
    await expect(page.getByText('Checkout')).toBeVisible();
  });

  await test.step('Close the toolbar', async () => {
    const closeButton = page.getByRole('button', { name: 'Close' });
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(page.getByRole('button', { name: 'Filters' })).toBeVisible();
  });
});

test('Admin – Import CSV Files from Bottom Action Bar', async ({ page }) => {
  await test.step('Navigate to hostel and open chat screen', async () => {
    const hostel = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostel).toBeVisible();
    await hostel.click();

    await expect(page.getByText('Profile Name')).toBeVisible();
  });

  await test.step('Open Bottom Action Bar', async () => {
    const plusButton = page.getByRole('button', { name: 'plus' });
    await expect(plusButton).toBeVisible();
    await plusButton.click();
  });

  await test.step('Tap File/Upload import icon', async () => {
    const settingsButton = page.getByRole('button', { name: 'Settings' }); // upload icon
    await expect(settingsButton).toBeVisible();
    await settingsButton.click();
  });

  await test.step('Select and upload CSV file from files folder', async () => {
    await test.step('Verify import success', async () => {
      await expect(page.getByText(/import successful/i)).toBeVisible();
    });
  });
});

test('Admin Navigates Back from Chat Box to Chats Page', async ({ page }) => {
  await test.step('Select a hostel from Chats screen', async () => {
    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });

  await test.step('Verify chat box screen loads', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
  });

  await test.step('Click the Back arrow to navigate back', async () => {
    const backButton = page.getByRole('img', { name: 'Back', exact: true });
    await expect(backButton).toBeVisible();
    await backButton.click();
  });

  await test.step('Verify navigation back to Chats page', async () => {
    await expect(page).toHaveURL(/chats/i);
    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
  });
});

test('Summary Report – Report Type Dropdown Functionality', async ({
  page,
}) => {
  await test.step('Select a hostel from Chats screen', async () => {
    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });

  await test.step('Open Filters and CSV options', async () => {
    await page.getByRole('button', { name: 'Filters' }).click();
    await page.getByRole('button', { name: 'CSV' }).click();
  });

  await test.step('Verify dropdown is visible with label Daily Report', async () => {
    const dropdown = page.getByRole('button', {
      name: 'Daily Report Dropdown',
    });
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toHaveText('Daily Report');
  });

  await test.step('Click dropdown to expand options', async () => {
    await page.getByRole('button', { name: 'Daily Report Dropdown' }).click();
  });

  await test.step('Verify all dropdown options are visible', async () => {
    await expect(page.getByText('Daily Report')).toBeVisible();
    await expect(page.getByText('Weekly Report')).toBeVisible();
    await expect(page.getByText('Monthly Report')).toBeVisible();
  });
});

test('Summary Report – Download CSV ', async ({ page }) => {
  await test.step('Select a hostel from Chats screen', async () => {
    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });
  await test.step('Click Filters and CSV buttons to open action toolbar', async () => {
    await page.getByRole('button', { name: 'Filters' }).click();
    await page.getByRole('button', { name: 'CSV' }).click();
  });

  await test.step('Verify Weekly Report dropdown is visible', async () => {
    await expect(
      page.getByRole('button', { name: 'Weekly Report Dropdown' })
    ).toBeVisible();
  });

  await test.step('Change report to Monthly Report', async () => {
    await page.getByRole('button', { name: 'Weekly Report Dropdown' }).click();
    await page.getByText('Monthly Report').click();
  });

  await test.step('Verify .CSV export option is visible and click it', async () => {
    await expect(page.getByText('.CSV')).toBeVisible();
    await page.getByText('.CSV').click();
  });
});
