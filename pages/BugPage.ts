import { Page, expect } from '@playwright/test';

 
export class BugPage {
    constructor(private page: Page) { }
 
    async submitBug(summary: string, description: string, resolution: string = '1') {
        await this.page.locator('input[name="summary"]').fill(summary);
        await this.page.locator('textarea[name="description"]').fill(description);
        await this.page.selectOption('select[name="severity"]', '1');
        await this.page.selectOption('select[name="priority"]', '1');
        await this.page.selectOption('select[name="assigned_to"]', '6');
        await this.page.selectOption('select[name="resolution"]', resolution);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
 
    // async getResolutionOptions() {
    //     const select = this.page.locator('select[name="resolution"]');
    //     const count = await select.locator('option').count();
    //     const options = [];
    //     for (let i = 0; i < count; i++) {
    //         const option = select.locator('option').nth(i);
    //         const value = await option.getAttribute('value');
    //         const text = await option.textContent();
    //         options.push({ value, text: text?.trim() });
    //     }
    //     return options;
    // }
 
    async populateResolutionOptions() {
        // const options = await this.getResolutionOptions();
        // // in stringify, the 3rd parameter is for indentation with 2 spaces
        // const fileContent = `export const resolutionOptions = ${JSON.stringify(options, null, 2)};`;
        // const filePath = path.join(__dirname, '..', 'dropDownListValues.ts');
        // fs.writeFileSync(filePath, fileContent, 'utf8');
 
        const select = this.page.locator('select[name="resolution"]');
        const count = await select.locator('option').count();
        // const options = [];
        for (let i = 0; i < count; i++) {
            const option = select.locator('option').nth(i);
            const value = await option.getAttribute('value');
            const text = await option.textContent();
            // options.push({ value, text: text?.trim() });
            console.log(`Value: ${value}, Text: ${text?.trim()}`);
        }
    }
 
    // async updateBug() {
    //   const viewBugLink = this.page.getByRole('link', { name: /View Bug/i }).first();
    //   await expect(viewBugLink).toBeVisible();
    //   await viewBugLink.click();
    //   await this.page.selectOption('select[name="assigned_to"]', '3');
    //   await this.page.selectOption('select[name="severity"]', '3');
    //   await this.page.selectOption('select[name="priority"]', '2');
    //   await this.page.getByRole('button', { name: 'Update bug' }).click();
    // }
}
 