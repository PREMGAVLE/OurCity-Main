import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test.beforeEach(async ({ page }) => {
  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/role-selection');
  await page
    .getByRole('heading', { name: 'Select your Role to Proceed' })
    .click();
  await page.getByRole('button', { name: 'Admin' }).click();
  await expect(page).toHaveURL(/\/add-hostel/);
});

test('Should render /add-hostel (Add Hostel Form) properly after selecting Admin role', async ({
  page,
}) => {
  await expect(page.locator('span', { hasText: 'Add Hostel' })).toBeVisible();
  await expect(page.getByText('Hostel Details')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
});

test('Should show progress Stepper with Step 1 highlighted', async ({
  page,
}) => {
  const activeColor = 'rgb(97, 136, 137)';
  const inactiveColor = 'rgb(213, 213, 213)';
  const steps: [string, string][] = [
    ['1', activeColor],
    ['2', inactiveColor],
    ['3', inactiveColor],
  ];

  for (const [step, color] of steps) {
    await expect(
      page.locator(
        'div.flex.items-center.justify-center.rounded-full.text-white',
        { hasText: step }
      )
    ).toHaveCSS('background-color', color);
  }
});

test('Should validate empty Hostel Name', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Hostel Name' }).click();
  await page.getByRole('textbox', { name: 'Hostel Name' }).fill('');
  await page.getByRole('textbox', { name: 'Address' }).click();
  await expect(page.getByText('Hostel Name is required')).toBeVisible();
});

test('Should validate empty Address', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Address' }).click();
  await page.getByRole('textbox', { name: 'Address' }).fill('');
  await page.getByRole('textbox', { name: 'Location' }).click();
  await expect(page.getByText(/Address is required/i)).toBeVisible();
});

test('Should validate empty Location', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Location' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(
    page.getByText(/Please fill all required fields before continuing./i)
  ).toBeVisible();
});

test('Location - Should show location icon and input field', async ({
  page,
}) => {
  await expect(page.getByRole('textbox', { name: 'Location' })).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Select Location' })
  ).toBeVisible();
});

test('Should navigate to location page when location icon is clicked', async ({
  page,
}) => {
  await expect(
    page.getByRole('img', { name: 'Select Location' })
  ).toBeVisible();
  await page.getByRole('img', { name: 'Select Location' }).click();
  await expect(page).toHaveURL('http://localhost:5173/location');
});

test('Should navigate location page Should display search bar on location page, and select Button', async ({
  page,
}) => {
  await expect(
    page.getByRole('img', { name: 'Select Location' })
  ).toBeVisible();
  await test.step('Click on location icon to navigate to location page', async () => {
    await page.getByRole('img', { name: 'Select Location' }).click();
  });

  await test.step('Verify Search textbox is visible on location page', async () => {
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  });

  await test.step('Verify Search icon is visible', async () => {
    await expect(page.getByRole('img', { name: 'Search' })).toBeVisible();
  });

  await test.step('Verify Select button is visible', async () => {
    await expect(page.getByRole('button', { name: 'Select' })).toBeVisible();
  });
});

test('Should filter locations based on search input', async ({ page }) => {
  await test.step('Open location selection page', async () => {
    await page.getByRole('img', { name: 'Select Location' }).click();
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  });

  await test.step('Type "Pune" in the search input', async () => {
    await page.getByRole('textbox', { name: 'Search' }).fill('Pune');
  });

  await test.step('Verify filtered location list contains "Pune, Pune District,"', async () => {
    const locationItem = page.getByText('Pune, Pune District,');
    await expect(locationItem).toBeVisible();
  });
});

test('Should return to Add Hostel form with selected location', async ({
  page,
}) => {
  await test.step('Open location selection page', async () => {
    await page.getByRole('img', { name: 'Select Location' }).click();
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  });

  await test.step('Type "Pune" in the search input', async () => {
    await page.getByRole('textbox', { name: 'Search' }).fill('Pune');
    await expect(page.getByText('Pune, Pune District,')).toBeVisible();
  });

  await test.step('Select Pune location and confirm selection', async () => {
    await page.getByText('Pune, Pune District,').click();
    await page.getByRole('button', { name: 'Select' }).click();
  });

  await test.step('Verify navigation back to Add Hostel form with location selected', async () => {
    await expect(page).toHaveURL(/\/add-hostel/);

    await expect(page.getByRole('textbox', { name: 'Location' })).toHaveValue(
      'Pune, Pune District, Maharashtra, India'
    );
  });
});

