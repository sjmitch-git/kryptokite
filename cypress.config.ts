import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "ugiqkv",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: ["cypress/e2e/**/api_routes.cy.js"],
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
