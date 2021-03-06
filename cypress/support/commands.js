// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

import { auth } from "../../src/firebase-config/init";

Cypress.Commands.add("login", async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password);
  return null;
});

Cypress.Commands.add("stubGithubApiCall", () => {
  cy.intercept(
    "GET",
    "https://api.github.com/users/octocat/repos",

    { fixture: "github-repos-api.json" }
  );
  cy.intercept(
    "GET",
    "https://api.github.com/users/octocat",

    { fixture: "github-owner-api.json" }
  );
});

Cypress.Commands.add("cleanUpEmulatorData", () => {
  cy.request("DELETE", "http://localhost:9099/emulator/v1/projects/shanwong/accounts");
  cy.request("DELETE", "http://localhost:8081/emulator/v1/projects/shanwong/databases/(default)/documents");
});
