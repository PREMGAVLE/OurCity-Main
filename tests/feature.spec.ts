import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

//test.describe('Features Page', () => {
test.beforeEach(async ({ page }) => {
  await test.step('Login and navigate to Features page', async () => {
    await loginForAuthOnly(page);
    await page.goto('http://localhost:5173/feature');
  });
});

test('Should render Features screen correctly and at header Feature Text visible', async ({
  page,
}) => {
  await test.step('Verify "Feature" text is visible in header', async () => {
    await expect(page.locator('span', { hasText: 'Feature' })).toBeVisible();
  });
});

test('Verify search textbox and search icon are visible', async ({ page }) => {
  await test.step('Verify search textbox is visible', async () => {
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  });
  await test.step('Verify search icon is visible', async () => {
    await expect(page.getByRole('img', { name: 'Search' })).toBeVisible();
  });
});

test('should display dropdown for category', async ({ page }) => {
  await test.step('Click  dropdown Icon', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();
  });

  await test.step('Verify all dropdown options are visible', async () => {
    await expect(
      page.getByRole('menuitem', { name: 'Education' })
    ).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Automobile Management' })
    ).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Visitor Management' })
    ).toBeVisible();
  });
});

test('Should show feature card title and image for hostel management', async ({
  page,
}) => {
  await test.step('Verify title and image for "Hostel Management" card are visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'Hostel Management' })
    ).toBeVisible();

    await expect(
      page.getByRole('img', { name: 'Hostel Management' })
    ).toBeVisible();
  });
});

test('Should render feature card(s) when selecting "Visitor Management" feature card is shown ', async ({
  page,
}) => {
  await test.step('Open dropdown and select "Visitor Management"', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();

    await expect(
      page.getByRole('menuitem', { name: 'Visitor Management' })
    ).toBeVisible();
    await page.getByRole('menuitem', { name: 'Visitor Management' }).click();
  });
  await test.step('Verify "Visitor Management" card is shown', async () => {
    await expect(
      page.getByRole('heading', { name: 'Visitor Management' })
    ).toBeVisible();

    await expect(
      page.getByRole('img', { name: 'Visitor Management' })
    ).toBeVisible();
  });
});

test('Should show feature cards based on search input', async ({ page }) => {
  await test.step('Enter "hostel" in search and click search', async () => {
    const searchInput = page.getByRole('textbox', { name: 'Search' });
    await searchInput.click();
    await searchInput.fill('hostel');

    const searchButton = page.getByRole('img', { name: 'Search' });
    await searchButton.click();
  });

  await test.step('Verify "Hostel Management" card appears as search result', async () => {
    await page.waitForSelector('text=Hostel Management', { timeout: 5000 });

    const hostelCard = page.getByText('Hostel Management');
    await expect(hostelCard).toBeVisible();
  });
});

test('should show no results when search has no match', async ({ page }) => {
  await test.step('Search for invalid term "xyzzy"', async () => {
    const searchInput = page.getByRole('textbox', { name: 'Search' });
    await searchInput.click();
    await searchInput.fill('xyzzy');

    const searchButton = page.getByRole('img', { name: 'Search' });
    await searchButton.click();
  });
  await test.step('Verify "no results found" message is displayed', async () => {
    await expect(page.getByText(/no results found/i)).toBeVisible();
//     await expect(
//   page.getByRole('heading', { name: 'Visitor Management' })
// ).not.toBeVisible();
  });
});

test('Should show features when a different category is selected', async ({
  page,
}) => {
  await test.step('Select "Automobile Management" from dropdown', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();
    await page.getByRole('menuitem', { name: 'Automobile Management' }).click();
  });

  await test.step('Verify "Automobile Management" card is displayed', async () => {
    await expect(
      page.getByRole('heading', { name: 'Automobile Management' })
    ).toBeVisible();
    await expect(
      page.getByRole('img', { name: 'Automobile Management' })
    ).toBeVisible();
  });
});

