const url = "https://api.coinmarketcap.com/v1/ticker/";

describe("API Testing", () => {
  var result;

  it("Validate the header", () => {
    result = cy.request(url);

    result
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("Validate the status", () => {
    result = cy.request(url);

    result.its("status").should("equal", 200);
  });

  it("Validate the body ", () => {
    result = cy.request(url);

    result.its("body").should("to.not.be.null");
  });
});
