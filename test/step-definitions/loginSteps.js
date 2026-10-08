import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import { testData } from '../data/testData.js';

// ─── Given ───────────────────────────────────────────────────────────────────

Given('I am on the DemoBlaze home page', async () => {
    await HomePage.navigate();
});

// ─── When ────────────────────────────────────────────────────────────────────

When('I click on the {string} button in the navigation bar', async (buttonText) => {
    await HomePage.clickLoginNavLink();
});

When('I enter my username and password', async () => {
    const { username, password } = testData.users.validUser;
    await LoginPage.waitForModalToBeVisible();
    await LoginPage.enterUsername(username);
    await LoginPage.enterPassword(password);
});

When('I click the {string} submit button', async (buttonText) => {
    await LoginPage.clickLoginButton();
    // Wait for the modal to fully close (Bootstrap animation) after a successful login.
    // If credentials are wrong, DemoBlaze shows an alert — catch and re-throw with a clear message.
    try {
        await browser.pause(500);
        // Accept any error alert (e.g. "Wrong password.") and fail the step explicitly
        const alertText = await browser.getAlertText().catch(() => null);
        if (alertText) {
            await browser.acceptAlert();
            throw new Error(`Login failed — DemoBlaze alert: "${alertText}"`);
        }
        // Wait for the modal backdrop to disappear
        await $('#logInModal').waitForDisplayed({ timeout: 8000, reverse: true });
    } catch (e) {
        if (e.message.startsWith('Login failed')) throw e;
        // If waitForDisplayed times out, the modal is still open — re-throw descriptively
        throw new Error(`Login modal did not close. Check credentials in test/data/testData.js. Original error: ${e.message}`);
    }
});

// ─── Then ────────────────────────────────────────────────────────────────────

Then('I should be logged in successfully', async () => {
    const isLoggedIn = await HomePage.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);
});

Then('I should see my username displayed in the navigation bar', async () => {
    const welcomeText = await HomePage.getLoggedInUserText();
    expect(welcomeText).toContain(testData.users.validUser.username);
});
