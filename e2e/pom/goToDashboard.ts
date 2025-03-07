import { expect, Page } from "@playwright/test";
import { dashboardConstants } from "../constants/dashboardConstants";

export class goToDashboard {
  constructor(public page: Page) {}
  goToDashboardPage = async() => {
    await this.page.goto("/");
    await this.page.getByTestId(dashboardConstants.addNewFormButton).click();
    await this.page.getByTestId(dashboardConstants.startFromScratchButton).click();
  }
}

