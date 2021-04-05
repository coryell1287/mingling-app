Feature: Page Navigation

  As a user, I want to navigate through the application successfully.

  Scenario: I am on the home page
    Given that I am on the home page
    When I click on the About Us link
    Then I navigate to the About Us page


  Scenario: I am on the About us page
      Given that I am on the About Use page
      When I click on the Feature link
      Then I navigate to the Feature page
