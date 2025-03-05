import { test, expect } from "../fixtures/index";

test.describe("Apply a theme to the form", () => {
    test("Apply theme by completing it in steps", async ({ loginPage, task1Page }) => {
        await test.step("1. Login and create a form", async () => {
            await loginPage.loginAsOliver();
        });

        await test.step("2. Add a new theme", async () => {
            await task1Page.addTheme();
            await task1Page.verifyThemeApplied();
        });

        await test.step("3. Delete the form", async () => {
            await loginPage.deleteForm();
        });
    });
});
