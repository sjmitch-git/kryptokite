describe("Home Page", () => {
  it("should display the main header", () => {
    // Visit the home page
    cy.visit("/");

    // Check if the main header is visible
    cy.get("h1").should("be.visible");
  });
});
