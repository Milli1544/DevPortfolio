import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) =>
      React.createElement("div", props, children),
    h1: ({ children, ...props }) => React.createElement("h1", props, children),
    h2: ({ children, ...props }) => React.createElement("h2", props, children),
    p: ({ children, ...props }) => React.createElement("p", props, children),
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) =>
    React.createElement("a", { href: to, ...props }, children),
  useNavigate: () => vi.fn(),
}));
