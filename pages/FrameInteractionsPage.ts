import { type Locator, type Page } from '@playwright/test';

export class FrameInteractionsPage {
    readonly page: Page;
    readonly url: string;
    readonly frameOneButton: Locator;
    readonly frameTwoButton: Locator;
    readonly frameFourButton: Locator;



    constructor (page: Page){
        this.page = page;
        this.url = 'https://play1.automationcamp.ir/frames.html';
        this.frameOneButton = page.frameLocator('#frame1').locator('#click_me_1');
        this.frameTwoButton = page.frameLocator('#frame1').frameLocator('#frame2').locator('#click_me_2');
        this.frameFourButton = page.frameLocator('#frame1').frameLocator('#frame3')
        .frameLocator('#frame4').locator('#click_me_4');
    }

    async goTo():Promise<void> {
        await this.page.goto(this.url);
    }

}