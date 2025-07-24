import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test.use({
  permissions: ['camera', 'geolocation'],
  geolocation: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  locale: 'en-US',
  launchOptions: {
    args: [
      '--use-fake-device-for-media-stream',
      '--use-fake-ui-for-media-stream',
    ],
  },
});

test.beforeEach(async ({ page }) => {
  await test.step('Login and navigate to role selection page', async () => {
    await loginForAuthOnly(page);
    await page.goto('http://localhost:5173/role-selection');
    await page
      .getByRole('heading', { name: 'Select your Role to Proceed' })
      .click();
    await page.getByRole('button', { name: 'Admin' }).click();
  });

  await test.step('Fill hostel registration form', async () => {
    await page
      .getByRole('textbox', { name: 'Hostel Name' })
      .fill('(2nd floor) D.Y.P Hostel');
    await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
  });

  await test.step('Set hostel location using map and search', async () => {
    await page.getByRole('textbox', { name: 'Location' }).click();
    page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));
    await page.locator('img').nth(2).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('pune');
    await page.getByText('Pune, Pune District,').click();
    await page.getByRole('button', { name: 'Select' }).click();
  });

  await test.step('Select hostel type and verify media section', async () => {
    await page.getByText('Hostel Type').click();
    await page.getByRole('radio', { name: 'Boys' }).check();
    await expect(page.getByText('Media Upload')).toBeVisible();
    await expect(page.getByText('Add Hostel Photos')).toBeVisible();
  });

  await test.step('Click Continue and validate Add Hostel/Members view', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Add Hostel')).toBeVisible();
    await expect(page.getByText('Add Members')).toBeVisible();
  });

  await test.step('Add members John Doe and Jane Smith', async () => {
    await page.getByText('+').first().click();
    await page.getByText('John Doe').click();
    await page.getByText('Jane Smith').click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Verify registration success and proceed', async () => {
    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
    await expect(page.getByText('Hostel Registration Status')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Hostel Registered Successfully' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Proceed' }).click();
  });

  await test.step('Navigate to Hostel tab under Feature > Hostel Management', async () => {
    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
    await page.getByRole('switch').click(); // Possibly a toggle to enable something?
    await page.getByRole('tab', { name: 'Hostels' }).click();
    await expect(page.getByText('(2nd floor) D.Y.P Hostel')).toBeVisible();
  });

  await test.step('Enter Hostel Management module and switch to Student role', async () => {
    await page.getByRole('link', { name: 'Feature Feature' }).click();
    await page.getByRole('heading', { name: 'Hostel Management' }).click();
    await page.getByRole('button', { name: 'Student' }).click();
  });

  await test.step('Open registered hostel chat screen', async () => {
    const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
    await expect(hostelElement).toBeVisible();
    await hostelElement.click();
  });
});

test('Student can access Check-in and Check-out after Admin registers the hostel', async ({
  page,
}, testInfo) => {
  await test.step('Step 1: Click the + (Add) button on bottom action bar', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
  });

  await test.step('Step 2: Assert visibility of all modal options', async () => {
    await expect(page.getByRole('button', { name: 'Check-in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Check-out' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  });

  await test.step('Step 3: Click on the Check-in option', async () => {
    await page.getByRole('button', { name: 'Check-in' }).click();
  });

  await test.step('Step 4: Assert the Selfie Capture screen appears', async () => {
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
  });
});

test('Student Check-in - Capture Selfie and Retake', async ({ page }) => {
  await test.step('Click + (Add) button', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
  });

  await test.step('Select Check-in option', async () => {
    await page.getByRole('button', { name: 'Check-in' }).click();
  });

  await test.step('Click Capture Selfie button', async () => {
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
  });

  await test.step('Verify Save and Retake buttons are visible', async () => {
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retake' })).toBeVisible();
  });

  await test.step('Click Retake button', async () => {
    await page.getByRole('button', { name: 'Retake' }).click();
  });

  await test.step('Verify live camera view with Capture Selfie and Stop Camera buttons', async () => {
    await expect(
      page.getByRole('button', { name: 'Capture Selfie' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Stop Camera' })
    ).toBeVisible();
  });
});

test('Student Check-in - Stop Camera Without Capturing', async ({ page }) => {
  await test.step('Click + (Add) button on bottom action bar', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
  });

  await test.step('Click on Check-in option button', async () => {
    await page.getByRole('button', { name: 'Check-in' }).click();
  });

  await test.step('Capture Selfie button Visible', async () => {
    await expect(
      page.getByRole('button', { name: 'Capture Selfie' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Stop Camera' })
    ).toBeVisible();
  });

  await test.step('Click on Stop Camera without capturing selfie', async () => {
    await page.getByRole('button', { name: 'Stop Camera' }).click();
  });

  await test.step('Verify user is redirected to the chat screen without saving selfie', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
  });
});

//Check-IN

test('Student Check-in and validate selfie capture with fake camera', async ({
  page,
}) => {
  await test.step('Verify Profile Name heading is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
  });

  await test.step('Click the + (Add) button', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
  });

  await test.step('Click the Check-in button', async () => {
    await page.getByRole('button', { name: 'Check-in' }).click();
  });

  await test.step('Verify Selfie Capture heading is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
  });

  await test.step('Capture selfie and save', async () => {
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
  });

  await test.step('Verify returned to Profile Name heading', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
  });

  await test.step('Verify Resident Name text is visible', async () => {
    await expect(page.getByText('Resident Name')).toBeVisible();
  });

  await test.step("Step 8: Verify today's date is visible", async () => {
    const today = new Date();
    const dateText = today.toLocaleDateString('en-US');
    await expect(page.getByText(dateText)).toBeVisible();
  });
  await test.step('Verify Checkin Time is visible', async () => {
    //   const currentTime = new Date().toLocaleTimeString('en-US', {
    //     hour12: true,
    //     hour: 'numeric',
    //     minute: '2-digit',
    //     second: '2-digit',
    //   });
    //   console.log('Checking current time on UI:', currentTime);
    //   await expect(page.locator('text=' + currentTime.split(':')[0])).toBeVisible();
  });
});

