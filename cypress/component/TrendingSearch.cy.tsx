import React from "react";
import { mount } from "cypress/react";
import TrendingSearch from "@/components/trending/TrendingSearch";
import { UserProvider } from "@/lib/contexts/UserContext";

describe("TrendingSearch Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/trending_search", {
      statusCode: 200,
      body: {
        coins: [
          {
            item: {
              id: "bitcoin",
              name: "Bitcoin",
              symbol: "btc",
              market_cap_rank: 1,
              thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
              data: {
                sparkline: "https://www.coingecko.com/coins/12151/sparkline.svg",
              },
              description: "Bitcoin is a decentralized digital currency.",
            },
          },
        ],
      },
    }).as("getTrendingSearch");
  });

  it("renders the TrendingSearch component", () => {
    mount(
      <UserProvider>
        <TrendingSearch />
      </UserProvider>
    );

    cy.wait("@getTrendingSearch");

    cy.get("h3").contains("Trending Search Coins");
    cy.get("p").contains("Top 1 trending searched for coins");
    cy.get("p").contains("Click the star icon to add or remove from your collection");
    cy.get("li").should("have.length", 1);
    cy.get("li").within(() => {
      cy.get("img").should(
        "have.attr",
        "src",
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png"
      );
      cy.get("span").contains("Bitcoin (BTC)");
      cy.get("small").contains("Rank: 1");
      cy.get("img").should("have.attr", "src", "https://example.com/sparkline.png");
      cy.get("button").should("have.class", "text-gray-500");
    });
  });
});
