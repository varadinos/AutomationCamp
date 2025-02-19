import { test, expect } from "../setup/fixtures";

test('Click button 1 in frame 1 and verify that button 1 is clicked', async ({frameInteractionsPage}) => {
    await expect(frameInteractionsPage.frameOneButton).toHaveText('Click Me 1')
    await frameInteractionsPage.frameOneButton.click();
    await expect(frameInteractionsPage.frameOneButton).toHaveText('Clicked');
})

test('Click button 2 in frame 2 and verify that button 2 is clicked', async ({frameInteractionsPage}) => {
    await expect(frameInteractionsPage.frameTwoButton).toHaveText('Click Me 2')
    await frameInteractionsPage.frameTwoButton.click();
    await expect(frameInteractionsPage.frameTwoButton).toHaveText('Clicked');
})

test('Click button 4 in frame 4 and verify that button 4 is clicked', async ({frameInteractionsPage}) => {
    await expect(frameInteractionsPage.frameFourButton).toHaveText('Click Me 4')
    await frameInteractionsPage.frameFourButton.click();
    await expect(frameInteractionsPage.frameFourButton).toHaveText('Clicked');
})