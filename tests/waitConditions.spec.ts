import { expect, test } from "../setup/fixtures";

test('Wait for element to be visible', async ({waitConditionsPage}) => {
    await waitConditionsPage.clickVisibilityTriggerButton();
    await waitConditionsPage.clickVisibilityTargetButton();
    await expect(waitConditionsPage.visibilityPopoverHeader).toBeVisible();
    await expect(waitConditionsPage.visibilityPopoverHeader).toHaveText('Can you see me?');
    await expect(waitConditionsPage.visibilityPopoverBody).toBeVisible();
    await expect(waitConditionsPage.visibilityPopoverBody).toHaveText('I just removed my invisibility cloak!!');
})