test('Should return original Education cards', async ({ page }) => {
  await test.step('Select "Education" from dropdown', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();
    await page.getByRole('menuitem', { name: 'Education' }).click();
  });

  await test.step('Verify "Hostel Management,Attendance" card is displayed', async () => {
    await expect(
      page.getByRole('heading', { name: 'Hostel Management' })
    ).toBeVisible();
    await expect(
      page.getByRole('img', { name: 'Hostel Management' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Attendance' })
    ).toBeVisible();
  });
});

test('Should navigate to correct feature screen on card click', async ({
  page,
}) => {
  await test.step('Select "Education" from dropdown', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();
    await page.getByRole('menuitem', { name: 'Education' }).click();
  });

  await test.step('Click Hostel Management and verify navigation to /role-selection', async () => {
    const hostelHeading = page.getByRole('heading', {
      name: 'Hostel Management',
    });
    await expect(hostelHeading).toBeVisible();
    await hostelHeading.click();
    await expect(page).toHaveURL('http://localhost:5173/role-selection');
  });

  await test.step('Verify "Select your Role to Proceed" text is visible,Student role button is visible', async () => {
    await expect(
      page.locator('text=Select your Role to Proceed')
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Student' })).toBeVisible();
  });
});

test('Should highlight Feature tab as active', async ({ page }) => {
  await test.step('Click on Feature tab', async () => {
    const featureTab = page.getByRole('link', { name: 'Feature Feature' });
    await featureTab.click();
    await expect(featureTab).toHaveAttribute('aria-current', 'page');
  });

  await test.step('Verify other tabs are NOT active', async () => {
    const chatsTab = page.getByRole('link', { name: 'Chats Chat' });

    // It should NOT have aria-current='page'
    await expect(chatsTab).not.toHaveAttribute('aria-current', 'page');
  });
});

//ToDo- Mrunali
test('Bottom Navigation Bar Should navigate to Feature,Chats, People, Calls, Profile', async ({
  page,
}) => {
  await test.step('Navigate to Feature tab', async () => {
    await page.getByRole('link', { name: 'Feature' }).click();
    await expect(page.locator('span', { hasText: 'Feature' })).toBeVisible();
  });

  await test.step('Navigate to Chats tab', async () => {
    await page.getByRole('link', { name: 'Chats' }).click();
    await expect(page.locator('span', { hasText: 'Chat' })).toBeVisible();
  });

  await test.step('Navigate to People tab', async () => {
    await page.getByRole('link', { name: 'People' }).click();
    //await expect(page.locator('span', { hasText: 'People' })).toBeVisible();
  });

  await test.step('Navigate to Calls tab', async () => {
    await page.getByRole('link', { name: /Calls/ }).click();
    //await expect(page.locator('span', { hasText: 'Call' })).toBeVisible();
  });

  await test.step('Navigate to Profile tab', async () => {
    await page.getByRole('link', { name: 'Profile' }).click();
    //await expect(page.locator('span', { hasText: 'Profile' })).toBeVisible();
  });
});

test('Should handle category/option selected but no features returned', async ({
  page,
}) => {
  await test.step('Select Visitor Management category', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();

    await expect(
      page.getByRole('menuitem', { name: 'Visitor Management' })
    ).toBeVisible();
    await page.getByRole('menuitem', { name: 'Visitor Management' }).click();
  });

  await test.step('Expect "No features available" message to appear', async () => {
    await expect(page.getByText(/no features available/i)).toBeVisible();
  });
});

test('Should persist selected feature when navigating back from role selection for hostel management', async ({
  page,
}) => {
  await test.step('Click Hostel Management and verify navigation to /role-selection', async () => {
    await page.getByRole('heading', { name: 'Hostel Management' }).click();
    await expect(page).toHaveURL('http://localhost:5173/role-selection');
  });

  await test.step('clicking the back arrow should return to the Feature screen with Education Dropdown still selected.', async () => {
    const backArrow = page.getByRole('img', { name: 'back arrow' });

    if (await backArrow.isVisible()) {
      await backArrow.click();
    }

    await expect(
      page.getByRole('button', { name: 'Education Dropdown' })
    ).toBeVisible();
  });
});

//todo mrunali
test('Should persist selected feature when navigating back from role selection', async ({
  page,
}) => {
  await test.step('Click Automobile  Management and verify navigation to /role-selection', async () => {
    await page.getByRole('button', { name: 'Education Dropdown' }).click();
    await page.getByRole('menuitem', { name: 'Automobile Management' }).click();
    // await page.getByRole('heading', { name: 'Automobiile Management' }).click();

    await page.getByRole('heading', { name: 'Visitor Management' }).click();
    await expect(page).toHaveURL('http://localhost:5173/role-selection');
  });

  await test.step('clicking the back arrow should return to the Feature screen with Automobile Management Dropdown still selected.', async () => {
    const backArrow = page.getByRole('img', { name: 'back arrow' });

    if (await backArrow.isVisible()) {
      await backArrow.click();
    }

    await expect(
      page.getByRole('button', { name: 'Automobile Management Dropdown' })
    ).toBeVisible();
  });
});
//});
