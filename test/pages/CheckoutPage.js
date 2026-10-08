import BasePage from './BasePage.js';

/**
 * CheckoutPage Page Object
 * Encapsulates all elements and actions within the "Place Order" modal
 * and the post-purchase confirmation pop-up on the DemoBlaze application.
 *
 * DemoBlaze purchase flow:
 *   Cart page → "Place Order" button → Order modal (fill form) →
 *   "Purchase" button → Confirmation pop-up (sweet-alert) → "OK" button
 */
class CheckoutPage extends BasePage {

    // ─── Place Order Modal Selectors ──────────────────────────────────────────

    /** "Place Order" button on the cart page */
    get placeOrderButton() {
        return $('button[data-target="#orderModal"]');
    }

    /** Order modal container */
    get orderModal() {
        return $('#orderModal');
    }

    /** Name field inside the order modal */
    get nameInput() {
        return $('#name');
    }

    /** Country field inside the order modal */
    get countryInput() {
        return $('#country');
    }

    /** City field inside the order modal */
    get cityInput() {
        return $('#city');
    }

    /** Credit card number field inside the order modal */
    get creditCardInput() {
        return $('#card');
    }

    /** Credit card expiry month field inside the order modal */
    get monthInput() {
        return $('#month');
    }

    /** Credit card expiry year field inside the order modal */
    get yearInput() {
        return $('#year');
    }

    /** "Purchase" submit button inside the order modal */
    get purchaseButton() {
        return $('#orderModal .btn-primary');
    }

    // ─── Confirmation Pop-Up Selectors (SweetAlert) ───────────────────────────

    /**
     * SweetAlert confirmation dialog shown after a successful purchase.
     * DemoBlaze renders this as a div with class "sweet-alert".
     */
    get confirmationPopUp() {
        return $('.sweet-alert');
    }

    /** Heading text inside the confirmation pop-up (e.g. "Thank you for your purchase!") */
    get confirmationTitle() {
        return $('.sweet-alert h2');
    }

    /** Body paragraph inside the confirmation pop-up (contains Id, Amount, Card, Name, Date) */
    get confirmationBody() {
        return $('.sweet-alert p.lead');
    }

    /** "OK" button inside the confirmation pop-up */
    get confirmationOkButton() {
        return $('.sweet-alert .confirm');
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    /**
     * Wait for the Place Order modal to be visible
     */
    async waitForOrderModalToBeVisible() {
        await this.orderModal.waitForDisplayed({ timeout: 10000 });
    }

    /**
     * Click the "Place Order" button on the cart page to open the order modal
     */
    async clickPlaceOrderButton() {
        await this.safeClick(this.placeOrderButton);
    }

    /**
     * Fill in all fields of the Place Order form
     * @param {{ name: string, country: string, city: string, creditCard: string, month: string, year: string }} orderDetails
     */
    async fillOrderForm({ name, country, city, creditCard, month, year }) {
        await this.waitForOrderModalToBeVisible();
        await this.safeSetValue(this.nameInput, name);
        await this.safeSetValue(this.countryInput, country);
        await this.safeSetValue(this.cityInput, city);
        await this.safeSetValue(this.creditCardInput, creditCard);
        await this.safeSetValue(this.monthInput, month);
        await this.safeSetValue(this.yearInput, year);
    }

    /**
     * Click the "Purchase" submit button inside the order modal
     */
    async clickPurchaseButton() {
        await this.safeClick(this.purchaseButton);
    }

    /**
     * Wait for the SweetAlert confirmation pop-up to be displayed
     */
    async waitForConfirmationPopUp() {
        await this.confirmationPopUp.waitForDisplayed({ timeout: 15000 });
    }

    /**
     * Get the title text from the confirmation pop-up
     * @returns {Promise<string>}
     */
    async getConfirmationTitle() {
        await this.waitForConfirmationPopUp();
        return await this.confirmationTitle.getText();
    }

    /**
     * Get the body/detail text from the confirmation pop-up
     * (contains order Id, Amount, Card, Name, Date)
     * @returns {Promise<string>}
     */
    async getConfirmationBodyText() {
        await this.waitForConfirmationPopUp();
        return await this.confirmationBody.getText();
    }

    /**
     * Click the "OK" button to dismiss the confirmation pop-up
     */
    async clickConfirmationOk() {
        await this.safeClick(this.confirmationOkButton);
    }

    /**
     * Complete the entire Place Order -> Purchase -> Confirm flow in one call.
     * @param {{ name: string, country: string, city: string, creditCard: string, month: string, year: string }} orderDetails
     * @returns {Promise<{ title: string, body: string }>} - text from the confirmation pop-up
     */
    async completePurchase(orderDetails) {
        await this.fillOrderForm(orderDetails);
        await this.clickPurchaseButton();
        await this.waitForConfirmationPopUp();
        const title = await this.getConfirmationTitle();
        const body = await this.getConfirmationBodyText();
        return { title, body };
    }
}

export default new CheckoutPage();
