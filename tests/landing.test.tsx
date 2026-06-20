import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../src/app/page";

// Mock next/link to render a simple anchor
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("LandingPage Component Tests", () => {
  it("should render landing page headers and titles correctly", () => {
    render(<LandingPage />);
    
    // Check titles
    expect(screen.getByText("EcoPilot")).toBeDefined();
    expect(screen.getByText("AI-Powered Sustainability Guidance for Everyday Actions")).toBeDefined();
  });

  it("should contain Start Assessment CTA redirect links", () => {
    render(<LandingPage />);
    
    // Check links exist
    const links = screen.getAllByRole("link", { name: /Start Assessment/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    
    links.forEach((link) => {
      expect(link.getAttribute("href")).toBe("/assessment");
    });
  });

  it("should list all five core platform capabilities", () => {
    render(<LandingPage />);
    
    expect(screen.getByText("Carbon Assessment")).toBeDefined();
    expect(screen.getByText("AI Sustainability Coach")).toBeDefined();
    expect(screen.getByText("Weekly Habit Challenges")).toBeDefined();
    expect(screen.getByText("Verification Workflow")).toBeDefined();
    expect(screen.getByText("Rewards & Standing Tiers")).toBeDefined();
  });
});
