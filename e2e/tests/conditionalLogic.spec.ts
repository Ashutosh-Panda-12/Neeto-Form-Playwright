import { expect, test } from "@playwright/test";
import { LoginAndDelete } from "../poms/loginAndDelete";
import { ConditionalLogic } from "../poms/conditionalLogic";

test.describe("Ensure that conditional logic is verified", () => {
  test("should create a new form, add a single-choice element, set conditions, and verify functionality", async ({ page }) => {
    const loginAndDelete = new LoginAndDelete(page);
    const conditionalLogic = new ConditionalLogic(page);

    await test.step("Step 1: Create a new form and add a single-choice element", async () => {
      await loginAndDelete.loginAsOliver();
    });

    await test.step("Step 2: Add a single-choice element", async () => {
      await conditionalLogic.addSingleChoiceElement();
    });

    await test.step("Step 3: Set conditions so that selecting 'Yes' shows the email address field", async () => {
      await conditionalLogic.setConditionalLogic();
    });

    await test.step("Step 4: Verify that selecting 'No' skips the email field", async () => {
      await conditionalLogic.verifyNoOptionSkipsEmailField();
    });

    await test.step("Step 5: Verify that selecting 'Yes' shows the email field", async () => {
      await conditionalLogic.verifyYesOptionShowsEmailField();
    });

    await test.step("Step 6: Disable the conditions", async () => {
      await conditionalLogic.disableConditions();
    });

    await test.step("Step 7: Delete the form", async () => {
      await loginAndDelete.deleteForm();
    });
  });
});
