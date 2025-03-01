import { test, expect } from "../fixtures/index"; // Import fixture

const originalArr = [
  "Option 1", "Option 2", "Option 3",
  "Option 4", "Option 5", "Option 6", "Option 7",
  "Option 8", "Option 9", "Option 10"
];

test.describe("Form Field Customization", () => {
  test("should be able to customize the field elements of the form", async ({ loginAndDelete, formFieldElements }) => {
    
    await test.step("1. Log in and create a form", async () => {
      await loginAndDelete.loginAsOliver();
    });

    await test.step("2. Add single and multiple choice elements", async () => {
      await formFieldElements.addSingleAndMultiChoiceFields();
    });

    await test.step("3. Ensure all fields are in their desired state", async () => {
      await formFieldElements.verifyFieldsDisplayed(originalArr);
    });

    await test.step("4. Uncheck the hide option of multi-choice element and publish the form", async () => {
      await formFieldElements.unhideMultiChoiceAndPublish();
    });

    await test.step("5. Ensure the field is now visible on the published form", async () => {
      await formFieldElements.ensureFieldsVisibleOnPublishedForm();
    });

    await test.step("6. Delete the form", async () => {
      await loginAndDelete.deleteForm();
    });

  });
});
