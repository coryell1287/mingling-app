Feature: PageNavigation

    As a user, I want to navigate through the app when clicking on the links in the nav bar.

    Scenario: Clicking the links in the nav bar
    Given I am on the home page
    When I click on the About link, I navigate to the About page
    When I click on Contact link, I navigate to the Contact page
    Then I return to the Home page, when I click on the Home link

