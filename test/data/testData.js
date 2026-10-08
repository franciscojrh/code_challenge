/**
 * Test data for DemoBlaze automation tests.
 * Update these credentials with valid DemoBlaze account details.
 */
export const testData = {
    users: {
        validUser: {
            username: 'test_frank',
            password: 'Test1234'
        }
    },
    products: {
        defaultProduct: 'Samsung galaxy s6'
    },
    urls: {
        baseUrl: 'https://www.demoblaze.com',
        homePage: 'https://www.demoblaze.com/index.html',
        cartPage: 'https://www.demoblaze.com/cart.html'
    },
    /**
     * Order form details used in the Complete Purchase Flow scenario.
     * These values are submitted in the "Place Order" modal during checkout.
     */
    orderDetails: {
        name:       'Test User',
        country:    'United States',
        city:       'New York',
        creditCard: '4111111111111111',
        month:      '12',
        year:       '2025'
    }
};