//Check-out

test('Student Check-out - Capture Selfie and Save', async ({ page }) => {
  await test.step('Verify Profile Name heading is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
  });

  await test.step('Click + (Add) button on bottom action bar', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
  });

  await test.step('Click on Check-out button', async () => {
    await page.getByRole('button', { name: 'Check-out' }).click();
  });

  await test.step('Verify Selfie Capture screen is visible', async () => {
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
  });

  await test.step('lick Capture Selfie button', async () => {
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
  });

  await test.step('Click Save button after capturing selfie', async () => {
    await page.getByRole('button', { name: 'Save' }).click();
  });

  await test.step('Confirm checkout with Profile Name', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
    await expect(page.getByText('Resident Name')).toBeVisible();
  });

  await test.step("Step 8: Verify today's date is visible", async () => {
    const today = new Date();
    const dateText = today.toLocaleDateString('en-US');
    await expect(page.getByText(dateText)).toBeVisible();
  });

  // Optional future step: Verify time — left as TODO due to UI showing two time values
  // await test.step('TODO: Verify current time is displayed correctly', async () => {
  //   const currentTime = new Date().toLocaleTimeString('en-US', {
  //     hour12: true,
  //     hour: 'numeric',
  //     minute: '2-digit',
  //     second: '2-digit',
  //   });
  //   await expect(page.locator(`text=${currentTime.split(':')[0]}`)).toBeVisible();
  // });
});

// //test.describe.parallel('Student Tests (Parallel)', () => {
// test('Toggle ON test show All,Hostel Tabs Shows', async ({ page }) => {
//   await loginForAuthOnly(page);
//   await page.goto('http://localhost:5173/chats');
//   const toggle = page.getByRole('switch');

//   if ((await toggle.getAttribute('aria-checked')) === 'false') {
//     await toggle.click();
//   }

//   await expect(toggle).toHaveAttribute('aria-checked', 'true');
//   await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
//   await expect(page.getByRole('tab', { name: 'Hostels' })).toBeVisible();
//   await expect(page.getByText('No hostels found.')).toBeVisible();
// });

// test('Toggle OFF should show all chat tabs', async ({ page }) => {
//   await loginForAuthOnly(page);
//   await page.goto('http://localhost:5173/chats');

//   const toggle = page.getByRole('switch');

//   if ((await toggle.getAttribute('aria-checked')) === 'true') {
//     await toggle.click();
//   }

//   await expect(toggle).toHaveAttribute('aria-checked', 'false');

//   await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
//   await expect(page.getByRole('tab', { name: 'Hostels' })).toBeVisible();
//   await expect(page.getByRole('tab', { name: 'Group' })).toBeVisible();
//   await expect(page.getByRole('tab', { name: 'SplitMoney' })).toBeVisible();
// });

// test('Student Summary Reports', async () => {
//   const browser = await chromium.launch({
//     headless: false,
//     args: [
//       '--use-fake-device-for-media-stream',
//       '--use-fake-ui-for-media-stream',
//       '--use-fake-location-for-media-stream',
//     ],
//   });

//   const context = await browser.newContext({
//     permissions: ['camera', 'geolocation'],
//     geolocation: {
//       latitude: 18.5204,
//       longitude: 73.8567,
//     },
//     locale: 'en-US',
//   });

//   const page = await context.newPage();
//   await loginForAuthOnly(page);
//   await page.goto('http://localhost:5173/role-selection');
//   await page
//     .getByRole('heading', { name: 'Select your Role to Proceed' })
//     .click();
//   await page.getByRole('button', { name: 'Admin' }).click();

//   await page.getByRole('textbox', { name: 'Hostel Name' }).click();
//   await page
//     .getByRole('textbox', { name: 'Hostel Name' })
//     .fill('(2nd floor) D.Y.P Hostel');
//   await page.getByRole('textbox', { name: 'Address' }).click();
//   await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
//   await page.getByRole('textbox', { name: 'Location' }).click();
//   page.once('dialog', (dialog) => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.locator('img').nth(2).click();

