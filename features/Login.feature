@login
Feature: Login

  Scenario: Login with valid credentials succeeds
    Given I open the OrangeHRM homepage
    When I login with valid credentials
    Then the page should show Dashboard

  Scenario Outline: Login with invalid credentials
    Given I open the OrangeHRM homepage
    When I login with "<username>" and "<password>"
    Then I should see the error message "<message>"

    Examples:
      | username      | password     | message                       |
      | invaliduser   | invalidpass | Invalid credentials            |
      | Admin         | wrongpass   | Invalid credentials            |
      | wronguser     | admin123    | Invalid credentials            |

  Scenario Outline: Login with missing username or password
    Given I open the OrangeHRM homepage
    When I login with "<username>" and "<password>"
    Then I should see the required message for "<field>"

    Examples:
      | username | password | field    |
      |          | admin123 | username |
      | Admin    |          | password |
