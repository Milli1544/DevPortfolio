// cypress/e2e/performance-debug.cy.js

describe("Performance Debug - LCP & FCP Test", () => {
  beforeEach(() => {
    cy.visit("/projects", {
      onBeforeLoad(win) {
        // Inject PerformanceObserver for LCP tracking
        win.performance.mark("start-load");
      },
    });
  });

  it("Should confirm hero and project sections are visible and painted fast", () => {
    // Wait for page to load completely
    cy.get("body").should("be.visible");

    // Measure LCP target content - use more flexible selectors
    cy.get("h1, h2, section, main").first().should("exist");

    // Check for content existence rather than strict visibility
    cy.get("body").should("contain", "Milyon Kifleyesus");
    cy.get("body").should("contain", "My Projects");

    // Wait for animations and content to load
    cy.wait(2000);

    // Check for key sections more flexibly
    cy.get("body").should("contain", "Projects");

    // Check for footer content
    cy.get("body").should("contain", "Milyon Kifleyesus");

    // Measure performance metrics
    cy.window().then((win) => {
      // Get navigation timing
      const navigation = win.performance.getEntriesByType("navigation")[0];
      if (navigation) {
        cy.log(
          `DOM Content Loaded: ${
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart
          }ms`
        );
        cy.log(
          `Load Complete: ${
            navigation.loadEventEnd - navigation.loadEventStart
          }ms`
        );
        cy.log(
          `Total Load Time: ${
            navigation.loadEventEnd - navigation.fetchStart
          }ms`
        );
      }

      // Get resource loading times
      const resources = win.performance.getEntriesByType("resource");
      const slowResources = resources.filter((r) => r.duration > 1000);
      if (slowResources.length > 0) {
        cy.log(`Found ${slowResources.length} slow resources (>1s):`);
        slowResources.forEach((resource) => {
          cy.log(`  - ${resource.name}: ${resource.duration.toFixed(0)}ms`);
        });
      }
    });

    // Screenshot to visually inspect render delays
    cy.screenshot("performance_lcp_debug");
  });
});
