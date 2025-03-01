import { Page, expect } from "@playwright/test";
import { FORM_FIELD_ELEMENTS_CONSTANTS } from "../constants/formFieldElementsConstants";

export class FormFieldElements {
  private page: Page;
  private page1Promise: Promise<Page> | undefined;
  private page2Promise: Promise<Page> | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  async addSingleAndMultiChoiceFields() {
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.ELEMENTS_CONTAINER).getByRole("button", { name: "Single choice" }).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.QUESTION_TEXTBOX).fill("Single-choice questions");
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.ADD_BULK_OPTION_LINK).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.BULK_OPTIONS_TEXTAREA).fill("Option 5, Option 6, Option 7, Option 8, Option 9, Option 10");
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.BULK_OPTIONS_DONE_BUTTON).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.RANDOMIZE_LABEL).click();

    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.ELEMENTS_CONTAINER).getByRole("button", { name: "Multi choice" }).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.QUESTION_TEXTBOX).fill("Multiple-choice questions");
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.HIDE_QUESTION_LABEL).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.ADD_BULK_OPTION_LINK).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.BULK_OPTIONS_TEXTAREA).fill("Option 5, Option 6, Option 7, Option 8, Option 9, Option 10");
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.BULK_OPTIONS_DONE_BUTTON).click();

    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.PUBLISH_BUTTON).click();
    console.log("Fields added and form published...");

    this.page1Promise = this.page.waitForEvent("popup");
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
  }

  async verifyFieldsDisplayed(originalArr: string[]) {
    const page1 = await this.page1Promise;
    if (!page1) throw new Error("Popup page not found");

    const displayedArr = await page1.locator(FORM_FIELD_ELEMENTS_CONSTANTS.SINGLE_CHOICE_CONTAINER).allTextContents();
    const notRandomized = JSON.stringify(originalArr) === JSON.stringify(displayedArr);
    expect(notRandomized).toBe(false);

    await expect(page1.locator(FORM_FIELD_ELEMENTS_CONSTANTS.MULTI_CHOICE_PREVIEW_GROUP)).toBeHidden();
  }

  async unhideMultiChoiceAndPublish() {
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.HIDE_QUESTION_LABEL).click();
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.PUBLISH_BUTTON).click();

    this.page2Promise = this.page.waitForEvent("popup");
    await this.page.locator(FORM_FIELD_ELEMENTS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
  }

  async ensureFieldsVisibleOnPublishedForm() {
    const page2 = await this.page2Promise;
    if (!page2) throw new Error("Popup page not found");

    await expect(page2.locator(FORM_FIELD_ELEMENTS_CONSTANTS.EMAIL_FIELD)).toBeVisible();
    await expect(page2.locator(FORM_FIELD_ELEMENTS_CONSTANTS.TEXTBOX_FIELD)).toBeVisible();
    await expect(page2.locator(FORM_FIELD_ELEMENTS_CONSTANTS.SINGLE_CHOICE_CONTAINER)).toBeVisible();
    await expect(page2.locator(FORM_FIELD_ELEMENTS_CONSTANTS.MULTI_CHOICE_CONTAINER)).toBeVisible();
  }
}
