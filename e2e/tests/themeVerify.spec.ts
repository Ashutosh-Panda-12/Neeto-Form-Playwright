import { test, expect } from "../fixtures";

test.describe("Apply a theme to the form", () => {
  
  test.beforeEach(async ({ dashboardPage }) => {
    await test.step("Go to Dashboard Page", async() => dashboardPage.goToDashboardPage());
  }); 

  test("Apply theme by completing it in steps", async ({ task1Page }) => {
    await test.step("1. Add a new theme", () => task1Page.addTheme()); 
    await test.step("2. Verify theme applied", () => task1Page.verifyThemeApplied()); 
  });

  test.afterEach(async ({ deletePage }) => 
    await test.step("Delete the form", () => deletePage.deleteForm()) 
  );

});
