import { Page, expect } from "@playwright/test";

export class HomePage {
    constructor(private page: Page) { }

    async open() {
        await this.page.goto("https://www.sharelane.com/");
    }

    async clickEnter() {
        const enter = this.page.getByRole("link", { name: "ENTER" });  
        await expect(enter).toBeVisible();
        await enter.click();
    }
}


