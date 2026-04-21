import { Page, expect } from '@playwright/test';

export class PortalPage {
  constructor(private page: Page) {}

  async openTestPortal() {
    const portal = this.page.getByRole('link', { name: 'Test Portal' }).first();
    await expect(portal).toBeVisible();
    await portal.click();
  }

  async openTrainingBTS() {
    const bts = this.page.getByRole('link', { name: 'Training BTS' });
    await expect(bts).toBeVisible();
    await bts.click();
  }

  async openSubmitBug() {
    const submitBug = this.page.getByRole('link', { name: 'Submit New Bug' });
    await expect(submitBug).toBeVisible();
    await submitBug.click();
  }

  async openCreditCardGenerator() {
    await this.page.getByRole('link', { name: 'Credit Card Generator' }).click();
  }
}