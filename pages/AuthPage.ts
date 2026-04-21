import { Page, expect } from '@playwright/test';

export class AuthPage {
    constructor(private page: Page) { }

    async createAccountAutoLogin() {
        await this.page.getByRole('link', { name: 'Create new account' }).click();
        await this.page.getByRole('button', { name: 'Auto Login' }).click();
    }

    async signUp(zip: string, first: string, last: string, email: string, password: string) {
        await this.page.getByRole('link', { name: 'Sign up' }).click();
        await this.page.locator('input[name="zip_code"]').fill(zip);
        await this.page.getByRole('button', { name: 'Continue' }).click();

        await this.page.locator('input[name="first_name"]').fill(first);
        await this.page.locator('input[name="last_name"]').fill(last);
        await this.page.locator('input[name="email"]').fill(email);
        await this.page.locator('input[name="password1"]').fill(password);
        await this.page.locator('input[name="password2"]').fill(password);
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    async getCredentials() {
        return {
            email: await this.page.locator('td:has-text("Email")+td').innerText(),
            password: await this.page.locator('td:has-text("Password")+td').innerText()
        };
    }

    async login(email: string, password: string) {
        await this.page.goto('https://www.sharelane.com/cgi-bin/main.py');
        await this.page.fill('input[name="email"]', email);
        await this.page.fill('input[name="password"]', password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async successStatus() {
        // placeholder for future sign-in status assertions
    }

    async expectSignUpSuccess(expectedMessage: string) {
        await expect(this.page.locator('.confirmation_message')).toHaveText(expectedMessage);
    }

    async expectSignUpFailure(expectedError: string) {
        await expect(this.page.locator('.error_message')).toHaveText(expectedError);
    }
}
