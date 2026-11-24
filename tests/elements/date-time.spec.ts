import { test, expect, Page } from '@playwright/test';

test('Verify time picker', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
    await inputTimeByLabel('Time Picker', '10', '22', '59', page);
    await expect(page.getByText('Current time: 10:22:59')).toBeVisible();
});

async function inputTimeByLabel(label: string, hours: string, minutes: string, seconds: string, page: Page) {
    let timePickerXpath = `(//label[normalize-space()="${label}"]/following-sibling::div[.//input[@placeholder='Select time'] and contains(concat(' ', @class, ' '), ' ant-picker ')])[1]`;
    await page.locator(timePickerXpath).click();
    let hourXpath = `//ul[@data-type="hour"]//li[normalize-space()="${hours}"]`;
    await page.locator(hourXpath).click();
    let minutesXpath = `//ul[@data-type="minute"]//li[normalize-space()="${minutes}"]`;
    await page.locator(minutesXpath).click();
    let secondsXpath = `//ul[@data-type="second"]//li[normalize-space()="${seconds}"]`;
    await page.locator(secondsXpath).click();
    let okButtonXpath = `//li[contains(concat(' ', @class, ' '), ' ant-picker-ok ')]//button[normalize-space()="OK"]`;
    await page.locator(okButtonXpath).click();
}

test('Verify date picker', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
    await inputDateByLabel('Date Picker', '1999', 'Aug', '22', page);
    await expect(page.getByText('Current date: 1999-08-22')).toBeVisible();
    await inputDateByLabel('Date Picker', '2045', 'Aug', '22', page);
    await expect(page.getByText('Current date: 2045-08-22')).toBeVisible();
});

async function inputDateByLabel(label: string, year: string, month: string, day: string, page: Page) {
    let datePickerXpath = `(//label[normalize-space()="${label}"]/following-sibling::div[.//input[@placeholder='Select date'] and contains(concat(' ', @class, ' '), ' ant-picker ')])[1]`;
    await page.locator(datePickerXpath).click();
    let selectYearButtonXpath = `//button[@aria-label="Choose a year"]`;
    await page.locator(selectYearButtonXpath).click();

    let selectDecadeButtonXpath = `//button[@aria-label="Choose a decade"]`;
    let selectDecadeButtonLocator = page.locator(selectDecadeButtonXpath);
    let selectDecadeButtonText = await selectDecadeButtonLocator.textContent();
    let [minYear, maxYear] = selectDecadeButtonText?.split('-') || [];
    let [minYearNum, maxYearNum, yearNum] = [Number.parseInt(minYear), Number.parseInt(maxYear), Number.parseInt(year)];
    let decade = maxYearNum - minYearNum + 1;
    if (yearNum < minYearNum) {
        let distance = minYearNum - yearNum;
        await findDecadeByLabel('Last year', distance, decade, page);
    } else if (yearNum > maxYearNum) {
        let distance = yearNum - maxYearNum;
        await findDecadeByLabel('Next year', distance, decade, page);
    }
    await selectPickerCell(year, page);
    await selectPickerCell(month, page);
    await selectPickerCell(day, page);
}

async function selectPickerCell(input: string, page: Page) {
    let xpath = `//td[contains(concat(' ',@class,' '),' ant-picker-cell ')]//div[normalize-space()="${input}"]`;
    await page.locator(xpath).click();
}

async function findDecadeByLabel(label: string, distance: number, decade: number, page: Page) {
    let clickCount = Math.ceil(distance / decade);
    let moveButtonXpath = `//button[@aria-label="${label}"]`;
    for (let i = 0; i < clickCount; i++) {
        await page.locator(moveButtonXpath).click();
    }
}