import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';
/* //checkin
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

// Inject fake time: 8:00 AM
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    const fixedDate = new Date('2025-05-30T08:00:00');

    class FakeDate extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(fixedDate.getTime());
        } else {
          // @ts-expect-error
          super(...args);
        }
      }
      static now() {
        return fixedDate.getTime();
      }
    }

    // @ts-ignore
    window.Date = FakeDate;
  });
});

test.beforeEach(async ({ page }) => {
  await test.step('Login and navigate to role selection page', async () => {
    await loginForAuthOnly(page);
    await page.goto('http://localhost:5173/role-selection');
    await page.getByRole('button', { name: 'Admin' }).click();
  });

  await test.step('Fill hostel registration form', async () => {
    await page
      .getByRole('textbox', { name: 'Hostel Name' })
      .fill('(2nd floor) D.Y.P Hostel');
    await page.getByRole('textbox', { name: 'Address' }).fill('Pune');
  });

  await test.step('Set hostel location', async () => {
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
    await page.getByRole('switch').click();
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

test('Single Student - Always On-Time Check-in', async ({ page }) => {
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

  await test.step('Verify check-in time and date are shown correctly', async () => {
    const timeRow = page.locator('text=Time').first().locator('..');
    const dateRow = page.locator('text=Date').nth(1).locator('..');

    await expect(timeRow).toContainText(/8:00(:00)?\s*AM/);
    await expect(dateRow).toContainText('5/30/2025');
  });

 
});
*/

//test for ON TIME  checkin chdckout

/* 
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

// Helper to inject FakeDate for a given fixed time
async function injectFakeTime(context, fixedDateStr) {
  await context.addInitScript(() => {
    const fixedDate = new Date('2025-05-30T08:00:00');

    class FakeDate extends Date {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(fixedDate.getTime());
        } else {
          super(...(args as ConstructorParameters<typeof Date>));
        }
      }
      static now() {
        return fixedDate.getTime();
      }
    }

    // @ts-ignore
    window.Date = FakeDate;
  });
}

test.beforeEach(async ({ context, page }) => {
  // Inject 8:00 AM fake time for initial load
  await injectFakeTime(context, '2025-05-30T08:00:00');

  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/role-selection');
  await page.getByRole('button', { name: 'Admin' }).click();

  await page
    .getByRole('textbox', { name: 'Hostel Name' })
    .fill('(2nd floor) D.Y.P Hostel');
  await page.getByRole('textbox', { name: 'Address' }).fill('Pune');

  await page.getByRole('textbox', { name: 'Location' }).click();
  page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));
  await page.locator('img').nth(2).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('pune');
  await page.getByText('Pune, Pune District,').click();
  await page.getByRole('button', { name: 'Select' }).click();

  await page.getByText('Hostel Type').click();
  await page.getByRole('radio', { name: 'Boys' }).check();
  await expect(page.getByText('Media Upload')).toBeVisible();
  await expect(page.getByText('Add Hostel Photos')).toBeVisible();

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Add Hostel')).toBeVisible();
  await expect(page.getByText('Add Members')).toBeVisible();

  await page.getByText('+').first().click();
  await page.getByText('John Doe').click();
  await page.getByText('Jane Smith').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
  await expect(page.getByText('Hostel Registration Status')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Hostel Registered Successfully' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
  await page.getByRole('switch').click();
  await page.getByRole('tab', { name: 'Hostels' }).click();
  await expect(page.getByText('(2nd floor) D.Y.P Hostel')).toBeVisible();

  await page.getByRole('link', { name: 'Feature Feature' }).click();
  await page.getByRole('heading', { name: 'Hostel Management' }).click();
  await page.getByRole('button', { name: 'Student' }).click();

  const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(hostelElement).toBeVisible();
  await hostelElement.click();
});
test('Single Student - On-Time Check-in and Check-out with green indicator', async ({
  page,
  context,
}) => {
  //Check-in at 8:00 AM
  await test.step('Check-in at 8:00 AM', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'plus' }).click();
    await page.getByRole('button', { name: 'Check-in' }).click();
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    const timeRow = page.locator('text=Time').first().locator('..');
    const dateRow = page.locator('text=Date').nth(1).locator('..');

    await expect(timeRow).toContainText(/8:00(:00)?\s*AM/);

    // //exact check-in time step
    // await test.step('Verify exact Check-in time text', async () => {
    //   await expect(timeRow).toContainText('Check in time : 08:00 AM');
    // });

    await expect(dateRow).toContainText('5/30/2025');
  });

  // --- Change fake time to 2:00 PM ---
  await test.step('Change fake time to 2:00 PM', async () => {
    await injectFakeTime(context, '2025-05-30T14:00:00');
    await page.reload();
  });

  // --- Checkout at 2:00 PM ---
  await test.step('Perform checkout and validate duration and status', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
    await page.getByRole('button', { name: 'Check-out' }).click();
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    const timeRow = page.locator('text=Time').first().locator('..');
    const durationRow = page.locator('text=Duration').first().locator('..');

    // await test.step('Verify exact Check-out time text', async () => {
    //   await expect(timeRow).toContainText('Check out time : 02:00 PM');
    // });

    //duration of 6 hours
    //await expect(durationRow).toContainText(/6\s*hr/i);

    await test.step('Verify green check-in/check-out On time is visible', async () => {
      await expect(
        page.locator('img[alt="status"][src*="green.svg"]').first()
      ).toBeVisible();
    });
  });
});

*/

