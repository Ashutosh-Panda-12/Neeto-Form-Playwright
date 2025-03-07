import { Page, expect } from "@playwright/test";
import { conditionalLogicConstants } from "../constants/conditionalLogicConstants";

export class ConditionalLogic {
  constructor(private page: Page) {}

  async addSingleChoiceElement() {
    await this.page.getByTestId(conditionalLogicConstants.singleChoiceButton).click();
    await this.page.getByTestId(conditionalLogicConstants.questionInput).fill("Interested in Playwright ?");
    await this.page.getByTestId(conditionalLogicConstants.option3Hover).hover();
    await this.page.getByTestId(conditionalLogicConstants.deleteOption3).click();
    await this.page.getByTestId(conditionalLogicConstants.option2Hover).hover();
    await this.page.getByTestId(conditionalLogicConstants.deleteOption2).click();
    await this.page.getByTestId(conditionalLogicConstants.option0Input).fill("Yes");
    await this.page.getByTestId(conditionalLogicConstants.option1Input).fill("No");

    const start = await this.page.getByTestId(conditionalLogicConstants.multipleChoicePreviewGroup);
    const end = await this.page.getByTestId(conditionalLogicConstants.emailPreviewGroup);
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
    await this.page.getByTestId(conditionalLogicConstants.settingsLink).click();
    await this.page.getByTestId(conditionalLogicConstants.conditionalLogicAdd).click();
    await this.page.getByTestId(conditionalLogicConstants.addConditionButton).click();
    await this.page.getByTestId(conditionalLogicConstants.fieldSelector).click();
    await this.page.getByTestId(conditionalLogicConstants.menuList).getByText("Interested in Playwright ?").click();
    await this.page.getByTestId(conditionalLogicConstants.conditionTypeSelector).click();
    await this.page.getByTestId(conditionalLogicConstants.menuList).getByText("contains", { exact: true }).click();
    await this.page.getByTestId(conditionalLogicConstants.targetFieldSelector).click();
    await this.page.getByTestId(conditionalLogicConstants.menuList).getByText("Yes", { exact: true }).click();
    await this.page
      .getByTestId(conditionalLogicConstants.selectPlaceholderButton)
      .getByText("Select an action type")
      .click();
    await this.page.getByText("Show", { exact: true }).click();
    await this.page.getByTestId(conditionalLogicConstants.selectPlaceholderButton).getByText("Select a field").click();
    await this.page.getByText("Email address", { exact: true }).click();
    await this.page.getByTestId(conditionalLogicConstants.saveButton).click();
    await this.page.getByTestId(conditionalLogicConstants.publishButton).click();
  }

  async verifyNoOptionSkipsEmailField() {
    const formPublishPage = this.page.waitForEvent("popup");
    await this.page.getByTestId(conditionalLogicConstants.publishPreviewButton).click();
    const page1 = await formPublishPage;
    await page1.getByTestId(conditionalLogicConstants.yesOrNoOption).getByText("Yes").click();
    await page1.getByTestId(conditionalLogicConstants.submitButton).click();
    await expect(page1.getByTestId(conditionalLogicConstants.thankYouPage)).toBeVisible();
  }

  async verifyYesOptionShowsEmailField() {
    const emailVisibilityPage = this.page.waitForEvent("popup");
    await this.page.getByTestId(conditionalLogicConstants.publishPreviewButton).click();
    const page2 = await emailVisibilityPage;
    await page2.getByTestId(conditionalLogicConstants.yesOrNoOption).getByText("Yes").click();
    await expect(page2.getByText("Email address*")).toBeVisible();
    await expect(page2.getByTestId(conditionalLogicConstants.emailInput)).toBeVisible();
    await page2.getByTestId(conditionalLogicConstants.emailInput).fill("ashu@example.com");
    await page2.getByTestId(conditionalLogicConstants.submitButton).click();
    await expect(page2.getByTestId(conditionalLogicConstants.thankYouPage)).toBeVisible();
    await page2.close();
  }

  async disableConditions() {
    await this.page.getByTestId(conditionalLogicConstants.conditionalLogicDropdown).click();
    await this.page.getByTestId(conditionalLogicConstants.disableConditionsButton).click();
  }
}
