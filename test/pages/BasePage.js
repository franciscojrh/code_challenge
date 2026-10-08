/**
 * Base Page Object
 * Contains common methods and properties shared across all page objects.
 */
export default class BasePage {
    /**
     * Navigate to a given URL path
     * @param {string} path - relative or absolute URL
     */
    async open(path) {
        await browser.url(path);
    }

    /**
     * Wait for an element to be displayed
     * @param {WebdriverIO.Element} element
     * @param {number} timeout - ms to wait (default 10000)
     */
    async waitForDisplayed(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for an element to be clickable
     * @param {WebdriverIO.Element} element
     * @param {number} timeout - ms to wait (default 10000)
     */
    async waitForClickable(element, timeout = 10000) {
        await element.waitForClickable({ timeout });
    }

    /**
     * Safely click an element after waiting for it to be clickable
     * @param {WebdriverIO.Element} element
     */
    async safeClick(element) {
        await this.waitForClickable(element);
        await element.click();
    }

    /**
     * Safely set a value in an input field
     * @param {WebdriverIO.Element} element
     * @param {string} value
     */
    async safeSetValue(element, value) {
        await this.waitForDisplayed(element);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Accept a browser alert dialog
     */
    async acceptAlert() {
        await browser.acceptAlert();
    }

    /**
     * Get the text of the current browser alert
     * @returns {Promise<string>}
     */
    async getAlertText() {
        return await browser.getAlertText();
    }
}
