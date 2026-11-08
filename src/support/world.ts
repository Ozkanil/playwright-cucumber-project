import { After, Before, setDefaultTimeout, setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { CreateNewEmployeePage } from '../pages/CreateNewEmployeePage';
import { ViewEditEmployeeDetailsPage } from '../pages/ViewEditEmployeeDetailsPage';
import { DeleteEmployeePage } from '../pages/DeleteEmployeePage';

const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  declare employeePage: CreateNewEmployeePage;
  declare viewEditEmployeeDetailsPage: ViewEditEmployeeDetailsPage;
  declare deleteEmployeePage: DeleteEmployeePage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: false, slowMo: 400 });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.employeePage = new CreateNewEmployeePage(this.page);
    this.viewEditEmployeeDetailsPage = new ViewEditEmployeeDetailsPage(this.page);
    this.deleteEmployeePage = new DeleteEmployeePage(this.page);
  }

  async closeBrowser() {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(30000);

Before(async function (this: CustomWorld) {
  await this.openBrowser();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === 'FAILED') {
    fs.mkdirSync(screenshotDir, { recursive: true });
    const fileName = `${scenario.pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    const screenshotPath = path.join(screenshotDir, fileName);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  await this.closeBrowser();
});
