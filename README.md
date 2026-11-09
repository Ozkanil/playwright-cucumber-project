# Playwright Cucumber Automation Project

This project automates OrangeHRM using Playwright and Cucumber (Gherkin) with TypeScript.

## Getting started

### Prerequisites

- Node.js 18 or later
- npm
- A browser-supported environment for Playwright

### Install dependencies

```bash
npm install
```

### Browser setup

If Playwright browsers are not installed yet, run:

```bash
npx playwright install
```

This project is ready to run after the dependencies and browsers are installed.

## What is covered

The project includes automated scenarios for:

- Login
- Create employee
- Search employee by ID
- View employee details
- Edit employee details
- Delete employee
- Validate not-found employee search result

The feature files are stored under:

- `features/Login.feature`
- `features/CreateNewEmployee.feature`
- `features/ViewEditEmployeeDetails.feature`
- `features/DeleteEmployee.feature`

## Project structure

```text
playwright-cucumber-project/
├── cucumber.js
├── package.json
├── reporter.js
├── README.md
├── features/
│   ├── Login.feature
│   ├── CreateNewEmployee.feature
│   ├── ViewEditEmployeeDetails.feature
│   ├── DeleteEmployee.feature
├── src/
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── CreateNewEmployeePage.ts
│   │   ├── ViewEditEmployeeDetailsPage.ts
│   │   └── DeleteEmployeePage.ts
│   ├── steps/
│   │   ├── Login.steps.ts
│   │   ├── CreateNewEmployee.steps.ts
│   │   ├── ViewEditEmployeeDetails.steps.ts
│   │   └── DeleteEmployee.steps.ts
│   ├── support/
│   │   └── world.ts
│   ├── test-data/
│   │   ├── credentials.ts
│   │   └── employee.ts
│   └── utils/
│       └── expectations.ts
├── reports/
│   ├── cucumber-report.json
│   └── html/
│       └── index.html
└── tsconfig.json
```

## Design pattern

This project follows the Page Object Model (POM) pattern:

- each page is represented by a dedicated class under `src/pages`
- UI selectors are defined once in the constructor as properties
- test logic is kept out of the feature files and step definitions
- step files translate Gherkin text into page-object actions
- the `World` class in `src/support/world.ts` provides shared browser state for each scenario

This keeps locators and interactions organized and easier to maintain.

## How to run tests

From VS Code: 

The tests can be executed in a batch or selectively using the Explorer. For this feature to be enabled "Cucumber JS Test Runner" extension needs to be installed.

From the project root:

```bash
npx cucumber-js
```

To run a specific feature file:

```bash
npx cucumber-js features/Login.feature
```

To run a specific scenario by name:

```bash
npx cucumber-js --name "User can login"
```

## Useful terminal commands

Run all tests:

```bash
npx cucumber-js
```

Run with readable output:

```bash
npx cucumber-js --format pretty
```

Run and generate JSON report:

```bash
mkdir -p reports && npx cucumber-js --format json:reports/cucumber-report.json
```

Generate HTML report from JSON:

```bash
node reporter.js
```

Run all tests and generate HTML report in one command:

```bash
mkdir -p reports && npx cucumber-js --format json:reports/cucumber-report.json; node reporter.js
```

Open the HTML report:

```text
reports/html/index.html
```

## Run tests by tag

This project uses Cucumber tags on feature files so you can run only specific areas of the suite.

Example tags already added:

- `@login`
- `@create-employee`
- `@view-edit-employee`
- `@delete-employee`

Example commands:

```bash
npx cucumber-js --tags "@login"
```

## Run tests in parallel

Cucumber.js supports parallel execution using workers.

Example command:

```bash
npx cucumber-js --parallel 4
```

You can also combine parallel mode with tags:

```bash
npx cucumber-js --parallel 4 --tags "@smoke"
```

## Browser execution settings

To run the tests in headless mode, set the browser launch option to `true` in `src/support/world.ts`:

```ts
this.browser = await chromium.launch({ headless: true, slowMo: 400 });
```

To make the test execution slower and easier to observe, increase the `slowMo` value:

## Screenshots on failure

If a scenario fails, the project automatically creates a screenshot under `reports/screenshots/`.

This is handled in `src/support/world.ts` during the `After` hook, and the folder is created if it does not already exist:

```ts
fs.mkdirSync(screenshotDir, { recursive: true });
```

The screenshot name is based on the scenario name for easier debugging.
