import { test as base, expect, Page } from "@playwright/test";
import { ConditionalLogic } from "../pom/conditionalLogic";
import { UniqueSubmissions } from "../pom/uniqueSubmissions";
import { ManageAccessControl } from "../pom/manageAccessControl";
import { CreateForm } from "../pom/createForm";
import { FormFieldElements } from "../pom/formFieldElements";
import { FormInsights } from "../pom/formInsights";
import { Login } from "../pom/login";
import { addThemeAndVerify } from "../pom/addThemeAndVerify";
import { makeSubmissionsAndDownload } from "../pom/makeSubmissionsAndDownload";
import { verifyPrefillURL } from "../pom/verifyPrefillURL";
import { deleteForm } from "../pom/deleteForm";
import { goToDashboard } from "../pom/goToDashboard";

type TestFixtures = {
  createForm: CreateForm;
  formFieldElements: FormFieldElements;
  formInsights: FormInsights;
  conditionalLogic: ConditionalLogic;
  loginPage: Login;
  deletePage: deleteForm;
  dashboardPage: goToDashboard;
  task1Page: addThemeAndVerify;
  task2Page: makeSubmissionsAndDownload;
  task3Page: verifyPrefillURL;
};

export const test = base.extend<TestFixtures>({
  createForm: async ({ page }, use) => {
    await use(new CreateForm(page));
  },
  formFieldElements: async ({ page }, use) => {
    await use(new FormFieldElements(page));
  },
  formInsights: async ({ page }, use) => {
    await use(new FormInsights(page));
  },
  conditionalLogic: async ({ page }, use) => {
    await use(new ConditionalLogic(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new Login(page));
  },
  task1Page: async ({ page }, use) => {
    await use(new addThemeAndVerify(page));
  },
  task2Page: async ({ page }, use) => {
    await use(new makeSubmissionsAndDownload(page));
  },
  task3Page: async ({ page }, use) => {
    await use(new verifyPrefillURL(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new goToDashboard(page));
  },
  deletePage: async ({ page }, use) => {
    await use(new deleteForm(page));
  },
});

export { expect };
