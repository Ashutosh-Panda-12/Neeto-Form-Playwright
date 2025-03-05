import { Page } from "@playwright/test";
import { LOGIN_AND_DELETE_CONSTANTS } from "../constants/loginAndDeleteConstants";

export class LoginAndDelete {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async loginAsOliver() {
    await this.page.goto("login");
    await this.page.getByRole('button', { name: 'Login as Oliver' }).click();
    await this.page.locator(LOGIN_AND_DELETE_CONSTANTS.ADD_NEW_FORM_BUTTON).click();
    await this.page.locator(LOGIN_AND_DELETE_CONSTANTS.START_FROM_SCRATCH_BUTTON).click();

  }

  async deleteForm() {
    await this.page.locator(LOGIN_AND_DELETE_CONSTANTS.DELETE_MENU_BUTTON).click();
    await this.page.locator(LOGIN_AND_DELETE_CONSTANTS.DELETE_BUTTON).click();
    await this.page.locator(LOGIN_AND_DELETE_CONSTANTS.DELETE_CHECKBOX).check();
    await this.page.locator(LOGIN_AND_DELETE_CONSTANTS.CONFIRM_DELETE_BUTTON).click();
  }
}
