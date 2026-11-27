import { test, expect, Page } from '@playwright/test';

test('Verify rating', async ({ page }) => {
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

test('Verify half rating', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
  await selectHalfRatingByLabel('Half Rating', 2.5, page);
  await expect(page.getByText('Current rating: 2.5')).toBeVisible();
  await selectHalfRatingByLabel('Half Rating', 3.5, page);
  await expect(page.getByText('Current rating: 3.5')).toBeVisible();
  await selectHalfRatingByLabel('Half Rating', 2, page);
  await expect(page.getByText('Current rating: 2', { exact: true })).toBeVisible();
});

async function selectHalfRatingByLabel(label: string, rate: number, page: Page) {
  let ratingGroupXpath = `(//label[normalize-space()='${label}']//following::ul[contains(concat(' ', @class, ' '), ' ant-rate ')])[1]`;
  let ratingGroupLocator = page.locator(ratingGroupXpath);
  let fullStars = await ratingGroupLocator.locator('.ant-rate-star-full').count();
  let halfStar = await ratingGroupLocator.locator('.ant-rate-star-half').count();
  let currentRating = fullStars + halfStar * 0.5;
  if (currentRating != rate) {
    if (Number.isInteger(rate)) {
      await ratingGroupLocator.locator(`li:nth-child(${rate}) .ant-rate-star-second`).click({
        position: {
          x: 15,
          y: 10
        }
      });
    } else {
      await ratingGroupLocator.locator(`li:nth-child(${rate + 0.5}) .ant-rate-star-first`).click();
    }
  }
}