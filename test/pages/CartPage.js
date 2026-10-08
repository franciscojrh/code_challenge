import BasePage from './BasePage.js';

/**
 * CartPage Page Object
 * Encapsulates all elements and actions on the Shopping Cart page
 * in the DemoBlaze application.
 */
class CartPage extends BasePage {

    // ─── Selectors ───────────────────────────────────────────────────────────

    /** Cart page title heading */
    get cartTitle() {
        return $('h2.content-title');
    }

    /** Table body containing cart items */
    get cartTableBody() {
        return $('#tbodyid');
    }

    /** All cart item rows */
    get cartItemRows() {
        return $$('#tbodyid tr');
    }

    /** Total price element */
    get totalPrice() {
        return $('#totalp');
    }

    /** "Place Order" button */
    get placeOrderButton() {
        return $('button[data-target="#orderModal"]');
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    /**
     * Wait for the cart page to load and show items
     */
    async waitForCartToLoad() {
        await this.cartTableBody.waitForDisplayed({ timeout: 10000 });
    }

    /**
     * Get the number of items currently in the cart
     * @returns {Promise<number>}
     */
    async getCartItemCount() {
        await this.waitForCartToLoad();
        const rows = await this.cartItemRows;
        return rows.length;
    }

    /**
     * Get all product names listed in the cart
     * @returns {Promise<string[]>}
     */
    async getCartProductNames() {
        await this.waitForCartToLoad();
        // Give the cart a moment to fully render after navigation
        await browser.pause(1500);
        const rows = await this.cartItemRows;
        const names = [];
        for (const row of rows) {
            const nameCell = await row.$('td:nth-child(2)');
            if (nameCell) {
                names.push(await nameCell.getText());
            }
        }
        return names;
    }

    /**
     * Check whether a specific product name appears in the cart
     * @param {string} productName
     * @returns {Promise<boolean>}
     */
    async isProductInCart(productName) {
        const names = await this.getCartProductNames();
        return names.some(name => name.includes(productName));
    }
}

export default new CartPage();
