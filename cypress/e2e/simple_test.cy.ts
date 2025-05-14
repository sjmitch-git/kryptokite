describe("Test Page", () => {
  it("should display a 404 error if the page is not found", () => {
    // Visit a non-existent page
    cy.visit("/non-existent-page", { failOnStatusCode: false });

    // Check if the 404 error message is displayed
    cy.contains("404").should("be.visible");
    cy.contains("Not Found").should("be.visible");
  });
});
