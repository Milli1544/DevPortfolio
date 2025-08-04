import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      transition,
      whileHover,
      whileTap,
      ...restProps
    }) => {
      return React.createElement("div", restProps, children);
    },
    h1: ({ children, initial, animate, transition, ...restProps }) => {
      return React.createElement("h1", restProps, children);
    },
    h2: ({ children, initial, animate, transition, ...restProps }) => {
      return React.createElement("h2", restProps, children);
    },
    p: ({ children, initial, animate, transition, ...restProps }) => {
      return React.createElement("p", restProps, children);
    },
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) =>
    React.createElement("a", { href: to, ...props }, children),
  useNavigate: () => vi.fn(),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowDownToLine: ({ children, ...props }) =>
    React.createElement("span", props, "ArrowDownToLine"),
  GraduationCap: ({ children, ...props }) =>
    React.createElement("span", props, "GraduationCap"),
  LoaderCircle: ({ children, ...props }) =>
    React.createElement("span", props, "LoaderCircle"),
  Loader2: ({ children, ...props }) =>
    React.createElement("span", props, "Loader2"),
  Briefcase: ({ children, ...props }) =>
    React.createElement("span", props, "Briefcase"),
  ArrowRight: ({ children, ...props }) =>
    React.createElement("span", props, "ArrowRight"),
  Code: ({ children, ...props }) => React.createElement("span", props, "Code"),
  Github: ({ children, ...props }) =>
    React.createElement("span", props, "Github"),
  Linkedin: ({ children, ...props }) =>
    React.createElement("span", props, "Linkedin"),
  Mail: ({ children, ...props }) => React.createElement("span", props, "Mail"),
}));
