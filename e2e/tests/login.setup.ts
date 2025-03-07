import { test } from "../fixtures/index";
import { STORAGE_STATE } from "../constants/common";
import fs from "fs";

test.describe("Login Tests", () => {
    test("Login with valid credentials", async ({ loginPage }) => loginPage.loginAsOliver());
});
