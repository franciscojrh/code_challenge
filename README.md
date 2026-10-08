# Code Challenge

## Application Overview

Automation Framework for an e-commerce web application built with **JavaScript** and **WebdriverIO**.

**Application URL:** https://www.demoblaze.com/index.html

---

## Scenario

You have been provided with a simple e-commerce web application.
Users can add, edit, and delete products from the cart. The task is to create a suite of
automated tests that validate the **login** and **add products to cart** functionality.

---

## Features

- **Log In:** Existing users can log in to the application by clicking on the **"Log In"** button.
- **Add Product to Cart:** Users can add products to the cart by selecting a product and clicking the **"Add To Cart"** button.

---

## Tech Stack & Requirements

| Requirement | Tool / Version |
|---|---|
| Programming Language | JavaScript (ES Modules) |
| Runtime Environment | Node.js `22.19.0` |
| Automation Tool | WebdriverIO `^10.0.2` |
| BDD Framework | Cucumber (`@wdio/cucumber-framework ^10.0.0`) |
| Design Pattern | Page Object Model (POM) |
| Reporter (HTML) | HTML Nice Reporter (`wdio-html-nice-reporter ^8.1.7`) |
| Reporter (Allure) | `@wdio/allure-reporter ^10.0.1` + `allure-commandline ^2.46.1` |
| Browser | Google Chrome (latest) |

---

## Project Structure

```
Code_Challenge/
├── wdio.conf.js                         # WebdriverIO configuration (Cucumber + HTML reporter)
├── package.json                         # Project dependencies and npm scripts
├── reports/                             # HTML test reports (auto-generated after a run)
└── test/
    ├── features/                        # Gherkin feature files (BDD scenarios)
    │   ├── login.feature                # Scenario: Successful login
    │   ├── addToCart.feature            # Scenario: Add product to cart
    │   └── purchase.feature             # Scenario: Complete purchase flow + confirmation pop-up
    ├── step-definitions/                # Cucumber step implementations (glue code)
    │   ├── loginSteps.js
    │   ├── addToCartSteps.js
    │   └── purchaseSteps.js             # Steps for the checkout and confirmation pop-up
    ├── pages/                           # Page Object Model classes
    │   ├── BasePage.js                  # Shared helpers: safeClick, waitForDisplayed, etc.
    │   ├── HomePage.js                  # Home page: navbar links, product cards
    │   ├── LoginPage.js                 # Login modal: username, password, submit
    │   ├── ProductPage.js               # Product detail page: Add to cart button
    │   ├── CartPage.js                  # Cart page: item rows, product name lookup
    │   └── CheckoutPage.js              # Place Order modal + SweetAlert confirmation pop-up
    └── data/
        └── testData.js                  # Centralised test data (credentials, URLs, orderDetails)
```

---

## Prerequisites

1. **Node.js** `22.19.0` — [Download](https://nodejs.org/)
2. **Google Chrome** (latest stable version) installed on your machine.
3. A **valid DemoBlaze account** — register at https://www.demoblaze.com → click **Sign up**.

---

## Setup

### 1. Clone / Download the project

```bash
git clone git@github.com:franciscojrh/code_challenge.git
cd Code_Challenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure test credentials

Open `test/data/testData.js` and replace the placeholder values with your DemoBlaze account:

```js
export const testData = {
    users: {
        validUser: {
            username: 'YOUR_USERNAME',   // ← your DemoBlaze username - review test/data info
            password: 'YOUR_PASSWORD'   // ← your DemoBlaze password - review test/data info
        }
    },
    ...
};
```

> **Note:** The account must already exist in DemoBlaze. Self-registration is available from the app's home page.

---

## Running the Tests

### Run all test scenarios

```bash
npm test
```

### Run only smoke tests (`@smoke` tag)

```bash
npm run test:smoke
```

### Run only regression tests (`@regression` tag)

```bash
npm run test:regression
```

### Run only the purchase flow (`@purchase` tag)

```bash
npm run test:purchase
```

### Run a specific feature file directly

```bash
npx wdio run ./wdio.conf.js --spec ./test/features/login.feature
npx wdio run ./wdio.conf.js --spec ./test/features/addToCart.feature
npx wdio run ./wdio.conf.js --spec ./test/features/purchase.feature
```

---

## Test Reports

This project generates **two reports** after every test run:

### 1. HTML Nice Report

Automatic — generated at `reports/wdio-report.html` after each run.
Open in any browser to view results, step logs, and screenshots on failure.

```bash
open reports/wdio-report.html
```

### 2. Allure Report

Allure raw results are written to `allure-results/` after every run.
Use the following scripts to build and view the interactive HTML report:

| Script | Description |
|---|---|
| `npm run allure:generate` | Build the HTML report from `allure-results/` into `allure-report/` |
| `npm run allure:open` | Serve the generated report in your default browser |
| `npm run allure:report` | Generate **and** open in one command |
| `npm run allure:clean` | Delete both `allure-results/` and `allure-report/` |

**Typical workflow:**

```bash
# 1. Run the tests (results are written automatically)
npm test

# 2. Generate + open the Allure report
npm run allure:report
```

> **Note:** `allure-results/` and `allure-report/` are git-ignored. The Allure reporter also
> captures a **screenshot automatically on failure** and attaches it to the failing step.

---

## Test Scenarios

### 1. Log In (`test/features/login.feature`)

| Tag | Scenario |
|---|---|
| `@smoke @regression @login` | Successful login with valid credentials |

**Steps:**
1. Navigate to the DemoBlaze home page.
2. Click the **"Log in"** button in the navigation bar.
3. Enter username and password.
4. Click the **"Log in"** submit button.
5. Verify the welcome username label appears in the navbar.

---

### 2. Add Product to Cart (`test/features/addToCart.feature`)

| Tag | Scenario |
|---|---|
| `@smoke @regression @cart` | Successfully add a product to the cart |

**Steps:**
1. Navigate to the DemoBlaze home page.
2. Log in with valid credentials (precondition).
3. Click on a product from the home page.
4. Click the **"Add to cart"** button on the product detail page.
5. Accept the confirmation alert.
6. Navigate to the cart and verify the product appears in the list.

---

### 3. Complete Purchase Flow (`test/features/purchase.feature`)

| Tag | Scenario |
|---|---|
| `@smoke @regression @purchase` | Successfully complete a purchase and validate the confirmation pop-up |

**Steps:**
1. Navigate to the DemoBlaze home page.
2. Log in with valid credentials (precondition).
3. Click on a product from the home page.
4. Click the **"Add to cart"** button on the product detail page.
5. Accept the add-to-cart confirmation alert.
6. Navigate to the cart page.
7. Click the **"Place Order"** button to open the order modal.
8. Fill in the order form (name, country, city, credit card, month, year).
9. Click the **"Purchase"** button.
10. ✅ Verify the SweetAlert confirmation pop-up is displayed.
11. ✅ Verify the pop-up title contains **"Thank you"**.
12. ✅ Verify the pop-up body contains purchase details (Id, Amount, Card Number, Name, Date).
13. Click **"OK"** to dismiss the pop-up.
14. Verify the browser is back on the DemoBlaze home page.

> **Note:** Order form data is configured in `test/data/testData.js` under the `orderDetails` key.

---

## Tag Reference

| Tag | Description |
|---|---|
| `@login` | All scenarios in the Login feature |
| `@cart` | All scenarios in the Add to Cart feature |
| `@purchase` | All scenarios in the Complete Purchase Flow feature |
| `@smoke` | Fast sanity check — run after each deployment |
| `@regression` | Full regression suite |