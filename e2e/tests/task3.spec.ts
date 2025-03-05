import { test, expect } from "../fixtures/index";

test.describe("Pre-fill form using URL parameters", () => {
    test("Pre-fill form using a step-by-step process", async ({ loginPage, task3Page }) => {
        let page1Promise;

        await test.step("1. Create the form", async () => {
            await loginPage.loginAsOliver();
        });

        await test.step("2. Add star rating, opinion scale, and matrix fields", async () => {
            page1Promise = await task3Page.addFieldsAndPublishForm();
        });

        await test.step("3. Publish and attempt it through the URL", async () => {
            const page1 = await page1Promise;
            let link: string = await page1.url();
            link += "?email=oliver@example.com&customer_exp=4&languages=Python,C&customer_rep.Friendliness=Excellent&customer_rep.Quickness=Very%20good&customer_rep.Knowledge=Average";
            await task3Page.verifyPrefillURL(page1, link);
        });

        await test.step("4. Delete the form", async () => {
            await loginPage.deleteForm();
        });
    });
});