test('Should validate gender label selection', async ({ page }) => {
  await test.step('Fill Hostel Name', async () => {
    await page
      .getByRole('textbox', { name: 'Hostel Name' })
      .fill('(2nd floor) D.Y.P Hostel');
  });

  await test.step('Fill Address', async () => {
    await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
  });

  await test.step('Select Location', async () => {
    await page.getByRole('textbox', { name: 'Location' }).click();

    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await page.locator('img').nth(2).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('pune');
    await page.getByText('Pune, Pune District,').click();
    await page.getByRole('button', { name: 'Select' }).click();
  });

  await test.step('Verify "Hostel Type" section is visible', async () => {
    await expect(page.getByText('Hostel Type')).toBeVisible();
  });

  await test.step('Try to Continue without selecting gender/type', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Verify error message for Hostel Type is shown', async () => {
    await expect(
      page.getByText(/Please select a Hostel Type\./i)
    ).toBeVisible();
  });
});
test('Should allow selecting one gender option only', async ({ page }) => {
  await test.step('Fill Hostel Name', async () => {
    await page.getByRole('textbox', { name: 'Hostel Name' }).fill('Hostel');
  });

  await test.step('Fill Address', async () => {
    await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
  });

  await test.step('Open Location field', async () => {
    await page.getByRole('textbox', { name: 'Location' }).click();
  });

  await test.step('Select Boys gender option', async () => {
    await page.getByLabel('Boys').check();
    await expect(page.getByLabel('Boys')).toBeChecked();
  });

  await test.step('Then select Girls gender option', async () => {
    await page.getByLabel('Girls').check();
    await expect(page.getByLabel('Girls')).toBeChecked();
  });

  await test.step('Boys should now be unchecked', async () => {
    await expect(page.getByLabel('Boys')).not.toBeChecked();
  });
});

test('Should not proceed with incomplete form', async ({ page }) => {
  await test.step('Fill in hostel name field', async () => {
    await page.getByRole('textbox', { name: 'Hostel Name' }).click();
    await page
      .getByRole('textbox', { name: 'Hostel Name' })
      .fill('D.Y.P.Hostel Pune');
  });
  await test.step('Click Continue/Next without filling location,addressa nd other filed', async () => {
    //await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    //await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
  });
  await test.step('Verify validation message is shown', async () => {
    await expect(
      page.getByText(/Please fill all required fields before continuing./i)
    ).toBeVisible();
  });
});

test('Filling all required fields , Should : proceed to add hostel member page', async ({
  page,
}) => {
  await test.step('Fill basic hostel details', async () => {
    await page.getByRole('textbox', { name: 'Hostel Name' }).click();
    await page
      .getByRole('textbox', { name: 'Hostel Name' })
      .fill('(2nd floor) D.Y.P Hostel');
    await page.getByRole('textbox', { name: 'Address' }).click();
    await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
  });

  await test.step('Handle map location and dialog', async () => {
    await page.getByRole('textbox', { name: 'Location' }).click();
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('img').nth(2).click();
  });

  await test.step('Search and select a location', async () => {
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('pune');
    await page.getByText('Pune, Pune District,').click();
    await page.getByRole('button', { name: 'Select' }).click();
  });

  await test.step('Select hostel type', async () => {
    await page.getByText('Hostel Type').click();
    await page.getByRole('radio', { name: 'Boys' }).check();
  });

  await test.step('Validate media upload section', async () => {
    await expect(page.getByText('Media Upload')).toBeVisible();
    await expect(page.getByText('Add Hostel Photos')).toBeVisible();
    // await page.getByText('Add Hostel Photos').click();
    // await page.locator('input[type="file"]').setInputFiles('Vector (5).svg');
  });

  await test.step('Continue to next form section', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
    //await page.getByRole('button', { name: 'Next' }).click();
  });

  await test.step('Clicking Continue/Next clicking navigates to add hostel member', async () => {
    await expect(page).toHaveURL('http://localhost:5173/add-hostel-member');
  });
});

test('Should navigate back to Role Selection page on Close button click', async ({
  page,
}) => {
  await expect(page.getByText('Hostel Details')).toBeVisible();

  await test.step('Wait for Close button to be visible', async () => {
    await expect(
      page.getByRole('button', { name: 'closeimage' })
    ).toBeVisible();
  });

  await test.step('Click Close button', async () => {
    await page.getByRole('button', { name: 'closeimage' }).click();
  });

  await test.step('Verify redirection to /role-selection page and correct heading', async () => {
    await expect(
      page.getByRole('heading', { name: /Select your Role to proceed/i })
    ).toBeVisible();
  });
});
