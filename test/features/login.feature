@login
Feature: Log In
  As an existing user
  I want to log in to the DemoBlaze application
  So that I can access my account and shopping features

  Background:
    Given I am on the DemoBlaze home page

  @smoke
  Scenario: Successful login with valid credentials
    When I click on the "Log in" button in the navigation bar
    And I enter my username and password
    And I click the "Log in" submit button
    Then I should be logged in successfully
    And I should see my username displayed in the navigation bar
