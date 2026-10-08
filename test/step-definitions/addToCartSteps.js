import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import ProductPage from '../pages/ProductPage.js';
import CartPage from '../pages/CartPage.js';
import { testData } from '../data/testData.js';

// Track the product name chosen during the test
let selectedProductName = '';

// ─── Given ───────────────────────────────────────────────────────────────────

Given('I am logged in with valid credentials', async () => {
    const { username, password } = testData.users.validUser;
    await HomePage.clickLoginNavLink();
    await LoginPage.login(username, password);

    // Poll until either a login-failure alert appears OR the modal has closed.
    // DemoBlaze's server response time varies — a fixed pause is not reliable.
    await browser.waitUntil(
        async () => {
            // Check for an error alert (e.g. "Wrong password.")
            const alertText = await browser.getAlertText().catch(() => null);
            if (alertText) {
                await browser.acceptAlert();
                throw new Error(
                    `Login failed — DemoBlaze alert: "${alertText}". ` +
                    `Update credentials in test/data/testData.js.`
                );
            }
            // Success: modal has been removed from the DOM / hidden
            const modalVisible = await $('#logInModal').isDisplayed().catch(() => false);
            return !modalVisible;
        },
        {
            timeout: 15000,
            interval: 500,
            timeoutMsg:
                'Login modal did not close after 15s. ' +
                'Check credentials in test/data/testData.js or DemoBlaze availability.'
        }
    );
});

// ─── When ────────────────────────────────────────────────────────────────────

When('I click on a product from the home page', async () => {
    // Use $$()[0] — $() throws StrictSelectorError when selector matches multiple elements
    const products = await $$('.card-title a');
    selectedProductName = await products[0].getText();
    await HomePage.clickFirstProduct();
});

When('I click the {string} button on the product page', async (buttonText) => {
    await ProductPage.waitForPageToLoad();
    await ProductPage.clickAddToCartButton();
});

When('I accept the confirmation alert', async () => {
    // Wait for the browser alert to appear then accept it
    await browser.pause(2000);
    //Sometimes the pop-up alert doesn't appear, so we need to check if it exists before accepting it
    browser.on('dialog', async (dialog) => {
        await dialog.accept(); // Clicks OK
    });
});

// ─── Then ────────────────────────────────────────────────────────────────────

Then('the product should be added to my cart', async () => {
    // Navigate to the cart to verify the item was added
    await HomePage.clickCartNavLink();
    await CartPage.waitForCartToLoad();
    // Give cart extra time to render items fetched asynchronously
    await browser.pause(2000);
    const itemCount = await CartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
});

Then('I should see the product listed in the cart', async () => {
    const productNames = await CartPage.getCartProductNames();
    expect(productNames.length).toBeGreaterThan(0);

    // If we captured the product name, do a targeted assertion
    if (selectedProductName) {
        const found = productNames.some(name =>
            name.toLowerCase().includes(selectedProductName.toLowerCase())
        );
        expect(found).toBe(true);
    }
});