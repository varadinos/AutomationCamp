import { expect, type Locator, type Page } from '@playwright/test';

export class WaitConditionsPage {
    readonly page: Page;
    readonly url: string;
    readonly visibilityTriggerButton: Locator;
    readonly visibilityTargetButton: Locator;
    readonly visibilityPopoverHeader: Locator;
    readonly visibilityPopoverBody: Locator;


    constructor (page: Page) {
        this.page = page;
        this.url = 'https://play1.automationcamp.ir/expected_conditions.html';
        this.visibilityTriggerButton = page.locator('#visibility_trigger');
        this.visibilityTargetButton = page.locator('#visibility_target');
        this.visibilityPopoverHeader = page.getByRole('heading', { name: 'Can you see me?' });
        this.visibilityPopoverBody = page.getByText('I just removed my invisibility cloak!!');
    }

    async goTo(): Promise<void> {
        this.page.goto(this.url);
    }
    
    async clickVisibilityTriggerButton(): Promise <void> {
        await this.visibilityTriggerButton.waitFor({state: 'visible'});
        await this.visibilityTriggerButton.click();
    }

    async clickVisibilityTargetButton(): Promise<void> {
        await this.visibilityTargetButton.waitFor({state: 'visible'});
        await this.visibilityTargetButton.click();
    }

}