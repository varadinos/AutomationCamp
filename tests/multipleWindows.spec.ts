import { test, expect } from '../setup/fixtures';

test('Multi window automation with tab closing', async ({ multipleWindowsPage, page}) => {
    const newTab1 = await multipleWindowsPage.openNewTab(multipleWindowsPage.openNewWindow1);
    await newTab1.click('#click_me_2');
    await expect(newTab1.locator('#click_me_2')).toHaveText('Clicked');
    await multipleWindowsPage.closeTabAndReturnToMain(newTab1);

    const newTab2 = await multipleWindowsPage.openNewTab(multipleWindowsPage.openNewWindow2);
    await newTab2.click('#click_me_4');
    await expect(newTab2.locator('#click_me_4')).toHaveText('Clicked');
    await multipleWindowsPage.closeTabAndReturnToMain(newTab2);

    await expect(page).toHaveTitle('Multiple Windows');
})