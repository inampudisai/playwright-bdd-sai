import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { BugsFormPage } from '../test/page/BugFormPage';
import fs from 'fs';


let browser: Browser;
let context: BrowserContext;
let bugsForm: BugsFormPage;
let page: Page;



BeforeAll(async () => {
  console.log(
    'Launch Browser using Playwright and Chromium browser, performed once, before the start of all test scenarios.',
  );
  browser = await chromium.launch({ headless: false });

});



Before(async () => {
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

  console.log('Launch Browser, performed before each individual test scenario');
  context = await browser.newContext({ userAgent, bypassCSP: true });
  page = await context.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  console.log('Browser closed after each scenario');
  try {
    if (result?.status === Status.FAILED && pageFixture.page) {
      const screenshotPath =
        `./test-results/screenshots/${pickle.id}.png`;

      await pageFixture.page.screenshot({
        path: screenshotPath,
        type: 'png',
        fullPage: true,
      });

      const image = fs.readFileSync(screenshotPath);
      this.attach(image, 'image/png');
      console.log('Screenshot attached for failed scenario:', pickle.name);
    }
  } catch (error) {
    console.warn('Error capturing screenshot:', error);
  } finally {
    try {
      await page.close();
      await context.close();
    } catch (error) {
      console.warn('⚠️ Error while closing page/context:', error);
    }
  }



});

AfterAll(async () => {
  console.log('Close browser once after all scenarios');
  await browser.close();
});

