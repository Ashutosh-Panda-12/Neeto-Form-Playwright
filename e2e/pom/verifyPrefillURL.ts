import { Page, expect } from "@playwright/test";
import { prefillURLConstants } from "../constants/prefillURLConstants";

export class verifyPrefillURL {
  constructor(private page: Page) {}

  addFieldsAndPublishForm = async () => {
    await this.page.getByTestId(prefillURLConstants.addStarRating).click();
    await this.page.getByTestId(prefillURLConstants.addMultiChoice).click();
    await this.page.getByTestId(prefillURLConstants.addMatrix).click();

    await this.page.getByTestId(prefillURLConstants.starRatingGroup).click();
    await this.page.getByTestId(prefillURLConstants.contentTextField).fill("Rate customer service");
    await this.page.getByRole("button", { name: "Advanced properties" }).click();
    await this.page.getByTestId(prefillURLConstants.fieldCodeTextField).fill("customer_exp");

    await this.page.getByTestId(prefillURLConstants.multiChoiceGroup).click();
    await this.page.getByTestId(prefillURLConstants.contentTextField).fill("Preferred language choice");
    await this.page.getByTestId(prefillURLConstants.optionInput0).fill("C");
    await this.page.getByTestId(prefillURLConstants.optionInput1).fill("Python");
    await this.page.getByTestId(prefillURLConstants.optionInput2).fill("JavaScript");
    await this.page.getByTestId(prefillURLConstants.optionInput3).fill("TypeScript");
    await this.page.getByRole("button", { name: "Advanced properties" }).click();
    await this.page.getByTestId(prefillURLConstants.fieldCodeTextField).fill("languages");

    await this.page.getByTestId(prefillURLConstants.matrixGroup).click();
    await this.page.getByTestId(prefillURLConstants.contentTextField).fill("Rate customer representative");
    await this.page.getByTestId(prefillURLConstants.matrixRowContainer).getByTestId(prefillURLConstants.optionInput0).fill("Friendliness");
    await this.page.getByTestId(prefillURLConstants.matrixRowContainer).getByTestId(prefillURLConstants.optionInput1).fill("Knowledge");
    await this.page.getByRole("button", { name: "Add row" }).click();
    await this.page.getByTestId(prefillURLConstants.matrixRowContainer).getByTestId(prefillURLConstants.optionInput2).fill("Quickness");
    await this.page.getByTestId(prefillURLConstants.matrixColumnContainer).getByTestId(prefillURLConstants.optionInput0).fill("Excellent");
    await this.page.getByTestId(prefillURLConstants.matrixColumnContainer).getByTestId(prefillURLConstants.optionInput1).fill("Average");
    await this.page.getByRole("button", { name: "Add column" }).click();
    await this.page.getByTestId(prefillURLConstants.matrixColumnContainer).getByTestId(prefillURLConstants.optionInput2).fill("Very good");
    await this.page.getByRole("button", { name: "Advanced properties" }).click();
    await this.page.getByTestId(prefillURLConstants.fieldCodeTextField).fill("customer_rep");

    await this.page.getByTestId(prefillURLConstants.publishButton).click();
    await this.page.getByTestId(prefillURLConstants.publishPreviewButton).click();

    return this.page.waitForEvent("popup");
  };

  verifyPrefillURL = async (page1: Page, link: string) => {
    await page1.goto(link);

    const parsedURL = new URL(link);
    let params: string[] = [];
    parsedURL.searchParams.forEach((value) => params.push(value));
    let [var1, var2, var3, var4, var5, var6] = params;

    await expect(var1).toBe("oliver@example.com");
    await expect(var2).toBe("4");
    await expect(var3).toBe("Python,C");
    await expect(var4).toBe("Excellent");
    await expect(var5).toBe("Very good");
    await expect(var6).toBe("Average");

    await page1.close();
  };
}
