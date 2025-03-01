import { Page, expect } from "@playwright/test";
import { CREATE_FORM_CONSTANTS } from "../constants/createFormConstants";

export class CreateForm {
  private page: Page;
  private currentUrl: string | undefined;
  private page1Promise: Promise<Page> | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  async addFieldsAndPublish() {
    this.currentUrl = await this.page.url(); // Store the current URL before adding fields

    await this.page.locator(CREATE_FORM_CONSTANTS.ELEMENTS_CONTAINER).getByRole("button", { name: "Full name" }).click();
    await this.page.locator(CREATE_FORM_CONSTANTS.ELEMENTS_CONTAINER).getByRole("button", { name: "Phone number" }).click();
    await this.page.locator(CREATE_FORM_CONSTANTS.PUBLISH_BUTTON).click();

    this.page1Promise = this.page.waitForEvent("popup"); // Wait for popup event
    await this.page.locator(CREATE_FORM_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
  }

  async checkFieldsVisible() {
    const page1 = await this.page1Promise;
    if (!page1) throw new Error("Popup page was not found");

    await expect(page1.locator(CREATE_FORM_CONSTANTS.EMAIL_FIELD)).toBeVisible();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.FULL_NAME_FIELD)).toBeVisible();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.PHONE_NUMBER_FIELD)).toBeVisible();
  }

  async checkMandatoryFieldErrors() {
    const page1 = await this.page1Promise;
    if (!page1) throw new Error("Popup page was not found");

    await page1.locator(CREATE_FORM_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.EMAIL_REQUIRED_ERROR)).toBeVisible();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.FIRST_NAME_REQUIRED_ERROR)).toBeVisible();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.LAST_NAME_REQUIRED_ERROR)).toBeVisible();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.PHONE_NUMBER_REQUIRED_ERROR)).toBeVisible(); // Updated
  }

  async checkValidationErrors() {
    const page1 = await this.page1Promise;
    if (!page1) throw new Error("Popup page was not found");

    await page1.locator(CREATE_FORM_CONSTANTS.EMAIL_INPUT).fill("invalidemail");
    await page1.locator(CREATE_FORM_CONSTANTS.PHONE_INPUT).fill("12345");
    await page1.locator(CREATE_FORM_CONSTANTS.SUBMIT_BUTTON).click();
    
    await expect(page1.locator(CREATE_FORM_CONSTANTS.EMAIL_INVALID_ERROR)).toBeVisible();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.PHONE_NUMBER_FORMAT_ERROR)).toBeVisible(); // Updated
  }

  async fillValidDataAndSubmit() {
    await this.page.locator(CREATE_FORM_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page1 = await this.page.waitForEvent("popup");

    await page1.waitForLoadState("domcontentloaded");
    await page1.locator(CREATE_FORM_CONSTANTS.EMAIL_INPUT).waitFor({ state: "visible", timeout: 60000 });

    await page1.locator(CREATE_FORM_CONSTANTS.EMAIL_INPUT).fill("oliver@example.com");
    await page1.locator(CREATE_FORM_CONSTANTS.FIRST_NAME_INPUT).fill("Oliver");
    await page1.locator(CREATE_FORM_CONSTANTS.LAST_NAME_INPUT).fill("Smith");
    await page1.locator(CREATE_FORM_CONSTANTS.PHONE_INPUT).fill("4155552671");

    await page1.locator(CREATE_FORM_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(page1.locator(CREATE_FORM_CONSTANTS.THANK_YOU_MESSAGE)).toBeVisible({ timeout: 10000 });
  }

  async verifySubmittedResponse() {
    console.log("Verifying submitted response...");
    
    await this.page.locator(CREATE_FORM_CONSTANTS.SUBMISSIONS_TAB).click();
    
    // await this.page.locator(CREATE_FORM_CONSTANTS.SUBMISSION_EMAIL).waitFor();
    await expect(this.page.locator(CREATE_FORM_CONSTANTS.SUBMISSION_EMAIL).nth(0)).toBeVisible();

    await expect(this.page.locator(CREATE_FORM_CONSTANTS.SUBMISSION_NAME).nth(1)).toBeVisible();
    // await expect(this.page.locator(CREATE_FORM_CONSTANTS.SUBMISSION_PHONE).nth(2)).toBeVisible();
  }
}
