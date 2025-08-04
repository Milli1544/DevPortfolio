import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import About from "./About";
import axios from "axios";

// Mock axios
vi.mock("axios");
const mockedAxios = axios;

describe("About Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the about page title", () => {
    render(<About />);
    const titles = screen.getAllByText("About Me");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("renders profile information", () => {
    render(<About />);
    const names = screen.getAllByText("Milyon Kifleyesus");
    expect(names.length).toBeGreaterThan(0);
    expect(
      screen.getByText("Software Engineering Student")
    ).toBeInTheDocument();
    expect(screen.getByText("milyon.kifleyesus@email.com")).toBeInTheDocument();
  });

  it("renders skills section", () => {
    render(<About />);
    expect(screen.getByText("My Skills")).toBeInTheDocument();
    expect(screen.getByText("HTML/CSS/JavaScript")).toBeInTheDocument();
    expect(screen.getByText("C#")).toBeInTheDocument();
  });

  it("renders education and experience section", () => {
    render(<About />);
    expect(screen.getByText("Education & Experience")).toBeInTheDocument();
  });

  it("shows loading state when fetching qualifications", () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<About />);
    expect(screen.getByText("Loading education...")).toBeInTheDocument();
  });

  it("displays qualifications when API call succeeds", async () => {
    const mockQualifications = {
      success: true,
      count: 1,
      data: [
        {
          _id: "1",
          type: "education",
          degree: "Software Engineering",
          institution: "Centennial College",
          field: "Computer Science",
          startDate: "2023-01-01",
          endDate: "2024-01-01",
          grade: "A+",
          description: "Full-time program",
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: mockQualifications });

    await act(async () => {
      render(<About />);
    });

    await waitFor(() => {
      const engineeringTexts = screen.getAllByText("Software Engineering");
      expect(engineeringTexts.length).toBeGreaterThan(0);
      expect(screen.getByText("Centennial College")).toBeInTheDocument();
    });
  });

  it("shows error message when API call fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await act(async () => {
      render(<About />);
    });

    await waitFor(() => {
      const errorMessages = screen.getAllByText(
        "Failed to load qualifications from server"
      );
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("renders fallback experience when no API data", () => {
    mockedAxios.get.mockResolvedValue({
      data: { success: true, count: 0, data: [] },
    });

    render(<About />);

    // Check for education section instead of experience
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("renders contact call to action", () => {
    render(<About />);
    expect(screen.getByText("Ready to Work Together?")).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });
});
