@delete-employee
Feature: Delete employee

  Scenario: User can delete an employee
    Given I open the OrangeHRM homepage
    And I login with valid credentials
    And I open the PIM page
    And I click the Add button
    And I fill in employee details
    And I save the employee details
    And I open the PIM page
    And I search for the employee by ID
    When I click on the delete button
    Then the employee should be deleted successfully
    When I search for the employee by ID
    Then the employee details cannot be fetched as the employee does not exist
