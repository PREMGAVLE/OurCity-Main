import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test.describe('QR Page UI Elements', () => {
  test.beforeEach(async ({ page }) => {
    await loginForAuthOnly(page);
    await page.goto('http://localhost:5173/qr-page');
  });

  test('should show success message', async ({ page }) => {
    await expect(
      page.getByText('Hostel Registered Successfully')
    ).toBeVisible();
  });

  test('should show QR code image', async ({ page }) => {
    const qrImage = page.getByRole('img', { name: 'QR code', exact: true });
    await expect(qrImage).toBeVisible();
  });

  test('should show enabled Download button', async ({ page }) => {
    const downloadButton = page.getByRole('button', { name: /Download/i });
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeEnabled();
  });

  test('should show enabled Regenerate button', async ({ page }) => {
    const regenerateButton = page.getByRole('button', { name: /Regenerate/i });
    await expect(regenerateButton).toBeVisible();
    await expect(regenerateButton).toBeEnabled();
  });

  test('should show enabled Proceed button', async ({ page }) => {
    const proceedButton = page.getByRole('button', { name: /procced/i });
    await expect(proceedButton).toBeVisible();
    await expect(proceedButton).toBeEnabled();
  });
});
