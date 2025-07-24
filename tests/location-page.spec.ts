import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test('Location page,Seachbar,select Button', async ({ page }) => {
  await loginForAuthOnly(page);

  await page.goto('http://localhost:5173/location');

  const mapImage = page.getByAltText('Map');
  await expect(mapImage).toBeVisible();
  await expect(mapImage).toHaveAttribute('src', '/assets/map.svg');

  const searchInput = page.getByPlaceholder('Search');
  await expect(searchInput).toBeVisible();

  const PrimaryButton = page.getByRole('button', { name: 'Select' });
  await expect(PrimaryButton).toBeVisible();
  await expect(PrimaryButton).toBeEnabled();
});
