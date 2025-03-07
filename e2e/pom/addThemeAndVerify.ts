import { Page, expect } from "@playwright/test";
import { logoAndThemeConstants } from "../constants/logoAndThemeConstants";

export class addThemeAndVerify {

  constructor(private page: Page) {}

  addTheme = async() => {
    await this.page.getByTestId(logoAndThemeConstants.addLogoElement).click();
    await this.page.getByTestId(logoAndThemeConstants.openAssetLibraryButton).click();
    await this.page.getByTestId(logoAndThemeConstants.myImagesTab).click();
    await this.page.getByTestId(logoAndThemeConstants.libraryImage0).click();
    await this.page.getByTestId(logoAndThemeConstants.selectOriginalImageSwitch).click();
    await this.page.getByTestId(logoAndThemeConstants.cropSubmitButton).click();
    await this.page.getByTestId(logoAndThemeConstants.moreDropdownIcon).click();
    await this.page.getByTestId(logoAndThemeConstants.themeMoreTab).click();
    await this.page.getByTestId(logoAndThemeConstants.addThemeButton).click();
    await this.page.getByTestId(logoAndThemeConstants.themeNameProperty).fill("Demo theme");
    await this.page.getByTestId(logoAndThemeConstants.saveChangesButton).click();
    await this.page.getByRole("button", { name: "Apply this theme" }).click();
  }

  verifyThemeApplied = async() => {
    await expect(this.page.getByTestId(logoAndThemeConstants.logoImage)).toBeVisible();
  }
}
