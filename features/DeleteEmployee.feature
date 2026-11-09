@delete-employee
Feature: Delete employee
First creates an employee as a test data. Then, searches for the employee by ID and deletes the employee. 
Finally, searches for the employee by ID again and verifies that the employee is not found.

  Scenario: User can delete an employee
    Given I open the OrangeHRM homepage
    And I login with valid credentials
    And I open the PIM page
    And I click the Add button
    And I fill in employee details
    And I save the employee details
    And the employee should be created
    And I open the PIM page
    And I search for the employee by ID
    When I click on the delete button
    Then the employee should be deleted successfully
    When I search for the employee by ID
    Then the employee details cannot be fetched as the employee does not exist
