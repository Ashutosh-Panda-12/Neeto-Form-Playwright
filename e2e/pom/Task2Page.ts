import { Page, expect, Download } from "@playwright/test";
import { TASK2_CONSTANTS } from "../constants/task2Constants";

export class Task2Page {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addFieldsAndPublishForm() {
    await this.page.getByTestId(TASK2_CONSTANTS.ADD_OPINION_SCALE).click();
    await this.page.getByTestId(TASK2_CONSTANTS.ADD_STAR_RATING).click();
    await this.page.getByTestId(TASK2_CONSTANTS.ADD_MATRIX).click();
    await this.page.getByTestId(TASK2_CONSTANTS.CONTENT_TEXT_FIELD).fill("Matrix");
    await this.page.getByTestId(TASK2_CONSTANTS.STAR_RATING_GROUP).click();
    await this.page.getByTestId(TASK2_CONSTANTS.CONTENT_TEXT_FIELD).fill("Star Rating");
    await this.page.getByTestId(TASK2_CONSTANTS.OPINION_SCALE_GROUP).click();
    await this.page.getByTestId(TASK2_CONSTANTS.CONTENT_TEXT_FIELD).fill("Opinion Scale");
    await this.page.getByTestId(TASK2_CONSTANTS.PUBLISH_BUTTON).click();
    await this.page.getByTestId(TASK2_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click(); // ✅ Added missing step
    return this.page.waitForEvent("popup");
}


  async makeSubmission(page1: Page) {
    await page1.getByTestId(TASK2_CONSTANTS.EMAIL_TEXT_FIELD).fill("ashu@example.com");
    await page1.getByTestId(TASK2_CONSTANTS.OPINION_SCALE).getByText("8").click();
    await page1.getByTestId(TASK2_CONSTANTS.PREVIEW_RATING_ICON).nth(3).click();
    await page1.locator("td").first().click();
    await page1.locator("td").nth(3).click();
    await page1.getByTestId(TASK2_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(page1.getByTestId(TASK2_CONSTANTS.THANK_YOU_PAGE)).toBeVisible();
    await page1.close();
  }

  async navigateToSubmissionsAndDownload() {
    await this.page.getByTestId(TASK2_CONSTANTS.SUBMISSIONS_TAB).click();
    await this.page.getByTestId(TASK2_CONSTANTS.SUBMITTED_RESPONSE).hover();
    await this.page.getByTestId(TASK2_CONSTANTS.VIEW_SUBMISSION_BUTTON).click();
    await this.page.locator('[data-cy="pane-header"]').locator('[data-cy="nui-dropdown-icon"]').click();
    await this.page.getByTestId(TASK2_CONSTANTS.PDF_RADIO_LABEL).click();

    const newPagePromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(TASK2_CONSTANTS.ACTION_DROPDOWN_BUTTON).click();

    const newPage = await newPagePromise;
    await newPage.close();
 }
}


// await page.getByRole('button', { name: 'image library' }).click();
// await page.getByRole('button', { name: 'image library' }).click();
