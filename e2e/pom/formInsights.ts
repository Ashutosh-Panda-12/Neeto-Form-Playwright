import { Page, expect } from "@playwright/test";
import { FORM_INSIGHTS_CONSTANTS } from "../constants/formInsightsConstants";

export class FormInsights {
  private page: Page;
  private visitCount: number = 0;
  private startCount: number = 0;
  private submissionCount: number = 0;
  private currentUrl: string | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  async publishFormAndOpenAnalytics() {
    await this.page.locator(FORM_INSIGHTS_CONSTANTS.PUBLISH_BUTTON).click();
    await this.page.locator(FORM_INSIGHTS_CONSTANTS.MORE_BUTTON).click();
    await this.page.locator(FORM_INSIGHTS_CONSTANTS.ANALYTICS_LINK).click();
    this.currentUrl = this.page.url();
  }

  async verifyInitialInsights() {
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC)).toHaveText("0");
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.STARTS_METRIC)).toHaveText("0");
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.SUBMISSIONS_METRIC)).toHaveText("0");
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.COMPLETION_RATE_METRIC)).toHaveText("0%");
  }

  async openFormAndVerifyFirstVisit() {
    this.visitCount = Number(await this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC).textContent());
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.locator(FORM_INSIGHTS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page1 = await page1Promise;

    await this.page.reload();
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC)).toHaveText(String(this.visitCount + 1));
    await page1.close();
  }

  async openFormAndEnterEmail() {
    this.visitCount = Number(await this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC).textContent());
    this.startCount = Number(await this.page.locator(FORM_INSIGHTS_CONSTANTS.STARTS_METRIC).textContent());

    const page2Promise = this.page.waitForEvent("popup");
    await this.page.locator(FORM_INSIGHTS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page2 = await page2Promise;
    await page2.locator(FORM_INSIGHTS_CONSTANTS.EMAIL_INPUT).fill("ashu@example.com");

    await this.page.reload();
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC)).toHaveText(String(this.visitCount + 1));
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.STARTS_METRIC)).toHaveText(String(this.startCount + 1));

    await page2.close();
  }

  async submitFormAndCheckStatistics() {
    this.visitCount = Number(await this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC).textContent());
    this.startCount = Number(await this.page.locator(FORM_INSIGHTS_CONSTANTS.STARTS_METRIC).textContent());
    this.submissionCount = Number(await this.page.locator(FORM_INSIGHTS_CONSTANTS.SUBMISSIONS_METRIC).textContent());

    const page3Promise = this.page.waitForEvent("popup");
    await this.page.locator(FORM_INSIGHTS_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page3 = await page3Promise;

    await page3.locator(FORM_INSIGHTS_CONSTANTS.EMAIL_INPUT).fill("ashupanda@example.com");
    await page3.locator(FORM_INSIGHTS_CONSTANTS.SUBMIT_BUTTON).click();
    await this.page.waitForLoadState("networkidle");
    await this.page.reload();

    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.VISITS_METRIC)).toHaveText(String(this.visitCount + 1));
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.STARTS_METRIC)).toHaveText(String(this.startCount));
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.SUBMISSIONS_METRIC)).toHaveText(String(this.submissionCount + 1));
    await expect(this.page.locator(FORM_INSIGHTS_CONSTANTS.COMPLETION_RATE_METRIC)).toHaveText("100%");

    await page3.close();
  }
}
