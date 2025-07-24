import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test.describe('Proceed Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginForAuthOnly(page);
    await page.goto('http://localhost:5173/Proceed');
  });

  test('should show subheader title as Details', async ({ page }) => {
    await expect(page.getByTestId('subheader-title')).toHaveText('Details');
  });

  test('should show "Hostel Registration Status" text', async ({ page }) => {
    await expect(page.getByText('Hostel Registration Status')).toBeVisible();
  });

  test('should show proceed icon with correct src', async ({ page }) => {
    const icon = page.getByAltText('Proceed Icon');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('src', '/assets/proceed-icon.svg');
  });

  test('should display heading "Waiting for Approval"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Waiting for Approval' })
    ).toBeVisible();
  });

  test('should display approval info text', async ({ page }) => {
    await expect(
      page.getByText('Approved for (2nd floor) D.Y.P Hostel')
    ).toBeVisible();
  });

  test('should show enabled Proceed button', async ({ page }) => {
    const proceedButton = page.getByRole('button', { name: 'Proceed' });
    await expect(proceedButton).toBeVisible();
    await expect(proceedButton).toBeEnabled();
    // await proceedButton.click(); 
  });

  test('should show "Need Help ?" text', async ({ page }) => {
    await expect(page.getByText('Need Help ?')).toBeVisible();
  });
});
