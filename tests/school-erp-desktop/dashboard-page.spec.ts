import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../../utils/auth';

test.beforeEach(async ({ page }) => {
  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/school-dashboard');
});

test('Sidebar buttons are visible', async ({ page }) => {
  await test.step('Check "School Name" text in sidebar', async () => {
    await expect(page.getByText('School Name')).toBeVisible();
  });

  await test.step('Check "Dashboard" button is visible', async () => {
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
  });

  await test.step('Check "Admission" button is visible', async () => {
    await expect(page.getByRole('button', { name: 'Admission' })).toBeVisible();
  });

  await test.step('Check "Add Module" button is visible', async () => {
    await expect(
      page.getByRole('button', { name: 'Add Module' })
    ).toBeVisible();
  });
});

test('Sidebar navigation opens correct sections', async ({ page }) => {
  await test.step('Click Messages and check content', async () => {
    await page.getByRole('button', { name: 'Messages' }).click();
    await expect(page.getByText('School Name')).toBeVisible();
  });

  await test.step('Click Menu and check content', async () => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByText('Menu Content')).toBeVisible();
  });

  await test.step('Click User and check content', async () => {
    await page.getByRole('button', { name: 'User' }).click();
    await expect(page.getByText('User Profile')).toBeVisible();
  });

  await test.step('Click People and check content', async () => {
    await page.getByRole('button', { name: 'People' }).click();
    await expect(page.getByText('People Section')).toBeVisible();
  });
});

test('Dashboard cards display correct values and descriptions.', async ({
  page,
}) => {
  await test.step('Click Dashbord and check content', async () => {
    await page.getByRole('button', { name: 'Dashboard' }).click();
  });

  await test.step('Verify Applications card', async () => {
    await expect(page.getByText('Applications')).toBeVisible();
    await expect(page.getByText('50')).toBeVisible();
    await expect(page.getByText('35 selected, 15 pending')).toBeVisible();
  });

  await test.step('Verify Merit List card', async () => {
    await expect(page.getByText('Merit List')).toBeVisible();
    await expect(page.getByText('40')).toBeVisible();
    await expect(
      page.getByText('Students selected this session')
    ).toBeVisible();
  });

  await test.step('Verify Pending Payments card', async () => {
    await expect(page.getByText('Pending Payments')).toBeVisible();
    await expect(page.getByText('25')).toBeVisible();
    await expect(page.getByText('Fee installments pending')).toBeVisible();
  });

  await test.step('Verify RTE Students card', async () => {
    await expect(page.getByText('RTE Students')).toBeVisible();
    await expect(page.getByText('3', { exact: true })).toBeVisible();
    await expect(page.getByText('Right to Education Students')).toBeVisible();
  });

  await test.step('Check cards container visibility', async () => {
    const cardsContainer = page
      .locator('div')
      .filter({
        hasText:
          'Applications5035 selected, 15 pendingMerit List40Students selected this',
      })
      .nth(3);
    await expect(cardsContainer).toBeVisible();
  });
});

test('Admin School Dashboard Visible', async ({ page }) => {
  await test.step('Verify Admin profile displays correct text', async () => {
    await expect(page.getByText('Admin')).toBeVisible();
    await expect(page.getByText('SHS-School')).toBeVisible();
  });

  await test.step('Verify Admin profile image/icon is visible', async () => {
    const profileImg = page.locator('img[src="/assets/Vector.svg"]').nth(1); // zero-based index
    await expect(profileImg).toBeVisible();
  });
});

test('Active sidebar item highlights correctly', async ({ page }) => {
  const dashboardLink = page.locator('text=Dashboard');
  const admissionLink = page.locator('text=Admission');

  await test.step('Click Dashboard and verify it is highlighted', async () => {
    await dashboardLink.click();
    await expect(dashboardLink).toHaveClass(/bg-yellow-500/);
    await expect(dashboardLink).toHaveClass(/text-white/);
  });

  await test.step('Verify Admission is NOT highlighted', async () => {
    await expect(admissionLink).not.toHaveClass(/bg-yellow-500/);
    await expect(admissionLink).not.toHaveClass(/text-white/);
  });
});

test('Only one sidebar is highlighted after clicking', async ({
  page,
}) => {
  const dashboardLink = page.locator('text=Dashboard');
  const admissionLink = page.locator('text=Admission');

  const links = [
    { locator: dashboardLink, name: 'Dashboard' },
    { locator: admissionLink, name: 'Admission' },
  ];

  async function expectOnlyHighlighted(highlighted: typeof dashboardLink) {
    for (const link of links) {
      if (link.locator === highlighted) {
        await expect(link.locator).toHaveClass(/bg-yellow-500/);
        await expect(link.locator).toHaveClass(/text-white/);
      } else {
        await expect(link.locator).not.toHaveClass(/bg-yellow-500/);
        await expect(link.locator).not.toHaveClass(/text-white/);
      }
    }
  }

  await test.step('Click Dashboard and verify highlight', async () => {
    await dashboardLink.click();
    await expectOnlyHighlighted(dashboardLink);
  });

  await test.step('Click Admission and verify highlight', async () => {
    await admissionLink.click();
    await expectOnlyHighlighted(admissionLink);
  });
});

test('Admission :Top Bar tabs are visible and highlight each tab on click', async ({
  page,
}) => {
  await test.step('Click Admission button', async () => {
    await page.getByRole('button', { name: 'Admission' }).click();
  });

  const tabs = [
    page.getByRole('button', { name: 'Applications Applications' }),
    page.getByRole('button', { name: 'Merit List Merit List' }),
    page.getByRole('button', { name: 'Payment List Payment List' }),
  ];

  await test.step('Verify all tabs are visible', async () => {
    for (const tab of tabs) {
      await expect(tab).toBeVisible();
    }
  });

  for (const clickedTab of tabs) {
    await test.step('Click tab and verify highlight', async () => {
      await clickedTab.click();

      for (const tab of tabs) {
        if (tab === clickedTab) {
          await expect(tab).toHaveClass(/bg-yellow-500/);
        } else {
          await expect(tab).not.toHaveClass(/bg-yellow-500/);
        }
      }
    });
  }
});
