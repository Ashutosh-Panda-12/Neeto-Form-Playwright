import { expect, test } from "@playwright/test";
import { LoginAndDelete } from "../pom/loginAndDelete";
import { ManageAccessControl } from "../pom/manageAccessControl";

test.describe("Manage access control of the form", () => {
  test("should create a new form, set password protection, and verify access", async ({ browser, page }) => {
    const loginAndDelete = new LoginAndDelete(page);
    const manageAccessControl = new ManageAccessControl(page, browser);

    await test.step("1. Create a new form and publish it", async () => {
      await loginAndDelete.loginAsOliver();
    });

    await test.step("2. Publish it and check the access control settings", async () => {
      await manageAccessControl.publishForm();
    });

    await test.step("3. Open form in a new context and verify password protection", async () => {
      await manageAccessControl.verifyAccessControl();
    });

    await test.step("4. Delete the form", async () => {
      await loginAndDelete.deleteForm();
    });
  });
});
