export const CREATE_FORM_CONSTANTS = {
  ELEMENTS_CONTAINER: "[data-testid='elements-container']",
  FULL_NAME_BUTTON: "button[name='Full name']",
  PHONE_NUMBER_BUTTON: "button[name='Phone number']",
  PUBLISH_BUTTON: "[data-testid='publish-button']",
  PUBLISH_PREVIEW_BUTTON: "[data-testid='publish-preview-button']",

  EMAIL_FIELD: "text=Email address*",
  FULL_NAME_FIELD: "text=Full name*",
  PHONE_NUMBER_FIELD: "text=Phone number*",

  SUBMIT_BUTTON: "[data-cy='start-or-submit-button']",
  EMAIL_REQUIRED_ERROR: "text=Email address is required",
  FIRST_NAME_REQUIRED_ERROR: "text=First name is required",
  LAST_NAME_REQUIRED_ERROR: "text=Last name is required",
  PHONE_NUMBER_REQUIRED_ERROR: "text=Phone number is invalid", // Renamed

  EMAIL_INPUT: "//input[@type='email']",
  FIRST_NAME_INPUT: "(//input[@type='text'])[1]",
  LAST_NAME_INPUT: "(//input[@type='text'])[2]",
  PHONE_INPUT: "//input[@type='tel']",

  EMAIL_INVALID_ERROR: "text=Email address is invalid",
  PHONE_NUMBER_FORMAT_ERROR: "text=US numbers cannot start with", // Renamed

  THANK_YOU_MESSAGE: "role=heading[name='Thank You.']",

  SUBMISSIONS_TAB: "[data-cy='submissions-tab']",
  SUBMISSION_EMAIL: "[data-cy='submission-label']",
  SUBMISSION_NAME: "[data-cy='submission-label']",
  SUBMISSION_PHONE: "[data-cy='submission-label']",
};
