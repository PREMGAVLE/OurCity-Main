import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';
test('Approval page', async ({ page }) => {
  await loginForAuthOnly(page);

  await page.goto('http://localhost:5173/Approval');

  await expect(page.getByTestId('subheader-title')).toHaveText('Details');

  await expect(page.getByText('Hostel Registration Status')).toBeVisible();

  const approvalImg = page.getByAltText('Approval Icon');
  await expect(approvalImg).toBeVisible();
  await expect(approvalImg).toHaveAttribute('src', '/assets/approval-icon.svg');
  await expect(page.getByText('Approval')).toBeVisible();
  await expect(page.getByText(/Approved for.*D\.Y\.P Hostel/)).toBeVisible();

  const proceedButton = page.getByRole('button', { name: 'Proceed' });
  await expect(proceedButton).toBeVisible();
  await expect(proceedButton).toBeEnabled();
});
