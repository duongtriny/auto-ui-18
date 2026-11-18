import { test, expect, Page } from '@playwright/test';

test('Verify input', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
  let input = 'Normal Value';
  await inputTextByLabel('Normal Input', input, page);
  await expect(page.getByText(`Value: ${input}`)).toBeVisible();
  await inputTextByLabel('Input Number', '5', page);
  await expect(page.getByText(`Value: 5`)).toBeVisible();
  await inputTextByLabel('Text Area', 'Test With Me', page);
  await expect(page.getByText(`Value: Test With Me`)).toBeVisible();
  await inputTextByLabel('Password Box', 'test@123', page);
  await expect(page.getByText(`Value: test@123`)).toBeVisible();
});

async function inputTextByLabel(label: string, input: string, page: Page) {
  let xpath = `(//label[normalize-space()='${label}']//following::*[self::input or self::textarea])[1]`;
  let inputLocator = page.locator(xpath);
  await inputLocator.click();
  await inputLocator.clear();
  await inputLocator.fill(input);
}

test('Verify OTP', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
  await inputOtpByLabel('OTP Box', '123456', page);
  await expect(page.getByText('Value: 123456')).toBeVisible();
});

async function inputOtpByLabel(label: string, input: string, page: Page) {
  for (let i = 0; i < input.length; i++) {
    let xpath = `(//label[normalize-space()='${label}']/following::input)[${i + 1}]`;
    let inputLocator = page.locator(xpath);
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input[i]);
  }
}