
import { Page, Locator } from '@playwright/test';

export class BugsFormPage {
    readonly page: Page;

    // -------- Locators --------
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly countryDropdown: Locator;
    readonly termsCheckbox: Locator;
    readonly submitButton: Locator;

    // Validation / Messages
    readonly alertMessage: Locator;


    constructor(page: Page) {
        if (!page) throw new Error('Page is undefined!');
        this.page = page;


        // Input fields
        this.firstNameInput = this.page.locator('#firstName');
        this.lastNameInput = this.page.locator('#lastName');
        this.emailInput = this.page.getByPlaceholder('Enter email');
        this.phoneInput = this.page.getByPlaceholder('Enter phone number');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.countryDropdown = this.page.locator('#countries_dropdown_menu');

        // Checkbox & button
        this.termsCheckbox = this.page.locator('#exampleCheck1');
        this.submitButton = this.page.locator('button[type="submit"]');

        // Messages
        this.alertMessage = this.page.locator('.alert');

    }

    // -------- Actions --------
    async navigate() {
        await this.page.goto('https://qa-practice.netlify.app/bugs-form');
        await this.submitButton.waitFor({ state: 'visible' });
    }

    async enterFirstName(firstName: string) {
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameInput.waitFor({ state: 'visible' });
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async enterPhone(phone: string) {
        await this.phoneInput.waitFor({ state: 'visible' });
        await this.phoneInput.click();
        await this.phoneInput.fill(phone);
    }

    async enterPassword(password: string) {
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
    }

    async selectCountry(country: string) {
        await this.countryDropdown.selectOption({ label: country });
    }

    async acceptTerms() {
        const enabled = await this.termsCheckbox.isEnabled();
        if (enabled) {
            await this.termsCheckbox.check();
        } else {
            throw new Error('Terms checkbox is not enabled');
        }
    }

    async submitForm() {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }

    async getAlertMessage(): Promise<string | null> {
        await this.waitForAlert();
        return await this.alertMessage.textContent();
    }

    // -------- Composite Action --------
    async fillValidForm(data: {
        firstName: string;
        lastName: string;
        phone: string;
        country: string;
        email: string;
        password: string;
    }) {
        await this.enterFirstName(data.firstName);
        await this.enterLastName(data.lastName);
        await this.enterPhone(data.phone);
        await this.selectCountry(data.country);
        await this.enterEmail(data.email);
        await this.enterPassword(data.password);
    }

    async waitForAlert() {
        await this.alertMessage.waitFor({ state: 'visible', timeout: 5000 }); // waits max 5 seconds
    }
}