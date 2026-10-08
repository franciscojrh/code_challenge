import BasePage from './BasePage.js';

/**
 * ProductPage Page Object
 * Encapsulates all elements and actions on a product detail page
 * in the DemoBlaze application.
 */
class ProductPage extends BasePage {

    // ─── Selectors ───────────────────────────────────────────────────────────

    /** Product name / title heading */
    get productTitle() {
        return $('.name');
    }

    /** Product price text */
    get productPrice() {
        return $('.price-container');
    }

    /** "Add to cart" button – onclick value changes per product (e.g. addToCart(1)) */
    get addToCartButton() {
        return $('a.btn-success[onclick*="addToCart"]');
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    /**
     * Wait for the product detail page to load
     */
    async waitForPageToLoad() {
        await this.waitForDisplayed(this.productTitle);
    }

    /**
     * Get the name of the current product
     * @returns {Promise<string>}
     */
    async getProductTitle() {
        await this.waitForPageToLoad();
        return await this.productTitle.getText();
    }

    /**
     * Click the "Add to cart" button
     */
    async clickAddToCartButton() {
        await this.waitForDisplayed(this.addToCartButton);
        await this.safeClick(this.addToCartButton);
    }

    /**
     * Add the current product to the cart and accept the confirmation alert.
     * @returns {Promise<string>} - the alert message text
     */
    async addToCartAndAccept() {
        await this.clickAddToCartButton();
        // Wait a moment for the alert to appear
        await browser.pause(1000);
        const alertText = await this.getAlertText();
        await this.acceptAlert();
        return alertText;
    }
}

export default new ProductPage();
