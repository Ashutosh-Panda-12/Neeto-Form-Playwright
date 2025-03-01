import { test, expect } from "../fixtures/index"; // Import fixture

test.describe("Form Creation and Verification", () => {
  test("should be able to create and verify form", async ({ loginAndDelete, createForm }) => {
    await test.step("1. Log in and create a form", async () => {
      await loginAndDelete.loginAsOliver();
    });

    await test.step("2. Add fields and publish", async () => {
      await createForm.addFieldsAndPublish();
    });

    await test.step("3. Check if all form fields are visible", async () => {
      await createForm.checkFieldsVisible();
    });

    await test.step("4. Check if all fields are filled or not", async () => {
      await createForm.checkMandatoryFieldErrors();
    });

    await test.step("5. Check validation errors", async () => {
      await createForm.checkValidationErrors();
    });

    await test.step("6. Fill form with valid data and submit", async () => {
      await createForm.fillValidDataAndSubmit();
    });

    await test.step("7. Verify submitted response", async () => {
      await createForm.verifySubmittedResponse();
    });

    await test.step("8. Delete the form", async () => {
      await loginAndDelete.deleteForm();
    });
  });
});
