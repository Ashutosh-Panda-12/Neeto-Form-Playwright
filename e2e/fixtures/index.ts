import { test as base } from "@playwright/test";
import { LoginAndDelete } from "../pom/loginAndDelete";
import { CreateForm } from "../pom/createForm";
import { FormFieldElements } from "../pom/formFieldElements";
import { FormInsights } from "../pom/formInsights";

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

export { expect } from "@playwright/test";
