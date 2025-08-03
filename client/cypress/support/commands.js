// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for page load
Cypress.Commands.add("waitForPageLoad", () => {
  cy.get("body").should("be.visible");
});

// Custom command to check if element is visible
Cypress.Commands.add("shouldBeVisible", (selector) => {
  cy.get(selector).should("be.visible");
});

// Custom command to fill form fields
Cypress.Commands.add("fillFormField", (selector, value) => {
  cy.get(selector).clear().type(value);
});

// Custom command to wait for API calls to complete
Cypress.Commands.add("waitForApi", () => {
  cy.wait(1000); // Wait for any pending API calls
});

// Custom command to check responsive design
Cypress.Commands.add("checkResponsive", (width, height) => {
  cy.viewport(width, height);
  cy.wait(500); // Wait for layout to adjust
});
