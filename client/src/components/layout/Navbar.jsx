import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../ui/ThemeToggle";

/**
 * @param {Object} props
 * @param {'light' | 'dark'} props.theme - The current theme
 * @param {() => void} props.toggleTheme - Function to toggle the theme
 */
const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/projects"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Code
              size={32}
              className="text-primary-500 dark:text-primary-400"
            />
            <span className="text-xl font-heading font-bold text-dark-900 dark:text-white">
              DevPortfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className={`navbar-link ${
                  location.pathname === path ? "active" : ""
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle + Auth + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    <User size={16} className="text-indigo-400" />
                    <span className="text-sm text-indigo-200">
                      {user?.name}
                      {isAdmin() && (
                        <span className="ml-1 text-xs bg-indigo-500 text-white px-1.5 py-0.5 rounded">
                          Admin
                        </span>
                      )}
                    </span>
                  </div>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/signin"
                    className="px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:opacity-90 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <button
              className="p-2 md:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-800 dark:text-dark-200" />
              ) : (
                <Menu size={24} className="text-gray-800 dark:text-dark-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden"
      >
        <nav className="container-custom py-4 bg-white dark:bg-dark-900">
          {links.map(([name, path]) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link block py-2 text-lg ${
                location.pathname === path ? "active" : ""
              }`}
            >
              {name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="border-t border-gray-200 dark:border-dark-700 pt-4 mt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <User size={16} className="text-indigo-400" />
                  <span className="text-indigo-200">
                    {user?.name}
                    {isAdmin() && (
                      <span className="ml-1 text-xs bg-indigo-500 text-white px-1.5 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </span>
                </div>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="w-full text-center px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/signin"
                  className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:opacity-90 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </motion.div>
    </header>
  );
};

export default Navbar;
