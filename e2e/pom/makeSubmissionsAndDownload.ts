import { Page, expect, Download } from "@playwright/test";
import { addSubmissionsAndDownloadConstants } from "../constants/addSubmissionsAndDownloadConstants";

export class makeSubmissionsAndDownload {
  constructor(private page: Page) { }

  addFieldsAndPublishForm = async () => {
    await this.page.getByTestId("elements-container").getByTestId(addSubmissionsAndDownloadConstants.addOpinionScale).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.addStarRating).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.addMatrix).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.contentTextField).fill("Matrix");
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.starRatingGroup).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.contentTextField).fill("Star Rating");
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.opinionScaleGroup).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.contentTextField).fill("Opinion Scale");
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.publishButton).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.publishPreviewButton).click();
    return this.page.waitForEvent("popup");
  }

  makeSubmission = async (submissionsPage: Page) => {
    await submissionsPage.getByTestId(addSubmissionsAndDownloadConstants.emailTextField).fill("ashu@example.com");
    await submissionsPage.getByTestId(addSubmissionsAndDownloadConstants.opinionScale).getByText("8").click();
    await submissionsPage.getByTestId(addSubmissionsAndDownloadConstants.previewRatingIcon).getByText("4").click();
    await submissionsPage.getByRole('row', { name: 'Row 1' }).locator('span').first().click();
    await submissionsPage.getByRole('row', { name: 'Row 2' }).locator('span').nth(1).click();
    await submissionsPage.getByTestId(addSubmissionsAndDownloadConstants.submitButton).click();
    await expect(submissionsPage.getByTestId(addSubmissionsAndDownloadConstants.thankYouPage)).toBeVisible({ timeout: 5000 });
    await submissionsPage.close();
  }

  navigateToSubmissionsAndDownload = async () => {
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.submissionsTab).click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.submittedResponse).hover();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.viewSubmissionButton).click();
    await this.page.getByTestId("pane-header").getByTestId("nui-dropdown-icon").click();
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.pdfRadioLabel).click();

    const downloadedPage = this.page.waitForEvent("popup");
    await this.page.getByTestId(addSubmissionsAndDownloadConstants.actionDropdownButton).click();

    const downloadPage = await downloadedPage;
    await downloadPage.close();
  }

}

