import { test, expect, Page } from '@playwright/test';

test('Verify dropdown', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown');
    await selectDropdownItemByLabel('Dropdown Button', '3rd menu item', page);
    await expect(page.getByText('Value: 3rd menu item')).toBeVisible();
});

async function selectDropdownItemByLabel(label: string, item: string, page: Page) {
    let dropdownOptionsXpath = `(//label[normalize-space()='${label}']/following::button[@aria-label='Dropdown options'])[1]`;
    await page.locator(dropdownOptionsXpath).click();
    let itemXpath = `//li[@role='menuitem' and normalize-space()='${item}']`;
    await page.locator(itemXpath).click();
}