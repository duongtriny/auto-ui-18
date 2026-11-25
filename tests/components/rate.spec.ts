import { test, expect, Page } from '@playwright/test';

test('Verify select auto complete', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
  await selectRatingByLabel('Rating', 3, page);
  await expect(page.getByText('Current rating: normal')).toBeVisible();
  await selectRatingByLabel('Rating', 5, page);
  await expect(page.getByText('Current rating: wonderful')).toBeVisible();
  await selectRatingByLabel('Rating', 1, page);
  await expect(page.getByText('Current rating: terrible')).toBeVisible();
});

async function selectRatingByLabel(label: string, rate: number, page: Page) {
  let ratingGroupXpath = `(//label[normalize-space()='${label}']//following::ul[contains(concat(' ', @class, ' '), ' ant-rate ')])[1]`;
  let ratingGroupLocator = page.locator(ratingGroupXpath);
  let currentRating = await ratingGroupLocator.locator("//div[@role='radio' and @aria-checked='true']").count();
  if (currentRating != rate) {
    let xpath = `//div[@aria-posinset="${rate}" and @role='radio']`;
    await ratingGroupLocator.locator(xpath).click();
  }

}