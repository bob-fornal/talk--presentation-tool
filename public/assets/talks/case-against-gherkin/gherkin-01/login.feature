Feature: User Login

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    Given the user enters a valid username and password
    When the user clicks the loging button
    Then the user should be redirected to the dashboard
    And a welcome message should be displayed