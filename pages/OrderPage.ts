import { Page } from '@playwright/test';

export class OrderPage {
  constructor(private page: Page) {}

  async addBookAndCheckout() {
    await this.page.locator('table[width="300"] a').first().click();
    await this.page.locator('a[href*="add_to_cart.py"]').first().click();
    await this.page.locator('a[href*="shopping_cart.py"]').click();
    await this.page.locator('input[name="q"]:visible').fill('5');
    await this.page.getByRole('button', { name: 'Update' }).click();
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  }
}
