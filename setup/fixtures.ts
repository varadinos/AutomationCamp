import {test as base} from '@playwright/test';
import playwright from 'playwright';

import { HomePage } from '../pages/HomePage';
import { AdvancedTopicsPage } from '../pages/AdvancedTopicsPage';

type Fixtures = {
    homePage: HomePage;
    advancedTopicsPage: AdvancedTopicsPage;
};

export const test = base.extend<Fixtures>({
    browser: async ({}, use) => {
        const browser = await playwright.chromium.launch({ headless: false, args: ['--start-maximized'] }); // For example, run with UI
        await use(browser);
        await browser.close();
      },
    
      // Page fixture that creates a new page and attaches it to a browser context
      page: async ({ browser }, use) => {
        const page = await browser.newPage();
        page.setViewportSize({width: 1920, height: 1040});  //Set the browser viewport size to 1920x1040px (windows start menu is 40px high)
        await use(page);
        await page.close();
      },

    homePage: async ({page}, use) => {
        const homePage = new HomePage();
        await use(homePage);
    },

    advancedTopicsPage: async ({page}, use) => {
        const advancedTopicsPage = new AdvancedTopicsPage(page);
        advancedTopicsPage.goTo();
        await use(advancedTopicsPage);
    }
})

export { expect } from '@playwright/test';