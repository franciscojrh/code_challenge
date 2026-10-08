@cart
Feature: Add Product to Cart
  As a user
  I want to add products to my shopping cart
  So that I can purchase them later

  Background:
    Given I am on the DemoBlaze home page
    And I am logged in with valid credentials

  @regression
  Scenario: Successfully add a product to the cart
    When I click on a product from the home page
    And I click the "Add to cart" button on the product page
    And I accept the confirmation alert
    Then the product should be added to my cart
    And I should see the product listed in the cart
