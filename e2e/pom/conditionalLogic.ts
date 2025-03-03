import { Page, expect } from "@playwright/test";
import { CONDITIONAL_LOGIC_CONSTANTS } from "../constants/conditionalLogicConstants";

export class ConditionalLogic {
  private page: Page;
  private currentUrl: string = "";

  constructor(page: Page) {
    this.page = page;
  }

  async addSingleChoiceElement() {
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.SINGLE_CHOICE_BUTTON).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.QUESTION_INPUT).fill("Interested in Playwright ?");
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.OPTION_3_HOVER).hover();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.DELETE_OPTION_3).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.OPTION_2_HOVER).hover();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.DELETE_OPTION_2).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.OPTION_0_INPUT).fill("Yes");
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.OPTION_1_INPUT).fill("No");

    const start = await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.multipleChoicePreviewGroup);
    const end = await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.emailPreviewGroup);
        const box = await start.boundingBox();
        if (box) {
            const startX = box.x + box.width / 2;
            const startY = box.y + box.height / 2;
            const endY = startY - 100;
            await this.page.mouse.move(startX, startY);
            await this.page.mouse.down();
            await this.page.mouse.move(startX, endY, { steps: 10 });
            await this.page.mouse.up();
        }
  }

  async setConditionalLogic() {
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.SETTINGS_LINK).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.CONDITIONAL_LOGIC_ADD).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.ADD_CONDITION_BUTTON).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.FIELD_SELECTOR).nth(0).click();
    await this.page.getByTestId("menu-list").getByText("Interested in Playwright ?").click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.FIELD_SELECTOR).nth(1).click();
    await this.page.getByTestId("menu-list").getByText(CONDITIONAL_LOGIC_CONSTANTS.CONDITION_TYPE_CONTAINS, {exact: true}).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.FIELD_SELECTOR).nth(2).click();
    await this.page.getByTestId("menu-list").getByText(CONDITIONAL_LOGIC_CONSTANTS.YES_OPTION, {exact: true}).click();
    await this.page.getByRole("combobox").nth(3).click();
    await this.page.getByText(CONDITIONAL_LOGIC_CONSTANTS.ACTION_SHOW, {exact: true}).click();
    await this.page.getByRole("combobox").nth(4).click();
    await this.page.getByText(CONDITIONAL_LOGIC_CONSTANTS.EMAIL_FIELD_OPTION, {exact: true}).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.SAVE_BUTTON).click();
    this.currentUrl = this.page.url();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.PUBLISH_BUTTON).click();
  }

  async verifyNoOptionSkipsEmailField() {
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page1 = await page1Promise;
    await page1.locator(CONDITIONAL_LOGIC_CONSTANTS.NO_OPTION).nth(1).click();
    await page1.locator(CONDITIONAL_LOGIC_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(page1.locator(CONDITIONAL_LOGIC_CONSTANTS.THANK_YOU_PAGE)).toBeVisible();
  }

  async verifyYesOptionShowsEmailField() {
    const page2Promise = this.page.waitForEvent("popup");
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.PUBLISH_PREVIEW_BUTTON).click();
    const page2 = await page2Promise;
    await page2.locator(CONDITIONAL_LOGIC_CONSTANTS.NO_OPTION).nth(0).click();
    await expect(page2.locator(CONDITIONAL_LOGIC_CONSTANTS.EMAIL_LABEL)).toBeVisible();
    await expect(page2.locator(CONDITIONAL_LOGIC_CONSTANTS.EMAIL_INPUT)).toBeVisible();
    await page2.locator(CONDITIONAL_LOGIC_CONSTANTS.EMAIL_INPUT).fill("ashu@example.com");
    await page2.locator(CONDITIONAL_LOGIC_CONSTANTS.SUBMIT_BUTTON).click();
    await expect(page2.locator(CONDITIONAL_LOGIC_CONSTANTS.THANK_YOU_PAGE)).toBeVisible();
    console.log("Yes option verified successfully.");
    await page2.close();
  }

  async disableConditions() {
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.CONDITIONAL_LOGIC_DROPDOWN).click();
    await this.page.locator(CONDITIONAL_LOGIC_CONSTANTS.DISABLE_CONDITIONS_BUTTON).click();
  }
}





