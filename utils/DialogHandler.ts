// Dialog handler for alerts, prompts etc.
import { Page } from '@playwright/test';

export class DialogHandler {

async handleDialog(page: Page, dialogAction: 'accept' | 'dismiss'): Promise<void> {
    // Attach dialog event listener
    page.on('dialog', dialog => {
        if (dialogAction === 'accept') {
            dialog.accept();
        } else if (dialogAction === 'dismiss') {
            dialog.dismiss();
        }
    });
  }

}
