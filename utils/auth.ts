// utils/auth.js

export async function loginForAuthOnly(page) {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Enter mobile number' }).click();
  await page
    .getByRole('textbox', { name: 'Enter mobile number' })
    .fill('9187234567');
  await page.getByRole('button', { name: 'Request OTP' }).click();

  const otpInputs = await page.locator('.otp-input').all();

  const otpDigits = ['1', '2', '3', '4', '5'];

  for (let i = 0; i < otpDigits.length; i++) {
    await otpInputs[i].click();
    await otpInputs[i].fill(otpDigits[i]);
  }

  await page.getByRole('button', { name: 'Submit' }).click();

  //await page.waitForLoadState('networkidle');
}
