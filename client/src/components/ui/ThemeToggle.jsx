import React from "react";
import { Moon, Sun } from "lucide-react";

/**
 * @param {Object} props
 * @param {'light' | 'dark'} props.theme - The current theme
 * @param {() => void} props.toggleTheme - Function to toggle the theme
 */
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      data-testid="theme-toggle"
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
