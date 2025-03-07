import { expect, Page } from "@playwright/test";
import { deleteFormConstants } from "../constants/deleteFormConstants";

export class deleteForm {
  constructor(public page: Page) {}
  deleteForm = async() => {
    await this.page
      .getByTestId(deleteFormConstants.navigationHeaderLeftBlock)
      .getByTestId(deleteFormConstants.deleteMenuButton)
      .click();
    await this.page.getByTestId(deleteFormConstants.deleteButton).click();
    await this.page.getByTestId(deleteFormConstants.deleteCheckbox).check();
    await this.page.getByTestId(deleteFormConstants.confirmDeleteButton).click();
  }
}

