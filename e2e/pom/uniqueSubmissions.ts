import { Page, Browser, expect } from "@playwright/test";
import { UNIQUE_SUBMISSIONS_CONSTANTS } from "../constants/uniqueSubmissionsConstants";

export class UniqueSubmissions {
  private page: Page;
  private browser: Browser;
  private copyLink: string = "";

  constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }
  
  async enableUniqueSubmissions() {
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.PUBLISH_BUTTON).click();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SETTINGS_LINK).click();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.UNIQUE_SUBMISSION_LINK).click();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.USE_COOKIES_RADIO).nth(1).check();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SAVE_CHANGES_BUTTON).click();
  }

  async fillForm(email: string) {
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page1 = await page1Promise;
    await page1.locator(UNIQUE_SUBMISSIONS_CONSTANTS.TEXTBOX).fill(email);
    await page1.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(page1.locator(UNIQUE_SUBMISSIONS_CONSTANTS.THANK_YOU_PAGE)).toBeVisible();
  }

  async verifySubmissionBlocked() {
    const page2Promise = this.page.waitForEvent("popup");
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page2 = await page2Promise;
    await expect(page2.locator(UNIQUE_SUBMISSIONS_CONSTANTS.ALREADY_SUBMITTED_MESSAGE)).toBeVisible();
  }

  async getFormLink() {
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SHARE_LINK).click();
    this.copyLink = await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.COPY_LINK_INPUT).innerText();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.COPY_BUTTON).click();
  }

  async verifyDifferentCookiesSubmission(email: string) {
    const newUserContext = await this.browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const newPage = await newUserContext.newPage();

    console.log("Navigating to form link:", this.copyLink);
    await newPage.goto(this.copyLink, { waitUntil: "domcontentloaded" });
    await newPage.locator(UNIQUE_SUBMISSIONS_CONSTANTS.TEXTBOX).fill(email);
    await newPage.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(newPage.locator(UNIQUE_SUBMISSIONS_CONSTANTS.THANK_YOU_PAGE)).toBeVisible();
    await newUserContext.close();
  }

  async enableNoCheckOption() {
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SETTINGS_LINK).click();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.UNIQUE_SUBMISSION_LINK).click();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.USE_COOKIES_RADIO).nth(0).check();
    await this.page.locator(UNIQUE_SUBMISSIONS_CONSTANTS.SAVE_CHANGES_BUTTON).click();
  }
}