//   await page.getByRole('textbox', { name: 'Search' }).click();

//   await page.getByRole('textbox', { name: 'Search' }).fill('pune');
//   await page.getByText('Pune, Pune District,').click();
//   await page.getByRole('button', { name: 'Select' }).click();
//   await page.getByText('Hostel Type').click();
//   await page.getByText('Hostel Type');

//   await page.getByRole('radio', { name: 'Boys' }).check();

//   await expect(page.getByText('Media Upload')).toBeVisible();
//   await expect(page.getByText('Add Hostel Photos')).toBeVisible();
//   //await page.getByText('Add Hostel Photos').click();

//   //await page.locator('input[type="file"]').setInputFiles('Vector (5).svg');

//   await page.getByRole('button', { name: 'Continue' }).click();

//   await expect(page.getByText('Add Hostel', { exact: true })).toBeVisible();
//   await expect(page.getByText('Add Members')).toBeVisible();
//   await expect(page.getByText('Hostel Incharge')).toBeVisible();
//   await page.getByText('+').first().click();
//   await page.getByRole('img', { name: 'Selection Icon' }).first().click();
//   await page.getByRole('textbox', { name: 'Search' }).click();
//   await page.getByRole('textbox', { name: 'Search' }).fill('Ajay');
//   await page.getByRole('img', { name: 'Selection Icon' }).click();
//   await page.getByRole('button', { name: 'Add' }).click();
//   await expect(page.getByText('John Doe')).toBeVisible();
//   await expect(page.getByText('Ajay Tayde')).toBeVisible();
//   await page.getByRole('button', { name: 'Continue' }).click();

//   await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
//   await expect(page.getByText('Hostel Registration Status')).toBeVisible();
//   await expect(page.getByRole('img', { name: 'Status Icon' })).toBeVisible();
//   await expect(
//     page.getByRole('heading', { name: 'Hostel Registered Successfully' })
//   ).toBeVisible();
//   await expect(page.getByText('Approved for (2nd floor) D.Y.')).toBeVisible();
//   await expect(page.getByRole('button', { name: 'Proceed' })).toBeVisible();
//   await page.getByRole('button', { name: 'Proceed' }).click();

//   await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
//   await page.getByRole('switch').click();
//   await page.getByRole('tab', { name: 'Hostels' }).click();
//   const element = page.getByText('(2nd floor) D.Y.P Hostel');
//   await expect(element).toBeVisible();
//   await page.getByRole('link', { name: 'Feature Feature' }).click();
//   await page.getByRole('heading', { name: 'Hostel Management' }).click();
//   await page.getByRole('button', { name: 'Student' }).click();

//   const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
//   await expect(hostelElement).toBeVisible();
//   await hostelElement.click();

//   await expect(
//     page.getByRole('heading', { name: 'Profile Name' })
//   ).toBeVisible();

//   // await expect(
//   //   page.getByRole('heading', { name: '(2nd floor) D.Y.P Hostel' })
//   // ).toBeVisible();

//   await page.getByRole('button', { name: 'plus' }).click();
//   await page.getByRole('button', { name: 'Check-in' }).click();
//   await expect(
//     page.getByRole('heading', { name: 'Selfie Capture' })
//   ).toBeVisible();

//   await page.getByRole('button', { name: 'Capture Selfie' }).click();

//   await page.getByRole('button', { name: 'Save' }).click();

//   await expect(
//     page.getByRole('heading', { name: 'Profile Name' })
//   ).toBeVisible();

//   await expect(page.getByText('Resident Name')).toBeVisible();

//   const today = new Date();
//   const dateText = `${today.getDate()}/${
//     today.getMonth() + 1
//   }/${today.getFullYear()}`;
//   console.log(dateText);

//   await page.getByRole('button', { name: 'Filters' }).click();
//   await page.getByRole('button', { name: 'CSV' }).click();

//   await expect(
//     page.getByRole('button', { name: 'Weekly Report Dropdown' })
//   ).toBeVisible();

//   await page.getByRole('button', { name: 'Weekly Report Dropdown' }).click();
//   await page.getByText('Monthly Report').click();
//   await page.getByRole('button', { name: 'Monthly Report Dropdown' }).click();
//   await page.getByText('Yearly Report').click();
//   await page.getByRole('button', { name: 'Yearly Report Dropdown' }).click();
//   await page.getByText('Weekly Report').click();

//   await expect(page.getByText('Checkin', { exact: true })).toBeVisible();
//   await expect(page.getByText('Checkout')).toBeVisible();
//   await expect(page.getByText('Missed Checkin')).toBeVisible();
//   await expect(page.getByText('Late Checkin')).toBeVisible();

//   //await expect(page.getByText('.CSV')).toBeVisible();

//   //await page.getByText('.CSV').click();

//   await expect(page.getByText('Resident Name')).toBeVisible();
// });
// //});
