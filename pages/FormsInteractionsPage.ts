import { expect, type Locator, type Page } from '@playwright/test';
import fs from "fs/promises";

export class FormsInteractionsPage {
    readonly page: Page;
    readonly url: string;
    readonly singleUploadButton: Locator;
    readonly multipleUploadButton: Locator;
    readonly validateSingleUpload: Locator;
    readonly validateMultipleUpload: Locator;
    readonly downloadFile: Locator;
    

    constructor (page: Page) {
        this.page = page;
        this.url = '/forms.html';
        this.singleUploadButton = page.locator('#upload_cv');
        this.multipleUploadButton = page.locator('#upload_files');
        this.validateSingleUpload = page.locator('#validate_cv');
        this.validateMultipleUpload = page.locator('#validate_files');
        this.downloadFile = page.getByText('Click here to Download');
    
    }

    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    async deleteDownloadedFiles(filePath: string): Promise<void> {
        try {
            await fs.access(filePath); // Check if file exists
            await fs.unlink(filePath); // Delete file
            console.log(`Deleted: ${filePath}`);
        } catch (error) {
            console.warn(`File not found or already deleted: ${filePath}`);
        }
    
    }

}