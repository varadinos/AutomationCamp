import { test, expect } from "../setup/fixtures";
import path from "path";
import fs from "fs";

test('Sngle file upload', async ({ formsInteractionsPage }) => {
    const filePath = path.resolve(__dirname, '../data/files/file1.pdf')
    await formsInteractionsPage.singleUploadButton.setInputFiles(filePath);
    await expect(formsInteractionsPage.validateSingleUpload).toBeVisible();
    await expect(formsInteractionsPage.validateSingleUpload).toHaveText('file1.pdf');
})

test('Multiple file upload', async ({ formsInteractionsPage }) => {
    const filePaths = [
        path.resolve(__dirname, '../data/files/file1.pdf'),
        path.resolve(__dirname, '../data/files/file2.pdf'),
        path.resolve(__dirname, '../data/files/file3.pdf')
    ];
    await formsInteractionsPage.multipleUploadButton.setInputFiles(filePaths);
    await expect(formsInteractionsPage.validateMultipleUpload).toBeVisible();
    await expect(formsInteractionsPage.validateMultipleUpload).toHaveText('file1.pdf file2.pdf file3.pdf');
});

test('Download file', async ({ formsInteractionsPage, page}) => {
    const downloadPromise = page.waitForEvent('download');
    await formsInteractionsPage.downloadFile.click();
    const download = await downloadPromise;
    
    //set where file to be saved and save it
    const downloadPath = path.join(__dirname, '../data/files', download.suggestedFilename());
    await download.saveAs(downloadPath);


    // Validate that the file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();


    // Deletes the file
    formsInteractionsPage.deleteDownloadedFiles(downloadPath);
})