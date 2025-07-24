// utils/setup.ts

import { Page } from '@playwright/test';
import { loginForAuthOnly } from './auth';

export async function loginAndSelectAdminRole(
  page: Page,
  role: string = 'Admin'
) {
  await loginForAuthOnly(page);

  await page.goto('http://localhost:5173/role-selection');

  await page
    .getByRole('heading', { name: 'Select your Role to Proceed' })
    .click();
  await page.getByRole('button', { name: role }).click();
}
