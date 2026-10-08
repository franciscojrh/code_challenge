import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { testData } from '../data/testData.js';

// ─── When ────────────────────────────────────────────────────────────────────

When('I navigate to the cart page', async () => {
    await HomePage.clickCartNavLink();
    await CartPage.waitForCartToLoad();
    // Allow cart items to fully render after async fetch
    await browser.pause(2000);
});

When('I click the {string} button', async (buttonText) => {
    if (buttonText === 'Place Order') {
        await CheckoutPage.clickPlaceOrderButton();
    } else if (buttonText === 'Purchase') {
        await CheckoutPage.clickPurchaseButton();
    }
});

When('I fill in the order form with valid details', async () => {
    const { orderDetails } = testData;
    await CheckoutPage.fillOrderForm(orderDetails);
});

// ─── Then ────────────────────────────────────────────────────────────────────

Then('the confirmation pop-up should be displayed', async () => {
    await CheckoutPage.waitForConfirmationPopUp();
    const isDisplayed = await CheckoutPage.confirmationPopUp.isDisplayed();
    expect(isDisplayed).toBe(true);
});

Then('the confirmation pop-up title should contain {string}', async (expectedText) => {
    const title = await CheckoutPage.getConfirmationTitle();
    expect(title).toContain(expectedText);
});

Then('the confirmation pop-up should display purchase details', async () => {
    const bodyText = await CheckoutPage.getConfirmationBodyText();
    // The pop-up body includes: Id, Amount, Card No., Name, Date
    // Verify at least a few key labels are present
    expect(bodyText).toContain('Id:');
    expect(bodyText).toContain('Amount:');
    expect(bodyText).toContain('Card Number:');
    expect(bodyText).toContain('Name:');
    expect(bodyText).toContain('Date:');
});

When('I click the {string} button on the confirmation pop-up', async (buttonText) => {
    await CheckoutPage.clickConfirmationOk();
});

Then('I should be redirected to the home page', async () => {
    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            return url.includes('demoblaze.com');
        },
        { timeout: 10000, timeoutMsg: 'Expected to be on the DemoBlaze home page after purchase' }
    );
    const url = await browser.getUrl();
    expect(url).toContain('demoblaze.com');
});
