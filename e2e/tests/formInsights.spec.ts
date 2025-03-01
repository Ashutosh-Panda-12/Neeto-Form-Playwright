import { test, expect } from "../fixtures/index"; // Import fixture

test.describe("Form Insights Verification", () => {
  test("should verify form insights", async ({ loginAndDelete, formInsights }) => {
    await test.step("1. Log in and create a form", async () => {
      await loginAndDelete.loginAsOliver();
    });

    await test.step("2. Publish form and open analytics", async () => {
      await formInsights.publishFormAndOpenAnalytics();
    });

    await test.step("3. Verify initial insights", async () => {
      await formInsights.verifyInitialInsights();
    });

    await test.step("4. Open the published form and verify first visit", async () => {
      await formInsights.openFormAndVerifyFirstVisit();
    });

    await test.step("5. Open the published form again and enter email", async () => {
      await formInsights.openFormAndEnterEmail();
    });

    await test.step("6. Open the published form, submit, and check statistics", async () => {
      await formInsights.submitFormAndCheckStatistics();
    });

    await test.step("7. Delete the form", async () => {
      await loginAndDelete.deleteForm();
    });
  });
});
