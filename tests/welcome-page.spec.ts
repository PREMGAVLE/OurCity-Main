import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test('Welcome page', async ({ page }) => {
  await loginForAuthOnly(page);

  await page.goto('http://localhost:5173/Welcome');

  const image = page.getByAltText('Welcome Image');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute(
    'src',
    'assets/welcomescreen-statusbar.svg'
  );

  await expect(page.getByText('IamPlus')).toBeVisible();

  await expect(
    page.getByText('Experience seamless communication')
  ).toBeVisible();

  const leftArrow = page.getByAltText('Left Arrow');
  await expect(leftArrow).toBeVisible();

  const rightArrow = page.getByAltText('Right Arrow');
  await expect(rightArrow).toBeVisible();

  await leftArrow.click();
  await rightArrow.click();
});
