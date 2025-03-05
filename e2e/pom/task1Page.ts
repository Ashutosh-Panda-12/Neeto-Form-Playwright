import { Page, expect } from "@playwright/test";
import { TASK1_CONSTANTS } from "../constants/Task1Constants";

export class Task1Page {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addTheme() {
    await this.page.getByTestId(TASK1_CONSTANTS.ADD_LOGO_ELEMENT).click();
    await this.page.getByTestId(TASK1_CONSTANTS.OPEN_ASSET_LIBRARY_BUTTON).click();
    await this.page.getByTestId(TASK1_CONSTANTS.MY_IMAGES_TAB).click();
    await this.page.getByTestId(TASK1_CONSTANTS.LIBRARY_IMAGE_0).click();
    await this.page.getByTestId(TASK1_CONSTANTS.SELECT_ORIGINAL_IMAGE_SWITCH).click();
    await this.page.getByTestId(TASK1_CONSTANTS.CROP_SUBMIT_BUTTON).click();
    await this.page.getByTestId(TASK1_CONSTANTS.MORE_DROPDOWN_ICON).click();
    await this.page.getByTestId(TASK1_CONSTANTS.THEME_MORE_TAB).click();
    await this.page.getByTestId(TASK1_CONSTANTS.ADD_THEME_BUTTON).click();
    await this.page.getByTestId(TASK1_CONSTANTS.THEME_NAME_PROPERTY).fill("Demo theme");
    await this.page.getByTestId(TASK1_CONSTANTS.SAVE_CHANGES_BUTTON).click();
    await this.page.getByRole("button", { name: "Apply this theme" }).click();
  }

  async verifyThemeApplied() {
    await expect(this.page.getByTestId(TASK1_CONSTANTS.LOGO_IMAGE)).toBeVisible();
  }
}
