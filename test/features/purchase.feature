@smoke @regression @purchase
Feature: Complete Purchase Flow with Confirmation Pop-Up Validation
  As a logged-in user
  I want to select a product, add it to my cart, and complete the checkout process
  So that I can successfully purchase items and see a purchase confirmation

  Background:
    Given I am on the DemoBlaze home page
    And I am logged in with valid credentials

  Scenario: Successfully complete a purchase and validate the confirmation pop-up
    When I click on a product from the home page
    And I click the "Add to cart" button on the product page
    And I accept the confirmation alert
    And I navigate to the cart page
    And I click the "Place Order" button
    And I fill in the order form with valid details
    And I click the "Purchase" button
    Then the confirmation pop-up should be displayed
    And the confirmation pop-up title should contain "Thank you"
    And the confirmation pop-up should display purchase details
    When I click the "OK" button on the confirmation pop-up
    Then I should be redirected to the home page
