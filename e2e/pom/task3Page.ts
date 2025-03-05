import { Page, expect } from "@playwright/test";
import { TASK3_CONSTANTS } from "../constants/task3Constants";

export class Task3Page {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addFieldsAndPublishForm() {
    await this.page.getByTestId(TASK3_CONSTANTS.ADD_STAR_RATING).click();
    await this.page.getByTestId(TASK3_CONSTANTS.ADD_MULTI_CHOICE).click();
    await this.page.getByTestId(TASK3_CONSTANTS.ADD_MATRIX).click();

    await this.page.getByTestId(TASK3_CONSTANTS.STAR_RATING_GROUP).click();
    await this.page.getByTestId(TASK3_CONSTANTS.CONTENT_TEXT_FIELD).fill("Rate customer service");
    await this.page.getByRole("button", { name: "Advanced properties" }).click();
    await this.page.getByTestId(TASK3_CONSTANTS.FIELD_CODE_TEXT_FIELD).fill("customer_exp");

    await this.page.getByTestId(TASK3_CONSTANTS.MULTI_CHOICE_GROUP).click();
    await this.page.getByTestId(TASK3_CONSTANTS.CONTENT_TEXT_FIELD).fill("Preferred language choice");
    await this.page.getByTestId(TASK3_CONSTANTS.OPTION_INPUT_0).fill("C");
    await this.page.getByTestId(TASK3_CONSTANTS.OPTION_INPUT_1).fill("Python");
    await this.page.getByTestId(TASK3_CONSTANTS.OPTION_INPUT_2).fill("JavaScript");
    await this.page.getByTestId(TASK3_CONSTANTS.OPTION_INPUT_3).fill("TypeScript");
    await this.page.getByRole("button", { name: "Advanced properties" }).click();
    await this.page.getByTestId(TASK3_CONSTANTS.FIELD_CODE_TEXT_FIELD).fill("languages");

    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_GROUP).click();
    await this.page.getByTestId(TASK3_CONSTANTS.CONTENT_TEXT_FIELD).fill("Rate customer representative");
    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_ROW_CONTAINER).getByTestId(TASK3_CONSTANTS.OPTION_INPUT_0).fill("Friendliness");
    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_ROW_CONTAINER).getByTestId(TASK3_CONSTANTS.OPTION_INPUT_1).fill("Knowledge");
    await this.page.getByRole("button", { name: "Add row" }).click();
    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_ROW_CONTAINER).getByTestId(TASK3_CONSTANTS.OPTION_INPUT_2).fill("Quickness");
    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_COLUMN_CONTAINER).getByTestId(TASK3_CONSTANTS.OPTION_INPUT_0).fill("Excellent");
    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_COLUMN_CONTAINER).getByTestId(TASK3_CONSTANTS.OPTION_INPUT_1).fill("Average");
    await this.page.getByRole("button", { name: "Add column" }).click();
    await this.page.getByTestId(TASK3_CONSTANTS.MATRIX_COLUMN_CONTAINER).getByTestId(TASK3_CONSTANTS.OPTION_INPUT_2).fill("Very good");
    await this.page.getByRole("button", { name: "Advanced properties" }).click();
    await this.page.getByTestId(TASK3_CONSTANTS.FIELD_CODE_TEXT_FIELD).fill("customer_rep");

    await this.page.getByTestId(TASK3_CONSTANTS.PUBLISH_BUTTON).click();
    await this.page.getByTestId(TASK3_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    
    return this.page.waitForEvent("popup");
  }

  async verifyPrefillURL(page1: Page, link: string) {
    await page1.goto(link);
    
    const parsedURL = new URL(link);
    let params: string[] = [];
    parsedURL.searchParams.forEach(value => params.push(value));
    let [var1, var2, var3, var4, var5, var6] = params;

    console.log(var1, var2, var3, var4, var5, var6);

    await expect(var1).toBe("oliver@example.com");
    await expect(var2).toBe("4");
    await expect(var3).toBe("Python,C");
    await expect(var4).toBe("Excellent");
    await expect(var5).toBe("Very good");
    await expect(var6).toBe("Average");

    await page1.close();
  }
}
