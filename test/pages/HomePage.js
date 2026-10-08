import BasePage from './BasePage.js';

/**
 * HomePage Page Object
 * Encapsulates all elements and actions on the DemoBlaze home page.
 * URL: https://www.demoblaze.com/index.html
 */
class HomePage extends BasePage {

    // ─── Selectors ───────────────────────────────────────────────────────────

    /** Navigation bar "Log in" link */
    get loginNavLink() {
        return $('#login2');
    }

    /** Navigation bar "Cart" link */
    get cartNavLink() {
        return $('#cartur');
    }

    /** Welcome / logged-in username label in the navbar */
    get loggedInUserLabel() {
        return $('#nameofuser');
    }

    /** First product card on the home page ($$()[0] avoids StrictSelectorError) */
    get firstProduct() {
        return $$('.card-title a')[0];
    }

    /**
     * Get a product card link by product name
     * @param {string} productName
     * @returns {WebdriverIO.Element}
     */
    getProductByName(productName) {
        return $(`//a[contains(text(),'${productName}')]`);
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    /**
     * Navigate to the DemoBlaze home page
     */
    async navigate() {
        await this.open('https://www.demoblaze.com/index.html');
    }

    /**
     * Click the "Log in" link in the navigation bar to open the login modal
     */
    async clickLoginNavLink() {
        await this.safeClick(this.loginNavLink);
    }

    /**
     * Click the Cart link in the navigation bar
     */
    async clickCartNavLink() {
        await this.safeClick(this.cartNavLink);
    }

    /**
     * Click the first available product on the home page
     */
    async clickFirstProduct() {
        const first = (await $$('.card-title a'))[0];
        await first.waitForDisplayed();
        await first.click();
    }

    /**
     * Click a product by its name
     * @param {string} productName
     */
    async clickProductByName(productName) {
        const product = this.getProductByName(productName);
        await this.waitForDisplayed(product);
        await this.safeClick(product);
    }

    /**
     * Check whether the logged-in username label is displayed
     * @returns {Promise<boolean>}
     */
    async isUserLoggedIn() {
        try {
            await this.loggedInUserLabel.waitForDisplayed({ timeout: 5000 });
            return await this.loggedInUserLabel.isDisplayed();
        } catch {
            return false;
        }
    }

    /**
     * Get the displayed welcome text (e.g. "Welcome admin")
     * @returns {Promise<string>}
     */
    async getLoggedInUserText() {
        await this.waitForDisplayed(this.loggedInUserLabel);
        return await this.loggedInUserLabel.getText();
    }
}

export default new HomePage();
