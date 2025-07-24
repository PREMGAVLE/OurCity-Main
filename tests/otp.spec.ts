import { test, expect } from '@playwright/test';

test.describe.parallel('OTP tests in parallel', () => {
  test('Should submit valid OTP and login successfully', async ({ page }) => {
    await test.step('Go to loginpage and request OTP', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9187234567');
      await page.getByRole('button', { name: 'Request OTP' }).click();
    });

    await test.step('Enter valid OTP and submit', async () => {
      const otp = '12345';
      for (let i = 0; i < otp.length; i++) {
        await page.locator('.otp-input').nth(i).fill(otp[i]);
      }
      await page.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('Verify login successfull', async () => {
      await expect(page.locator('span', { hasText: 'Chat' })).toBeVisible();
    });
  });

  test('Should resend OTP', async ({ page }) => {
    await test.step('Go to loginpage and request OTP', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9187234567');
      await page.getByRole('button', { name: 'Request OTP' }).click();
    });

    await test.step('Resend OTP and enter otp', async () => {
      await expect(
        page.getByText('  A verification code has been sent to your number.')
      ).toBeVisible();
      await page.getByText('Resend OTP').click();
      const otp = '12345';
      for (let i = 0; i < otp.length; i++) {
        await page.locator('.otp-input').nth(i).fill(otp[i]);
      }
    });

    await test.step('Submit and verify login successfull', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(page.locator('span', { hasText: 'Chat' })).toBeVisible();
    });
  });

  test('Should show error when OTP is not entered and submit is clicked', async ({
    page,
  }) => {
    await test.step('Request OTP without entering otp submit it', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9422545665');
      await page.getByRole('button', { name: 'Request OTP' }).click();
      await page.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('Verify  message', async () => {
      await expect(
        page.getByText('OTP verification are invalid')
      ).toBeVisible();
    });
  });

  test('Should submit invalid OTP 123456 and show error message', async ({
    page,
  }) => {
    await test.step('Request OTP and enter invalid 6-digit code', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9187234567');
      await page.getByRole('button', { name: 'Request OTP' }).click();
      const otp = '123456';
      for (let i = 0; i < otp.length; i++) {
        await page.locator('.otp-input').nth(i).fill(otp[i]);
      }
    });

    await test.step('Submit and verify  message', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(
        page.getByText('OTP verification are invalid')
      ).toBeVisible();
    });
  });

  test('Should submit invalid OTP 1234 and show error message', async ({
    page,
  }) => {
    await test.step('Request OTP and enter  short OTP', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9822545665');
      await page.getByRole('button', { name: 'Request OTP' }).click();
      const otp = '1234';
      for (let i = 0; i < otp.length; i++) {
        await page.locator('.otp-input').nth(i).fill(otp[i]);
      }
    });

    await test.step('Submit and verify  message', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(
        page.getByText('OTP verification are invalid')
      ).toBeVisible();
    });
  });

  test('Should block non-numeric characters in OTP input and show error', async ({
    page,
  }) => {
    await test.step('Request OTP and enter non-numeric otp', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9822545665');
      await page.getByRole('button', { name: 'Request OTP' }).click();
      const otp = 'hyhyh';
      for (let i = 0; i < otp.length; i++) {
        await page.locator('.otp-input').nth(i).fill(otp[i]);
      }
    });

    await test.step('Submit and verify error message', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(
        page.getByText('OTP verification are invalid')
      ).toBeVisible();
    });
  });

  test('Should clear OTP fields when mobile number is edited', async ({
    page,
  }) => {
    await test.step('Enter OTP and then edit mobile number', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9187234567');
      await page.getByRole('button', { name: 'Request OTP' }).click();

      const otp = ['1', '2', '3', '4', '5'];
      for (let i = 0; i < otp.length; i++) {
        await page.locator('.otp-input').nth(i).fill(otp[i]);
      }

      await page.getByRole('img', { name: 'edit-no' }).click();
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9876543222');
      await page.getByRole('button', { name: 'Request OTP' }).click();
    });

    await test.step('Verify OTP fields are cleared', async () => {
      for (let i = 0; i < 5; i++) {
        await expect(page.locator('.otp-input').nth(i)).toHaveValue('');
      }
    });
  });

  test('Should restrict OTP entry to exact number of digits (6 max)', async ({
    page,
  }) => {
    await test.step('Try to enter more than 6 digits in OTP fields', async () => {
      await page.goto('http://localhost:5173/');
      await page
        .getByRole('textbox', { name: 'Enter mobile number' })
        .fill('9123456789');
      await page.getByRole('button', { name: 'Request OTP' }).click();

      const otp = '12345678';
      for (let i = 0; i < otp.length; i++) {
        const input = page.locator('.otp-input').nth(i);
        if ((await input.count()) > 0) {
          await input.fill(otp[i]);
        }
      }
    });

    await test.step('Verify only 6 digits accepted', async () => {
      const otp = '123456';
      for (let i = 0; i < otp.length; i++) {
        await expect(page.locator('.otp-input').nth(i)).toHaveValue(otp[i]);
      }
      await expect(page.locator('.otp-input').nth(6)).toHaveCount(0);
    });
  });
});
