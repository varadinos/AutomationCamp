import { expect, test } from "../setup/fixtures";

test('Click specific x/y location', async ({mouseEventsPage}) => {
    await mouseEventsPage.mouseOperationsArea.click({position: {x: 475, y: 32}});
    await expect(mouseEventsPage.clickLocationLeft).toHaveText('Left: 475');
    await expect(mouseEventsPage.clickLocationRight).toHaveText('Top: 31');
    await expect(mouseEventsPage.mouseOperation).toHaveText('Click');
})

test('Right click action', async ({mouseEventsPage}) => {
    await mouseEventsPage.mouseOperationsArea.click({button: 'right'});
    await expect(mouseEventsPage.mouseOperation).toHaveText('Right-Click');
})

test('Double click action', async ({mouseEventsPage}) => {
    await mouseEventsPage.mouseOperationsArea.dblclick();
    await expect(mouseEventsPage.mouseOperation).toHaveText('Double-Click');
})

test('Mouse hover over Choose Language button and click Python', async ({mouseEventsPage}) => {
    await mouseEventsPage.chooseLanguageButton.hover();
    await mouseEventsPage.pythonLanguage.click();
    await expect(mouseEventsPage.hoverValidate).toHaveText('Python');
})

test('Drag and drop element', async ({mouseEventsPage}) => {
    await mouseEventsPage.dragElement.dragTo(mouseEventsPage.dropArea);
    await expect(mouseEventsPage.dropMessage).toBeVisible();
})

test('Manually drag and drop element', async ({mouseEventsPage, page}) => {
    await mouseEventsPage.dragElement.hover();
    await page.mouse.down();
    await mouseEventsPage.dropArea.hover();
    await page.mouse.up();
    await expect(mouseEventsPage.dropMessage).toBeVisible();
})