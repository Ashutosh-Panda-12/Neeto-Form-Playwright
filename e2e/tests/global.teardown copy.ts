import { test } from "@playwright/test";
import { STORAGE_STATE } from "../constants/common";
import * as fs from "fs";

test("Teardown", async () => {
    console.log("Running teardown...");

    if (fs.existsSync(STORAGE_STATE)) {
        console.log("Deleting storage state file...");
        try {
            fs.unlinkSync(STORAGE_STATE);
            console.log("Storage state deleted successfully.");
        } catch (error) {
            console.error("Error deleting storage state:", error);
        }
    } else {
        console.log("No storage state file found, skipping deletion.");
    }

    console.log("Teardown complete.");
});
