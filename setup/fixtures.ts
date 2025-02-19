import {test as base} from '@playwright/test';
import playwright from 'playwright';

import { HomePage } from '../pages/HomePage';
import { AdvancedTopicsPage } from '../pages/AdvancedTopicsPage';
import { MouseEventsPage } from '../pages/MouseEventsPage';
import { FrameInteractionsPage } from '../pages/FrameInteractionsPage';

type Fixtures = {
    homePage: HomePage;
    advancedTopicsPage: AdvancedTopicsPage;
    mouseEventsPage: MouseEventsPage;
    frameInteractionsPage: FrameInteractionsPage;
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
        await advancedTopicsPage.goTo();
        await page.waitForLoadState('load'); // Wait for all resources to load
        await page.waitForLoadState('networkidle'); // Ensure no ongoing requests
        await use(advancedTopicsPage);
    },

    mouseEventsPage: async ({page}, use) => {
        const mouseEventsPage = new MouseEventsPage(page);
        await mouseEventsPage.goTo();
        await page.waitForLoadState('networkidle');
        await use(mouseEventsPage);
    },
    
    frameInteractionsPage: async({page}, use) => {
        const frameInteractionsPage = new FrameInteractionsPage(page);
        await frameInteractionsPage.goTo();
        await page.waitForLoadState('networkidle');
        await use(frameInteractionsPage);
    }

})

export { expect } from '@playwright/test';