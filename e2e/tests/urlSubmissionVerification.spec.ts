import { Page } from "@playwright/test";
import { test, expect } from "../fixtures";

test.describe("Pre-fill form using URL parameters", () => {
  let page1Promise: Promise<Page>;

  test.beforeEach(async ({ dashboardPage }) => {
    await test.step("Go to Dashboard Page", async() => dashboardPage.goToDashboardPage());
  });

  test("Pre-fill form using a step-by-step process", async ({ task3Page }) => {
    page1Promise = task3Page.addFieldsAndPublishForm(); 

    await test.step("1. Add star rating, opinion scale, and matrix fields", () => page1Promise);

    await test.step("2. Publish and attempt it through the URL", async () => {
      const page1: Page = await page1Promise;
      const link = `${page1.url()}?email=oliver@example.com&customer_exp=4&languages=Python,C&customer_rep.Friendliness=Excellent&customer_rep.Quickness=Very%20good&customer_rep.Knowledge=Average`;
      await task3Page.verifyPrefillURL(page1, link);
    });
  });

  test.afterEach(async ({ deletePage }) => 
    await test.step("Delete the form", () => deletePage.deleteForm())
  );
});
