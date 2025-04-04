describe("API Currencies Route", () => {
  it("should return supported currencies", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/currencies",
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
      url: "http://localhost:3000/api/markets?vs_currency=usd&order=volume_desc",
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
      url: "http://localhost:3000/api/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=2&sparkline=true",
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
      url: "http://localhost:3000/api/markets/bitcoin,ethereum?vs_currency=usd&order=volume_desc",
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
      url: "http://localhost:3000/api/coins",
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
      url: "http://localhost:3000/api/coins/bitcoin",
      headers: {
        "x-cg-demo-api-key": Cypress.env("COIN_GECKO_TOKEN"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", "bitcoin");
      expect(response.body).to.have.property("name", "Bitcoin");
      expect(response.body).to.have.property("symbol", "btc");
      expect(response.body).to.have.property("market_cap_rank").and.to.be.a("number");
      expect(response.body).to.have.property("last_updated");
      expect(response.body).to.have.property("market_data");
      expect(response.body).to.have.property("image").and.to.be.an("object");
      expect(response.body).to.have.property("links").and.to.be.an("object");
    });
  });
});

describe("API Market Chart Route", () => {
  it("should return market chart data for a specific coin ID", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/coins/market_chart/bitcoin?vs_currency=usd&days=1",
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

describe("API Trending Search Route", () => {
  it("should return trending search data", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/trending_search",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("coins");
      expect(response.body.coins).to.be.an("array");
      expect(response.body.coins.length).to.be.greaterThan(0);
      response.body.coins.forEach((coin: any) => {
        expect(coin).to.have.property("item");
        expect(coin.item).to.have.property("id");
        expect(coin.item).to.have.property("name");
        expect(coin.item).to.have.property("symbol");
        expect(coin.item).to.have.property("market_cap_rank");
        expect(coin.item).to.have.property("thumb");
      });
    });
  });
});
