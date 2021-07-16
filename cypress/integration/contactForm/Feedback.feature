Feature:  Feedback

    As a user, I want to enter my name, email and feedback into a contact form
    and the submit the form.

  Scenario: Enter feedback into a form and submit the form
    Given I am on the home page
    When I type a name into a the name field
    When I type an email into the email field
    When I type into the feedback field
    # When I press the submit button
    # Then popup should display the message "Feedback was submitted successfully."
