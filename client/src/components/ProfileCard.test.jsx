import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";

describe("ProfileCard Component", () => {
  it("renders with default props", () => {
    render(<ProfileCard />);
    expect(screen.getByText("Javi A. Torres")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("@javicodes")).toBeInTheDocument();
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <ProfileCard
        name="John Doe"
        title="Full Stack Developer"
        handle="johndoe"
        status="Available"
        contactText="Get in Touch"
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });

  it("renders avatar image", () => {
    render(<ProfileCard />);
    const avatars = screen.getAllByAltText("Javi A. Torres");
    expect(avatars.length).toBeGreaterThan(0);
    expect(avatars[0]).toHaveAttribute("src");
  });

  it("renders with custom avatar URL", () => {
    const customAvatar = "/images/custom-avatar.jpg";
    render(<ProfileCard avatarUrl={customAvatar} />);
    const avatars = screen.getAllByAltText("Javi A. Torres");
    const avatar = avatars.find((img) => img.src.includes(customAvatar));
    expect(avatar).toBeInTheDocument();
  });

  it("hides user info when showUserInfo is false", () => {
    render(<ProfileCard showUserInfo={false} />);
    expect(screen.queryByText("@javicodes")).not.toBeInTheDocument();
    expect(screen.queryByText("Online")).not.toBeInTheDocument();
  });

  it("renders status correctly", () => {
    render(<ProfileCard status="Busy" />);
    expect(screen.getByText("Busy")).toBeInTheDocument();
  });

  it("renders contact text as React element", () => {
    const contactElement = <button>Custom Contact</button>;
    render(<ProfileCard contactText={contactElement} />);
    expect(screen.getByText("Custom Contact")).toBeInTheDocument();
  });
});
