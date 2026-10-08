import BasePage from './BasePage.js';

/**
 * LoginPage Page Object
 * Encapsulates all elements and actions within the Login modal dialog
 * on the DemoBlaze application.
 */
class LoginPage extends BasePage {

    // ─── Selectors ───────────────────────────────────────────────────────────

    /** Login modal container */
    get loginModal() {
        return $('#logInModal');
    }

    /** Username input field inside the login modal */
    get usernameInput() {
        return $('#loginusername');
    }

    /** Password input field inside the login modal */
    get passwordInput() {
        return $('#loginpassword');
    }

    /** "Log in" submit button inside the login modal */
    get loginSubmitButton() {
        return $('#logInModal .btn-primary');
    }

    /** Close (X) button of the login modal */
    get loginModalCloseButton() {
        return $('#logInModal .close');
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    /**
     * Wait for the login modal to be visible
     */
    async waitForModalToBeVisible() {
        await this.loginModal.waitForDisplayed({ timeout: 5000 });
    }

    /**
     * Enter a value in the username field
     * @param {string} username
     */
    async enterUsername(username) {
        await this.safeSetValue(this.usernameInput, username);
    }

    /**
     * Enter a value in the password field
     * @param {string} password
     */
    async enterPassword(password) {
        await this.safeSetValue(this.passwordInput, password);
    }

    /**
     * Click the "Log in" submit button
     */
    async clickLoginButton() {
        await this.safeClick(this.loginSubmitButton);
    }

    /**
     * Perform a complete login flow:
     * enter credentials and submit the form.
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
        await this.waitForModalToBeVisible();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Close the login modal by clicking the X button
     */
    async closeModal() {
        await this.safeClick(this.loginModalCloseButton);
    }
}

export default new LoginPage();
