import { expect, test } from "@playwright/test";
import { LoginAndDelete } from "../pom/loginAndDelete";
import { UniqueSubmissions } from "../pom/uniqueSubmissions";

test.describe("Ensure only unique submissions are done", () => {
  test("should create a form, enable unique submissions, and verify the behavior", async ({ browser, page }) => {
    const loginAndDelete = new LoginAndDelete(page);
    const uniqueSubmissions = new UniqueSubmissions(page, browser);

    await test.step("Step 1: Create a new form", async () => {
      await loginAndDelete.loginAsOliver();
    });

    await test.step("Step 2: Enable Unique Submissions", async () => {
      await uniqueSubmissions.enableUniqueSubmissions();
    });

    await test.step("Step 3: Preview and fill the form", async () => {
      await uniqueSubmissions.fillForm("ashutosh@example.com");
    });

    await test.step("Step 4: Verify resubmission is blocked", async () => {
      await uniqueSubmissions.verifySubmissionBlocked();
    });

    await test.step("Step 5: Copy the form link", async () => {
      await uniqueSubmissions.getFormLink();
    });

    await test.step("Step 6: Verify different cookies allow submission", async () => {
      await uniqueSubmissions.verifyDifferentCookiesSubmission("ashutoshpanda@example.com");
    });

    await test.step("Step 7: Enable 'No check' option", async () => {
      await uniqueSubmissions.enableNoCheckOption();
      await uniqueSubmissions.fillForm("ashu@gmail.com");
    });

    await test.step("Step 8: Delete the form", async () => {
      await loginAndDelete.deleteForm();
    });
  });
});
