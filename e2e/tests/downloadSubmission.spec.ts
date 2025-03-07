import { Page } from "@playwright/test";
import { addSubmissionsAndDownloadConstants } from "../constants/addSubmissionsAndDownloadConstants";
import { test, expect } from "../fixtures";

test.describe("Download Submissions", () => {
  let page1Promise: Promise<Page>;

  test.beforeEach(async ({ dashboardPage }) => {
    await test.step("Go to Dashboard Page", async () => dashboardPage.goToDashboardPage());
  });

  test("Download Submissions in a step-wise process", async ({ task2Page }) => {
    page1Promise = task2Page.addFieldsAndPublishForm();

    await test.step("1. Add specific fields and publish the form", () => page1Promise);

    await test.step("2. Make a submission", async () => {
      const page1 = await page1Promise;
      await task2Page.makeSubmission(page1);
    });

    await test.step("3. Navigate to the submissions tab and download", () => task2Page.navigateToSubmissionsAndDownload());
  });

  test.afterEach(async ({ deletePage, page }) => {
    await test.step("Close the pane", () => page.getByTestId(addSubmissionsAndDownloadConstants.closePaneButton).click());
    await test.step("Delete the form", () => deletePage.deleteForm())
  });
});
