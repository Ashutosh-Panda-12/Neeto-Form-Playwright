import { Page, Browser, expect } from "@playwright/test";
import { STORAGE_STATE } from "../../playwright.config";
import { MANAGE_ACCESS_CONTROL_CONSTANTS } from "../constants/manageAccessControlConstants";

export class ManageAccessControl {
  private page: Page;
  private browser: Browser;
  private copyLink: string = "";
  private password: string = "demopassword";

  constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  async publishForm() {
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PUBLISH_BUTTON).click();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.SETTINGS_LINK).click();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.ACCESS_CONTROL_LINK).click();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_RADIO).check();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_INPUT).fill("d");
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.SAVE_CHANGES_BUTTON).click();

    await expect(this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_ERROR)).toBeVisible();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_INPUT).fill(this.password);
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.SAVE_CHANGES_BUTTON).click();
    await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.SHARE_LINK).click();

    this.copyLink = await this.page.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.COPY_LINK_INPUT).innerText();
    console.log("Form published. Copy link:", this.copyLink);

    if (!this.copyLink.startsWith("http")) {
      throw new Error("Invalid form link. Please check the sharing settings.");
    }

    // Save session state
    await this.page.context().storageState({ path: STORAGE_STATE });
  }

  async verifyAccessControl() {
    console.log("Opening form in a new session...");

    const newUserContext = await this.browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const newPage = await newUserContext.newPage();

    console.log("Navigating to form link:", this.copyLink);
    await newPage.goto(this.copyLink, { waitUntil: "domcontentloaded" });

    await expect(newPage.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_INPUT_NEW_PAGE)).toBeVisible();
    await newPage.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_INPUT_NEW_PAGE).fill(this.password);
    await newPage.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.PASSWORD_SUBMIT_BUTTON).click();

    await expect(newPage.getByText(MANAGE_ACCESS_CONTROL_CONSTANTS.EMAIL_TEXT, {exact: true})).toBeVisible();
    await expect(newPage.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.TEXTBOX)).toBeVisible();
    await expect(newPage.locator(MANAGE_ACCESS_CONTROL_CONSTANTS.FORM_SUBMIT_BUTTON)).toBeVisible();

    console.log("Access control verified successfully.");
    await newUserContext.close();
  }
}
