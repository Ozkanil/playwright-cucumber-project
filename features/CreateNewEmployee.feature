Feature: Create new employee
This test case creates an employeee with unique employee ID 
and verifies that the employee is created successfully. Then,
searches for the employee by ID and verifies that the employee 
is visible in the results by checking the employee ID, first name, and last name.

  Scenario: User can create a new employee
    Given I open the OrangeHRM homepage
    When I login with valid credentials
    And I open the PIM page
    And I click the Add button
    And I fill in employee details
    And I save the employee details
    Then the employee should be created
    When I open the PIM page
    And I search for the employee by ID
    Then the employee should be visible in the results