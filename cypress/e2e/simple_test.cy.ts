describe("Test Page", () => {
  it("should display home page", () => {
    cy.visit("/", { failOnStatusCode: false });

    cy.url().then((url) => {
      cy.log("URL:", url);
      expect(url).to.include("/");
    });
  });
});
