import { test, expect } from '../setup/fixtures';

test('Submit book rating and verify "Well done!" message is displayed', async ({advancedTopicsPage}) => {
    await advancedTopicsPage.setStarRatingValue(advancedTopicsPage.starRating);
    await advancedTopicsPage.checkRatingButton.click();
    await expect(advancedTopicsPage.wellDoneLabel).toBeVisible();
    await expect(advancedTopicsPage.wellDoneLabel).toHaveText('Well done!');
});
