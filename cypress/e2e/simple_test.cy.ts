describe("tEST Page", () => {
  it("should display the maintenance page when the site is under maintenance", () => {
    // Visit a non-existent page (redirects to maintenance.html)
    cy.visit("/non-existent-page", { failOnStatusCode: false });

    // Check if the maintenance page is displayed
    cy.contains("We'll Be Back Soon!").should("be.visible");
    cy.contains("Our website is currently undergoing scheduled maintenance.").should("be.visible");
  });
});
