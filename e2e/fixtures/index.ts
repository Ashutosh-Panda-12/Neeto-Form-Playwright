import { Page, Browser, test as base, expect } from "@playwright/test";
import { LoginAndDelete } from "../pom/loginAndDelete";
import { ConditionalLogic } from "../pom/conditionalLogic";
import { UniqueSubmissions } from "../pom/uniqueSubmissions";
import { ManageAccessControl } from "../pom/manageAccessControl";
import { CreateForm } from "../pom/createForm";
import { FormFieldElements } from "../pom/formFieldElements";
import { FormInsights } from "../pom/formInsights";

export class TestFixtures {
  public loginAndDelete: LoginAndDelete;
  public conditionalLogic: ConditionalLogic;
  public uniqueSubmissions: UniqueSubmissions;
  public manageAccessControl: ManageAccessControl;
  
  constructor(page: Page, browser: Browser) {
    this.loginAndDelete = new LoginAndDelete(page);
    this.conditionalLogic = new ConditionalLogic(page);
    this.uniqueSubmissions = new UniqueSubmissions(page, browser);
    this.manageAccessControl = new ManageAccessControl(page, browser);
  }
}

type POMFixtures = {
  loginAndDelete: LoginAndDelete;
  createForm: CreateForm;
  formFieldElements: FormFieldElements;
  formInsights: FormInsights;
};

export const test = base.extend<POMFixtures>({
  loginAndDelete: async ({ page }, use) => {
    await use(new LoginAndDelete(page));
  },
  createForm: async ({ page }, use) => {
    await use(new CreateForm(page));
  },
  formFieldElements: async ({ page }, use) => {
    await use(new FormFieldElements(page));
  },
  formInsights: async ({ page }, use) => {
    await use(new FormInsights(page));
  },
});

export { expect };
