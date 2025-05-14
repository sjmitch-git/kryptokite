import React from "react";
import { mount } from "cypress/react";

// Simple Button component
const Button = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return <button onClick={onClick}>{label}</button>;
};

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    const label = "Click Me";
    const onClick = cy.stub();

    mount(<Button label={label} onClick={onClick} />);
    cy.get("button").should("contain", label);
  });

  it("calls onClick when clicked", () => {
    const onClick = cy.stub();
    mount(<Button label="Click Me" onClick={onClick} />);
    cy.get("button").click();
    expect(onClick).to.have.been.calledOnce;
  });
});
