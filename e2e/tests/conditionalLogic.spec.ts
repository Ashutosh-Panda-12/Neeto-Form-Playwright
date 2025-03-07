import { test, expect } from "../fixtures";

test.describe("Ensure that conditional logic is verified", () => {
  test.beforeEach(async ({ loginAndDelete }) => {
    await loginAndDelete.loginAsOliver();
  });

  test.afterEach(async ({ loginAndDelete }) => {
    await loginAndDelete.deleteForm();
  });

  test("should create a new form, add a single-choice element, set conditions, and verify functionality", async ({ conditionalLogic }) => {
    await test.step("Step 1: Add a single-choice element", () => conditionalLogic.addSingleChoiceElement());

    await test.step("Step 2: Set conditions so that selecting 'Yes' shows the email address field", () =>
      conditionalLogic.setConditionalLogic()
    );

    await test.step("Step 3: Verify that selecting 'No' skips the email field", () =>
      conditionalLogic.verifyNoOptionSkipsEmailField()
    );

    await test.step("Step 4: Verify that selecting 'Yes' shows the email field", () =>
      conditionalLogic.verifyYesOptionShowsEmailField()
    );

    await test.step("Step 5: Disable the conditions", () => conditionalLogic.disableConditions());
  });
});
