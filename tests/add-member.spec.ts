import { test, expect } from '@playwright/test';
import { loginForAuthOnly } from '../utils/auth';

test.beforeEach(async ({ page }) => {
  await loginForAuthOnly(page);
  await page.goto('http://localhost:5173/role-selection');

  // Step 1: Select role
  await expect(
    page.getByRole('heading', { name: 'Select your Role to Proceed' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Admin' }).click();

  // Step 2: Fill hostel details
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

  await expect(page).toHaveURL(/\/add-hostel-member/);
});

test('Should render /add-hostel-member page properly after clicking Continue', async ({
  page,
}) => {
  await test.step('Verify page headings and labels', async () => {
    await expect(page.getByText('Add Hostel')).toBeVisible();
    await expect(page.getByText('Add Members')).toBeVisible();
  });

  await test.step('Verify progress stepper highlights Steps 1 and 2', async () => {
    const activeColor = 'rgb(97, 136, 137)';
    const inactiveColor = 'rgb(213, 213, 213)';

    for (const [step, expectedColor] of [
      ['1', activeColor],
      ['2', activeColor],
      ['3', inactiveColor],
    ] as const) {
      await expect(
        page.locator(
          'div.flex.items-center.justify-center.rounded-full.text-white',
          { hasText: step }
        )
      ).toHaveCSS('background-color', expectedColor);
    }
  });

  await test.step('Verify Hostel and Attendance Incharge sections', async () => {
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
    await expect(page.getByText('Add').nth(2)).toBeVisible();
    await expect(page.getByText('+').first()).toBeVisible();

    await expect(page.getByText('Attendance Incharge')).toBeVisible();
    await expect(page.getByText('Add').nth(3)).toBeVisible();
    await expect(page.getByText('+').nth(1)).toBeVisible();
  });

  await test.step('Verify navigation buttons', async () => {
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'closeimage' })
    ).toBeVisible();
  });
});

test('Should go back to Step 1 when Back button is clicked', async ({
  page,
}) => {
  await test.step('Click Back and validate Step 1', async () => {
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page).toHaveURL(/\/add-hostel/);
    await expect(page.getByText(/Hostel Details/i)).toBeVisible();
  });
});

test('Should allow adding Attendance Incharge', async ({ page }) => {
  await test.step('Click "+" to add Attendance Incharge', async () => {
    await expect(page.getByText('Attendance Incharge')).toBeVisible();
    await page.getByText('+').nth(1).click();
    await expect(page.getByText('John Doe')).toBeVisible();
    await page.getByText('John Doe').click();

    await page.getByRole('button', { name: 'Add' }).click();
  });
});

test('Should block continuation if Hostel Incharge is not added', async ({
  page,
}) => {
  await test.step('Verify you are on the Add Hostel Member step', async () => {
    await expect(page.getByText('Add Hostel')).toBeVisible();
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
  });

  await test.step('Click Continue without adding Hostel Incharge', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Expect validation message to appear', async () => {
    await expect(page.getByText('Please Select Hostel Incharge')).toBeVisible();
  });

  await expect(page).toHaveURL(/add-hostel-member/);
});

