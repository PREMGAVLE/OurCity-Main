import { test, expect } from '@playwright/test';

// This will run before each test
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('should show error if mobile number is empty', async ({ page }) => {
  await test.step('Click on Request OTP without entering a number', async () => {
    await page.getByRole('button', { name: 'Request OTP' }).click();
  });

  await test.step('Verify warning message is displayed', async () => {
    await expect(
      page.getByText(/Warning! Please enter a valid 10-digit mobile number./i)
    ).toBeVisible();
  });
});

test('should request OTP for valid mobile number', async ({ page }) => {
  await test.step('Fill in a valid 10-digit mobile number and click Request OTP', async () => {
    const input = page.getByRole('textbox', { name: 'Enter mobile number' });
    await input.fill('9187634562');
    await page.getByRole('button', { name: 'Request OTP' }).click();
  });

  await test.step('Verify OTP screen is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'OTP', exact: true })
    ).toBeVisible();
    await expect(page.getByText('OTP Verification')).toBeVisible();
  });
});

test('should show error for invalid mobile number format', async ({ page }) => {
  await test.step('Enter an invalid mobile number and click Request OTP', async () => {
    await page
      .getByRole('textbox', { name: 'Enter mobile number' })
      .fill('123');
    await page.getByRole('button', { name: 'Request OTP' }).click();
  });

  await test.step('Verify error message is shown for invalid input', async () => {
    await expect(
      page.getByText(/Warning! Please enter a valid 10-digit mobile number./i)
    ).toBeVisible();
  });
});

test('should show error for Non-numeric input format', async ({ page }) => {
  await test.step('Enter a non-numeric string and click Request OTP', async () => {
    await page
      .getByRole('textbox', { name: 'Enter mobile number' })
      .fill('ghgdgdfgg');
    await page.getByRole('button', { name: 'Request OTP' }).click();
  });

  await test.step('Verify error message is shown for non-numeric input', async () => {
    await expect(
      page.getByText(/Warning! Please enter a valid 10-digit mobile number./i)
    ).toBeVisible();
  });
});
