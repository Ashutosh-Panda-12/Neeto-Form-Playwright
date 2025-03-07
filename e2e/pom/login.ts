import { expect, Page } from "@playwright/test";
import { loginAndDeleteConstants } from "../constants/loginAndDeleteConstants";
import { STORAGE_STATE } from "../constants/common";

export class Login {
  private currentUrl: string;

  constructor(public page: Page) { }

  loginAsOliver = async () => {
    await this.page.goto("login");
    await this.page.getByRole("button", { name: "Login as Oliver" }).click();
    await this.page.getByTestId("add-form-button").click();
    await this.page.getByTestId("start-from-scratch-button").click();
    await this.page.context().storageState({ path: STORAGE_STATE });
  }
}

