import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly url: string;

    constructor (page: Page) {
        this.page = page;
        this.url = 'https://play1.automationcamp.ir/index.html';
    }

    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

}