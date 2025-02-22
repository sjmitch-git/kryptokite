describe("API Currencies Route", () => {
  it("should return supported currencies", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/currencies",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
});

describe("API Markets Route", () => {
  it("should return market data", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/markets?vs_currency=usd&order=volume_desc",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should return market data with specific parameters", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=2&sparkline=true",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
});

describe("API Markets Route with IDs", () => {
  it("should return market data for specific coin IDs", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/markets/bitcoin,ethereum?vs_currency=usd&order=volume_desc",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("symbol");
      expect(response.body[0]).to.have.property("name");
    });
  });
});

describe("API Coins Route", () => {
  it("should return the list of coins", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/coins",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("symbol");
      expect(response.body[0]).to.have.property("name");
    });
  });
});

describe("API Coins Route with ID", () => {
  it("should return price data for a specific coin ID", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/coins/bitcoin?vs_currency=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bitcoin");
      expect(response.body.bitcoin).to.have.property("usd");
      expect(response.body.bitcoin).to.have.property("usd_market_cap");
      expect(response.body.bitcoin).to.have.property("usd_24h_vol");
      expect(response.body.bitcoin).to.have.property("usd_24h_change");
      expect(response.body.bitcoin).to.have.property("last_updated_at");
    });
  });
});

describe("API Market Chart Route", () => {
  it("should return market chart data for a specific coin ID", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/coins/market_chart/bitcoin?vs_currency=usd&days=1",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("prices");
      expect(response.body).to.have.property("market_caps");
      expect(response.body).to.have.property("total_volumes");
      expect(response.body.prices).to.be.an("array");
      expect(response.body.market_caps).to.be.an("array");
      expect(response.body.total_volumes).to.be.an("array");
    });
  });
});
