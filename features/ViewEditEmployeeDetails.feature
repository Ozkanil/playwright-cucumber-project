Feature: View and edit employee details

  Scenario: User can view and edit employee details
    Given I open the OrangeHRM homepage
    And I login with valid credentials
    And I open the PIM page
    And I click the Add button
    And I fill in employee details
    And I save the employee details
    And I open the PIM page
    And I search for the employee by ID
    When I click on the found employee to view details
    Then the employee details should be displayed
    When I edit and save the employee details
    Then the employee details should be updated successfully
