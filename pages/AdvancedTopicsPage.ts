import { expect, type Locator, type Page } from '@playwright/test';

export class AdvancedTopicsPage {
    readonly page: Page;
    readonly starRating: Locator;
    readonly ratingTxtField: Locator;
    readonly checkRatingButton: Locator;
    readonly wellDoneLabel: Locator;
    readonly url: string;

    constructor (page: Page) {
        this.page = page;
        this.starRating = page.locator('label[class="star-rating"]');
        this.ratingTxtField = page.locator('#txt_rating');
        this.checkRatingButton = page.getByRole('button', { name: 'Check Rating' });
        this.wellDoneLabel = page.getByText('Well done!', { exact: true });
        this.url = 'https://play1.automationcamp.ir/advanced.html';
    }


    //Go to Advanced Topics page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Get star rating value from locator
    async getStarRatingValue(locator: Locator): Promise<string> {
        //await locator.waitFor({state: 'visible'});
        return await locator.evaluate(el => 
            window.getComputedStyle(el, '::after').content);
    }

    //Set star rating value after getting it from locator
    async setStarRatingValue(locator: Locator): Promise<void> {
        //getting the star rating value
        const starRatingRawValue = await this.getStarRatingValue(locator);
        //removing quotes from the value
        const cleanStarRatingValue = starRatingRawValue.replace(/['"]/g, "");
    
        let starRatingValue = cleanStarRatingValue;
        //await this.ratingTxtField.waitFor({ state: 'visible' }); // Ensure it's visible
        await this.ratingTxtField.fill(starRatingValue);
    }
    
}