test('Should allow adding Hostel Incharge via Add button', async ({ page }) => {
  await test.step('Ensure you are on the Add Hostel Members page', async () => {
    await expect(page).toHaveURL(/add-hostel-member/);
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
  });

  await test.step('Click "+" Add button under Hostel Incharge', async () => {
    await page.getByText('+').first().click();
  });

  await test.step('Verify navigation to member list page', async () => {
    await expect(page).toHaveURL(/add-hostel-member-list/);
  });

  await test.step('Verify elements on member list page, bUttons', async () => {
    await expect(page.getByRole('heading', { name: 'Add' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
    await expect(page.getByText('Ajay Tayde')).toBeVisible();

    await expect(page.getByText('Cancel')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
  });
});

test('Should filter member list by search input', async ({ page }) => {
  await test.step('Navigate to member list page', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
  });

  await test.step('Verify search input is visible', async () => {
    const searchInput = page.getByPlaceholder('Search');
    await expect(searchInput).toBeVisible();
  });

  await test.step('Type Jo into search input', async () => {
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('Jo');
  });

  await test.step('Wait for filter ', async () => {
    await page.waitForTimeout(500);
  });

  await test.step('Verify John Doe is visible', async () => {
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  await test.step('Verify other members are noyt visible', async () => {
    await expect(page.getByText('Jane Smith')).not.toBeVisible();
    await expect(page.getByText('Ajay Tayde')).not.toBeVisible();
  });
});

test('Should select member and show selected member', async ({ page }) => {
  await test.step('Navigate to member list page', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
  });

  await test.step('Wait for member "John Doe" to be visible', async () => {
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  await test.step('Click to select member "John Doe"', async () => {
    await page.getByText('John Doe').click();
  });

  await test.step('Verify "John Doe" appears in the selected at bottom ', async () => {
    await expect(page.getByText(/John DoeAdd/i)).toBeVisible();
  });
});

test('Should select and then deselect member,then No member selected ', async ({
  page,
}) => {
  await test.step('Navigate to member list page', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
  });

  await test.step('Wait for member "John Doe" to be visible', async () => {
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  await test.step('Click to select member "John Doe"', async () => {
    await page
      .locator('div')
      .filter({ hasText: /^John Doe$/ })
      .nth(2)
      .click();
  });

  await test.step('Click again to deselect member "John Doe"', async () => {
    await page.getByRole('img', { name: 'Selection Icon' }).first().click();
  });

  await test.step('Verify "No member selected" message is visible', async () => {
    await expect(page.getByText(/no member/i)).toBeVisible();
  });
});

test('Should list selected names at the bottom', async ({ page }) => {
  await test.step('Navigate to member list page', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
  });

  await test.step('Wait for "John Doe" and "Jane Smith" to be visible', async () => {
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
  });

  await test.step('Select member "John Doe"', async () => {
    await page.getByText('John Doe').click();
  });

  await test.step('Select member "Jane Smith"', async () => {
    await page.getByText('Jane Smith').click();
  });

  await test.step('Verify selected names appear in the bottom bar', async () => {
    await expect(page.getByText(/John Doe, Jane Smith/i)).toBeVisible();
  });
});

test('Should close and return to Step 2 after adding members', async ({
  page,
}) => {
  await test.step('Navigate to add-hostel-member-list and slect member', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
  });

  await test.step('Wait for member "John Doe" to be visible', async () => {
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  await test.step('Select member "John Doe"', async () => {
    await page.getByText('John Doe').click();
  });

  await test.step('Click the "Add" button to confirm selection', async () => {
    await page.getByRole('button', { name: 'Add' }).click();
  });

  await test.step('Verify navigation back to Step 2 (/add-hostel-member)', async () => {
    await expect(page).toHaveURL(/\/add-hostel-member/);
    await expect(page.getByText('Add Members')).toBeVisible();
  });
});

test('Should display selected members under the correct role', async ({
  page,
}) => {
  await test.step('Navigate to add-hostel-member page', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
    await page.getByText('John Doe').click();
    await page.getByText('Jane Smith').click();

    await page.getByRole('button', { name: 'Add' }).click();
  });

  await test.step('Verify "Hostel In charge" role section is visible', async () => {
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
  });

  await test.step('Verify selected member  appears under "Hostel In charge"', async () => {
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
  });

  await test.step('Verify + icon/button is still visible under "Hostel In charge"', async () => {
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Plus Icon' })).toBeVisible();
  });
});

test('Prevent proceeding to Step 3 if no Hostel In charge selected', async ({
  page,
}) => {
  await test.step('Navigate to Add Hostel Member page (Step 2)', async () => {
    await page.goto('http://localhost:5173/add-hostel-member');
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  });

  //Ensure no Hostel In charge is selected

  await test.step('Click Continue button without selecting Hostel In charge', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Verify validation message is displayed', async () => {
    await expect(page.getByText('Please Select Hostel Incharge')).toBeVisible();
  });

  await test.step('Verify user does not proceed to Step 3', async () => {
    await expect(page).not.toHaveURL(/approval/i);
  });
});

test('Should cancel and close selection', async ({ page }) => {
  await test.step('Navigate to add-hostel-member-list page (member selection)', async () => {
    await page.goto('http://localhost:5173/add-hostel-member-list');
    await expect(page.getByRole('heading', { name: 'Add' })).toBeVisible();
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  await test.step('Click Cancel button to close selection', async () => {
    await page.getByText('Cancel').click();
  });

  await test.step('Verify navigation back to Step 2 (/add-hostel-member)', async () => {
    await expect(page).toHaveURL(/\/add-hostel-member/);
    await expect(page.getByText('Add Members')).toBeVisible();
  });
});

test('Should navigate to /approval page if in charge is selected and Admin clicks Continue', async ({
  page,
}) => {
  await test.step('Navigate to add-hostel-member page', async () => {
    await page.goto('http://localhost:5173/add-hostel-member');
  });

  await test.step('Click + button under Hostel Incharge to open member list', async () => {
    await page.getByText('+').first().click();
  });

  await test.step('Select members John Doe, Jane Smith, Ajay Tayde', async () => {
    await page.getByText('John Doe').click();
    await page.getByText('Jane Smith').click();
  });

  await test.step('Click Add to assign selected members', async () => {
    await page.getByRole('button', { name: 'Add' }).click();
  });

  await test.step('Verify assigned members under Hostel Incharge', async () => {
    await expect(page.getByText('Hostel Incharge')).toBeVisible();
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
  });

  await test.step('Click Continue to go to approval step', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
  });

  await test.step('Verify registration success content', async () => {
    await expect(page.getByText('Hostel Registration Status')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Status Icon' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Hostel Registered Successfully' })
    ).toBeVisible();
    await expect(
      page.getByText(/Approved for \(2nd floor\) D\.Y\./)
    ).toBeVisible();
  });

  await test.step('Click Proceed button to finish', async () => {
    const proceedButton = page.getByRole('button', { name: 'Proceed' });
    await expect(proceedButton).toBeVisible();
    await proceedButton.click();
  });

  await test.step('Verify navigation to /chat', async () => {
    await expect(page).toHaveURL('http://localhost:5173/chats');
    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
  });
});

// Chats TEST Cases

test('Should navigate to /chats and verify elements', async ({ page }) => {
  await test.step('Navigate to Chat page', async () => {
    await page.goto('http://localhost:5173/chats');
  });

  await test.step('Verify header is visible', async () => {
    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
  });

  await test.step('Verify search bar is visible', async () => {
    await expect(page.getByRole('textbox', { name: /search/i })).toBeVisible();
  });

  await test.step('Verify toggle switch is visible', async () => {
    await expect(page.getByRole('switch')).toBeVisible();
  });

  await test.step('Verify filter buttons are visible', async () => {
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Hostels' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Group' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'SplitMoney' })).toBeVisible();
  });

  await test.step('Verify bottom navigation icons are visible', async () => {
    await expect(page.getByRole('link', { name: 'Feature' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'People' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Calls' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });

  // await test.step('Verify layout responsiveness on different screen sizes', async () => {
  //   const viewports = [
  //     { width: 320, height: 640 }, // mobile
  //     { width: 768, height: 1024 }, // tablet
  //     { width: 1280, height: 720 }, // desktop
  //   ];
  //   for (const viewport of viewports) {
  //     await page.setViewportSize(viewport);
  //     await expect(page.locator('body')).toBeVisible();
  //   }
  // });
});

test(' Test Search should return correct hostel name or user', async ({
  page,
}) => {
  await test.step('Navigate to Chat page', async () => {
    await page.goto('http://localhost:5173/chats');
  });

  await test.step('Type "User" in the search bar', async () => {
    const searchBox = page.getByRole('textbox', { name: 'Search' });
    await searchBox.click();
    await searchBox.fill('User 3');
  });

  await test.step('Click the Search icon', async () => {
    await page.getByRole('img', { name: 'Search' }).click();
  });

  await test.step('Verify matching results are displayed', async () => {
    await expect(page.getByText(/User 3/i)).toBeVisible();
  });
});

test('Toggle OFF shows all tabs', async ({ page }) => {
  await test.step('Navigate to Chats page', async () => {
    await page.goto('http://localhost:5173/chats');
  });

  await test.step('Ensure toggle is OFF (if it starts ON, turn it OFF)', async () => {
    const toggle = page.getByRole('switch');
    if ((await toggle.getAttribute('aria-checked')) === 'true') {
      await toggle.click(); // turn off
    }
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  await test.step('Verify All, Hostels, Group, SplitMoney tabs are visible', async () => {
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Hostels' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Group' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'SplitMoney' })).toBeVisible();
  });
});

test('Toggle ON shows only All and Hostels tabs', async ({ page }) => {
  await test.step('Navigate to Chats page', async () => {
    await page.goto('http://localhost:5173/chats');
  });

  await test.step('Turn toggle ON', async () => {
    const toggle = page.getByRole('switch');
    if ((await toggle.getAttribute('aria-checked')) === 'false') {
      await toggle.click(); // turn onn
    }
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  await test.step('Verify only All and Hostels tabs are visible', async () => {
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Hostels' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Group' })).toHaveCount(0); //zero matching elements
    await expect(page.getByRole('tab', { name: 'SplitMoney' })).toHaveCount(0);
  });
});

test('Tap on "Chats" in bottom nav keeps user on Chats screen', async ({
  page,
}) => {
  await test.step('Navigate to Chats page', async () => {
    await page.goto('http://localhost:5173/chats');
    await expect(
      page.locator('span').filter({ hasText: 'Chat' })
    ).toBeVisible();
  });

  await test.step('Click on "Chats" in the bottom navigation', async () => {
    const chatsNavItem = page.getByRole('link', { name: 'Chats' });
    await expect(chatsNavItem).toBeVisible();
    await chatsNavItem.click();
  });

  await test.step('Verify that the user remains on the Chats screen', async () => {
    await expect(page).toHaveURL(/chats/i);
  });
});

// test(' Admin - Fill hostel form Complete hostel registration flow', async ({
//   page,
// }) => {
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
//   await element.click();

//   // await expect(page.getByText('Profile Name')).toBeVisible();
//   // await expect(page.getByRole('img', { name: 'Home' })).toBeVisible();
// });
