import { Page, Browser, test as base, expect } from "@playwright/test";
import { LoginAndDelete } from "../pom/loginAndDelete";
import { Task1Page } from "../pom/task1Page";
import { Task2Page } from "../pom/Task2Page";
import { Task3Page } from "../pom/task3Page";
import { ConditionalLogic } from "../pom/conditionalLogic";
import { UniqueSubmissions } from "../pom/uniqueSubmissions";
import { ManageAccessControl } from "../pom/manageAccessControl";
import { CreateForm } from "../pom/createForm";
import { FormFieldElements } from "../pom/formFieldElements";
import { FormInsights } from "../pom/formInsights";

type TestFixtures = {
  loginPage: LoginAndDelete;
  task1Page: Task1Page;
  task2Page: Task2Page;
  task3Page: Task3Page;
  conditionalLogic: ConditionalLogic;
  uniqueSubmissions: UniqueSubmissions;
  manageAccessControl: ManageAccessControl;
  createForm: CreateForm;
  formFieldElements: FormFieldElements;
  formInsights: FormInsights;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginAndDelete(page));
  },
  task1Page: async ({ page }, use) => {
    await use(new Task1Page(page));
  },
  task2Page: async ({ page }, use) => {
    await use(new Task2Page(page));
  },
  task3Page: async ({ page }, use) => {
    await use(new Task3Page(page));
  },
  conditionalLogic: async ({ page }, use) => {
    await use(new ConditionalLogic(page));
  },
  uniqueSubmissions: async ({ page, browser }, use) => {
    await use(new UniqueSubmissions(page, browser));
  },
  manageAccessControl: async ({ page, browser }, use) => {
    await use(new ManageAccessControl(page, browser));
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
