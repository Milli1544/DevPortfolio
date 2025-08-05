import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { API_ENDPOINTS } from "./config/api";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AdminDashboard from "./components/admin/AdminDashboard";

// Layout component that includes the Navbar
function AppLayout() {
  const [theme, setTheme] = useState("dark");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isServerOnline, setIsServerOnline] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.HEALTH);
        if (!response.ok) {
          throw new Error("Server not responding");
        }
        const data = await response.json();
        if (data.status !== "ok") {
          throw new Error("Server status is not ok");
        }
        setIsServerOnline(true);
      } catch (error) {
        console.error("Health check failed:", error);
        setIsServerOnline(false);
      }
    };

    checkServerStatus();
    try {
      // Check for saved theme preference or default to dark
      const savedTheme = localStorage.getItem("theme") || "dark";
      setTheme(savedTheme);

      // Apply theme to document
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error setting up theme:", error);
      // Fallback to dark theme
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }

    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return <div className="min-h-screen bg-white dark:bg-dark-900" />;
  }

  return (
    <div className="App">
      {!isServerOnline && (
        <div className="bg-red-500 text-white text-center p-2">
          The server is currently offline. Some features may not be available.
        </div>
      )}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );
}

// Create router with future flags for v7 behavior
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
