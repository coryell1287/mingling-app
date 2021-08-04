Feature: PageNavigation

    As a user, I want to navigate through the app when clicking on the links in the nav bar.
    As I am I am those pages, I want to perform an
    lighthouse audit to test the usability and accessibility.

    Scenario: Clicking the links in the nav bar
    Given I am on the home page
    When I click on the About link, I should navigate to the About page
    And perform a lighthouse and pa11y audit
    When I click on Contact link, I should navigate to the Contact page
    And perform a lighthouse and pa11y audit
    Then I return to the Home page, when I click on the Home link
    And perform a lighthouse and pa11y audit

