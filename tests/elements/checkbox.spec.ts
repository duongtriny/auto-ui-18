import { test, expect, Page } from '@playwright/test';

test('Verify select checkbox', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
  await selectCheckboxByLabel('Fruits', 'Apple', 'uncheck', page);
  await expect(page.getByText('Selected values: Apple')).not.toBeVisible();
  await selectCheckboxByLabel('Fruits', 'Pear', 'check', page);
  await expect(page.getByText('Selected values: Pear')).toBeVisible();
});

async function selectCheckboxByLabel(label: string, option: string, action: 'check' | 'uncheck', page: Page) {
  let xpath = `(//label[normalize-space()='${label}']/following::label[.//input[@type='checkbox'] and normalize-space()='${option}'])[1]`;
  let checkboxLocator = page.locator(xpath);
  let classes = await checkboxLocator.getAttribute('class');
  let isChecked = ` ${classes} `.includes(' ant-checkbox-wrapper-checked ');
  if ((isChecked == true && action == 'uncheck') || (isChecked == false && action == 'check')) {
    await checkboxLocator.click();
  }
}