import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "3hfwpx",
  e2e: {
    baseUrl: "http://localhost:5180",
    setupNodeEvents() {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    // Add longer timeout for animations
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
});