//test for Late checkout
/*
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

// Helper to inject FakeDate for a given fixed time
async function injectFakeTime(context, fixedDateStr) {
  await context.addInitScript(() => {
    const fixedDate = new Date('2025-05-30T08:00:00');

    class FakeDate extends Date {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(fixedDate.getTime());
        } else {
          super(...(args as ConstructorParameters<typeof Date>));
        }
      }
      static now() {
        return fixedDate.getTime();
      }
    }

    // @ts-ignore
    window.Date = FakeDate;
  });
}

test.beforeEach(async ({ context, page }) => {
  // Inject 8:00 AM fake time for initial load
  await injectFakeTime(context, '2025-05-30T08:00:00');

  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/role-selection');
  await page.getByRole('button', { name: 'Admin' }).click();

  await page
    .getByRole('textbox', { name: 'Hostel Name' })
    .fill('(2nd floor) D.Y.P Hostel');
  await page.getByRole('textbox', { name: 'Address' }).fill('Pune');

  await page.getByRole('textbox', { name: 'Location' }).click();
  page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));
  await page.locator('img').nth(2).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('pune');
  await page.getByText('Pune, Pune District,').click();
  await page.getByRole('button', { name: 'Select' }).click();

  await page.getByText('Hostel Type').click();
  await page.getByRole('radio', { name: 'Boys' }).check();
  await expect(page.getByText('Media Upload')).toBeVisible();
  await expect(page.getByText('Add Hostel Photos')).toBeVisible();

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Add Hostel')).toBeVisible();
  await expect(page.getByText('Add Members')).toBeVisible();

  await page.getByText('+').first().click();
  await page.getByText('John Doe').click();
  await page.getByText('Jane Smith').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
  await expect(page.getByText('Hostel Registration Status')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Hostel Registered Successfully' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
  await page.getByRole('switch').click();
  await page.getByRole('tab', { name: 'Hostels' }).click();
  await expect(page.getByText('(2nd floor) D.Y.P Hostel')).toBeVisible();

  await page.getByRole('link', { name: 'Feature Feature' }).click();
  await page.getByRole('heading', { name: 'Hostel Management' }).click();
  await page.getByRole('button', { name: 'Student' }).click();

  const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(hostelElement).toBeVisible();
  await hostelElement.click();
});

test('Student Checkin at 8 am Checkout 9 pm Late Checkout - Orange Indicator', async ({
  page,
  context,
}) => {
  // --- Check-in at 8:00 AM ---
  await test.step('Check-in at 8:00 AM', async () => {
    await expect(
      page.getByRole('heading', { name: 'Profile Name' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'plus' }).click();
    await page.getByRole('button', { name: 'Check-in' }).click();
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    const timeRow = page.locator('text=Time').first().locator('..');
    const dateRow = page.locator('text=Date').nth(1).locator('..');

    await expect(timeRow).toContainText(/8:00(:00)?\s*AM/);

    // //exact check-in time step
    // await test.step('Verify exact Check-in time text', async () => {
    //   await expect(timeRow).toContainText('Check in time : 08:00 AM');
    // });

    await expect(dateRow).toContainText('5/30/2025');
  });

  // --- Change fake time to 9:00 PM ---
  await test.step('Change fake time Chekout Time to 9:00 PM', async () => {
    await injectFakeTime(context, '2025-05-30T21:00:00'); //9
    await page.reload();
  });

  // --- Checkout at 9:00 PM ---
  await test.step('checkout and validate duration and status', async () => {
    await page.getByRole('button', { name: 'plus' }).click();
    await page.getByRole('button', { name: 'Check-out' }).click();
    await expect(
      page.getByRole('heading', { name: 'Selfie Capture' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Capture Selfie' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    const timeRow = page.locator('text=Time').first().locator('..');
    const durationRow = page.locator('text=Duration').first().locator('..');

    // await test.step('Verify exact Check-out time text', async () => {
    //   await expect(timeRow).toContainText('Check out time : 09:00 PM');
    // });

    //duration of 13 hours late
    // await expect(durationRow).toContainText(/13\s*hr/i);
    await test.step('Verify green check-in/check-out On time is visible', async () => {
      await expect(
        page.locator('img[alt="status"][src*="orange.svg"]').first()
      ).toBeVisible();
    });
  });
});


*/

