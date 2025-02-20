import { expect, test } from "../setup/fixtures";

test('Trigger visibility and verify element appears with correct text', async ({waitConditionsPage}) => {
    await waitConditionsPage.clickVisibilityTriggerButton();
    await waitConditionsPage.clickVisibilityTargetButton();
    await expect(waitConditionsPage.visibilityPopoverHeader).toBeVisible();
    await expect(waitConditionsPage.visibilityPopoverHeader).toHaveText('Can you see me?');
    await expect(waitConditionsPage.visibilityPopoverBody).toBeVisible();
    await expect(waitConditionsPage.visibilityPopoverBody).toHaveText('I just removed my invisibility cloak!!');
})