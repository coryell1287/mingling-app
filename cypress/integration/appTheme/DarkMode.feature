Feature: DarkMode

  As a user I should be able to toggle between light and dark mode by clicking a button in the main header
  that switches between light and dark mode.

  Scenario: Clicking a button in the main header to switch app mode.
    Given I am on the home page
    And light mode is already set
    When I click the button in the main header, the view switches to dark mode
    Then I click the button in the main header to switch theme back to light mode
