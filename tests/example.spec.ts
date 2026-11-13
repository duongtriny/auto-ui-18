import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  console.log('Runs once before all tests in the file.');
});

test.beforeEach(async ({ page }) => {
  console.log('Runs before each test in the file.');
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  console.log('Runs after each test in the file.');
});

test.afterAll(async () => {
  console.log('Runs once after all tests in the file.');
});

