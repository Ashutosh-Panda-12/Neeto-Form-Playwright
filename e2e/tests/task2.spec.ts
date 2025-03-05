import { TASK2_CONSTANTS } from "../constants/task2Constants";
import { test, expect } from "../fixtures/index";

test.describe("Download Submissions", () => {
    test("Download Submissions in a step-wise process", async ({ loginPage, task2Page, page }) => {
        let page1Promise;
        
        await test.step("1. Login and create a form", async () => {
            await loginPage.loginAsOliver();
        });

        await test.step("2. Add specific fields and publish the form", async () => {
            page1Promise = await task2Page.addFieldsAndPublishForm();
        });

        await test.step("3. Make a submission", async () => {
            const page1 = await page1Promise;
            await task2Page.makeSubmission(page1);
        });

        await test.step("4. Navigate to the submissions tab and download", async () => {
            await task2Page.navigateToSubmissionsAndDownload();
        });

        await test.step("5. Delete the form (Task2-specific)", async () => {
            await page.getByTestId(TASK2_CONSTANTS.CLOSE_PANE_BUTTON).click(); // ✅ Task2-specific step
            await loginPage.deleteForm();
        });
    });
});
