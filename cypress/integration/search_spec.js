const url = "http://localhost:3000/";

describe("Search Testing", () => {
  it("Search", () => {
    cy.visit(url);

    // Get an input, type into it and verify that the value has been updated
    cy.get(".search-icon-name").click();
    cy.get(".search-input-name")
      .click()
      .type("bitcoin");
    cy.get(".search-button-name").click();
    cy.get(".row-name").contains("Bitcoin");
  });
});
