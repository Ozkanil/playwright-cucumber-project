import { After, Before, setDefaultTimeout, setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CreateNewEmployeePage } from '../pages/CreateNewEmployeePage';
import { ViewEditEmployeeDetailsPage } from '../pages/ViewEditEmployeeDetailsPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  declare employeePage: CreateNewEmployeePage;
  declare viewEditEmployeeDetailsPage: ViewEditEmployeeDetailsPage;

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

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});
