import { test, expect } from '../setup/fixtures';
import { AdvancedTopicsPage } from "../pages/AdvancedTopicsPage";

test('Verify book rating submission displays Well done message', async ({advancedTopicsPage}) => {
    await advancedTopicsPage.setStarRatingValue(advancedTopicsPage.starRating);
    await advancedTopicsPage.checkRatingButton.click();
    await expect(advancedTopicsPage.wellDoneLabel).toBeVisible();
    await expect(advancedTopicsPage.wellDoneLabel).toHaveText('Well done!');
});
