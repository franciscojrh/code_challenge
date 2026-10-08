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
| Reporter | HTML Nice Reporter (`wdio-html-nice-reporter`) |
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
    │   └── addToCart.feature            # Scenario: Add product to cart
    ├── step-definitions/                # Cucumber step implementations (glue code)
    │   ├── loginSteps.js
    │   └── addToCartSteps.js
    ├── pages/                           # Page Object Model classes
    │   ├── BasePage.js                  # Shared helpers: safeClick, waitForDisplayed, etc.
    │   ├── HomePage.js                  # Home page: navbar links, product cards
    │   ├── LoginPage.js                 # Login modal: username, password, submit
    │   ├── ProductPage.js               # Product detail page: Add to cart button
    │   └── CartPage.js                  # Cart page: item rows, product name lookup
    └── data/
        └── testData.js                  # Centralised test data (credentials, URLs)
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

### Run a specific feature file directly

```bash
npx wdio run ./wdio.conf.js --spec ./test/features/login.feature
npx wdio run ./wdio.conf.js --spec ./test/features/addToCart.feature
```

---

## Test Reports

After each run, an HTML report is automatically generated at:

```
reports/wdio-report.html
```

Open it in any browser to view detailed results, step-by-step execution logs, and screenshots captured on failure.

---

## Test Scenarios

### 1. Log In (`test/features/login.feature`)

| Tag | Scenario |
|---|---|
| `@smoke @regression` | Successful login with valid credentials |

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
| `@smoke @regression` | Successfully add a product to the cart |

**Steps:**
1. Navigate to the DemoBlaze home page.
2. Log in with valid credentials (precondition).
3. Click on a product from the home page.
4. Click the **"Add to cart"** button on the product detail page.
5. Accept the confirmation alert.
6. Navigate to the cart and verify the product appears in the list.

---

## Tag Reference

| Tag | Description |
|---|---|
| `@login` | All scenarios in the Login feature |
| `@cart` | All scenarios in the Add to Cart feature |
| `@smoke` | Fast sanity check — run after each deployment |
| `@regression` | Full regression suite |