//missed checkin

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

//Helper: Inject fake date/time into browser
async function injectFakeTime(context, fixedDateStr: string) {
  await context.addInitScript((dateStr) => {
    const fixedDate = new Date(dateStr);
    class FakeDate extends Date {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(fixedDate.getTime());
        } else {
          super(...(args as ConstructorParameters<typeof Date>));
        }
      }
      static now() {
        return fixedDate.getTime();
      }
    }
    // @ts-ignore
    window.Date = FakeDate;
  }, fixedDateStr);
}

test.beforeEach(async ({ context, page }) => {
  await injectFakeTime(context, '2025-05-30T08:00:00');
  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/role-selection');
  await page.getByRole('button', { name: 'Admin' }).click();

  await page
    .getByRole('textbox', { name: 'Hostel Name' })
    .fill('(2nd floor) D.Y.P Hostel');
  await page.getByRole('textbox', { name: 'Address' }).fill('Pune');

  await page.getByRole('textbox', { name: 'Location' }).click();
  page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));
  await page.locator('img').nth(2).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('pune');
  await page.getByText('Pune, Pune District,').click();
  await page.getByRole('button', { name: 'Select' }).click();

  await page.getByText('Hostel Type').click();
  await page.getByRole('radio', { name: 'Boys' }).check();
  await expect(page.getByText('Media Upload')).toBeVisible();
  await expect(page.getByText('Add Hostel Photos')).toBeVisible();

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Add Hostel')).toBeVisible();
  await expect(page.getByText('Add Members')).toBeVisible();

  await page.getByText('+').first().click();
  await page.getByText('John Doe').click();
  await page.getByText('Jane Smith').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
  await expect(page.getByText('Hostel Registration Status')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Hostel Registered Successfully' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.locator('span').filter({ hasText: 'Chat' })).toBeVisible();
  await page.getByRole('switch').click();
  await page.getByRole('tab', { name: 'Hostels' }).click();
  await expect(page.getByText('(2nd floor) D.Y.P Hostel')).toBeVisible();

  await page.getByRole('link', { name: 'Feature Feature' }).click();
  await page.getByRole('heading', { name: 'Hostel Management' }).click();
  await page.getByRole('button', { name: 'Student' }).click();

  const hostelElement = page.getByText('(2nd floor) D.Y.P Hostel');
  await expect(hostelElement).toBeVisible();
  await hostelElement.click();
});

test('Missed Check-in – Shows Red Status', async ({ page, context }) => {
  // (student didn’t check in)
  await test.step('Set time to 8:00 PM (end of day)', async () => {
    await injectFakeTime(context, '2025-05-30T20:00:00'); // 8:00 PM
    await page.reload();
  });

  await test.step('Navigate to student list', async () => {
    await page.getByRole('tab', { name: 'Hostels' }).click();
    await page.getByRole('link', { name: 'Feature Feature' }).click();
    await page.getByRole('heading', { name: 'Hostel Management' }).click();
    await page.getByRole('button', { name: 'Student' }).click();
    await page.getByText('(2nd floor) D.Y.P Hostel').click();
  });

  await test.step('Verify missed check-in (red status)', async () => {
    const studentRow = page
      .locator('text=Missed Checkin')
      .first()
      .locator('..');

    await expect(
      studentRow.locator('img[alt="status"][src*="red.svg"]')
    ).toBeVisible();

    await expect(studentRow.getByText(/missed check-in/i)).toBeVisible();
  });
});
