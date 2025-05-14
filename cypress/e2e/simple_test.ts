describe("Maintenance Page", () => {
  it("should display the main header", () => {
    // Visit the home page
    cy.visit("/maintenance");

    // Check if the main header is visible
    cy.contains("We'll Be Back Soon!").should("be.visible");
  });
});
